import { useState, useEffect } from 'react';
import './ProjectList.css';

function ProjectList({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Live search + status filter
  const filteredProjects = projects.filter(project => {
    // Filter by status
    const statusMatch = filter === 'all' || project.status?.toLowerCase() === filter;
    
    // Filter by search term
    if (!searchTerm) return statusMatch;
    
    const search = searchTerm.toLowerCase();
    const searchMatch = (
      project.name?.toLowerCase().includes(search) ||
      project.company?.toLowerCase().includes(search) ||
      project.description?.toLowerCase().includes(search) ||
      project.requiredSkills?.some(skill => skill?.toLowerCase().includes(search))
    );
    
    return statusMatch && searchMatch;
  });

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="projects-list">
      <h2>Projects</h2>

      {/* Search + Filters */}
      <div className="projects-filters">
        <input 
          type="search" 
          placeholder="Search projects by name, company, or skill..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="projects-search-input"
        />
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

      {/* Dynamic results counter */}
      {searchTerm && (
        <div className="search-results-info">
          Found {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? 'No projects found matching your search' : 'No projects found'}
        </div>
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

              {/* Project Description */}
              {project.description && (
                <p className="project-description">{project.description}</p>
              )}

              {/* Project Details */}
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