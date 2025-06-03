import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const Home = () => {
  const animationContainer = useRef(null)

  useEffect(() => {
    let animationInstance = null
    
    // Chargement de l'animation Lottie
    const loadLottie = async () => {
      try {
        const lottie = await import('lottie-web')
        
        if (animationContainer.current) {
          // Nettoyer toute animation existante
          lottie.default.destroy()
          
          animationInstance = lottie.default.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'src/assets/Animation - 1748958800647.json' // Remplacez par le chemin de votre fichier JSON
          })
        }
      } catch (error) {
        console.error('Erreur lors du chargement de Lottie:', error)
      }
    }

    loadLottie()

    // Cleanup à la destruction du composant
    return () => {
      if (animationInstance) {
        animationInstance.destroy()
      }
    }
  }, [])

  return (
    <div className="modern-landing-page">
      {/* Header de navigation moderne */}
      <header className="modern-header">
        <div className="modern-nav">
          {/* Logo */}
          <div className="modern-logo">
            <div className="logo-circle">
              <div className="logo-dot"></div>
            </div>
            <span className="logo-text">Cercle</span>
          </div>

          {/* Navigation centrale */}
          <nav className="modern-nav-menu">
            <Link to="/" className="modern-nav-link">Home</Link>
            <Link to="/feed" className="modern-nav-link">Feed</Link>
            <Link to="/about" className="modern-nav-link">About Us</Link>
          </nav>

          {/* Boutons d'authentification */}
          <div className="modern-auth-buttons">
            <Link to="/login" className="modern-btn-login">Login</Link>
            <Link to="/register" className="modern-btn-signup">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="modern-main-content">
        <div className="modern-hero-section">
          {/* Titre principal */}
          <div className="modern-hero-text">
            <h1 className="modern-hero-title">
              Cercle
            </h1>
            <h2 className="modern-hero-subtitle">
              Le réseau social qui tourne<br />
              autour de vous.
            </h2>
            
            <p className="modern-hero-description">
              Pas de followers inutiles. Pas de course à la viralité.<br />
              Juste les bonnes personnes. Au bon endroit.
            </p>
            
            <button className="modern-cta-button">
              Commencer maintenant
            </button>
          </div>

          {/* Élément visuel central avec animation Lottie */}
          <div className="modern-visual-container">
            <div className="lottie-animation-container">
              <div ref={animationContainer} className="lottie-animation"></div>
            </div>
            
            {/* Statistiques flottantes */}
            <div className="floating-stat stat-left">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-label">Active Users</span>
                <span className="stat-value">45%</span>
              </div>
            </div>
            
            <div className="floating-stat stat-right">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <span className="stat-label">User Engagement</span>
                <span className="stat-value">96%</span>
                <div className="stat-bar">
                  <div className="stat-progress"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Particules d'arrière-plan */}
        <div className="background-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
      </main>
    </div>
  )
}

export default Home