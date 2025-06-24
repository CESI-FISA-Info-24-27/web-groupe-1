// backend/src/controllers/authController.js - VERSION COMPLÈTE AVEC VÉRIFICATION EMAIL
const bcrypt = require('bcrypt');
const prisma = require('../utils/database');
const TokenService = require('../services/tokenService');
const EmailService = require('../services/emailService'); // 🔥 NOUVEAU
const { 
  registerSchema, 
  loginSchema, 
  refreshSchema, 
  changePasswordSchema,
  verificationSchema,     // 🔥 NOUVEAU
  resendCodeSchema       // 🔥 NOUVEAU
} = require('../validators/authValidator');
const logger = require('../utils/logger');

class AuthController {
  /**
   * Inscription d'un nouvel utilisateur avec envoi de code de vérification
   */
  static async register(req, res) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { username, mail, password, nom, prenom, telephone } = value;

      // Vérifier si un compte ACTIF existe déjà avec le même mail
      const existingUserByMail = await prisma.user.findFirst({
        where: {
          mail: mail,
          is_active: true
        }
      });

      if (existingUserByMail) {
        return res.status(409).json({ 
          error: 'User already exists',
          message: 'This email is already taken by an active account'
        });
      }

      // Vérifier si un compte ACTIF existe déjà avec le même username
      const existingUserByUsername = await prisma.user.findFirst({
        where: {
          username: username,
          is_active: true
        }
      });

      if (existingUserByUsername) {
        return res.status(409).json({ 
          error: 'User already exists',
          message: 'This username is already taken by an active account'
        });
      }

      // Vérifier si un compte ACTIF existe déjà avec le même numéro de téléphone (si fourni)
      if (telephone) {
        const existingUserByPhone = await prisma.user.findFirst({
          where: {
            telephone: telephone,
            is_active: true
          }
        });

        if (existingUserByPhone) {
          return res.status(409).json({ 
            error: 'User already exists',
            message: 'This phone number is already taken by an active account'
          });
        }
      }

      // 🔥 NOUVEAU : Générer le code de vérification
      const verificationCode = EmailService.generateVerificationCode();
      const codeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Récupérer le rôle USER par défaut
      const userRole = await prisma.role.findFirst({
        where: { role: 'USER' }
      });

      if (!userRole) {
        return res.status(500).json({ 
          error: 'System configuration error',
          message: 'Default user role not found'
        });
      }

      // Hasher le mot de passe
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Créer l'utilisateur avec toutes les relations
      const result = await prisma.$transaction(async (tx) => {
        const currentDate = new Date();

        // Créer l'utilisateur (NON VÉRIFIÉ)
        const user = await tx.user.create({
          data: {
            username,
            mail,
            password_hash: passwordHash,
            nom,
            prenom,
            telephone: telephone || null,
            bio: `Salut ! Je suis ${prenom}, ravi de rejoindre la communauté ! 👋`,
            photo_profil: null,
            id_role: userRole.id_role,
            private: false,
            certified: false,
            is_active: true,
            email_verified: false,  // 🔥 NOUVEAU
            verification_code: verificationCode,  // 🔥 NOUVEAU
            verification_code_expires_at: codeExpiresAt,  // 🔥 NOUVEAU
            verification_attempts: 0,  // 🔥 NOUVEAU
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

      // 🔥 NOUVEAU : Envoyer l'email de vérification
      try {
        await EmailService.sendVerificationEmail(mail, verificationCode, prenom);
        logger.info(`Verification email sent to ${mail} for user ${username}`);
      } catch (emailError) {
        logger.error('Failed to send verification email:', emailError);
        // On continue quand même, l'utilisateur peut redemander le code
      }

      logger.info(`New user registered (pending verification): ${result.username} (${result.mail})`);

      // 🔥 MODIFICATION : Retourner la réponse sans les tokens car pas encore vérifié
      const { password_hash: _, verification_code: __, ...userResponse } = result;

      res.status(201).json({
        message: 'User created successfully. Please check your email for verification code.',
        user: userResponse,
        requiresVerification: true,  // 🔥 NOUVEAU
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
        await EmailService.sendWelcomeEmail(mail, prenom);
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

      // Générer un nouveau code
      const verificationCode = EmailService.generateVerificationCode();
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

      // Envoyer le nouvel email
      await EmailService.sendVerificationEmail(mail, verificationCode, user.prenom);

      logger.info(`Verification code resent to ${mail}`);

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

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        });
      }

      // Génération automatique des tokens
      const { accessToken, refreshToken } = TokenService.generateTokens(user.id_user);

      // Mettre à jour la dernière connexion
      await prisma.user.update({
        where: { id_user: user.id_user },
        data: { last_login: new Date() }
      });

      logger.info(`User logged in: ${user.username} (${user.mail})`);

      // Retourner les informations sans le hash du mot de passe
      const { password_hash: _, ...userResponse } = user;

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
   * Rafraîchissement du token d'accès
   */
  static async refresh(req, res) {
    try {
      const { error, value } = refreshSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { refreshToken } = value;

      try {
        const decoded = TokenService.verifyRefreshToken(refreshToken);
        
        const user = await prisma.user.findFirst({
          where: { 
            id_user: decoded.id_user,
            is_active: true
          }
        });

        if (!user) {
          return res.status(401).json({ 
            error: 'Invalid token',
            message: 'User not found or inactive'
          });
        }

        const newAccessToken = TokenService.generateAccessToken({
          id_user: user.id_user,
          username: user.username,
          mail: user.mail
        });

        res.json({
          accessToken: newAccessToken,
          message: 'Token refreshed successfully',
          expiresIn: 3600,
          user: {
            id_user: user.id_user,
            username: user.username,
            mail: user.mail,
            nom: user.nom,
            prenom: user.prenom
          }
        });

      } catch (tokenError) {
        console.error('Token verification error:', tokenError);
        return res.status(401).json({ 
          error: 'Invalid token',
          message: 'Refresh token is invalid or expired'
        });
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Obtenir les informations de l'utilisateur connecté
   */
  static async me(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id_user: req.user.id_user },
        include: { 
          role: true,
          user_preferences: {
            include: {
              langue: true,
              theme: true
            }
          },
          _count: {
            select: {
              posts: { where: { active: true } },
              followers: { where: { active: true, pending: false } },
              following: { where: { active: true, pending: false } },
              likes: true,
              messages_sent: { where: { active: true } },
              messages_received: { where: { active: true } }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Retourner toutes les informations sans le hash du mot de passe
      const { password_hash: _, verification_code: __, ...userInfo } = user;

      res.json({
        user: {
          ...userInfo,
          preferences: userInfo.user_preferences,
          stats: {
            posts: userInfo._count.posts,
            followers: userInfo._count.followers,
            following: userInfo._count.following,
            likes: userInfo._count.likes,
            messagesSent: userInfo._count.messages_sent,
            messagesReceived: userInfo._count.messages_received
          },
          user_preferences: undefined,
          _count: undefined
        }
      });
    } catch (error) {
      logger.error('Get me error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Changement de mot de passe
   */
  static async changePassword(req, res) {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { currentPassword, newPassword } = value;
      const userId = req.user.id_user;

      const user = await prisma.user.findFirst({
        where: { id_user: userId }
      });

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          message: 'User account not found'
        });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ 
          error: 'Invalid password',
          message: 'Current password is incorrect'
        });
      }

      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      await prisma.user.update({
        where: { id_user: userId },
        data: { 
          password_hash: newPasswordHash,
          updated_at: new Date()
        }
      });

      logger.info(`Password changed for user: ${user.username} (${user.mail})`);

      res.json({
        message: 'Password changed successfully'
      });
    } catch (error) {
      logger.error('Change password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Déconnexion
   */
  static async logout(req, res) {
    try {
      logger.info(`User logged out: ${req.user.username} (${req.user.mail})`);
      
      res.json({
        message: 'Logout successful',
        note: 'Please remove tokens from client storage'
      });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = AuthController;