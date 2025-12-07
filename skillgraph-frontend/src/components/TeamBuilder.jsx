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
      <h2>Team Builder</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        Find the best team for your project based on required skills
      </p>

      {/* Search Form */}
      <div className="team-filters">
        <input
          type="search"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. React, Node.js, Docker"
        />
        <select 
          value={teamSize} 
          onChange={(e) => setTeamSize(parseInt(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>Team Size: {i + 1}</option>
          ))}
        </select>
        <button onClick={handleSearch} disabled={loading}>
          <span className="material-icons-outlined">search</span>
          {loading ? 'Searching...' : 'Find Team'}
        </button>
      </div>

      {/* Skill Suggestions */}
      <div className="skill-suggestions">
        <div className="skill-suggestions-label">Quick Add</div>
        {predefinedSkills.map(skill => (
          <button 
            key={skill} 
            className="skill-suggestion-tag"
            onClick={() => addSkill(skill)}
          >
            + {skill}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      {recommendations && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>
            ✨ Recommended Team ({recommendations.recommendations.length} people)
          </h3>
          <p style={{ marginBottom: '1.5rem', color: '#94a3b8' }}>
            <strong>Required:</strong> {recommendations.requestedSkills.join(', ')}
          </p>

          <div className="team-cards">
            {recommendations.recommendations.map((person, idx) => (
              <div key={idx} className="team-member-card">
                {/* Member Header */}
                <div className="member-header">
                  <div className="member-avatar">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="member-info">
                    <h4 className="member-name">{person.name}</h4>
                    <p className="member-role">{person.role}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="member-meta">
                  <span className={`member-status available`}>
                    {person.matchScore} Match
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {person.seniority} • {person.yearsExp} years
                  </span>
                </div>

                {/* Skills */}
                <div className="member-skills">
                  <div className="member-skills-label">
                    Matched Skills ({person.matchedSkills})
                  </div>
                  <div className="member-skill-tags">
                    {person.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="member-skill-tag"
                        title={`${skill.years} years - ${skill.proficiency}`}
                      >
                        {skill.name} ({skill.proficiency})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="member-actions">
                  <button className="member-btn member-btn-add">
                    <span className="material-icons-outlined">person_add</span>
                    Add to Team
                  </button>
                  <button className="member-btn member-btn-view">
                    <span className="material-icons-outlined">visibility</span>
                    View Profile
                  </button>
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