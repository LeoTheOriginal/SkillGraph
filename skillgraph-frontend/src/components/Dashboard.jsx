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
      <div className="dashboard-layout">
        
        {/* LEWA KOLUMNA: STATYSTYKI */}
        <div className="stats-column">
          <div className="section-title">
            <span className="material-icons-outlined text-primary">bar_chart</span>
            <h2>Overview</h2>
          </div>

          <div className="stats-grid-small">
            {/* Card 1: Total Employees (Blue) */}
            <div className="stat-card-stitch stat-blue">
              <div className="icon-box">
                <span className="material-icons-outlined">groups</span>
              </div>
              <div>
                <p className="stat-value">{stats.totalPeople}</p>
                <p className="stat-label">Total Employees</p>
              </div>
            </div>

            {/* Card 2: Available (Green) */}
            <div className="stat-card-stitch stat-green">
              <div className="icon-box">
                <span className="material-icons-outlined">check_circle_outline</span>
              </div>
              <div>
                <p className="stat-value">{stats.availablePeople}</p>
                <p className="stat-label">Available Now</p>
              </div>
            </div>

            {/* Card 3: Total Projects (Yellow) */}
            <div className="stat-card-stitch stat-yellow">
              <div className="icon-box">
                <span className="material-icons-outlined">folder</span>
              </div>
              <div>
                <p className="stat-value">{stats.totalProjects}</p>
                <p className="stat-label">Total Projects</p>
              </div>
            </div>

            {/* Card 4: Active Projects (Red/Blue styled) */}
            <div className="stat-card-stitch stat-red">
              <div className="icon-box">
                <span className="material-icons-outlined">rocket_launch</span>
              </div>
              <div>
                <p className="stat-value">{stats.activeProjects}</p>
                <p className="stat-label">Active Projects</p>
              </div>
            </div>

            {/* Card 5: Technologies (Orange) */}
            <div className="stat-card-stitch stat-orange">
              <div className="icon-box">
                <span className="material-icons-outlined">bolt</span>
              </div>
              <div>
                <p className="stat-value">{stats.totalSkills}</p>
                <p className="stat-label">Technologies</p>
              </div>
            </div>

            {/* Card 6: Availability Rate (Teal) */}
            <div className="stat-card-stitch stat-teal">
              <div className="icon-box">
                <span className="material-icons-outlined">show_chart</span>
              </div>
              <div>
                <p className="stat-value">{availabilityRate}%</p>
                <p className="stat-label">Availability Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRAWA KOLUMNA: WYKRESY */}
        <div className="content-column">
          
          {/* Seniority Panel */}
          <div className="glass-panel">
            <div className="panel-header">
              <span className="material-icons-outlined text-primary" style={{color:'#3b82f6'}}>signal_cellular_alt</span>
              <h3>Seniority Distribution</h3>
            </div>
            <div className="seniority-list">
              {stats.seniorityDistribution && stats.seniorityDistribution.map((item) => {
                const percentage = stats.totalPeople > 0 
                  ? (item.count / stats.totalPeople) * 100 
                  : 0;
                
                return (
                  <div key={item.seniority} className="seniority-row">
                    <span className="seniority-name">{item.seniority}</span>
                    <div className="progress-track">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="seniority-val">{item.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Skills Panel */}
          <div className="glass-panel">
            <div className="panel-header">
              <span className="material-icons-outlined" style={{color: '#f97316'}}>local_fire_department</span>
              <h3>Top 10 Skills</h3>
            </div>
            <div className="skills-grid-new">
              {stats.topSkills && stats.topSkills.length > 0 ? (
                stats.topSkills.map((item) => (
                  <div key={item.skill} className="skill-card-mini">
                    <span>{item.skill}</span>
                    <span>{item.count} people</span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#94a3b8' }}>No skills data available</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;