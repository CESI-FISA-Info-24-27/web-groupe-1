// frontend/src/services/mediaService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const mediaApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/media`,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// Intercepteur pour ajouter le token d'authentification
mediaApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs d'authentification
mediaApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const mediaService = {
  /**
   * Upload d'un avatar
   */
  async uploadAvatar(file, onProgress) {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await mediaApi.post('/avatar', formData, {
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de l\'upload de l\'avatar');
    }
  },

  /**
   * Supprimer l'avatar
   */
  async deleteAvatar() {
    try {
      const response = await mediaApi.delete('/avatar');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la suppression');
    }
  },

  /**
   * Upload d'une image pour un post
   */
  async uploadPostImage(file, onProgress) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await mediaApi.post('/post/image', formData, {
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de l\'upload de l\'image');
    }
  },

  /**
   * Upload d'une vidéo pour un post
   */
  async uploadPostVideo(file, onProgress) {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await mediaApi.post('/post/video', formData, {
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de l\'upload de la vidéo');
    }
  },

  /**
   * Obtenir une URL pré-signée pour une vidéo
   */
  async getVideoUrl(fileName) {
    try {
      const response = await mediaApi.get(`/video/${fileName}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la récupération de la vidéo');
    }
  },

  /**
   * Supprimer un média
   */
  async deleteMedia(bucket, fileName) {
    try {
      const response = await mediaApi.delete(`/${bucket}/${fileName}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la suppression');
    }
  },

  /**
   * Obtenir les statistiques de stockage
   */
  async getStorageStats() {
    try {
      const response = await mediaApi.get('/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des stats');
    }
  },

  /**
   * Tester la connexion MinIO
   */
  async testConnection() {
    try {
      const response = await mediaApi.get('/test');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erreur de connexion MinIO');
    }
  }
};

/**
 * Utilitaires pour la validation des fichiers
 */
export const mediaUtils = {
  /**
   * Valider un fichier image
   */
  validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Type de fichier non supporté. Utilisez JPEG, PNG, WebP ou GIF.');
    }

    if (file.size > maxSize) {
      throw new Error('Fichier trop volumineux. Taille maximum: 5MB.');
    }

    return true;
  },

  /**
   * Valider un fichier vidéo
   */
  validateVideo(file) {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Type de fichier non supporté. Utilisez MP4, WebM ou MOV.');
    }

    if (file.size > maxSize) {
      throw new Error('Fichier trop volumineux. Taille maximum: 50MB.');
    }

    return true;
  },

  /**
   * Formater la taille d'un fichier
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Générer une miniature pour une image
   */
  generateThumbnail(file, maxWidth = 300, maxHeight = 300) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculer les nouvelles dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir en blob
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
};