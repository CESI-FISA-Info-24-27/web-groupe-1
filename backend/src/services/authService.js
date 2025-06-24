// frontend/src/services/authService.js
import ApiService from './api';

class AuthService {
  /**
   * Inscription d'un nouvel utilisateur (modifiée pour la vérification)
   */
  async register(userData) {
    try {
      const response = await ApiService.post('/api/v1/auth/register', userData);
      
      // ⚠️ NE PAS stocker les tokens ici car l'email n'est pas encore vérifié
      // Les tokens seront stockés après la vérification email
      
      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * 🔥 NOUVEAU : Vérification de l'email avec le code reçu
   */
  async verifyEmail(email, code) {
    try {
      const response = await ApiService.post('/api/v1/auth/verify-email', {
        mail: email,
        code: code
      });

      // Stocker les tokens après vérification réussie
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * 🔥 NOUVEAU : Renvoyer un code de vérification
   */
  async resendVerificationCode(email) {
    try {
      const response = await ApiService.post('/api/v1/auth/resend-verification', {
        mail: email
      });

      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Connexion d'un utilisateur (modifiée pour gérer la vérification)
   */
  async login(credentials) {
    try {
      const response = await ApiService.post('/api/v1/auth/login', credentials);
      
      // Stocker les tokens seulement si login réussi
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      // Si l'email n'est pas vérifié, l'erreur contiendra requiresVerification
      if (error.message.includes('Email not verified') || 
          (error.requiresVerification !== undefined)) {
        const verificationError = new Error(error.message || 'Please verify your email before logging in');
        verificationError.requiresVerification = true;
        verificationError.email = error.email || credentials.mail;
        throw verificationError;
      }
      throw this.handleAuthError(error);
    }
  }

  /**
   * Déconnexion
   */
  async logout() {
    try {
      await ApiService.post('/api/v1/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Nettoyer le localStorage même en cas d'erreur
      this.clearStorage();
    }
  }

  /**
   * Rafraîchir le token d'accès
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await ApiService.post('/api/v1/auth/refresh', {
        refreshToken
      });

      localStorage.setItem('accessToken', response.accessToken);
      return response.accessToken;
    } catch (error) {
      this.clearStorage();
      throw error;
    }
  }

  /**
   * Obtenir les informations de l'utilisateur connecté
   */
  async getCurrentUser() {
    try {
      const response = await ApiService.get('/api/v1/auth/me');
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  /**
   * Obtenir l'utilisateur depuis le localStorage
   */
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Nettoyer le localStorage
   */
  clearStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  /**
   * Gérer les erreurs d'authentification
   */
  handleAuthError(error) {
    const message = error.message || 'Une erreur est survenue';
    
    // Erreurs spécifiques côté serveur
    if (message.includes('already exists')) {
      return new Error('Cette adresse email ou ce nom d\'utilisateur est déjà utilisé');
    }
    
    if (message.includes('Invalid credentials')) {
      return new Error('Email ou mot de passe incorrect');
    }
    
    if (message.includes('validation')) {
      return new Error('Veuillez vérifier les informations saisies');
    }

    if (message.includes('Email not verified')) {
      return new Error('Veuillez vérifier votre email avant de vous connecter');
    }

    if (message.includes('Code expired')) {
      return new Error('Le code de vérification a expiré. Demandez un nouveau code.');
    }

    if (message.includes('Invalid code')) {
      const attemptsError = new Error('Code de vérification incorrect');
      attemptsError.attemptsRemaining = error.attemptsRemaining;
      return attemptsError;
    }

    if (message.includes('Too many attempts')) {
      return new Error('Trop de tentatives. Demandez un nouveau code.');
    }
    
    return new Error(message);
  }
}

export default new AuthService();