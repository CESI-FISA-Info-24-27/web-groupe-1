// backend/src/services/emailService.js - VERSION CORRIGÉE
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    // 🔥 CORRECTION: createTransport au lieu de createTransporter
    this.transporter = nodemailer.createTransport({
      // Option 1: Gmail
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // App password pour Gmail
      }
      
      // Option 2: SMTP générique (décommentez si besoin)
      /*
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
      */
    });
  }

  /**
   * Génère un code de vérification à 6 chiffres
   */
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Envoie un email de vérification avec le code
   */
  async sendVerificationEmail(email, code, prenom = '') {
    try {
      const mailOptions = {
        from: {
          name: 'CERCLE',
          address: process.env.EMAIL_FROM || process.env.EMAIL_USER
        },
        to: email,
        subject: 'Confirmez votre compte CERCLE',
        html: this.getVerificationEmailTemplate(code, prenom)
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Verification email sent to ${email}`, { messageId: result.messageId });
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      logger.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  /**
   * Template HTML pour l'email de vérification
   */
  getVerificationEmailTemplate(code, prenom) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          background-color: #f7f8fc; 
          margin: 0; 
          padding: 20px; 
          line-height: 1.6;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: white; 
          padding: 40px 30px; 
          text-align: center; 
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content { 
          padding: 40px 30px; 
        }
        .code { 
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); 
          border: 2px dashed #667eea; 
          border-radius: 12px; 
          padding: 30px; 
          text-align: center; 
          margin: 30px 0; 
        }
        .code h2 { 
          margin: 0; 
          color: #667eea; 
          font-size: 36px; 
          letter-spacing: 8px; 
          font-weight: 700;
        }
        .footer { 
          background: #f8f9fc; 
          padding: 30px; 
          text-align: center; 
          color: #6b7280; 
          font-size: 14px;
        }
        .warning {
          background: #fef3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
        @media (max-width: 600px) {
          .container { margin: 10px; }
          .content, .header { padding: 20px; }
          .code h2 { font-size: 28px; letter-spacing: 4px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌟 Bienvenue sur CERCLE !</h1>
          ${prenom ? `<p style="margin: 10px 0 0 0; font-size: 18px;">Salut ${prenom} !</p>` : ''}
        </div>
        
        <div class="content">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Confirmez votre adresse email</h2>
          <p style="color: #4b5563; font-size: 16px;">
            Nous sommes ravis de vous accueillir dans la communauté CERCLE ! 
            Pour finaliser votre inscription et commencer à partager avec vos amis, 
            veuillez saisir ce code de vérification :
          </p>
          
          <div class="code">
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Votre code de vérification</p>
            <h2>${code}</h2>
          </div>
          
          <div class="warning">
            <strong>⏰ Important :</strong> Ce code expire dans <strong>15 minutes</strong>. 
            Si vous ne l'utilisez pas dans ce délai, vous devrez en demander un nouveau.
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Si vous n'avez pas créé de compte CERCLE, vous pouvez ignorer cet email en toute sécurité.
          </p>
          
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #9ca3af; font-size: 13px;">
            <strong>Problème ?</strong> Si vous rencontrez des difficultés, contactez notre équipe support. 
            Nous sommes là pour vous aider !
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0;">© 2025 CERCLE - Réseau Social Moderne</p>
          <p style="margin: 5px 0 0 0;">Fait avec ❤️ pour notre communauté</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Teste la configuration email
   */
  async testConnection() {
    try {
      await this.transporter.verify();
      logger.info('Email service connection verified successfully');
      return true;
    } catch (error) {
      logger.error('Email service connection failed:', error);
      return false;
    }
  }

  /**
   * Envoie un email de bienvenue après vérification
   */
  async sendWelcomeEmail(email, prenom = '') {
    try {
      const mailOptions = {
        from: {
          name: 'CERCLE',
          address: process.env.EMAIL_FROM || process.env.EMAIL_USER
        },
        to: email,
        subject: '🎉 Bienvenue dans CERCLE !',
        html: this.getWelcomeEmailTemplate(prenom)
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Welcome email sent to ${email}`, { messageId: result.messageId });
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
      // Ne pas faire échouer le processus si l'email de bienvenue échoue
    }
  }

  /**
   * Template pour l'email de bienvenue
   */
  getWelcomeEmailTemplate(prenom) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Félicitations ${prenom} !</h1>
          <p>Votre compte CERCLE est maintenant actif</p>
        </div>
        
        <div class="content">
          <h2>Prêt à découvrir CERCLE ?</h2>
          <p>Votre email a été vérifié avec succès ! Vous pouvez maintenant :</p>
          <ul>
            <li>📝 Publier vos premiers messages</li>
            <li>👥 Suivre d'autres utilisateurs</li>
            <li>💬 Commencer des conversations</li>
            <li>🔍 Découvrir du contenu intéressant</li>
          </ul>
          
          <p>Nous avons hâte de voir ce que vous allez partager !</p>
        </div>
        
        <div class="footer">
          <p>© 2025 CERCLE - Votre réseau social moderne</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
}

module.exports = new EmailService();