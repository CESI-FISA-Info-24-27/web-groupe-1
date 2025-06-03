const RightSidebar = () => {
  return (
    <div className="sidebar-right">
      {/* Suggestions d'amis - directement sur fond blanc */}
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>Suggestions</h3>
      
      <div className="suggestion-item">
        <div className="suggestion-info">
          <div 
            className="avatar"
            style={{ 
              backgroundImage: 'url(https://via.placeholder.com/40x40/ff69b4/fff?text=LL)',
            }}
          ></div>
          <div>
            <div style={{ fontWeight: '500' }}>Lola lui</div>
          </div>
        </div>
        <button className="btn btn-primary">Follow</button>
      </div>

      <div className="suggestion-item">
        <div className="suggestion-info">
          <div 
            className="avatar"
            style={{ 
              backgroundImage: 'url(https://via.placeholder.com/40x40/4169e1/fff?text=TG)',
            }}
          ></div>
          <div>
            <div style={{ fontWeight: '500' }}>Thomas Grall</div>
          </div>
        </div>
        <button className="btn btn-primary">Follow</button>
      </div>

      <div className="suggestion-item">
        <div className="suggestion-info">
          <div 
            className="avatar"
            style={{ 
              backgroundImage: 'url(https://via.placeholder.com/40x40/32cd32/fff?text=LD)',
            }}
          ></div>
          <div>
            <div style={{ fontWeight: '500' }}>Lea Dumail</div>
          </div>
        </div>
        <button className="btn btn-primary">Follow</button>
      </div>

      {/* Recommandations - directement sur fond blanc */}
      <h3 style={{ marginBottom: '20px', marginTop: '40px', fontSize: '18px', fontWeight: 'bold' }}>Recommandations</h3>
      
      <div className="recommendation-grid">
        <div className="recommendation-item" style={{ backgroundColor: '#ffc0cb' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏀</div>
          <div>Sports</div>
        </div>
        <div className="recommendation-item" style={{ backgroundColor: '#90ee90' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌍</div>
          <div>Politique</div>
        </div>
        <div className="recommendation-item" style={{ backgroundColor: '#dda0dd' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🐾</div>
          <div>Animaux</div>
        </div>
        <div className="recommendation-item" style={{ backgroundColor: '#ffff99' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📰</div>
          <div>News</div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar