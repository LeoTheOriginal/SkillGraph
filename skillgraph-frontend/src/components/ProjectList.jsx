import { useState, useEffect } from 'react';
import './ProjectList.css';

function ProjectList({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/projects`);
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

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status?.toLowerCase() === filter);

  return (
    <div className="projects-list">
      <h2>Projects ({projects.length})</h2>

      {/* Filters */}
      <div className="projects-filters">
        <input 
          type="search" 
          placeholder="Search projects..." 
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="planned">Planned</option>
        </select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="empty-state">No projects found</div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card">
              {/* Project Header */}
              <div className="project-header">
                <div className="project-title-section">
                  <h3 className="project-name">{project.name}</h3>
                  {project.company && (
                    <p className="project-company">
                      <span className="material-icons-outlined">business</span>
                      {project.company}
                    </p>
                  )}
                </div>
                {project.status && (
                  <span className={`project-status ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                )}
              </div>

              {/* Project Details */}
              {project.description && (
                <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {project.description}
                </p>
              )}

              <div className="project-details">
                {project.budget && (
                  <div className="project-detail-row">
                    <span className="material-icons-outlined">attach_money</span>
                    <span className="project-detail-label">Budget:</span>
                    <span className="project-detail-value">${project.budget.toLocaleString()}</span>
                  </div>
                )}
                {project.teamSize && (
                  <div className="project-detail-row">
                    <span className="material-icons-outlined">group</span>
                    <span className="project-detail-label">Team:</span>
                    <span className="project-detail-value">{project.teamSize} members</span>
                  </div>
                )}
                {project.startDate && (
                  <div className="project-detail-row">
                    <span className="material-icons-outlined">event</span>
                    <span className="project-detail-label">Start:</span>
                    <span className="project-detail-value">{project.startDate}</span>
                  </div>
                )}
              </div>

              {/* Technologies */}
              {project.requiredSkills && project.requiredSkills.length > 0 && (
                <div className="project-technologies">
                  <div className="project-technologies-label">Required Skills</div>
                  <div className="tech-tags">
                    {project.requiredSkills.map((skill, i) => (
                      <span key={i} className="tech-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Team */}
              {project.currentTeam && project.currentTeam.filter(m => m.name).length > 0 && (
                <div className="project-team">
                  <div className="project-team-label">Team Members</div>
                  <div className="team-members">
                    {project.currentTeam
                      .filter(m => m.name)
                      .map((member, i) => (
                        <div key={i} className="team-member">
                          <div className="team-member-avatar">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                              {member.name}
                            </div>
                            {member.role && (
                              <div style={{ fontSize: '0.625rem', color: '#94a3b8' }}>
                                {member.role}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="project-actions">
                <button className="project-btn project-btn-primary">
                  <span className="material-icons-outlined">visibility</span>
                  View Details
                </button>
                <button className="project-btn project-btn-secondary">
                  <span className="material-icons-outlined">edit</span>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;