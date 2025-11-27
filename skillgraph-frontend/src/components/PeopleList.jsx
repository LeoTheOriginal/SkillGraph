import { useState, useEffect } from 'react';
import './PeopleList.css';

function PeopleList({ apiUrl }) {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = filter === 'available' ? '/api/people/available' : '/api/people';
    fetch(`${apiUrl}${endpoint}`)
      .then(res => res.json())
      .then(data => {
        setPeople(filter === 'available' ? data.available : data.people);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [apiUrl, filter]);

  if (loading) return <div className="loading">Loading people...</div>;

  return (
    <div className="people-list">
      <div className="list-header">
        <h2>👥 Team Members</h2>
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
            Available Only
          </button>
        </div>
      </div>

      <div className="people-grid">
        {people.map((person, idx) => (
          <div key={idx} className="person-card">
            <div className="person-header">
              <div className="person-avatar">
                {person.name.split(' ').map(n => n[0]).join('')}
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
              <span className="experience">{person.yearsExp} years exp</span>
              {person.available !== undefined && (
                <span className={`status ${person.available ? 'available' : 'busy'}`}>
                  {person.available ? '✅ Available' : '🔴 Busy'}
                </span>
              )}
            </div>

            <div className="person-skills">
              <strong>Skills:</strong>
              <div className="skill-tags">
                {person.skills?.slice(0, 5).map((skill, i) => (
                  <span key={i} className="skill-tag" title={`${skill.years} years - ${skill.proficiency}`}>
                    {skill.name}
                  </span>
                ))}
                {person.skills?.length > 5 && (
                  <span className="skill-tag more">+{person.skills.length - 5}</span>
                )}
              </div>
            </div>

            {person.projects && person.projects.length > 0 && (
              <div className="person-projects">
                <strong>Projects:</strong>
                <ul>
                  {person.projects.slice(0, 2).map((proj, i) => (
                    <li key={i}>{proj.name} ({proj.role})</li>
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

export default PeopleList;