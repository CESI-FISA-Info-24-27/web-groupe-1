// frontend/src/components/PostMediaUpload.jsx
import React, { useState, useRef } from 'react';
import { mediaService, mediaUtils } from '../services/mediaService';

const PostMediaUpload = ({ onMediaUploaded, onMediaRemoved, className = '' }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // Limite à 4 fichiers maximum
    if (uploadedFiles.length + files.length > 4) {
      setError('Maximum 4 fichiers autorisés par post');
      return;
    }

    try {
      setError('');
      setIsUploading(true);
      setUploadProgress(0);

      const uploadPromises = files.map(async (file, index) => {
        // Valider le fichier
        if (file.type.startsWith('image/')) {
          mediaUtils.validateImage(file);
        } else if (file.type.startsWith('video/')) {
          mediaUtils.validateVideo(file);
        } else {
          throw new Error('Type de fichier non supporté');
        }

        // Créer un aperçu local
        const previewUrl = URL.createObjectURL(file);
        const tempFile = {
          id: Date.now() + index,
          file,
          preview: previewUrl,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          uploading: true,
          progress: 0
        };

        setUploadedFiles(prev => [...prev, tempFile]);

        try {
          let result;
          if (file.type.startsWith('image/')) {
            result = await mediaService.uploadPostImage(file, (progress) => {
              setUploadedFiles(prev => prev.map(f => 
                f.id === tempFile.id ? { ...f, progress } : f
              ));
            });
          } else {
            result = await mediaService.uploadPostVideo(file, (progress) => {
              setUploadedFiles(prev => prev.map(f => 
                f.id === tempFile.id ? { ...f, progress } : f
              ));
            });
          }

          // Mettre à jour avec les données du serveur
          const uploadedFile = {
            ...tempFile,
            uploading: false,
            progress: 100,
            url: result.image_url || result.file_name,
            fileName: result.file_name || result.image_url?.split('/').pop(),
            size: file.size
          };

          setUploadedFiles(prev => prev.map(f => 
            f.id === tempFile.id ? uploadedFile : f
          ));

          // Nettoyer l'URL temporaire
          URL.revokeObjectURL(previewUrl);

          // Notifier le parent
          if (onMediaUploaded) {
            onMediaUploaded(uploadedFile);
          }

          return uploadedFile;

        } catch (error) {
          // Supprimer le fichier en cas d'erreur
          setUploadedFiles(prev => prev.filter(f => f.id !== tempFile.id));
          URL.revokeObjectURL(previewUrl);
          throw error;
        }
      });

      await Promise.all(uploadPromises);

      // Réinitialiser l'input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = async (fileId) => {
    const fileToRemove = uploadedFiles.find(f => f.id === fileId);
    if (!fileToRemove) return;

    try {
      // Supprimer du serveur si uploadé
      if (!fileToRemove.uploading && fileToRemove.fileName) {
        const bucket = fileToRemove.type === 'image' ? 'images' : 'videos';
        await mediaService.deleteMedia(bucket, fileToRemove.fileName);
      }

      // Nettoyer l'URL de prévisualisation
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      // Supprimer de la liste
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));

      // Notifier le parent
      if (onMediaRemoved) {
        onMediaRemoved(fileToRemove);
      }

    } catch (error) {
      setError('Erreur lors de la suppression du fichier');
    }
  };

  const handleClick = () => {
    if (!isUploading && uploadedFiles.length < 4) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone d'upload */}
      <div
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          uploadedFiles.length >= 4 
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {uploadedFiles.length >= 4 
              ? 'Maximum de fichiers atteint (4/4)'
              : 'Cliquez pour ajouter des images ou vidéos'
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Images: JPEG, PNG, WebP, GIF (max 5MB) | Vidéos: MP4, WebM, MOV (max 50MB)
          </p>
        </div>
      </div>

      {/* Grille des fichiers uploadés */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {file.type === 'image' ? (
                  <img
                    src={file.preview || file.url}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m2-7V8a2 2 0 00-2-2H9a2 2 0 00-2 2v1m10 0V8a2 2 0 00-2-2H9a2 2 0 00-2 2v1" />
                    </svg>
                  </div>
                )}

                {/* Overlay de progression */}
                {file.uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 relative">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 32 32">
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray-600"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${file.progress * 0.75} 75`}
                            className="text-white"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {file.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bouton de suppression */}
                {!file.uploading && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Indicateur de type */}
                <div className="absolute bottom-2 left-2">
                  <span className={`px-2 py-1 text-xs rounded-full text-white ${
                    file.type === 'image' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {file.type === 'image' ? 'IMG' : 'VID'}
                  </span>
                </div>

                {/* Taille du fichier */}
                {file.size && (
                  <div className="absolute bottom-2 right-2">
                    <span className="px-2 py-1 text-xs bg-black bg-opacity-70 text-white rounded">
                      {mediaUtils.formatFileSize(file.size)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading || uploadedFiles.length >= 4}
      />

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Résumé */}
      {uploadedFiles.length > 0 && (
        <div className="text-sm text-gray-500">
          {uploadedFiles.filter(f => !f.uploading).length} / {uploadedFiles.length} fichiers uploadés
          ({uploadedFiles.length}/4 maximum)
        </div>
      )}
    </div>
  );
};

export default PostMediaUpload;