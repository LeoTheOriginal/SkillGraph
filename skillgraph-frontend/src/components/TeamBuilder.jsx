import { useState, useEffect } from 'react';
import './TeamBuilder.css';

function TeamBuilder({ apiUrl }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // States dla filtrów
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [teamSize, setTeamSize] = useState(5);
  
  // Dropdown states
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);

  // Dostępne opcje
  const availableSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS',
    'Java', 'Spring Boot', 'Angular', 'Vue.js', 'Next.js',
    'GraphQL', 'Redis', 'Microservices', 'CI/CD', 'Git'
  ];

  const availableRoles = [
    'Senior Full-Stack Developer',
    'Senior Frontend Developer', 
    'Senior Backend Developer',
    'Mid Full-Stack Developer',
    'Mid Frontend Developer',
    'Mid Backend Developer',
    'Junior Full-Stack Developer',
    'Junior Frontend Developer',
    'Junior Backend Developer',
    'DevOps Engineer',
    'Data Engineer',
    'QA Engineer'
  ];

  const searchTeam = async () => {
    if (selectedSkills.length === 0) {
      setError('Please select at least one skill');
      return;
    }

    try {
      setLoading(true);
      const skillsParam = selectedSkills.join(',');
      const response = await fetch(
        `${apiUrl}/api/team-recommendations?skills=${skillsParam}&teamSize=${teamSize}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      
      const data = await response.json();
      let results = data.recommendations || [];
      
      // Filter by selected roles if any
      if (selectedRoles.length > 0) {
        results = results.filter(person => 
          selectedRoles.some(role => person.role?.includes(role.split(' ')[0]))
        );
      }
      
      setRecommendations(results);
      setError(null);
    } catch (err) {
      setError(err.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleRole = (role) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const incrementTeamSize = () => {
    setTeamSize(prev => Math.min(prev + 1, 10));
  };

  const decrementTeamSize = () => {
    setTeamSize(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="team-builder">
      <h2>Team Builder</h2>

      {/* Filters Panel */}
      <div className="team-filters-panel">
        
        {/* Skills Dropdown */}
        <div className="filter-group">
          <label>Required Skills</label>
          <div className="dropdown-wrapper">
            <button 
              className="dropdown-trigger"
              onClick={() => {
                setShowSkillsDropdown(!showSkillsDropdown);
                setShowRolesDropdown(false);
              }}
            >
              <span className="material-icons-outlined">code</span>
              {selectedSkills.length > 0 
                ? `${selectedSkills.length} selected` 
                : 'Select skills...'}
              <span className="material-icons-outlined">
                {showSkillsDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            
            {showSkillsDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-search">
                  <span className="material-icons-outlined">search</span>
                  <input type="text" placeholder="Search skills..." />
                </div>
                <div className="dropdown-options">
                  {availableSkills.map(skill => (
                    <label key={skill} className="dropdown-option">
                      <input 
                        type="checkbox" 
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Selected Skills Pills */}
          {selectedSkills.length > 0 && (
            <div className="selected-pills">
              {selectedSkills.map(skill => (
                <span key={skill} className="pill">
                  {skill}
                  <button onClick={() => toggleSkill(skill)}>
                    <span className="material-icons-outlined">close</span>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Roles Dropdown */}
        <div className="filter-group">
          <label>Role / Seniority (optional)</label>
          <div className="dropdown-wrapper">
            <button 
              className="dropdown-trigger"
              onClick={() => {
                setShowRolesDropdown(!showRolesDropdown);
                setShowSkillsDropdown(false);
              }}
            >
              <span className="material-icons-outlined">badge</span>
              {selectedRoles.length > 0 
                ? `${selectedRoles.length} selected` 
                : 'Any role...'}
              <span className="material-icons-outlined">
                {showRolesDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            
            {showRolesDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-options">
                  {availableRoles.map(role => (
                    <label key={role} className="dropdown-option">
                      <input 
                        type="checkbox" 
                        checked={selectedRoles.includes(role)}
                        onChange={() => toggleRole(role)}
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Selected Roles Pills */}
          {selectedRoles.length > 0 && (
            <div className="selected-pills">
              {selectedRoles.map(role => (
                <span key={role} className="pill">
                  {role}
                  <button onClick={() => toggleRole(role)}>
                    <span className="material-icons-outlined">close</span>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Team Size Number Input */}
        <div className="filter-group">
          <label>Team Size</label>
          <div className="number-input-wrapper">
            <button 
              className="number-btn"
              onClick={decrementTeamSize}
              disabled={teamSize <= 1}
            >
              <span className="material-icons-outlined">remove</span>
            </button>
            <input 
              type="number" 
              value={teamSize}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setTeamSize(Math.max(1, Math.min(10, val)));
              }}
              min="1"
              max="10"
              className="number-input"
            />
            <button 
              className="number-btn"
              onClick={incrementTeamSize}
              disabled={teamSize >= 10}
            >
              <span className="material-icons-outlined">add</span>
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button 
          className="search-team-btn"
          onClick={searchTeam}
          disabled={selectedSkills.length === 0}
        >
          <span className="material-icons-outlined">search</span>
          Find Team
        </button>
      </div>

      {/* Error */}
      {error && <div className="error">{error}</div>}

      {/* Results */}
      {loading ? (
        <div className="loading">Finding best team members...</div>
      ) : recommendations.length > 0 ? (
        <div className="team-results">
          <div className="results-header">
            <h3>Recommended Team ({recommendations.length})</h3>
            <p>Based on {selectedSkills.join(', ')}</p>
          </div>
          
          <div className="team-cards">
            {recommendations.map((person, index) => (
              <div key={index} className="team-member-card">
                {/* Avatar */}
                <div className="member-avatar">
                  {person.name?.split(' ').map(n => n[0]).join('') || '?'}
                </div>

                {/* Info */}
                <div className="member-info">
                  <h4>{person.name}</h4>
                  <p className="member-role">{person.role}</p>
                  <div className="member-meta">
                    <span className={`member-seniority ${person.seniority?.toLowerCase()}`}>
                      {person.seniority}
                    </span>
                    <span className="member-exp">{person.yearsExp} years</span>
                  </div>
                </div>

                {/* Match Score */}
                {person.matchScore && (
                  <div className="match-score">
                    <div className="match-score-circle">
                      {person.matchScore}
                    </div>
                    <span>Match</span>
                  </div>
                )}

                {/* Matched Skills */}
                {person.matchedSkills > 0 && (
                  <div className="matched-skills-info">
                    <span className="material-icons-outlined">check_circle</span>
                    {person.matchedSkills} / {selectedSkills.length} skills matched
                  </div>
                )}

                {/* Skills */}
                {person.skills && person.skills.length > 0 && (
                  <div className="member-skills">
                    {person.skills.slice(0, 4).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className={`member-skill ${selectedSkills.includes(skill.name) ? 'matched' : ''}`}
                        title={`${skill.years} years - ${skill.proficiency}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                    {person.skills.length > 4 && (
                      <span className="member-skill more">+{person.skills.length - 4}</span>
                    )}
                  </div>
                )}

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
      ) : null}
    </div>
  );
}

export default TeamBuilder;