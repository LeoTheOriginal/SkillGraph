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

  const getProficiencyClass = (proficiency) => {
    const map = {
      'expert': 'expert',
      'advanced': 'advanced',
      'intermediate': 'intermediate',
      'beginner': 'beginner'
    };
    return map[proficiency?.toLowerCase()] || 'intermediate';
  };

  return (
    <div className="expert-finder">
      <h2>Expert Finder</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        Find experts in specific technologies
      </p>

      {/* Search */}
      <div className="expert-search">
        <input
          type="search"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter technology (e.g. React, Java, Docker)"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          <span className="material-icons-outlined">search</span>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Popular Skills */}
      <div className="skill-suggestions">
        <div className="skill-suggestions-label">Popular Technologies</div>
        {popularSkills.map(s => (
          <button 
            key={s} 
            className="skill-suggestion-tag"
            onClick={() => setSkill(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Results */}
      {experts && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>
            {experts.total > 0 
              ? `Found ${experts.total} expert${experts.total > 1 ? 's' : ''} in ${experts.skill}`
              : `No experts found for "${experts.skill}"`
            }
          </h3>

          {experts.total > 0 && (
            <div className="experts-list">
              {experts.experts.map((expert, idx) => (
                <div key={idx} className="expert-card">
                  {/* Expert Header */}
                  <div className="expert-header">
                    <div className="expert-avatar">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="expert-info">
                      <h4 className="expert-name">{expert.name}</h4>
                      <p className="expert-role">{expert.role}</p>
                    </div>
                  </div>

                  {/* Expertise Level Badge */}
                  <div className={`expertise-level ${getProficiencyClass(expert.proficiency)}`}>
                    <span className="material-icons-outlined">star</span>
                    {expert.proficiency}
                  </div>

                  {/* Expert Skills */}
                  <div className="expert-skills">
                    <div className="expert-skills-label">Core Skills</div>
                    <div className="expert-skill-tags">
                      <span className="expert-skill-tag matched">
                        {expert.skill} - {expert.skillYears} years
                      </span>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="match-score">
                    <div className="match-score-label">Experience Level</div>
                    <div className="match-score-value">
                      <span className="material-icons-outlined">workspace_premium</span>
                      {expert.proficiency}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="expert-experience">
                    <div className="experience-item">
                      <span className="material-icons-outlined">military_tech</span>
                      <span>
                        <strong>Seniority:</strong> {expert.seniority}
                      </span>
                    </div>
                    <div className="experience-item">
                      <span className="material-icons-outlined">work_history</span>
                      <span>
                        <strong>Experience:</strong> {expert.yearsExp} years overall
                      </span>
                    </div>
                    <div className="experience-item">
                      <span className="material-icons-outlined">code</span>
                      <span>
                        <strong>{expert.skill}:</strong> {expert.skillYears} years
                      </span>
                    </div>
                    <div className="experience-item">
                      <span className="material-icons-outlined">
                        {expert.available ? 'check_circle' : 'cancel'}
                      </span>
                      <span>
                        <strong>Availability:</strong> {expert.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="expert-actions">
                    <button className="expert-btn expert-btn-contact">
                      <span className="material-icons-outlined">mail</span>
                      Contact
                    </button>
                    <button className="expert-btn expert-btn-view">
                      <span className="material-icons-outlined">visibility</span>
                      View Profile
                    </button>
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