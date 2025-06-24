// backend/src/controllers/authController.js - VERSION COMPLÈTE CORRIGÉE (SOLUTION PROPRE)
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');
const TokenService = require('../services/tokenService');
const EmailService = require('../services/emailService'); // ← Import de l'instance
const { 
  registerSchema, 
  loginSchema, 
  refreshSchema, 
  changePasswordSchema,
  verificationSchema,
  resendCodeSchema 
} = require('../validators/authValidator');

const prisma = new PrismaClient();

class AuthController {
  /**
   * Inscription d'un utilisateur avec envoi d'email de vérification
   */
  static async register(req, res) {
    try {
      // Validation des données
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { username, mail, password, nom, prenom } = value;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { mail: mail }
          ],
          is_active: true
        }
      });

      if (existingUser) {
        const field = existingUser.username === username ? 'username' : 'email';
        return res.status(409).json({ 
          error: 'User already exists',
          message: `This ${field} is already taken`
        });
      }

      // ✅ CORRECTION : Générer le code avec une fonction helper locale
      const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };

      const verificationCode = generateVerificationCode();
      const codeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      logger.info(`Generated verification code for ${mail}: ${verificationCode}`);

      // Transaction pour créer l'utilisateur et ses préférences
      const result = await prisma.$transaction(async (tx) => {
        // Hacher le mot de passe
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Récupérer le rôle USER par défaut
        const userRole = await tx.role.findFirst({ where: { role: 'USER' } });
        if (!userRole) {
          throw new Error('Default USER role not found');
        }

        const currentDate = new Date();

        // Créer l'utilisateur
        const user = await tx.user.create({
          data: {
            username,
            nom,
            prenom,
            mail,
            password_hash,
            bio: `Salut ! 👋 Je suis ${prenom}, ravi de rejoindre la communauté ! 👋`,
            photo_profil: null,
            id_role: userRole.id_role,
            private: false,
            certified: false,
            is_active: true,
            email_verified: false,
            verification_code: verificationCode,
            verification_code_expires_at: codeExpiresAt,
            verification_attempts: 0,
            created_at: currentDate,
            updated_at: currentDate,
            last_login: null
          },
          include: {
            role: true
          }
        });

        // Créer les préférences par défaut
        const defaultLangue = await tx.langue.findFirst({ where: { langue: 'Français' } });
        const defaultTheme = await tx.theme.findFirst({ where: { theme: 'Clair' } });

        await tx.userPreferences.create({
          data: {
            id_user: user.id_user,
            id_langue: defaultLangue?.id_langue || 1,
            email_notification: true,
            id_theme: defaultTheme?.id_theme || 1
          }
        });

        return user;
      });

      // ✅ ENVOYER L'EMAIL DE VÉRIFICATION (utilise l'instance)
      try {
        await EmailService.sendVerificationEmail(mail, verificationCode, prenom);
        logger.info(`✅ Verification email sent to ${mail} for user ${username}`);
      } catch (emailError) {
        logger.error('❌ Failed to send verification email:', emailError);
        // On continue quand même, l'utilisateur peut redemander le code
      }

      logger.info(`New user registered (pending verification): ${result.username} (${result.mail})`);

      // Retourner la réponse sans les données sensibles
      const { password_hash: _, verification_code: __, ...userResponse } = result;

      res.status(201).json({
        message: 'User created successfully. Please check your email for verification code.',
        user: userResponse,
        requiresVerification: true,
        email: mail
      });
    } catch (error) {
      logger.error('Register error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * 🔥 NOUVEAU : Vérification du code email
   */
  static async verifyEmail(req, res) {
    try {
      const { error, value } = verificationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { mail, code } = value;

      // Trouver l'utilisateur
      const user = await prisma.user.findFirst({
        where: { 
          mail: mail,
          is_active: true,
          email_verified: false
        },
        include: { role: true }
      });

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          message: 'No unverified account found with this email'
        });
      }

      // Vérifier si le code a expiré
      if (!user.verification_code_expires_at || new Date() > user.verification_code_expires_at) {
        return res.status(400).json({ 
          error: 'Code expired',
          message: 'Verification code has expired. Please request a new one.'
        });
      }

      // Vérifier le nombre de tentatives
      if (user.verification_attempts >= 5) {
        return res.status(429).json({ 
          error: 'Too many attempts',
          message: 'Maximum verification attempts exceeded. Please request a new code.'
        });
      }

      // Vérifier le code
      if (user.verification_code !== code) {
        // Incrémenter les tentatives
        await prisma.user.update({
          where: { id_user: user.id_user },
          data: { verification_attempts: user.verification_attempts + 1 }
        });

        return res.status(400).json({ 
          error: 'Invalid code',
          message: 'The verification code is incorrect.',
          attemptsRemaining: 5 - (user.verification_attempts + 1)
        });
      }

      // Code correct ! Vérifier l'utilisateur
      const verifiedUser = await prisma.user.update({
        where: { id_user: user.id_user },
        data: {
          email_verified: true,
          verification_code: null,
          verification_code_expires_at: null,
          verification_attempts: 0
        },
        include: { role: true }
      });

      // Générer les tokens JWT maintenant que l'utilisateur est vérifié
      const { accessToken, refreshToken } = TokenService.generateTokens(verifiedUser.id_user);

      // Envoyer email de bienvenue (optionnel)
      try {
        await EmailService.sendWelcomeEmail(mail, user.prenom);
      } catch (emailError) {
        logger.error('Failed to send welcome email:', emailError);
        // Ne pas faire échouer le processus
      }

      logger.info(`Email verified successfully for user: ${verifiedUser.username} (${verifiedUser.mail})`);

      // Retourner les tokens et infos utilisateur
      const { password_hash: _, ...userResponse } = verifiedUser;

      res.status(200).json({
        message: 'Email verified successfully! Welcome to CERCLE!',
        user: userResponse,
        accessToken,
        refreshToken
      });

    } catch (error) {
      logger.error('Email verification error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * 🔥 NOUVEAU : Renvoyer un code de vérification
   */
  static async resendVerificationCode(req, res) {
    try {
      const { error, value } = resendCodeSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { mail } = value;

      const user = await prisma.user.findFirst({
        where: { 
          mail: mail,
          is_active: true,
          email_verified: false
        }
      });

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          message: 'No unverified account found with this email'
        });
      }

      // ✅ CORRECTION : Fonction helper locale pour générer le code
      const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };

      const verificationCode = generateVerificationCode();
      const codeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

      // Mettre à jour l'utilisateur
      await prisma.user.update({
        where: { id_user: user.id_user },
        data: {
          verification_code: verificationCode,
          verification_code_expires_at: codeExpiresAt,
          verification_attempts: 0 // Reset les tentatives
        }
      });

      // ✅ ENVOYER LE NOUVEL EMAIL (utilise l'instance)
      try {
        await EmailService.sendVerificationEmail(mail, verificationCode, user.prenom);
        logger.info(`✅ Verification code resent to ${mail}`);
      } catch (emailError) {
        logger.error('❌ Failed to resend verification email:', emailError);
        return res.status(500).json({ 
          error: 'Failed to send email',
          message: 'Unable to send verification code'
        });
      }

      res.status(200).json({
        message: 'Verification code sent successfully',
        email: mail
      });

    } catch (error) {
      logger.error('Resend verification code error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Connexion d'un utilisateur avec vérification email obligatoire
   */
  static async login(req, res) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { mail, password } = value;

      // Rechercher l'utilisateur ACTIF avec ce mail
      const user = await prisma.user.findFirst({
        where: { 
          mail: mail,
          is_active: true
        },
        include: { role: true }
      });

      if (!user) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        });
      }

      // 🔥 NOUVEAU : Vérifier si l'email est vérifié
      if (!user.email_verified) {
        return res.status(403).json({ 
          error: 'Email not verified',
          message: 'Please verify your email before logging in.',
          requiresVerification: true,
          email: mail
        });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        });
      }

      // Générer les tokens JWT
      const { accessToken, refreshToken } = TokenService.generateTokens(user.id_user);

      // Mettre à jour la date de dernière connexion
      await prisma.user.update({
        where: { id_user: user.id_user },
        data: { last_login: new Date() }
      });

      logger.info(`User logged in: ${user.username} (${user.mail})`);

      // Retourner les tokens et infos utilisateur (sans le mot de passe)
      const { password_hash: _, verification_code: __, ...userResponse } = user;

      res.status(200).json({
        message: 'Login successful',
        user: userResponse,
        accessToken,
        refreshToken
      });

    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Rafraîchir le token d'accès
   */
  static async refresh(req, res) {
    try {
      const { error, value } = refreshSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { refreshToken } = value;

      try {
        // Vérifier et décoder le refresh token
        const decoded = TokenService.verifyRefreshToken(refreshToken);
        
        // Vérifier que l'utilisateur existe toujours et est actif
        const user = await prisma.user.findFirst({
          where: { 
            id_user: decoded.userId,
            is_active: true,
            email_verified: true  // 🔥 NOUVEAU : Vérifier que l'email est toujours vérifié
          },
          include: { role: true }
        });

        if (!user) {
          return res.status(401).json({ 
            error: 'Invalid refresh token',
            message: 'User not found or inactive'
          });
        }

        // Générer un nouveau token d'accès
        const { accessToken } = TokenService.generateTokens(user.id_user);

        logger.info(`Token refreshed for user: ${user.username}`);

        res.status(200).json({
          message: 'Token refreshed successfully',
          accessToken
        });

      } catch (tokenError) {
        logger.error('Invalid refresh token:', tokenError);
        return res.status(401).json({ 
          error: 'Invalid refresh token',
          message: 'Please log in again'
        });
      }

    } catch (error) {
      logger.error('Refresh token error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Obtenir les informations de l'utilisateur connecté
   */
  static async me(req, res) {
    try {
      const userId = req.user.userId;

      const user = await prisma.user.findFirst({
        where: { 
          id_user: userId,
          is_active: true,
          email_verified: true  // 🔥 NOUVEAU : S'assurer que l'email est vérifié
        },
        include: {
          role: true,
          userPreferences: {
            include: {
              langue: true,
              theme: true
            }
          },
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          message: 'Account may have been deactivated'
        });
      }

      // Exclure les données sensibles
      const { password_hash: _, verification_code: __, ...userResponse } = user;

      res.status(200).json({
        user: userResponse
      });

    } catch (error) {
      logger.error('Get user info error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Changer le mot de passe
   */
  static async changePassword(req, res) {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { currentPassword, newPassword } = value;
      const userId = req.user.userId;

      // Récupérer l'utilisateur
      const user = await prisma.user.findFirst({
        where: { 
          id_user: userId,
          is_active: true,
          email_verified: true  // 🔥 NOUVEAU : Vérifier que l'email est vérifié
        }
      });

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          message: 'Account may have been deactivated'
        });
      }

      // Vérifier le mot de passe actuel
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ 
          error: 'Invalid current password',
          message: 'Current password is incorrect'
        });
      }

      // Hacher le nouveau mot de passe
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      // Mettre à jour le mot de passe
      await prisma.user.update({
        where: { id_user: userId },
        data: { 
          password_hash: newPasswordHash,
          updated_at: new Date()
        }
      });

      logger.info(`Password changed for user: ${user.username}`);

      res.status(200).json({
        message: 'Password changed successfully'
      });

    } catch (error) {
      logger.error('Change password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Déconnexion (optionnel - côté client principalement)
   */
  static async logout(req, res) {
    try {
      const userId = req.user.userId;

      // Optionnel : enregistrer la déconnexion en base
      await prisma.user.update({
        where: { id_user: userId },
        data: { updated_at: new Date() }
      });

      logger.info(`User logged out: ${userId}`);

      res.status(200).json({
        message: 'Logout successful'
      });

    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = AuthController;