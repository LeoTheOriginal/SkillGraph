import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PeopleList from './components/PeopleList';
import TeamBuilder from './components/TeamBuilder';
import ExpertFinder from './components/ExpertFinder';
import ProjectList from './components/ProjectList';
import Graph3D from './components/Graph3D';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // ZMIEŃ TEN URL NA SWÓJ BACKEND
  const API_URL = 'https://skillgraph-174e.onrender.com';

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard apiUrl={API_URL} />;
      case 'people':
        return <PeopleList apiUrl={API_URL} />;
      case 'team-builder':
        return <TeamBuilder apiUrl={API_URL} />;
      case 'expert-finder':
        return <ExpertFinder apiUrl={API_URL} />;
      case 'projects':
        return <ProjectList apiUrl={API_URL} />;
      case 'graph':
        return <Graph3D apiUrl={API_URL} />;
      default:
        return <Dashboard apiUrl={API_URL} />;
    }
  };

  return (
    <div className="app">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;