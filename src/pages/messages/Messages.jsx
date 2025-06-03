const Messages = () => {
  // Données temporaires pour les conversations
  const conversations = [
    {
      id: 1,
      name: "Lola lui",
      lastMessage: "A envoyé un message",
      time: "2h",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=100&h=100&fit=crop&crop=face",
      unread: true
    },
    {
      id: 2,
      name: "Lola lui",
      lastMessage: "A envoyé un message",
      time: "4h",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=100&h=100&fit=crop&crop=face",
      unread: true
    },
    {
      id: 3,
      name: "Lola lui",
      lastMessage: "A envoyé un message",
      time: "6h",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=100&h=100&fit=crop&crop=face",
      unread: true
    },
    {
      id: 4,
      name: "Lola lui",
      lastMessage: "Entre deux zorolis, tu m'avais dit quelque chose. Les oreilles retroussaient, les oiseaux s'é...",
      time: "1j",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=100&h=100&fit=crop&crop=face",
      unread: false
    },
    {
      id: 5,
      name: "Lola lui",
      lastMessage: "Entre deux zorolis, tu m'avais dit quelque chose. Les oreilles retroussaient, les oiseaux s'é...",
      time: "1j",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=100&h=100&fit=crop&crop=face",
      unread: false
    },
    {
      id: 6,
      name: "Lola lui",
      lastMessage: "Entre deux zorolis, tu m'avais dit quelque chose. Les oreilles retroussaient, les oiseaux s'é...",
      time: "2j",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=100&h=100&fit=crop&crop=face",
      unread: false
    }
  ]

  return (
    <div className="messages-container">
      <h1 className="messages-title">Messages</h1>
      
      <div className="conversations-list">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="conversation-item">
            <div className="conversation-avatar">
              <img 
                src={conversation.avatar} 
                alt={conversation.name}
                className="avatar-image"
              />
            </div>
            
            <div className="conversation-content">
              <div className="conversation-header">
                <h3 className="conversation-name">{conversation.name}</h3>
                <span className="conversation-time">{conversation.time}</span>
              </div>
              
              <p className="conversation-message">
                {conversation.lastMessage}
                {conversation.unread && <span className="unread-dot"></span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages