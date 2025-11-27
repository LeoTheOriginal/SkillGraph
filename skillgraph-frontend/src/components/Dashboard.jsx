import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ apiUrl }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!stats) return <div className="error">No data available</div>;

  const availabilityRate = stats.totalPeople > 0 
    ? Math.round((stats.availablePeople / stats.totalPeople) * 100) 
    : 0;

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

        <div className="stat-card success">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{availabilityRate}%</h3>
            <p>Availability Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>📊 Seniority Distribution</h3>
        <div className="seniority-bars">
          {stats.seniorityDistribution && stats.seniorityDistribution.map((item) => {
            const percentage = stats.totalPeople > 0 
              ? (item.count / stats.totalPeople) * 100 
              : 0;
            
            return (
              <div key={item.seniority} className="seniority-bar">
                <div className="seniority-label">{item.seniority}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="seniority-count">{item.count}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>🔥 Top 10 Skills</h3>
        {stats.topSkills && stats.topSkills.length > 0 ? (
          <div className="skills-list">
            {stats.topSkills.map((item) => (
              <div key={item.skill} className="skill-item">
                <span className="skill-name">{item.skill}</span>
                <span className="skill-count">{item.count} people</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#94a3b8' }}>No skills data available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;