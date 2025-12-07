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
      console.log('Stats data:', data); // Debug
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

  // POPRAWKA: używamy availablePeople z API
  const availabilityRate = stats.totalPeople > 0 
    ? Math.round((stats.availablePeople / stats.totalPeople) * 100)
    : 0;

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Stat Card 1 - Total Employees */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <div className="stat-label">Total Employees</div>
              <div className="stat-value">{stats.totalPeople || 0}</div>
            </div>
            <div className="stat-icon cyan">
              <span className="material-icons-outlined">group</span>
            </div>
          </div>
        </div>

        {/* Stat Card 2 - Available Now - POPRAWKA: używamy availablePeople */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <div className="stat-label">Available Now</div>
              <div className="stat-value">{stats.availablePeople || 0}</div>
            </div>
            <div className="stat-icon green">
              <span className="material-icons-outlined">check_circle</span>
            </div>
          </div>
        </div>

        {/* Stat Card 3 - Total Projects */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <div className="stat-label">Total Projects</div>
              <div className="stat-value">{stats.totalProjects || 0}</div>
            </div>
            <div className="stat-icon magenta">
              <span className="material-icons-outlined">folder</span>
            </div>
          </div>
        </div>

        {/* Stat Card 4 - Active Projects */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <div className="stat-label">Active Projects</div>
              <div className="stat-value">{stats.activeProjects || 0}</div>
            </div>
            <div className="stat-icon blue">
              <span className="material-icons-outlined">rocket_launch</span>
            </div>
          </div>
        </div>

        {/* Stat Card 5 - Technologies */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <div className="stat-label">Technologies</div>
              <div className="stat-value">{stats.totalSkills || 0}</div>
            </div>
            <div className="stat-icon orange">
              <span className="material-icons-outlined">bolt</span>
            </div>
          </div>
        </div>

        {/* Stat Card 6 - Availability Rate */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <div className="stat-label">Availability Rate</div>
              <div className="stat-value">{availabilityRate}%</div>
            </div>
            <div className="stat-icon purple">
              <span className="material-icons-outlined">show_chart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Seniority Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <span className="material-icons-outlined">signal_cellular_alt</span>
            <h3>Seniority Distribution</h3>
          </div>
          <div className="seniority-bars">
            {stats.seniorityDistribution && stats.seniorityDistribution.length > 0 ? (
              stats.seniorityDistribution.map((item) => {
                const percentage = stats.totalPeople > 0 
                  ? (item.count / stats.totalPeople) * 100 
                  : 0;
                
                return (
                  <div key={item.seniority} className="seniority-row">
                    <span className="seniority-label">{item.seniority}</span>
                    <div className="seniority-bar-track">
                      <div 
                        className="seniority-bar-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="seniority-value">{item.count}</span>
                  </div>
                );
              })
            ) : (
              <p style={{ color: '#94a3b8' }}>No seniority data available</p>
            )}
          </div>
        </div>

        {/* Top Skills */}
        <div className="chart-card">
          <div className="chart-header">
            <span className="material-icons-outlined">local_fire_department</span>
            <h3>Top 10 Skills</h3>
          </div>
          <div className="skills-list">
            {stats.topSkills && stats.topSkills.length > 0 ? (
              stats.topSkills.map((item, index) => (
                <div key={item.skill} className="skill-item">
                  <div className="skill-item-left">
                    <span className="skill-rank">{index + 1}</span>
                    <span className="skill-name">{item.skill}</span>
                  </div>
                  <span className="skill-count">{item.count}</span>
                </div>
              ))
            ) : (
              <p style={{ color: '#94a3b8', textAlign: 'center' }}>No skills data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;