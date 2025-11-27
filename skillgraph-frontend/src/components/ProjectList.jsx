import { useState, useEffect } from 'react';
import './ProjectList.css';

function ProjectList({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = filter === 'all' ? '/api/projects' : `/api/projects?status=${filter}`;
    fetch(`${apiUrl}${endpoint}`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [apiUrl, filter]);

  const getStatusColor = (status) => {
    const colors = {
      'active': '#10b981',
      'completed': '#6b7280',
      'planned': '#3b82f6'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>📁 Projects</h2>
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

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span 
                className="status-badge"
                style={{backgroundColor: getStatusColor(project.status)}}
              >
                {project.status}
              </span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-meta">
              <div className="meta-item">
                <span className="label">Client:</span>
                <span>{project.client}</span>
              </div>
              <div className="meta-item">
                <span className="label">Budget:</span>
                <span>${project.budget?.toLocaleString()}</span>
              </div>
              <div className="meta-item">
                <span className="label">Team Size:</span>
                <span>{project.currentTeam?.length || 0} / {project.teamSize}</span>
              </div>
              <div className="meta-item">
                <span className="label">Start Date:</span>
                <span>{project.startDate}</span>
              </div>
            </div>

            <div className="project-skills">
              <strong>Required Skills:</strong>
              <div className="skill-tags">
                {project.requiredSkills?.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {project.currentTeam && project.currentTeam.length > 0 && (
              <div className="project-team">
                <strong>Team:</strong>
                <ul>
                  {project.currentTeam.map((member, i) => (
                    <li key={i}>{member.name} - {member.role}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;