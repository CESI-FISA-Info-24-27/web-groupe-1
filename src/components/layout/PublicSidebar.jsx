import { Link } from 'react-router-dom'

const PublicSidebar = () => {
  return (
    <div className="sidebar-left">
      {/* Logo CERCLE en haut */}
      <div className="logo-container">
        <div className="logo-circle">
          <div className="logo-dot"></div>
        </div>
        <div className="logo-text">CERCLE</div>
      </div>

      {/* Boutons de connexion au lieu du profil utilisateur */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Link 
          to="/login" 
          className="auth-btn-main primary"
        >
          Se connecter
        </Link>
        <Link 
          to="/register" 
          className="auth-btn-main secondary"
        >
          S'inscrire
        </Link>
      </div>

      {/* Navigation - seulement Feed disponible */}
      <nav>
        <Link 
          to="/publicfeed" 
          className="nav-item active"
        >
          <span className="nav-item-icon">📰</span>
          Feed
        </Link>
      </nav>
    </div>
  )
}

export default PublicSidebar