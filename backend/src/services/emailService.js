// backend/src/services/emailService.js - VERSION DEBUG
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    // 🔍 DEBUG: Afficher les variables d'environnement
    console.log('🔍 DEBUG EMAIL CONFIG:');
    console.log('  EMAIL_USER:', process.env.EMAIL_USER);
    console.log('  EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 
      `Défini (${process.env.EMAIL_PASSWORD.length} chars): ${process.env.EMAIL_PASSWORD.substring(0, 4)}****` : 
      'NON DÉFINI');
    console.log('  EMAIL_FROM:', process.env.EMAIL_FROM);
    
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      debug: true,
      logger: true
    });
  }

  async sendVerificationEmail(email, code, prenom = '') {
    try {
      logger.info(`Attempting to send verification email to ${email}`);
      
      const mailOptions = {
        from: {
          name: 'CERCLE',
          address: process.env.EMAIL_FROM || process.env.EMAIL_USER
        },
        to: email,
        subject: 'Confirmez votre compte CERCLE',
        html: this.getVerificationEmailTemplate(code, prenom),
        text: `Votre code de vérification CERCLE : ${code}`
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`✅ Verification email sent successfully to ${email}`, { 
        messageId: result.messageId,
        response: result.response 
      });
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      logger.error('❌ Failed to send verification email:', {
        error: error.message,
        code: error.code,
        command: error.command,
        to: email
      });
      throw new Error(`Failed to send verification email: ${error.message}`);
    }
  }

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
        .content { 
          padding: 40px 30px; 
        }
        .code-container { 
          background: #f8f9fa; 
          border: 2px solid #e9ecef; 
          border-radius: 8px; 
          padding: 20px; 
          text-align: center; 
          margin: 30px 0; 
        }
        .code { 
          font-size: 32px; 
          font-weight: bold; 
          color: #495057; 
          letter-spacing: 8px; 
          font-family: 'Courier New', monospace; 
        }
        .footer { 
          background: #f8f9fa; 
          padding: 20px; 
          text-align: center; 
          color: #6c757d; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">Bienvenue${prenom ? ' ' + prenom : ''} !</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Confirmez votre compte CERCLE</p>
        </div>
        
        <div class="content">
          <h2 style="color: #495057; margin-top: 0;">Code de vérification</h2>
          <p style="color: #6b7280; font-size: 16px;">
            Saisissez ce code dans l'application pour activer votre compte :
          </p>
          
          <div class="code-container">
            <div class="code">${code}</div>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
              Ce code expire dans 15 minutes
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Si vous n'avez pas créé de compte CERCLE, vous pouvez ignorer cet email en toute sécurité.
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

  async testConnection() {
    try {
      logger.info('Testing email service connection...');
      await this.transporter.verify();
      logger.info('✅ Email service connection verified successfully');
      return true;
    } catch (error) {
      logger.error('❌ Email service connection failed:', {
        error: error.message,
        code: error.code
      });
      return false;
    }
  }

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
    }
  }

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
          <p>Votre email a été vérifié avec succès ! Vous pouvez maintenant profiter de toutes les fonctionnalités de notre réseau social.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Commencer l'exploration
            </a>
          </div>
          
          <h3>Que pouvez-vous faire maintenant ?</h3>
          <ul style="color: #666;">
            <li>📝 Créer votre premier post</li>
            <li>👥 Suivre d'autres utilisateurs</li>
            <li>💬 Participer aux conversations</li>
            <li>🎨 Personnaliser votre profil</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Merci de faire partie de la communauté CERCLE !</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
}

module.exports = new EmailService();