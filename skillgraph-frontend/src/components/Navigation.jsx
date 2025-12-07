import { useState } from 'react';
import './Navigation.css';

function Navigation({ currentView, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'people', icon: 'group', label: 'People' },
    { id: 'team-builder', icon: 'groups', label: 'Team Builder' },
    { id: 'expert-finder', icon: 'search', label: 'Expert Finder' },
    { id: 'projects', icon: 'folder', label: 'Projects' },
    { id: 'graph', icon: 'account_tree', label: '3D Graph' }
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    setIsOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="nav-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className="material-icons-outlined">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="nav-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        {/* Logo Section */}
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <span className="material-icons-outlined">hub</span>
          </div>
          <div>
            <h1>SkillGraph</h1>
            <p className="nav-subtitle">HR Management System</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="nav-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="material-icons-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="nav-footer">
          <p>© 2024 SkillGraph</p>
        </div>
      </nav>
    </>
  );
}

export default Navigation;