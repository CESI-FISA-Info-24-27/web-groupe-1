// backend/src/routes/authRoutes.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Rate limiting spécifique pour les routes d'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite à 5 tentatives par IP
  message: { 
    error: 'Too many authentication attempts',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting pour l'inscription (plus restrictif)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3, // Limite à 3 inscriptions par IP par heure
  message: { 
    error: 'Too many registration attempts',
    message: 'Please wait before creating another account'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🔥 NOUVEAU : Rate limiting pour la vérification email
const verificationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 tentatives de vérification par fenêtre
  message: {
    error: 'Too many verification attempts',
    message: 'Please wait before requesting another code'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes publiques
router.post('/register', registerLimiter, AuthController.register);
router.post('/login', authLimiter, AuthController.login);
router.post('/refresh', AuthController.refresh);

// 🔥 NOUVELLES ROUTES : Vérification email
router.post('/verify-email', verificationLimiter, AuthController.verifyEmail);
router.post('/resend-verification', verificationLimiter, AuthController.resendVerificationCode);

// Routes protégées
router.get('/me', authenticateToken, AuthController.me);
router.post('/change-password', authenticateToken, AuthController.changePassword);
router.post('/logout', authenticateToken, AuthController.logout);

module.exports = router;