const Profil = () => {
  // Données utilisateur
  const user = {
    name: "Jean Dupont",
    username: "@jeandupont12",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stats: {
      friends: 150,
      posts: 2,
      likes: 56
    },
    bio: "Entre deux zorolis, tu m'avais dit quelque chose. Les oreilles retroussaient, les oiseaux s'é..."
  }

  // Posts de l'utilisateur
  const userPosts = [
    {
      id: 1,
      author: "Jean Dupont",
      time: "Il y a 2 heures",
      content: "Entre deux zorolis, tu m'avais dit quelque chose. Les oreilles retroussaient, les oiseaux s'é...",
      images: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop"
      ],
      likes: 12,
      comments: 3,
      shares: 1
    },
    {
      id: 2,
      author: "Jean Dupont",
      time: "Il y a 2 heures",
      content: "Nouvelle aventure en montagne ! Les paysages sont à couper le souffle...",
      images: [
        "https://images.unsplash.com/photo-1464822759831-99d3d6d67394?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
      ],
      likes: 8,
      comments: 2,
      shares: 0
    }
  ]

  return (
    <div className="profil-container">
      <h1 className="profil-title">Profil</h1>
      
      {/* En-tête du profil */}
      <div className="profil-header">
        <div className="profil-avatar-large">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="avatar-image-large"
          />
        </div>
        
        <div className="profil-info">
          <h2 className="profil-name">{user.name}</h2>
          <p className="profil-username">{user.username}</p>
          
          {/* Stats */}
          <div className="profil-stats">
            <div className="stat-item">
              <span className="stat-number">{user.stats.friends}</span>
              <span className="stat-label">amis</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.stats.posts}</span>
              <span className="stat-label">posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.stats.likes}</span>
              <span className="stat-label">likes</span>
            </div>
          </div>
          
          {/* Bio */}
          <p className="profil-bio">{user.bio}</p>
        </div>
      </div>

      {/* Section Posts */}
      <div className="profil-posts-section">
        <h3 className="posts-section-title">Vos posts</h3>
        
        <div className="posts-list">
          {userPosts.map((post) => (
            <div key={post.id} className="post-card">
              {/* Header du post */}
              <div className="post-header">
                <div className="post-author-info">
                  <img 
                    src={user.avatar} 
                    alt={post.author}
                    className="post-avatar"
                  />
                  <div>
                    <h4 className="post-author">{post.author}</h4>
                    <span className="post-time">{post.time}</span>
                  </div>
                </div>
              </div>

              {/* Contenu du post */}
              <p className="post-content">{post.content}</p>

              {/* Images du post */}
              {post.images && post.images.length > 0 && (
                <div className={`post-images ${post.images.length === 3 ? 'three-images' : 'two-images'}`}>
                  {post.images.map((image, index) => (
                    <div key={index} className="post-image">
                      <img src={image} alt={`Post image ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {/* Actions du post */}
              <div className="post-actions">
                <button className="action-btn like-btn">
                  <span className="action-icon">❤️</span>
                  <span>Like</span>
                </button>
                <button className="action-btn comment-btn">
                  <span className="action-icon">💬</span>
                  <span>Commenter</span>
                </button>
                <button className="action-btn share-btn">
                  <span className="action-icon">📤</span>
                  <span>Partager</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profil