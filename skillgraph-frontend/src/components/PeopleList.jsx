import { useState, useEffect } from 'react';
import './PeopleList.css';

function PeopleList({ apiUrl }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Live search filtering
  const filteredPeople = people.filter(person => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      person.name?.toLowerCase().includes(search) ||
      person.role?.toLowerCase().includes(search) ||
      person.seniority?.toLowerCase().includes(search) ||
      person.skills?.some(skill => skill.name?.toLowerCase().includes(search))
    );
  });

  if (loading) return <div className="loading">Loading people...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="people-list">
      <h2>People</h2>

      {/* Search + Filters */}
      <div className="people-filters">
        <input 
          type="search" 
          placeholder="Search people by name, role, or skill..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="people-search-input"
        />
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'available' ? 'active' : ''}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
        </div>
      </div>

      {/* Dynamic results counter */}
      {searchTerm && (
        <div className="search-results-info">
          Found {filteredPeople.length} {filteredPeople.length === 1 ? 'person' : 'people'}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}

      {/* People Grid */}
      {filteredPeople.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? 'No people found matching your search' : 'No people found'}
        </div>
      ) : (
        <div className="people-grid">
          {filteredPeople.map((person, index) => (
            <div key={index} className="person-card">
              {/* Avatar & Header */}
              <div className="person-header">
                <div className="person-avatar">
                  {person.name?.split(' ').map(n => n[0]).join('') || '?'}
                </div>
                <div className="person-info">
                  <h3>{person.name}</h3>
                  <p className="person-role">{person.role}</p>
                </div>
              </div>

              {/* Seniority + Status */}
              <div className="person-meta">
                <span className={`person-badge seniority-${person.seniority?.toLowerCase()}`}>
                  {person.seniority}
                </span>
                <span className="person-experience">
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