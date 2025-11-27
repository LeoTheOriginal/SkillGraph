import './Navigation.css';

function Navigation({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'people', icon: '👥', label: 'People' },
    { id: 'team-builder', icon: '🔨', label: 'Team Builder' },
    { id: 'expert-finder', icon: '🔍', label: 'Expert Finder' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'graph', icon: '🌐', label: '3D Graph' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>SkillGraph</h1>
        <p className="nav-subtitle">HR Management System</p>
      </div>

      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-button ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;