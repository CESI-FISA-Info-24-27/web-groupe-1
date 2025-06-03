import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home' // Landing page
import Feed from './pages/home/Feed' // Page Feed
import Messages from './pages/messages/Messages' // Page Messages
import Profil from './pages/profil/Profil' // Page Profil
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AboutUs from './pages/about/AboutUs' // Nouvelle page About Us

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil (landing) */}
        <Route path="/" element={<Home />} />
        
        {/* Page About Us (sans layout) */}
        <Route path="/about" element={<AboutUs />} />
        
        {/* Pages d'authentification (sans layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Pages avec layout */}
        <Route path="/feed" element={
          <Layout>
            <Feed />
          </Layout>
        } />
        
        <Route path="/messages" element={
          <Layout>
            <Messages />
          </Layout>
        } />
        
        <Route path="/profil" element={
          <Layout>
            <Profil />
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App