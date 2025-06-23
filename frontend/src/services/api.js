// frontend/src/services/api.js - Version Docker
// Utilise le proxy Vite, donc pas besoin de spécifier l'URL complète
class ApiService {
  constructor() {
    // En Docker, on utilise le proxy Vite qui redirige vers backend:3000
    this.baseURL = ''; // Utilise le proxy Vite
    console.log('🔗 API Service initialized for Docker (using Vite proxy)');
  }

  async request(endpoint, options = {}) {
    // Le proxy Vite redirigera /api/* vers backend:3000/api/*
    const url = `${this.baseURL}${endpoint}`;
    
    console.log('🚀 Making request to:', url);
    
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
      
      const response = await fetch(url, config);
      
      console.log('📥 Response:', response.status, response.statusText);
      
      // Gérer les erreurs HTTP
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
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('🌐 Network error - backend service may be unavailable');
      }
      
      throw error;
    }
  }

  // Test de connectivité via proxy
  async testConnection() {
    try {
      console.log('🧪 Testing API connection via proxy...');
      const response = await this.get('/health');
      console.log('✅ API connection test successful:', response);
      return true;
    } catch (error) {
      console.error('❌ API connection test failed:', error);
      return false;
    }
  }

  // Méthodes HTTP
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
}

const apiService = new ApiService();

// Test automatique au démarrage
setTimeout(() => {
  apiService.testConnection();
}, 2000); // Attendre 2s que Vite soit prêt

export default apiService;
