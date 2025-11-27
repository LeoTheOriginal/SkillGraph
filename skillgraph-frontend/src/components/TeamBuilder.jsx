import { useState } from 'react';
import './TeamBuilder.css';

function TeamBuilder({ apiUrl }) {
  const [skills, setSkills] = useState('');
  const [teamSize, setTeamSize] = useState(5);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const predefinedSkills = [
    'React', 'Node.js', 'Java', 'Spring Boot', 'Python', 'Django',
    'Vue.js', 'Angular', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL'
  ];

  const handleSearch = () => {
    if (!skills.trim()) {
      alert('Please enter at least one skill');
      return;
    }

    setLoading(true);
    const skillsParam = encodeURIComponent(skills);
    
    fetch(`${apiUrl}/api/team-recommendations?skills=${skillsParam}&teamSize=${teamSize}`)
      .then(res => res.json())
      .then(data => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const addSkill = (skill) => {
    const currentSkills = skills.split(',').map(s => s.trim()).filter(s => s);
    if (!currentSkills.includes(skill)) {
      setSkills([...currentSkills, skill].join(', '));
    }
  };

  return (
    <div className="team-builder">
      <h2>🔨 Team Builder</h2>
      <p className="subtitle">Find the best team for your project based on required skills</p>

      <div className="builder-form">
        <div className="form-group">
          <label>Required Skills (comma-separated):</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. React, Node.js, Docker"
            className="skill-input"
          />
          <div className="skill-suggestions">
            {predefinedSkills.map(skill => (
              <button 
                key={skill} 
                className="skill-suggestion"
                onClick={() => addSkill(skill)}
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Team Size:</label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value))}
            min="1"
            max="10"
          />
        </div>

        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? '🔍 Searching...' : '🔍 Find Team'}
        </button>
      </div>

      {recommendations && (
        <div className="recommendations">
          <h3>✨ Recommended Team ({recommendations.recommendations.length} people)</h3>
          <p className="required-skills">
            <strong>Required:</strong> {recommendations.requestedSkills.join(', ')}
          </p>

          <div className="team-cards">
            {recommendations.recommendations.map((person, idx) => (
              <div key={idx} className="team-card">
                <div className="team-card-header">
                  <div className="person-avatar">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4>{person.name}</h4>
                    <p className="role">{person.role}</p>
                  </div>
                  <div className="match-score">
                    {person.matchScore}
                  </div>
                </div>

                <div className="team-card-body">
                  <div className="meta-info">
                    <span className={`badge seniority-${person.seniority?.toLowerCase()}`}>
                      {person.seniority}
                    </span>
                    <span className="experience">{person.yearsExp} years</span>
                  </div>

                  <div className="matched-skills">
                    <strong>Matched Skills ({person.matchedSkills}):</strong>
                    <div className="skill-tags">
                      {person.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="skill-tag matched"
                          title={`${skill.years} years - ${skill.proficiency}`}
                        >
                          {skill.name} ({skill.proficiency})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamBuilder;