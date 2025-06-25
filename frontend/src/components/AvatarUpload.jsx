// frontend/src/components/AvatarUpload.jsx
import React, { useState, useRef } from 'react';
import { mediaService, mediaUtils } from '../services/mediaService';

const AvatarUpload = ({ currentAvatar, onAvatarChange, className = '' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState(currentAvatar);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  
  const isDefaultAvatar = (avatarUrl) => {
    if (!avatarUrl || avatarUrl.trim() === '') {
      return true;
    }
    
    // Vérifier si c'est l'URL de l'avatar par défaut
    return avatarUrl.includes('/avatars/default/default_avatar.jpg');
  };

  const showDeleteButton = !isDefaultAvatar(currentAvatar) && !isUploading;

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Valider le fichier
      mediaUtils.validateImage(file);
      setError('');

      // Créer un aperçu
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload du fichier
      setIsUploading(true);
      setUploadProgress(0);

      const result = await mediaService.uploadAvatar(file, (progress) => {
        setUploadProgress(progress);
      });

      // Nettoyer l'aperçu temporaire
      URL.revokeObjectURL(previewUrl);
      
      // Mettre à jour avec l'URL finale
      setPreview(result.avatar_url);
      
      // Notifier le parent
      if (onAvatarChange) {
        onAvatarChange(result.avatar_url);
      }

      // Réinitialiser l'input file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      setError(error.message);
      // Revenir à l'avatar précédent en cas d'erreur
      setPreview(currentAvatar);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleDeleteAvatar = async () => {
    if (!currentAvatar || isUploading) return;

    try {
      setIsUploading(true);
      
      // Appeler l'API pour supprimer l'avatar
      await mediaService.deleteAvatar();
      
      setPreview(null);
      
      if (onAvatarChange) {
        onAvatarChange(null);
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const getInitials = () => {
    // Fonction simple pour obtenir les initiales par défaut
    return 'U';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Avatar principal */}
      <div 
        className={`relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 cursor-pointer group ${
          isUploading ? 'opacity-50' : 'hover:opacity-80'
        }`}
        onClick={handleClick}
      >
        {preview ? (
          <img 
            src={preview} 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">{getInitials()}</span>
          </div>
        )}

        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Indicateur de progression */}
        {isUploading && uploadProgress > 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${uploadProgress * 0.88} 88`}
                    className="text-white"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {uploadProgress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bouton de suppression - seulement si ce n'est PAS l'avatar par défaut */}
      {showDeleteButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAvatar();
          }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="Supprimer l'avatar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Message d'erreur */}
      {error && (
        <div className="absolute top-full mt-2 left-0 right-0">
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AvatarUpload;