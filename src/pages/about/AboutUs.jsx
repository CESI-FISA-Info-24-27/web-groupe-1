import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Header de navigation étendu */}
      <header className="landing-header-extended">
        <div className="landing-nav-extended">
          {/* Logo */}
          <div className="landing-logo">
            <div className="logo-circle">
              <div className="logo-dot"></div>
            </div>
            <span className="logo-text">CERCLE</span>
          </div>

          {/* Navigation centrale étendue */}
          <nav className="landing-nav-menu-extended">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/feed" className="nav-link">Feed</Link>
            <Link to="/about" className="nav-link active">About Us</Link>
          </nav>

          {/* Boutons d'authentification */}
          <div className="landing-auth-buttons">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-register">Register</Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="about-content">
        {/* Section À propos de Cercle */}
        <section className="about-section">
          <div className="about-container">
            <div className="about-text">
              <h1 className="about-main-title">À propos de Cercle</h1>
              <h2 className="about-subtitle">Un réseau social pensé autrement.</h2>
              <div className="about-description">
                <p>Nous avons créé Cercle parce qu'on ne se reconnaissait plus dans les réseaux d'aujourd'hui.</p>
                <p>Trop de bruit, trop de faux, trop d'algorithmes. Et trop peu de place pour ce qui compte vraiment : les idées, les échanges sincères, les liens humains.</p>
                <p>Cercle, c'est notre réponse.</p>
                <p>Un réseau social plus intime, plus respectueux, plus juste.</p>
              </div>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Friends underwater"
              />
            </div>
          </div>
        </section>

        {/* Section Notre vision */}
        <section className="vision-section">
          <div className="vision-container">
            <h2 className="vision-title">Notre vision</h2>
            <p className="vision-text">
              Revenir à l'essentiel ! Un cercle, c'est un espace de confiance. Une boucle où chacun peut s'exprimer, sans chercher à plaire à des foules invisibles. C'est ce que nous voulons bâtir : une plateforme plus humaine, plus calme, plus saine.
            </p>
          </div>
        </section>

        {/* Section Qui sommes-nous */}
        <section className="team-section">
          <div className="team-container">
            <div className="team-text">
              <h2 className="team-title">Qui sommes-nous ?</h2>
              <div className="team-description">
                <p>Nous sommes une petite équipe de passionnés de tech, de design et de liberté numérique.</p>
                <p>Nous construisons Cercle avec conviction, transparence et soin, en lien direct avec notre communauté.</p>
                <p>Pas de levées de fonds spectaculaires. Pas de croissance toxique. Juste une ambition claire :</p>
                <ul>
                  <li>Créer un endroit où l'on se sent bien.</li>
                </ul>
              </div>
            </div>
            <div className="team-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Team photo"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="about-footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h3>LOGO</h3>
          </div>
          
          <div className="footer-content">
            <div className="footer-column">
              <h4>Site map</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/feed">Feed</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/cgu">Cgu</Link></li>
                <li><Link to="/privacy">Blabla</Link></li>
                <li><Link to="/terms">blala</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutUs