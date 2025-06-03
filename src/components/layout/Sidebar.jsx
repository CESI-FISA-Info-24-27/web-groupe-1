import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="sidebar-left">
      {/* Logo CERCLE */}
      <div className="logo-container">
        <div className="logo-circle">
          <div className="logo-dot"></div>
        </div>
        <div className="logo-text">CERCLE</div>
      </div>

      {/* Profil utilisateur */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          backgroundColor: '#e5e7eb',
          margin: '0 auto 10px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face)',
          backgroundSize: 'cover'
        }}></div>
        <div style={{ fontWeight: 'bold' }}>Jean Dupont</div>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>@jeandupont5</div>
      </div>

      {/* Navigation */}
      <nav>
        <Link 
          to="/feed" 
          className={`nav-item ${location.pathname === '/feed' ? 'active' : ''}`}
        >
          <span className="nav-item-icon">📰</span>
          Feed
        </Link>
        <Link 
          to="/messages" 
          className={`nav-item ${location.pathname === '/messages' ? 'active' : ''}`}
        >
          <span className="nav-item-icon">💬</span>
          Messages
        </Link>
        <Link 
          to="/profil" 
          className={`nav-item ${location.pathname === '/profil' ? 'active' : ''}`}
        >
          <span className="nav-item-icon">👤</span>
          Profil
        </Link>
        <Link 
          to="/amis" 
          className={`nav-item ${location.pathname === '/amis' ? 'active' : ''}`}
        >
          <span className="nav-item-icon">👥</span>
          Amis
        </Link>
        <Link 
          to="/parametres" 
          className={`nav-item ${location.pathname === '/parametres' ? 'active' : ''}`}
        >
          <span className="nav-item-icon">⚙️</span>
          Paramètres
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar