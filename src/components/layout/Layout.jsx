import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* Sidebar gauche */}
      <Sidebar />
      
      {/* Contenu principal */}
      <main className="main-content">
        {children}
      </main>
      
      {/* Sidebar droite */}
      <RightSidebar />
    </div>
  )
}

export default Layout