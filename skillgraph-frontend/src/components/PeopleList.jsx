import { useState, useEffect } from 'react';
import './PeopleList.css';

function PeopleList({ apiUrl }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPeople();
  }, [filter]);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const endpoint = filter === 'available' 
        ? `${apiUrl}/api/people/available` 
        : `${apiUrl}/api/people`;
      
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch people');
      
      const data = await response.json();
      setPeople(data.people || data.available || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading people...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="people-list">
      <div className="list-header">
        <h2>👥 People</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({people.length})
          </button>
          <button 
            className={filter === 'available' ? 'active' : ''}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
        </div>
      </div>

      {people.length === 0 ? (
        <div style={{ color: '#94a3b8', textAlign: 'center', marginTop: '3rem' }}>
          No people found
        </div>
      ) : (
        <div className="people-grid">
          {people.map((person, index) => (
            <div key={index} className="person-card">
              <div className="person-header">
                <div className="person-avatar">
                  {person.name?.split(' ').map(n => n[0]).join('') || '?'}
                </div>
                <div className="person-info">
                  <h3>{person.name}</h3>
                  <p className="person-role">{person.role}</p>
                </div>
              </div>

              <div className="person-meta">
                <span className={`badge seniority-${person.seniority?.toLowerCase()}`}>
                  {person.seniority}
                </span>
                <span className="experience">
                  {person.yearsExp} years exp.
                </span>
                {person.available !== undefined && (
                  <span className={`status ${person.available ? 'available' : 'busy'}`}>
                    {person.available ? '✅ Available' : '🔴 Busy'}
                  </span>
                )}
              </div>

              {person.skills && person.skills.length > 0 && (
                <div className="person-skills">
                  <strong>Skills:</strong>
                  <div className="skill-tags">
                    {person.skills.slice(0, 5).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="skill-tag"
                        title={`${skill.years || 0} years - ${skill.proficiency || 'N/A'}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                    {person.skills.length > 5 && (
                      <span className="skill-tag more">
                        +{person.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {person.projects && person.projects.length > 0 && (
                <div className="person-projects">
                  <strong>Projects:</strong>
                  <ul>
                    {person.projects
                      .filter(p => p.name)
                      .slice(0, 3)
                      .map((project, idx) => (
                        <li key={idx}>
                          {project.name} 
                          {project.role && ` - ${project.role}`}
                          {project.status && (
                            <span className={`project-status ${project.status}`}>
                              ({project.status})
                            </span>
                          )}
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

export default PeopleList;