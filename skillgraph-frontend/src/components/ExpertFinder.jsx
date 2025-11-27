import { useState } from 'react';
import './ExpertFinder.css';

function ExpertFinder({ apiUrl }) {
  const [skill, setSkill] = useState('');
  const [experts, setExperts] = useState(null);
  const [loading, setLoading] = useState(false);

  const popularSkills = [
    'React', 'Java', 'Python', 'Node.js', 'Docker', 'Kubernetes',
    'AWS', 'PostgreSQL', 'Spring Boot', 'Vue.js'
  ];

  const handleSearch = () => {
    if (!skill.trim()) {
      alert('Please enter a skill');
      return;
    }

    setLoading(true);
    fetch(`${apiUrl}/api/experts/${encodeURIComponent(skill)}`)
      .then(res => res.json())
      .then(data => {
        setExperts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const getProficiencyColor = (proficiency) => {
    const colors = {
      'expert': '#10b981',
      'advanced': '#3b82f6',
      'intermediate': '#f59e0b',
      'beginner': '#6b7280'
    };
    return colors[proficiency] || '#6b7280';
  };

  return (
    <div className="expert-finder">
      <h2>🔍 Expert Finder</h2>
      <p className="subtitle">Find experts in specific technologies</p>

      <div className="search-form">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter technology (e.g. React, Java, Docker)"
          className="search-input"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? '🔍 Searching...' : '🔍 Search'}
        </button>
      </div>

      <div className="popular-skills">
        <span>Popular:</span>
        {popularSkills.map(s => (
          <button 
            key={s} 
            className="popular-skill"
            onClick={() => { setSkill(s); }}
          >
            {s}
          </button>
        ))}
      </div>

      {experts && (
        <div className="results">
          <h3>
            {experts.total > 0 
              ? `Found ${experts.total} expert${experts.total > 1 ? 's' : ''} in ${experts.skill}`
              : `No experts found for "${experts.skill}"`
            }
          </h3>

          {experts.total > 0 && (
            <div className="experts-list">
              {experts.experts.map((expert, idx) => (
                <div key={idx} className="expert-card">
                  <div className="expert-header">
                    <div className="expert-avatar">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="expert-info">
                      <h4>{expert.name}</h4>
                      <p className="expert-role">{expert.role}</p>
                    </div>
                    <div 
                      className="proficiency-badge"
                      style={{backgroundColor: getProficiencyColor(expert.proficiency)}}
                    >
                      {expert.proficiency}
                    </div>
                  </div>

                  <div className="expert-details">
                    <div className="detail-item">
                      <span className="label">Seniority:</span>
                      <span className={`badge seniority-${expert.seniority?.toLowerCase()}`}>
                        {expert.seniority}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Experience:</span>
                      <span>{expert.yearsExp} years overall</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">{expert.skill} experience:</span>
                      <span><strong>{expert.skillYears} years</strong></span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Availability:</span>
                      <span className={expert.available ? 'available' : 'busy'}>
                        {expert.available ? '✅ Available' : '🔴 Busy'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExpertFinder;