// src/components/Friends.jsx - Version corrigée avec routes API correctes
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

const Friends = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // États principaux
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // États de l'interface
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(new Set());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuAnimating, setMobileMenuAnimating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Configuration de l'API
  const API_BASE = 'http://localhost:3000/api/v1';
  
  // Auto-clear des messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Gestion centralisée des requêtes API
  const makeAuthenticatedRequest = useCallback(async (url, options = {}) => {
    const validToken = await checkAndRefreshToken();
    if (!validToken) throw new Error('Authentication failed');

    return fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${validToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
  }, []);

  // Vérification et refresh du token
  const checkAndRefreshToken = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!token || !refreshToken) {
      navigate('/login');
      return null;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 403 || response.status === 401) {
        const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem('accessToken', data.accessToken);
          return data.accessToken;
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
          return null;
        }
      }

      return response.ok ? token : null;
    } catch (error) {
      console.error('Token check failed:', error);
      return token;
    }
  }, [navigate, API_BASE]);

  // ✅ CORRECTION : Chargement des amis avec la vraie route
  const fetchFriends = useCallback(async () => {
    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE}/follow/${user.id_user}/following?limit=100`
      );
      
      if (response.ok) {
        const data = await response.json();
        setFriends(data.following || []);
      } else {
        throw new Error(`Erreur ${response.status}`);
      }
    } catch (error) {
      setFriends([]);
      throw error;
    }
  }, [user?.id_user, makeAuthenticatedRequest, API_BASE]);

  // ✅ CORRECTION : Chargement des demandes en attente avec la vraie route
  const fetchPendingRequests = useCallback(async () => {
    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE}/follow/requests/pending?limit=100`
      );
      
      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data.requests || []);
      } else {
        throw new Error(`Erreur ${response.status}`);
      }
    } catch (error) {
      setPendingRequests([]);
      throw error;
    }
  }, [makeAuthenticatedRequest, API_BASE]);

  // ✅ CORRECTION : Chargement des suggestions avec la vraie route
  const fetchSuggestions = useCallback(async () => {
    try {
      // Essaie d'abord les suggestions d'utilisateurs
      let response = await makeAuthenticatedRequest(
        `${API_BASE}/users/suggested?limit=50`
      );

      // Si pas de suggestions, utilise la recherche générale
      if (!response.ok && response.status === 404) {
        response = await makeAuthenticatedRequest(
          `${API_BASE}/users/search?limit=50`
        );
      }

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.users || data || []);
      } else {
        throw new Error(`Erreur ${response.status}`);
      }
    } catch (error) {
      setSuggestions([]);
      throw error;
    }
  }, [makeAuthenticatedRequest, API_BASE]);

  // Chargement des données selon l'onglet actif
  const fetchData = useCallback(async () => {
    if (!user?.id_user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const fetchMap = {
        friends: fetchFriends,
        requests: fetchPendingRequests,
        suggestions: fetchSuggestions
      };
      
      await fetchMap[activeTab]?.();
    } catch (error) {
      setError('Erreur lors du chargement des données');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, fetchFriends, fetchPendingRequests, fetchSuggestions, user?.id_user]);

  // Chargement initial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ CORRECTION : Action de suivre avec la vraie route backend
  const handleFollow = useCallback(async (userId, displayName) => {
    setActionLoading(prev => new Set(prev).add(userId));
    setError(null);
    
    try {
      // ✅ CORRIGÉ: Utilise la route /follow/:id du backend
      const response = await makeAuthenticatedRequest(`${API_BASE}/follow/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ followed_id: userId })
      });

      if (response.ok) {
        const data = await response.json();
        const message = data.isPending 
          ? `Demande envoyée à ${displayName}` 
          : `Vous suivez maintenant ${displayName}`;
        setSuccessMessage(message);
        fetchSuggestions();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }
    } catch (error) {
      setError(`Erreur: ${error.message}`);
    } finally {
      setActionLoading(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  }, [makeAuthenticatedRequest, fetchSuggestions, API_BASE]);

  // ✅ NOUVEAU : Fonctions d'animation pour le menu mobile
  const openMobileMenu = () => {
    setShowMobileMenu(true);
    setMobileMenuAnimating(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuAnimating(true);
    // Attendre la fin de l'animation avant de fermer
    setTimeout(() => {
      setShowMobileMenu(false);
      setMobileMenuAnimating(false);
    }, 300);
  };

  // ✅ CORRECTION : Accepter une demande avec la vraie route
  const handleAcceptRequest = useCallback(async (userId, username) => {
    setActionLoading(prev => new Set(prev).add(userId));
    setError(null);
    
    try {
      // ✅ CORRIGÉ: Route d'acceptation avec le bon endpoint
      const response = await makeAuthenticatedRequest(`${API_BASE}/follow/requests/${userId}/accept`, {
        method: 'POST'
      });

      if (response.ok) {
        setSuccessMessage(`Demande de ${username} acceptée`);
        fetchPendingRequests();
        fetchFriends();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }
    } catch (error) {
      setError(`Erreur: ${error.message}`);
    } finally {
      setActionLoading(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  }, [makeAuthenticatedRequest, fetchPendingRequests, fetchFriends, API_BASE]);

  // ✅ CORRECTION : Rejeter une demande avec la vraie route
  const handleRejectRequest = useCallback(async (userId, username) => {
    setActionLoading(prev => new Set(prev).add(userId));
    setError(null);
    
    try {
      // ✅ CORRIGÉ: Route de rejet avec le bon endpoint
      const response = await makeAuthenticatedRequest(`${API_BASE}/follow/requests/${userId}/reject`, {
        method: 'POST'
      });

      if (response.ok) {
        setSuccessMessage(`Demande de ${username} rejetée`);
        fetchPendingRequests();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }
    } catch (error) {
      setError(`Erreur: ${error.message}`);
    } finally {
      setActionLoading(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  }, [makeAuthenticatedRequest, fetchPendingRequests, API_BASE]);

  // Navigation vers le profil utilisateur
  const handleViewProfile = useCallback((userId) => {
    if (!userId) {
      console.error('ID utilisateur manquant pour la navigation');
      return;
    }
    
    if (parseInt(userId) === parseInt(user?.id_user)) {
      navigate('/profile');
    } else {
      navigate(`/profile/${userId}`);
    }
  }, [navigate, user?.id_user]);

  const handleSendMessage = useCallback((userId) => {
    navigate('/messages', { state: { selectedUserId: userId } });
  }, [navigate]);

  // ✅ CORRECTION : Recherche avec la vraie route
  const handleSearchUsers = useCallback(async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = new URLSearchParams({
        search: searchTerm.trim(),
        limit: 50
      });
      
      const response = await makeAuthenticatedRequest(
        `${API_BASE}/users/search?${searchParams}`
      );

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Réponse serveur invalide');
      }

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.users || []);
        setActiveTab('suggestions');
        
        const count = (data.users || []).length;
        if (count === 0) {
          setError(`Aucun utilisateur trouvé pour "${searchTerm}"`);
        } else {
          setSuccessMessage(`${count} utilisateur(s) trouvé(s)`);
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }
    } catch (error) {
      setError(error.message.includes('<!doctype') 
        ? 'Erreur de connexion au serveur' 
        : error.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, makeAuthenticatedRequest, API_BASE]);

  // Fonctions utilitaires
  const getInitials = useCallback((user) => {
    if (user?.prenom && user?.nom) {
      return `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || 'U';
  }, []);

  const getDisplayName = useCallback((user) => {
    if (user?.prenom && user?.nom) {
      return `${user.prenom} ${user.nom}`;
    }
    return user?.username || 'Utilisateur';
  }, []);

  const getRandomGradient = useCallback((index) => {
    const gradients = [
      'from-blue-400 to-purple-500',
      'from-pink-400 to-red-500',
      'from-green-400 to-blue-500',
      'from-yellow-400 to-pink-500',
      'from-purple-400 to-pink-500',
      'from-indigo-400 to-purple-500'
    ];
    return gradients[index % gradients.length];
  }, []);

  // Données et configuration
  const getCurrentData = () => {
    switch (activeTab) {
      case 'friends':
        return friends;
      case 'requests':
        return pendingRequests;
      case 'suggestions':
        return suggestions;
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter(user => {
    const name = getDisplayName(user).toLowerCase();
    const username = user.username?.toLowerCase() || '';
    return name.includes(searchTerm.toLowerCase()) || username.includes(searchTerm.toLowerCase());
  });

  const tabConfig = [
    { 
      id: 'friends', 
      label: 'Mes Amis', 
      count: friends.length,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    { 
      id: 'requests', 
      label: 'Demandes', 
      count: pendingRequests.length,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    { 
      id: 'suggestions', 
      label: 'Découvrir', 
      count: suggestions.length,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={openMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Amis</h1>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
            {user?.photo_profil ? (
              <img src={user.photo_profil} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold text-sm">
                {user?.prenom?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar gauche */}
        <div className="hidden lg:block lg:w-64 lg:fixed lg:h-full">
          <LeftSidebar />
        </div>

        {/* Menu mobile avec animations */}
        {showMobileMenu && (
          <div 
            className="lg:hidden fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={closeMobileMenu}
          >
            <div 
              className={`w-64 h-full bg-white transform transition-all duration-300 ease-out ${
                mobileMenuAnimating ? 'animate-slide-out-left' : 'animate-slide-in-left'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <LeftSidebar onClose={closeMobileMenu} />
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <main className="flex-1 lg:ml-64 xl:mr-80 pt-16 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Amis</h1>
              <p className="text-gray-600">Gérez vos connexions et découvrez de nouveaux amis</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Rechercher des utilisateurs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchUsers()}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={handleSearchUsers}
                  disabled={!searchTerm.trim() || loading}
                  className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Rechercher
                </button>
              </div>
            </div>

            {/* Messages d'état */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-800">{error}</span>
                  </div>
                  <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-4 bg-green-100 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-800">{successMessage}</span>
                  </div>
                  <button onClick={() => setSuccessMessage('')} className="text-green-600 hover:text-green-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                <div className="flex space-x-1">
                  {tabConfig.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.count > 0 && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Chargement...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-12 lg:py-16">
                  <div className="text-gray-300 text-5xl lg:text-6xl mb-4">
                    {activeTab === 'friends' ? '👥' : activeTab === 'requests' ? '📬' : '🔍'}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    {activeTab === 'friends' ? 'Aucun ami pour le moment' : 
                     activeTab === 'requests' ? 'Aucune demande en attente' : 
                     'Aucun résultat'}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto text-sm lg:text-base px-4">
                    {activeTab === 'friends' ? 'Commencez à suivre des personnes pour voir vos amis ici' : 
                     activeTab === 'requests' ? 'Les demandes d\'amitié apparaîtront ici' : 
                     searchTerm ? `Aucun utilisateur trouvé pour "${searchTerm}"` : 'Utilisez la recherche pour découvrir de nouveaux amis'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredData.map((person, index) => (
                    <div key={person.id_user} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {/* Avatar cliquable */}
                        <div 
                          className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden bg-gradient-to-br ${getRandomGradient(index)} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                          onClick={() => handleViewProfile(person.id_user)}
                        >
                          {person.photo_profil ? (
                            <img 
                              src={person.photo_profil} 
                              alt={getDisplayName(person)} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-lg lg:text-xl">
                              {getInitials(person)}
                            </span>
                          )}
                        </div>

                        {/* Informations utilisateur */}
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="font-semibold text-gray-900 text-sm lg:text-base truncate cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => handleViewProfile(person.id_user)}
                          >
                            {getDisplayName(person)}
                          </h3>
                          <p className="text-gray-600 text-xs lg:text-sm truncate">@{person.username}</p>
                          {person.bio && (
                            <p className="text-gray-500 text-xs lg:text-sm mt-1 line-clamp-2">{person.bio}</p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {activeTab === 'friends' && (
                            <>
                              <button
                                onClick={() => handleViewProfile(person.id_user)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                                title="Voir le profil"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleSendMessage(person.id_user)}
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
                                title="Envoyer un message"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </button>
                            </>
                          )}

                          {activeTab === 'requests' && (
                            <>
                              <button
                                onClick={() => handleAcceptRequest(person.id_user, getDisplayName(person))}
                                disabled={actionLoading.has(person.id_user)}
                                className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
                              >
                                {actionLoading.has(person.id_user) ? '...' : 'Accepter'}
                              </button>
                              <button
                                onClick={() => handleRejectRequest(person.id_user, getDisplayName(person))}
                                disabled={actionLoading.has(person.id_user)}
                                className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50"
                              >
                                {actionLoading.has(person.id_user) ? '...' : 'Refuser'}
                              </button>
                            </>
                          )}

                          {activeTab === 'suggestions' && (
                            <>
                              <button
                                onClick={() => handleViewProfile(person.id_user)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                                title="Voir le profil"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleFollow(person.id_user, getDisplayName(person))}
                                disabled={actionLoading.has(person.id_user)}
                                className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
                              >
                                {actionLoading.has(person.id_user) ? '...' : 'Suivre'}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions rapides en bas */}
            <div className="mt-6 lg:mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
                
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTab('suggestions');
                    fetchData();
                  }}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left w-full mb-3"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Découvrir des amis</p>
                    <p className="text-sm text-gray-600">Trouvez de nouvelles personnes</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTab('suggestions');
                    fetchData();
                  }}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left w-full"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Actualiser</p>
                    <p className="text-sm text-gray-600">Recharger les suggestions</p>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </main>

        {/* Right Sidebar - Hidden on mobile */}
        <aside className="hidden xl:block xl:fixed xl:right-0 xl:w-80 xl:h-screen xl:overflow-y-auto">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
};

export default Friends;
