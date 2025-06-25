// backend/src/controllers/mediaController.js - VERSION CORRIGÉE
const prisma = require('../utils/database');
const logger = require('../utils/logger');
const sharp = require('sharp');
const { minioClient, BUCKETS, generateFileName, getPublicUrl, getPresignedUrl } = require('../config/minio');

class MediaController {
  /**
   * Upload d'un avatar utilisateur
   */
  static async uploadAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier fourni' });
      }

      const userId = req.user.id_user;
      const file = req.file;

      // Validation du type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ 
          error: 'Type de fichier non supporté. Utilisez JPEG, PNG ou WebP.' 
        });
      }

      // Redimensionner l'avatar (300x300)
      const resizedBuffer = await sharp(file.buffer)
        .resize(300, 300, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toBuffer();

      // Générer nom de fichier unique
      const fileName = generateFileName(userId, 'avatar.jpg', 'avatar');

      // Supprimer l'ancien avatar s'il existe
      const existingUser = await prisma.user.findUnique({
        where: { id_user: userId },
        select: { photo_profil: true } // ✅ CORRIGÉ: photo_profil au lieu de lien_photo_profil
      });

      if (existingUser?.photo_profil) {
        try {
          // Extraire le nom de fichier de l'URL
          const urlParts = existingUser.photo_profil.split('/');
          const oldFileName = urlParts.slice(-2).join('/'); // userId/filename
          await minioClient.removeObject(BUCKETS.AVATARS, oldFileName);
          logger.info(`Ancien avatar supprimé: ${oldFileName}`);
        } catch (error) {
          logger.warn(`Impossible de supprimer l'ancien avatar:`, error);
        }
      }

      // Upload vers MinIO
      await minioClient.putObject(
        BUCKETS.AVATARS,
        fileName,
        resizedBuffer,
        resizedBuffer.length,
        {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400'
        }
      );

      // URL publique
      const avatarUrl = getPublicUrl(BUCKETS.AVATARS, fileName);

      // Mettre à jour la base de données
      await prisma.user.update({
        where: { id_user: userId },
        data: { 
          photo_profil: avatarUrl, // ✅ CORRIGÉ: photo_profil au lieu de lien_photo_profil
          updated_at: new Date()
        }
      });

      logger.info(`Avatar mis à jour pour l'utilisateur ${userId}: ${fileName}`);

      res.json({
        message: 'Avatar mis à jour avec succès',
        avatar_url: avatarUrl
      });

    } catch (error) {
      logger.error('Erreur upload avatar:', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'upload' });
    }
  }

  /**
   * Upload d'une image pour un post
   */
  static async uploadPostImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier fourni' });
      }

      const userId = req.user.id_user;
      const file = req.file;

      // Validation du type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ 
          error: 'Type de fichier non supporté. Utilisez JPEG, PNG, WebP ou GIF.' 
        });
      }

      // Redimensionner l'image (max 1200x1200) sauf pour les GIFs
      let processedBuffer = file.buffer;
      if (file.mimetype !== 'image/gif') {
        processedBuffer = await sharp(file.buffer)
          .resize(1200, 1200, { 
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 90 })
          .toBuffer();
      }

      // Générer nom de fichier unique
      const extension = file.mimetype === 'image/gif' ? 'gif' : 'jpg';
      const fileName = generateFileName(userId, `image.${extension}`, 'post');

      // Upload vers MinIO
      await minioClient.putObject(
        BUCKETS.IMAGES,
        fileName,
        processedBuffer,
        processedBuffer.length,
        {
          'Content-Type': file.mimetype,
          'Cache-Control': 'public, max-age=86400'
        }
      );

      // URL publique
      const imageUrl = getPublicUrl(BUCKETS.IMAGES, fileName);

      logger.info(`Image de post uploadée par l'utilisateur ${userId}: ${fileName}`);

      res.json({
        message: 'Image uploadée avec succès',
        image_url: imageUrl,
        file_name: fileName
      });

    } catch (error) {
      logger.error('Erreur upload image post:', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'upload' });
    }
  }

  /**
   * Supprimer l'avatar d'un utilisateur
   */
  static async deleteAvatar(req, res) {
    try {
      const userId = req.user.id_user;

      // Récupérer l'utilisateur avec son avatar actuel
      const user = await prisma.user.findUnique({
        where: { id_user: userId },
        select: { photo_profil: true }
      });

      if (!user || !user.photo_profil) {
        return res.status(400).json({ error: 'Aucun avatar à supprimer' });
      }

      // Supprimer le fichier de MinIO
      try {
        const urlParts = user.photo_profil.split('/');
        const fileName = urlParts.slice(-2).join('/'); // userId/filename
        await minioClient.removeObject(BUCKETS.AVATARS, fileName);
      } catch (minioError) {
        logger.warn(`Impossible de supprimer l'avatar de MinIO:`, minioError);
      }

      // Mettre à jour la base de données
      await prisma.user.update({
        where: { id_user: userId },
        data: { 
          photo_profil: null,
          updated_at: new Date()
        }
      });

      res.json({ message: 'Avatar supprimé avec succès' });

    } catch (error) {
      logger.error('Erreur suppression avatar:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Upload d'une vidéo pour un post
   */
  static async uploadPostVideo(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier fourni' });
      }

      const userId = req.user.id_user;
      const file = req.file;

      // Validation du type de fichier
      const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ 
          error: 'Type de fichier non supporté. Utilisez MP4, WebM ou MOV.' 
        });
      }

      // Validation de la taille (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        return res.status(400).json({ 
          error: 'Fichier trop volumineux. Taille maximum: 50MB.' 
        });
      }

      // Générer nom de fichier unique
      const extension = file.mimetype.split('/')[1];
      const fileName = generateFileName(userId, `video.${extension}`, 'video');

      // Upload vers MinIO
      await minioClient.putObject(
        BUCKETS.VIDEOS,
        fileName,
        file.buffer,
        file.buffer.length,
        {
          'Content-Type': file.mimetype,
          'Cache-Control': 'private, max-age=3600'
        }
      );

      logger.info(`Vidéo de post uploadée par l'utilisateur ${userId}: ${fileName}`);

      res.json({
        message: 'Vidéo uploadée avec succès',
        file_name: fileName,
        size: file.size
      });

    } catch (error) {
      logger.error('Erreur upload vidéo post:', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'upload' });
    }
  }

  /**
   * Obtenir les statistiques de stockage d'un utilisateur
   */
  static async getStorageStats(req, res) {
    try {
      const userId = req.user.id_user;

      const stats = {
        avatars: { count: 0, size: 0 },
        images: { count: 0, size: 0 },
        videos: { count: 0, size: 0 },
        total: { count: 0, size: 0 }
      };

      // Parcourir chaque bucket
      for (const [key, bucketName] of Object.entries(BUCKETS)) {
        const bucketKey = key.toLowerCase();
        const objectsStream = minioClient.listObjectsV2(bucketName, `${userId}/`, true);
        
        for await (const obj of objectsStream) {
          stats[bucketKey].count++;
          stats[bucketKey].size += obj.size;
          stats.total.count++;
          stats.total.size += obj.size;
        }
      }

      res.json({
        user_id: userId,
        storage: stats,
        limits: {
          max_file_size: process.env.MAX_FILE_SIZE || 5242880,
          max_video_size: 50 * 1024 * 1024
        }
      });

    } catch (error) {
      logger.error('Erreur récupération stats stockage:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Test de connexion MinIO
   */
  static async testConnection(req, res) {
    try {
      const buckets = await minioClient.listBuckets();
      res.json({
        message: 'Connexion MinIO OK',
        buckets: buckets.map(b => b.name),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Test MinIO échoué:', error);
      res.status(500).json({ 
        error: 'Connexion MinIO échouée',
        details: error.message 
      });
    }
  }
}

module.exports = MediaController;