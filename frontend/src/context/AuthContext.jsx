// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Vérifier si le token est valide en récupérant les infos utilisateur
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
        console.log('✅ User authenticated:', userData.username);
      } else {
        console.log('🔑 No token found');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      AuthService.clearStorage();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inscription (maintenant retourne les infos pour vérification)
   */
  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      
      // ⚠️ Ne pas connecter l'utilisateur ici, il doit d'abord vérifier son email
      console.log('📧 Registration successful, verification required');
      return response;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      throw error;
    }
  };

  /**
   * 🔥 NOUVEAU : Vérification d'email (connecte l'utilisateur après vérification)
   */
  const verifyEmail = async (email, code) => {
    try {
      const response = await AuthService.verifyEmail(email, code);
      
      // Maintenant l'utilisateur est connecté
      setUser(response.user);
      setIsAuthenticated(true);
      console.log('✅ Email verified, user logged in:', response.user.username);
      
      return response;
    } catch (error) {
      console.error('❌ Email verification failed:', error);
      throw error;
    }
  };

  /**
   * 🔥 NOUVEAU : Renvoyer le code de vérification
   */
  const resendVerificationCode = async (email) => {
    try {
      const response = await AuthService.resendVerificationCode(email);
      console.log('📧 Verification code resent to:', email);
      return response;
    } catch (error) {
      console.error('❌ Failed to resend verification code:', error);
      throw error;
    }
  };

  /**
   * Connexion (gère la redirection vers vérification si nécessaire)
   */
  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      
      setUser(response.user);
      setIsAuthenticated(true);
      console.log('✅ User logged in:', response.user.username);
      
      return response;
    } catch (error) {
      console.error('❌ Login failed:', error);
      
      // Si l'email n'est pas vérifié, l'erreur contiendra les infos de redirection
      if (error.requiresVerification) {
        console.log('📧 Email verification required for:', error.email);
        throw {
          ...error,
          requiresVerification: true,
          email: error.email
        };
      }
      
      // Si l'erreur est liée aux tokens, nettoyer le storage
      if (error.message.includes('token') || error.message.includes('authentication')) {
        AuthService.clearStorage();
      }
      throw error;
    }
  };

  /**
   * Déconnexion
   */
  const logout = async () => {
    try {
      await AuthService.logout();
      console.log('👋 User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // Redirection sera gérée par le composant
    }
  };

  /**
   * Rafraîchir le token
   */
  const refreshToken = async () => {
    try {
      const response = await AuthService.refreshToken();
      console.log('🔄 Token refreshed successfully');
      return response;
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      logout(); // Si refresh échoue, déconnecter
      throw error;
    }
  };

  /**
   * 🔥 NOUVEAU : Fonction pour rafraîchir les données utilisateur
   */
  const refreshUser = async () => {
    if (!isAuthenticated) return;

    try {
      const updatedUser = await AuthService.getCurrentUser();
      setUser(updatedUser);
      console.log('🔄 User data refreshed');
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Si l'erreur est d'authentification, déconnecter
      if (error.message.includes('401') || error.message.includes('authentication')) {
        await logout();
      }
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log('👤 User data updated locally');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    register,
    verifyEmail,           // 🔥 NOUVEAU
    resendVerificationCode, // 🔥 NOUVEAU
    login,
    logout,
    refreshToken,
    refreshUser,           // 🔥 NOUVEAU
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};