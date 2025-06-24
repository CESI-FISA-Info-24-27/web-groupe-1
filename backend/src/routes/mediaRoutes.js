// backend/src/routes/mediaRoutes.js
const express = require('express');
const multer = require('multer');
const MediaController = require('../controllers/mediaController');
const logger = require('../utils/logger');

const router = express.Router();

// Configuration Multer pour l'upload en mémoire
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non supporté'), false);
    }
  }
});

// Middleware pour gérer les erreurs de Multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'Fichier trop volumineux',
        max_size: '50MB'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: 'Trop de fichiers ou champ inattendu'
      });
    }
  }
  
  if (error.message === 'Type de fichier non supporté') {
    return res.status(400).json({ 
      error: 'Type de fichier non supporté',
      allowed_types: ['JPEG', 'PNG', 'WebP', 'GIF', 'MP4', 'WebM', 'MOV']
    });
  }

  logger.error('Erreur upload:', error);
  res.status(500).json({ error: 'Erreur serveur lors de l\'upload' });
};

// Routes pour avatars
router.post('/avatar', 
  upload.single('avatar'),
  handleMulterError,
  MediaController.uploadAvatar
);

// Routes pour images de posts
router.post('/post/image', 
  upload.single('image'),
  handleMulterError,
  MediaController.uploadPostImage
);

// Routes pour vidéos de posts
router.post('/post/video', 
  upload.single('video'),
  handleMulterError,
  MediaController.uploadPostVideo
);

// Route pour obtenir les statistiques de stockage
router.get('/stats', 
  MediaController.getStorageStats
);

// Route de test pour vérifier la connexion MinIO
router.get('/test', MediaController.testConnection);

module.exports = router;