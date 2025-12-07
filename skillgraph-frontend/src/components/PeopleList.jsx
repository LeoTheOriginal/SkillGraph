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
      <h2>People</h2>

      {/* Filters */}
      <div className="people-filters">
        <input 
          type="search" 
          placeholder="Search people..." 
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All ({people.length})</option>
          <option value="available">Available</option>
        </select>
      </div>

      {/* People Grid */}
      {people.length === 0 ? (
        <div className="empty-state">No people found</div>
      ) : (
        <div className="people-grid">
          {people.map((person, index) => (
            <div key={index} className="person-card">
              {/* Seniority Badge */}
              {person.seniority && (
                <div className={`person-seniority ${person.seniority.toLowerCase()}`}>
                  {person.seniority}
                </div>
              )}

              {/* Person Header */}
              <div className="person-header">
                <div className="person-avatar">
                  {person.name?.split(' ').map(n => n[0]).join('') || '?'}
                </div>
                <div className="person-info">
                  <h3 className="person-name">{person.name}</h3>
                  <p className="person-role">{person.role}</p>
                </div>
              </div>

              {/* Person Meta */}
              <div className="person-meta">
                <span className="experience">
                  <span className="material-icons-outlined">work</span>
                  {person.yearsExp} years exp.
                </span>
                {person.available !== undefined && (
                  <span className={`person-status ${person.available ? 'available' : 'busy'}`}>
                    {person.available ? 'Available' : 'Busy'}
                  </span>
                )}
              </div>

              {/* Skills */}
              {person.skills && person.skills.length > 0 && (
                <div className="person-skills">
                  <div className="person-skills-label">Skills</div>
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
                        +{person.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Projects */}
              {person.projects && person.projects.length > 0 && (
                <div className="person-projects">
                  <div className="person-projects-label">Projects</div>
                  <ul>
                    {person.projects
                      .filter(p => p.name)
                      .slice(0, 3)
                      .map((project, idx) => (
                        <li key={idx}>
                          {project.name} 
                          {project.role && ` - ${project.role}`}
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