import { useState, useEffect } from 'react';
import './ProjectList.css';

function ProjectList({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = statusFilter === 'all' 
        ? `${apiUrl}/api/projects` 
        : `${apiUrl}/api/projects?status=${statusFilter}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data.projects || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return '#10b981';
      case 'completed': return '#6b7280';
      case 'planned': return '#3b82f6';
      default: return '#64748b';
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>📁 Projects</h2>
        <div className="filter-buttons">
          <button 
            className={statusFilter === 'all' ? 'active' : ''}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button 
            className={statusFilter === 'active' ? 'active' : ''}
            onClick={() => setStatusFilter('active')}
          >
            Active
          </button>
          <button 
            className={statusFilter === 'completed' ? 'active' : ''}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={statusFilter === 'planned' ? 'active' : ''}
            onClick={() => setStatusFilter('planned')}
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
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-meta">
                <div className="meta-item">
                  <span className="label">Client</span>
                  <span>{project.client || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Budget</span>
                  <span>{project.budget || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Team Size</span>
                  <span>
                    {project.currentTeam?.length || 0} / {project.teamSize || 0}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="label">Start Date</span>
                  <span>{project.startDate || 'N/A'}</span>
                </div>
              </div>

              {project.requiredSkills && project.requiredSkills.length > 0 && (
                <div className="project-skills">
                  <strong>Required Skills:</strong>
                  <div className="skill-tags">
                    {project.requiredSkills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.currentTeam && project.currentTeam.length > 0 && (
                <div className="project-team">
                  <strong>Current Team:</strong>
                  <ul>
                    {project.currentTeam.map((member, idx) => (
                      <li key={idx}>
                        {member.name} - {member.role}
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