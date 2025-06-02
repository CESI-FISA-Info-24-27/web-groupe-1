import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-md border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          SocialApp
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                🏠 Accueil
              </Link>
              
              <Link to={`/profile/${user?.id}`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                👤 Profil
              </Link>
              
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 text-sm">
                  Bonjour, <strong>{user?.username || user?.email}</strong>
                </span>
                
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Connexion
              </Link>
              
              <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header