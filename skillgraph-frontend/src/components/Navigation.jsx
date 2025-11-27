import './Navigation.css';

function Navigation({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'people', label: '👥 People', icon: '👥' },
    { id: 'team-builder', label: '🔨 Team Builder', icon: '🔨' },
    { id: 'expert-finder', label: '🔍 Expert Finder', icon: '🔍' },
    { id: 'projects', label: '📁 Projects', icon: '📁' },
    { id: 'graph', label: '🌐 3D Graph', icon: '🌐' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>SkillGraph</h1>
        <p className="nav-subtitle">HR Management System</p>
      </div>
      <ul className="nav-menu">
        {menuItems.map(item => (
          <li key={item.id}>
            <button
              className={`nav-button ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;