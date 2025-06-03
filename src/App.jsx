import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PublicSidebar from './components/layout/PublicSidebar'
import RightSidebar from './components/layout/RightSidebar'
import Home from './pages/home/Home'
import Feed from './pages/home/Feed'
import PublicFeed from './pages/home/PublicFeed'
import Messages from './pages/messages/Messages'
import Profil from './pages/profil/profil' // Page Profil
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil (landing) */}
        <Route path="/" element={<Home />} />
        
        {/* Pages d'authentification (sans layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Feed connecté (utilisateurs authentifiés) */}
        <Route path="/feed" element={
          <Layout>
            <Feed />
          </Layout>
        } />
        
        {/* Feed public (utilisateurs non connectés) */}
        <Route path="/publicfeed" element={
          <div className="app-layout">
            <PublicSidebar />
            <main className="main-content">
              <PublicFeed />
            </main>
            <RightSidebar />
          </div>
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