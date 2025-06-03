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
          <div className="form-row">
            <div className="form-group">
              <label>Prénom</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Votre prénom"
              />
            </div>

            <div className="form-group">
              <label>Nom</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Votre nom"
              />
            </div>
          </div>

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
          src="https://images.unsplash.com/photo-1737845079400-1d04c3f2ab5d?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Portrait femme"
          className="auth-image"
        />
      </div>
    </div>
  )
}

export default Register