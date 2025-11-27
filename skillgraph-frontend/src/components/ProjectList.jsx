import { useState, useEffect } from 'react';
import './ProjectList.css';

function ProjectList({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = filter === 'all' ? '/api/projects' : `/api/projects?status=${filter}`;
    
    setLoading(true);
    fetch(`${apiUrl}${endpoint}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(data => {
        console.log('Projects data:', data); // Debug
        setProjects(data.projects || []);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl, filter]);

  const getStatusColor = (status) => {
    const colors = {
      'active': '#10b981',
      'completed': '#6b7280',
      'planned': '#3b82f6'
    };
    return colors[status?.toLowerCase()] || '#6b7280';
  };

  const formatBudget = (budget) => {
    if (!budget && budget !== 0) return 'N/A';
    return `$${Number(budget).toLocaleString()}`;
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>📁 Projects ({projects.length})</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={filter === 'planned' ? 'active' : ''} 
            onClick={() => setFilter('planned')}
          >
            Planned
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div style={{ color: '#94a3b8', textAlign: 'center', marginTop: '3rem' }}>
          No projects found
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card">
              <div className="project-header">
                <h3>{project.name || 'Unnamed Project'}</h3>
                <span 
                  className="status-badge"
                  style={{backgroundColor: getStatusColor(project.status)}}
                >
                  {project.status || 'unknown'}
                </span>
              </div>

              <p className="project-description">
                {project.description || 'No description available'}
              </p>

              <div className="project-meta">
                <div className="meta-item">
                  <span className="label">Client</span>
                  <span>{project.client || 'Internal / N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Budget</span>
                  <span>{formatBudget(project.budget)}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Team</span>
                  <span>
                    {project.currentTeam?.filter(m => m.name).length || 0} / {project.teamSize || '?'}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="label">Start Date</span>
                  <span>{project.startDate || 'TBD'}</span>
                </div>
                {project.endDate && (
                  <div className="meta-item">
                    <span className="label">End Date</span>
                    <span>{project.endDate}</span>
                  </div>
                )}
              </div>

              {project.requiredSkills && project.requiredSkills.length > 0 && (
                <div className="project-skills">
                  <strong>Required Skills:</strong>
                  <div className="skill-tags">
                    {project.requiredSkills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.currentTeam && project.currentTeam.filter(m => m.name).length > 0 && (
                <div className="project-team">
                  <strong>Team ({project.currentTeam.filter(m => m.name).length}):</strong>
                  <ul>
                    {project.currentTeam
                      .filter(m => m.name)
                      .map((member, i) => (
                        <li key={i}>
                          <span className="member-name">{member.name}</span>
                          {member.role && <span className="member-role"> - {member.role}</span>}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;