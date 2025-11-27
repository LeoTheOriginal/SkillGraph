# SkillGraph API Documentation

## Base URL
```
https://skillgraph-174e.onrender.com
```

## Endpoints

### 1. Health Check
```http
GET /
```
Returns API information and available endpoints.

---

### 2. Get Graph Data (3D Visualization)
```http
GET /api/graph
```
Returns nodes and links for 3D graph visualization.

**Response:**
```json
{
  "nodes": [
    {"id": "123", "label": "Person", "name": "Anna Kowalska", "role": "Senior Developer", ...}
  ],
  "links": [
    {"source": "123", "target": "456", "type": "HAS_SKILL"}
  ]
}
```

---

### 3. Get All People
```http
GET /api/people
```
Returns list of all employees with their skills and projects.

**Response:**
```json
{
  "total": 30,
  "people": [
    {
      "name": "Anna Kowalska",
      "role": "Senior Full-Stack Developer",
      "seniority": "Senior",
      "yearsExp": 8,
      "available": true,
      "skills": [{"name": "React", "years": 6, "proficiency": "expert"}],
      "projects": [{"name": "FinanceApp Mobile", "role": "Tech Lead"}]
    }
  ]
}
```

---

### 4. Get Available People
```http
GET /api/people/available
```
Returns only available employees (not assigned to active projects).

---

### 5. Find Experts in Technology
```http
GET /api/experts/:skill
```
Find people with specific skill, sorted by proficiency.

**Example:**
```http
GET /api/experts/React
```

**Response:**
```json
{
  "skill": "React",
  "total": 8,
  "experts": [
    {
      "name": "Anna Kowalska",
      "role": "Senior Full-Stack Developer",
      "seniority": "Senior",
      "yearsExp": 8,
      "available": true,
      "skill": "React",
      "skillYears": 6,
      "proficiency": "expert"
    }
  ]
}
```

---

### 6. Get Team Recommendations
```http
GET /api/team-recommendations?skills=React,Node.js,PostgreSQL&teamSize=5
```
Returns recommended team based on required skills.

**Query Parameters:**
- `skills` (required) - Comma-separated list of required skills
- `teamSize` (optional) - Number of people needed (default: 5)
- `project` (optional) - Project name for context

**Response:**
```json
{
  "project": "New Project",
  "requiredSkills": ["React", "Node.js", "PostgreSQL"],
  "teamSize": 5,
  "recommendations": [
    {
      "name": "Anna Kowalska",
      "role": "Senior Full-Stack Developer",
      "seniority": "Senior",
      "yearsExp": 8,
      "matchedSkills": 3,
      "matchScore": "100.0%",
      "skills": [...]
    }
  ]
}
```

---

### 7. Match People to Existing Project
```http
GET /api/project-match/:projectName
```
Find best candidates for an existing project based on required skills.

**Example:**
```http
GET /api/project-match/FinanceApp
```

---

### 8. Get Person's Network
```http
GET /api/network/:personName
```
Returns professional network of a person (who they know).

**Example:**
```http
GET /api/network/Anna Kowalska
```

**Response:**
```json
{
  "person": "Anna Kowalska",
  "role": "Senior Full-Stack Developer",
  "networkSize": 5,
  "network": [
    {
      "name": "Jan Nowak",
      "role": "Senior Backend Developer",
      "since": 2020,
      "strength": "strong"
    }
  ]
}
```

---

### 9. Get All Projects
```http
GET /api/projects?status=active
```
Returns list of projects.

**Query Parameters:**
- `status` (optional) - Filter by status: `active`, `completed`, `planned`

---

### 10. Get All Skills
```http
GET /api/skills
```
Returns list of all skills with statistics.

**Response:**
```json
{
  "total": 24,
  "skills": [
    {
      "name": "React",
      "type": "Frontend",
      "level": "framework",
      "peopleCount": 8,
      "avgYears": "4.5"
    }
  ]
}
```

---

### 11. Get Statistics
```http
GET /api/stats
```
Returns overall statistics about people, projects, and skills.

**Response:**
```json
{
  "totalPeople": 30,
  "availablePeople": 18,
  "totalProjects": 7,
  "activeProjects": 3,
  "totalSkills": 24,
  "seniorityDistribution": [
    {"seniority": "Senior", "count": 10},
    {"seniority": "Mid", "count": 13},
    {"seniority": "Junior", "count": 7}
  ],
  "topSkills": [
    {"skill": "JavaScript", "count": 12},
    {"skill": "React", "count": 8}
  ]
}
```

---

### 12. Search
```http
GET /api/search?q=Java
```
Search for people by skill, name, or role.

**Query Parameters:**
- `q` (required) - Search term

---

## Example Use Cases

### Use Case 1: Find Team for New Mobile Project
```http
GET /api/team-recommendations?skills=React,Node.js,Docker&teamSize=4&project=Mobile App
```

### Use Case 2: Who Can Replace Someone on Vacation?
```http
GET /api/experts/Spring Boot
GET /api/network/Jan Nowak
```

### Use Case 3: Project Planning
```http
GET /api/people/available
GET /api/projects?status=planned
```

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "error": "Error message description"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found
- `500` - Server Error