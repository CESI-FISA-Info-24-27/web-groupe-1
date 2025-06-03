import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="auth-container">
      {/* Partie gauche - Formulaire */}
      <div className="auth-form-section">
        {/* Logo */}
        <div className="auth-logo">
          <div className="logo-circle">
            <div className="logo-dot"></div>
          </div>
          <div className="logo-text">CERCLE</div>
        </div>

        {/* Titre */}
        <h1 className="auth-title">Se connecter</h1>

        {/* Formulaire */}
        <form className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-input"
              placeholder="Votre email"
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="Votre mot de passe"
            />
          </div>

          <div className="form-group">
            <Link to="#" className="forgot-password">
              Mot de passe oublié
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Se connecter
          </button>
        </form>

        {/* Lien vers inscription */}
        <div className="auth-switch">
          Je n'ai pas de compte | <Link to="/register">Créer un compte</Link>
        </div>
      </div>

      {/* Partie droite - Image */}
      <div className="auth-image-section">
        <img 
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
          alt="Couple heureux"
          className="auth-image"
        />
      </div>
    </div>
  )
}

export default Login