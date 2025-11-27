import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ apiUrl }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="loading">Loading statistics...</div>;
  if (!stats) return <div className="error">Failed to load statistics</div>;

  return (
    <div className="dashboard">
      <h2>📊 Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalPeople}</h3>
            <p>Total Employees</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.availablePeople}</h3>
            <p>Available Now</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>{stats.totalProjects}</h3>
            <p>Total Projects</p>
          </div>
        </div>

        <div className="stat-card active">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <h3>{stats.activeProjects}</h3>
            <p>Active Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>{stats.totalSkills}</h3>
            <p>Technologies</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{Math.round((stats.availablePeople / stats.totalPeople) * 100)}%</h3>
            <p>Availability Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>👔 Seniority Distribution</h3>
        <div className="seniority-bars">
          {stats.seniorityDistribution.map(item => (
            <div key={item.seniority} className="seniority-bar">
              <span className="seniority-label">{item.seniority}</span>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{width: `${(item.count / stats.totalPeople) * 100}%`}}
                />
              </div>
              <span className="seniority-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>🔥 Top 10 Skills</h3>
        <div className="skills-list">
          {stats.topSkills.map(skill => (
            <div key={skill.skill} className="skill-item">
              <span className="skill-name">{skill.skill}</span>
              <span className="skill-count">{skill.count} people</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;