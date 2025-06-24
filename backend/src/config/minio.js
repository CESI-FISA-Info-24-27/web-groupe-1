// backend/src/config/minio.js - VERSION CORRIGÉE POUR URLs PUBLIQUES
const { Client } = require('minio');
const logger = require('../utils/logger');

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_API_PORT) || 9000,
  useSSL: process.env.MINIO_USE_SSL === 'true' || false,
  accessKey: process.env.MINIO_ROOT_USER || 'cercle_admin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'M1n10S3cur3P4ss2025!'
});

// Configuration des buckets
const BUCKETS = {
  IMAGES: 'images',
  VIDEOS: 'videos', 
  AVATARS: 'avatars'
};

// Vérifier la connexion MinIO et créer les buckets si nécessaire
const initializeMinIO = async () => {
  try {
    logger.info('🔄 Initialisation de MinIO...');
    
    // Vérifier la connexion
    await minioClient.listBuckets();
    logger.info('✅ Connexion MinIO établie');

    // Créer les buckets s'ils n'existent pas
    for (const [key, bucketName] of Object.entries(BUCKETS)) {
      const exists = await minioClient.bucketExists(bucketName);
      if (!exists) {
        await minioClient.makeBucket(bucketName);
        logger.info(`✅ Bucket '${bucketName}' créé`);
        
        // Définir la politique publique pour les avatars et images
        if (bucketName === BUCKETS.AVATARS || bucketName === BUCKETS.IMAGES) {
          const policy = {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: { AWS: ['*'] },
                Action: ['s3:GetObject'],
                Resource: [`arn:aws:s3:::${bucketName}/*`]
              }
            ]
          };
          await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
          logger.info(`✅ Politique publique définie pour '${bucketName}'`);
        }
      } else {
        logger.info(`✅ Bucket '${bucketName}' existe déjà`);
      }
    }
  } catch (error) {
    logger.error('❌ Erreur lors de l\'initialisation MinIO:', error);
    throw error;
  }
};

// Fonction utilitaire pour générer un nom de fichier unique
const generateFileName = (userId, originalName, type = 'image') => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(7);
  const extension = originalName.split('.').pop().toLowerCase();
  return `${userId}/${type}_${timestamp}_${randomStr}.${extension}`;
};

// ✅ FONCTION CORRIGÉE : URL publique accessible depuis le navigateur
const getPublicUrl = (bucketName, objectName) => {
  // 🔧 SOLUTION: Utiliser localhost au lieu du nom de container
  const isDocker = process.env.MINIO_ENDPOINT === 'minio';
  
  if (isDocker) {
    // En environnement Docker, utiliser localhost pour les URLs publiques
    const port = process.env.MINIO_API_PORT || 9000;
    const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
    return `${protocol}://localhost:${port}/${bucketName}/${objectName}`;
  } else {
    // En environnement local classique
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
    const port = process.env.MINIO_API_PORT || 9000;
    const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
    return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
  }
};

// Fonction pour obtenir une URL pré-signée (pour les vidéos privées)
const getPresignedUrl = async (bucketName, objectName, expiry = 24 * 60 * 60) => {
  try {
    return await minioClient.presignedGetObject(bucketName, objectName, expiry);
  } catch (error) {
    logger.error('Erreur génération URL pré-signée:', error);
    throw error;
  }
};

module.exports = {
  minioClient,
  BUCKETS,
  initializeMinIO,
  generateFileName,
  getPublicUrl,
  getPresignedUrl
};
