import { Link } from 'react-router-dom'

const Register = () => {
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
        <h1 className="auth-title">Créer un compte</h1>

        {/* Formulaire */}
        <form className="auth-form">
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Votre nom d'utilisateur"
            />
          </div>

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
            <label>Confirmer le mot de passe</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="Confirmez votre mot de passe"
            />
          </div>

          <button type="submit" className="auth-button">
            Soumettre
          </button>
        </form>

        {/* Lien vers connexion */}
        <div className="auth-switch">
          J'ai déjà un compte | <Link to="/login">Me connecter</Link>
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

export default Register