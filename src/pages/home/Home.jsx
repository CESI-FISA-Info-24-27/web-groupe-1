import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="landing-page">
      {/* Header de navigation */}
      <header className="landing-header">
        <div className="landing-nav">
          {/* Logo */}
          <div className="landing-logo">
            <div className="logo-circle">
              <div className="logo-dot"></div>
            </div>
            <span className="logo-text">CERCLE</span>
          </div>

          {/* Navigation */}
          <nav className="landing-nav-menu">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/feed" className="nav-link">Feed</Link>
            <Link to="/about" className="nav-link">About Us</Link>
          </nav>

          {/* Boutons d'authentification */}
          <div className="landing-auth-buttons">
            <Link to="/login" className="btn btn-login">Se connecter</Link>
            <Link to="/register" className="btn btn-register">Créer un compte</Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="landing-content">
        <div className="landing-container">
          {/* Section gauche - Texte */}
          <div className="landing-text-section">
            <h1 className="landing-title">Cercle</h1>
            <h2 className="landing-subtitle">
              Le réseau social qui tourne<br />
              autour de vous.
            </h2>
            <p className="landing-description">
              Pas de followers inutiles. Pas de course à la viralité.<br />
              Juste les bonnes personnes. Au bon endroit.
            </p>
            <Link to="/register" className="btn btn-start">Start Now</Link>
          </div>

          {/* Section droite - Images */}
          <div className="landing-images-section">
            <div className="images-grid">
              <div className="image-card image-1">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Person using phone"
                />
              </div>
              <div className="image-card image-2">
                <img 
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Happy couple"
                />
              </div>
              <div className="image-card image-3">
                <img 
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Friends underwater"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home