// frontend/src/services/api.js - Version Docker avec gestion complète des tokens
// 🔄 Adaptation pour Docker tout en conservant les fonctionnalités avancées

class ApiService {
  constructor() {
    // ✅ ADAPTATION DOCKER : Utiliser le proxy Vite au lieu de l'URL directe
    this.baseURL = ''; // Le proxy Vite redirigera /api/* vers backend:3000/api/*
    this.isRefreshing = false;
    this.failedQueue = [];
    
    console.log('🔗 API Service initialized for Docker (using Vite proxy)');
    console.log('🔧 Token refresh system enabled');
  }

  /**
   * Traiter la file d'attente des requêtes qui ont échoué pendant le refresh
   */
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  /**
   * Rafraîchir le token automatiquement
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      console.log('🔄 Refreshing token...');
      
      // ✅ ADAPTATION DOCKER : Utiliser le proxy Vite
      const response = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      // Sauvegarder le nouveau token
      localStorage.setItem('accessToken', data.accessToken);
      
      console.log('✅ Token refreshed successfully');
      return data.accessToken;
      
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      
      // Nettoyer le localStorage et rediriger vers login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Rediriger vers la page de connexion
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      throw error;
    }
  }

  /**
   * Requête principale avec gestion automatique du refresh
   */
  async request(endpoint, options = {}) {
    // ✅ ADAPTATION DOCKER : Le proxy Vite redirigera automatiquement
    const url = `${this.baseURL}${endpoint}`;
    
    console.log('🚀 Making request to:', url, '(via Vite proxy)');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Adding auth token to request');
    }

    try {
      console.log('📤 Request config:', { 
        method: config.method || 'GET', 
        url, 
        headers: Object.keys(config.headers) 
      });

      let response = await fetch(url, config);
      
      console.log('📥 Response:', response.status, response.statusText);
      
      // ✅ GESTION AUTOMATIQUE DU REFRESH TOKEN
      if (response.status === 401) {
        console.log('🔑 Token expired, attempting refresh...');
        
        // Si on est déjà en train de rafraîchir, attendre
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(token => {
            config.headers.Authorization = `Bearer ${token}`;
            return fetch(url, config);
          }).then(response => {
            if (!response.ok) {
              throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
          });
        }

        this.isRefreshing = true;

        try {
          const newToken = await this.refreshToken();
          
          // Mettre à jour le header avec le nouveau token
          config.headers.Authorization = `Bearer ${newToken}`;
          
          // Refaire la requête originale
          console.log('🔄 Retrying request with new token...');
          response = await fetch(url, config);
          
          // Traiter la file d'attente avec le nouveau token
          this.processQueue(null, newToken);
          
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
          this.processQueue(refreshError, null);
          throw refreshError;
        } finally {
          this.isRefreshing = false;
        }
      }
      
      // Gérer les autres erreurs HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ HTTP Error:', response.status, errorData);
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      // Retourner les données JSON
      const data = await response.json();
      console.log('✅ Response data received');
      return data;
      
    } catch (error) {
      console.error('💥 API Request failed:', error);
      
      // ✅ ADAPTATION DOCKER : Messages d'erreur spécifiques
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('🌐 Network error - backend service may be unavailable');
        console.error('💡 Check if backend container is running: docker logs cercle-backend');
      }
      
      throw error;
    }
  }

  // Méthodes HTTP raccourcies
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }

  /**
   * Méthode pour vérifier si un token est proche de l'expiration
   */
  isTokenNearExpiry() {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convertir en millisecondes
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;
      
      // Retourner true si le token expire dans moins de 2 minutes
      return timeUntilExpiry < 2 * 60 * 1000;
    } catch (error) {
      return false;
    }
  }

  /**
   * Refresh préventif du token
   */
  async refreshTokenIfNeeded() {
    if (this.isTokenNearExpiry() && !this.isRefreshing) {
      try {
        console.log('⏰ Token near expiry, refreshing preemptively...');
        await this.refreshToken();
      } catch (error) {
        console.warn('⚠️ Preemptive token refresh failed:', error);
      }
    }
  }

  /**
   * ✅ NOUVEAU : Test de connectivité via proxy
   */
  async testConnection() {
    try {
      console.log('🧪 Testing API connection via Docker proxy...');
      const response = await this.get('/health');
      console.log('✅ API connection test successful:', response);
      return true;
    } catch (error) {
      console.error('❌ API connection test failed:', error);
      console.error('💡 Check: docker logs cercle-backend && docker logs cercle-frontend');
      return false;
    }
  }

  /**
   * ✅ NOUVEAU : Informations de debug pour Docker
   */
  getDebugInfo() {
    return {
      baseURL: this.baseURL,
      hasAccessToken: !!localStorage.getItem('accessToken'),
      hasRefreshToken: !!localStorage.getItem('refreshToken'),
      isRefreshing: this.isRefreshing,
      failedQueueLength: this.failedQueue.length,
      tokenNearExpiry: this.isTokenNearExpiry(),
      environment: 'docker'
    };
  }
}

const apiService = new ApiService();

// ✅ ADAPTATION DOCKER : Test de connectivité retardé pour laisser Vite se préparer
setTimeout(() => {
  apiService.testConnection();
  console.log('🔍 API Debug Info:', apiService.getDebugInfo());
}, 3000);

// ✅ ADAPTATION DOCKER : Refresh préventif automatique toutes les 5 minutes
setInterval(() => {
  apiService.refreshTokenIfNeeded();
}, 5 * 60 * 1000);

export default apiService;