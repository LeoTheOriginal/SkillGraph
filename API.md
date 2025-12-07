# SkillGraph API Documentation 📡

> REST API dla systemu HR Management opartego o grafową bazę danych Neo4j

## Base URL

```
Production: https://skillgraph-174e.onrender.com
Local:      http://localhost:3000
```

---

## Spis treści

1. [Health Check](#1-health-check)
2. [Graph Data (3D Visualization)](#2-graph-data-3d-visualization)
3. [People](#3-people)
4. [Available People](#4-available-people)
5. [Find Experts](#5-find-experts)
6. [Team Recommendations](#6-team-recommendations)
7. [Project Match](#7-project-match)
8. [Person's Network](#8-persons-network)
9. [Projects](#9-projects)
10. [Skills](#10-skills)
11. [Statistics](#11-statistics)
12. [Search](#12-search)

---

## 1. Health Check

Sprawdzenie stanu API i lista dostępnych endpointów.

```http
GET /
```

### Response

```json
{
  "message": "🚀 SkillGraph API - HR Management System",
  "version": "2.0",
  "endpoints": {
    "graph": "/api/graph",
    "people": "/api/people",
    "available": "/api/people/available",
    "experts": "/api/experts/:skill",
    "teamRecommendations": "/api/team-recommendations?skills=React,Node.js&teamSize=5",
    "projectMatch": "/api/project-match/:projectName",
    "network": "/api/network/:personName",
    "projects": "/api/projects?status=active",
    "skills": "/api/skills",
    "stats": "/api/stats",
    "search": "/api/search?q=React"
  }
}
```

---

## 2. Graph Data (3D Visualization)

Pobiera węzły i krawędzie do wizualizacji grafu 3D.

```http
GET /api/graph
```

### Response

```json
{
  "nodes": [
    {
      "id": "123",
      "label": "Person",
      "name": "Anna Kowalska",
      "role": "Senior Developer",
      "seniority": "Senior",
      "yearsExp": 8,
      "available": true
    },
    {
      "id": "456",
      "label": "Skill",
      "name": "React",
      "type": "Frontend",
      "level": "framework"
    }
  ],
  "links": [
    {
      "source": "123",
      "target": "456",
      "type": "HAS_SKILL"
    }
  ]
}
```

### Node Labels

| Label | Color | Description |
|-------|-------|-------------|
| Person | Red | Pracownik |
| Skill | Green | Umiejętność |
| Project | Blue | Projekt |
| Company | Yellow | Firma |

---

## 3. People

Pobiera listę wszystkich pracowników z ich umiejętnościami i projektami.

```http
GET /api/people
```

### Response

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
      "skills": [
        {
          "name": "React",
          "years": 6,
          "proficiency": "expert"
        },
        {
          "name": "Node.js",
          "years": 5,
          "proficiency": "expert"
        }
      ],
      "projects": [
        {
          "name": "FinanceApp Mobile",
          "role": "Tech Lead",
          "status": "active"
        }
      ]
    }
  ]
}
```

### Sorting

Wyniki są sortowane według:
1. Seniority (Senior → Mid → Junior)
2. Years of Experience (descending)

---

## 4. Available People

Pobiera tylko pracowników dostępnych do nowych projektów.

```http
GET /api/people/available
```

### Response

```json
{
  "total": 18,
  "available": [
    {
      "name": "Anna Kowalska",
      "role": "Senior Full-Stack Developer",
      "seniority": "Senior",
      "yearsExp": 8,
      "available": true,
      "skills": [
        {
          "name": "React",
          "years": 6,
          "proficiency": "expert"
        }
      ]
    }
  ]
}
```

---

## 5. Find Experts

Wyszukuje ekspertów w określonej technologii, posortowanych według biegłości.

```http
GET /api/experts/:skill
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| skill | string | Nazwa technologii (case-insensitive) |

### Example

```http
GET /api/experts/React
```

### Response

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
    },
    {
      "name": "Maria Wiśniewska",
      "role": "Senior Frontend Developer",
      "seniority": "Senior",
      "yearsExp": 7,
      "available": true,
      "skill": "React",
      "skillYears": 6,
      "proficiency": "expert"
    }
  ]
}
```

### Proficiency Levels (sorting order)

1. `expert` - Ekspert
2. `advanced` - Zaawansowany
3. `intermediate` - Średniozaawansowany
4. `beginner` - Początkujący

---

## 6. Team Recommendations

Zwraca rekomendowany skład zespołu na podstawie wymaganych umiejętności.

```http
GET /api/team-recommendations
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| skills | string | ✅ Yes | - | Lista umiejętności (comma-separated) |
| teamSize | number | ❌ No | 5 | Liczba osób w zespole (1-20) |
| project | string | ❌ No | - | Nazwa projektu (context) |

### Example

```http
GET /api/team-recommendations?skills=React,Node.js,PostgreSQL&teamSize=5
```

### Response

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
      "available": true,
      "matchedSkills": 3,
      "matchScore": "100.0%",
      "skills": [
        {
          "name": "React",
          "years": 6,
          "proficiency": "expert"
        },
        {
          "name": "Node.js",
          "years": 5,
          "proficiency": "expert"
        },
        {
          "name": "PostgreSQL",
          "years": 5,
          "proficiency": "advanced"
        }
      ]
    }
  ]
}
```

### Algorithm

Algorytm rekomendacji uwzględnia:
1. **Match Score** - procent dopasowanych umiejętności
2. **Proficiency** - poziom biegłości w technologiach
3. **Availability** - tylko dostępni pracownicy
4. **Seniority** - preferencja dla doświadczonych
5. **Years of Experience** - lata doświadczenia

---

## 7. Project Match

Znajduje najlepszych kandydatów do istniejącego projektu.

```http
GET /api/project-match/:projectName
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| projectName | string | Nazwa projektu (partial match) |

### Example

```http
GET /api/project-match/FinanceApp
```

### Response

```json
{
  "project": "FinanceApp Mobile",
  "requiredSkills": ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  "recommendations": [
    {
      "name": "Anna Kowalska",
      "matchedSkills": 4,
      "matchScore": "80.0%",
      "skills": [...]
    }
  ]
}
```

---

## 8. Person's Network

Pobiera sieć kontaktów zawodowych pracownika.

```http
GET /api/network/:personName
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| personName | string | Imię i nazwisko (partial match) |

### Example

```http
GET /api/network/Anna%20Kowalska
```

### Response

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
    },
    {
      "name": "Maria Wiśniewska",
      "role": "Senior Frontend Developer",
      "since": 2021,
      "strength": "medium"
    }
  ]
}
```

### Network Strength

| Value | Description |
|-------|-------------|
| strong | Bliska współpraca, wiele wspólnych projektów |
| medium | Współpraca przy kilku projektach |
| weak | Sporadyczny kontakt |

---

## 9. Projects

Pobiera listę projektów z możliwością filtrowania po statusie.

```http
GET /api/projects
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | ❌ No | Filter: `active`, `completed`, `planned` |

### Examples

```http
GET /api/projects                    # All projects
GET /api/projects?status=active      # Only active
GET /api/projects?status=completed   # Only completed
```

### Response

```json
{
  "total": 7,
  "projects": [
    {
      "name": "FinanceApp Mobile",
      "status": "active",
      "company": "FinanceApp Corp",
      "description": "Mobile banking application for iOS and Android",
      "budget": 250000,
      "teamSize": 6,
      "startDate": "2024-01-15",
      "endDate": null,
      "durationMonths": 8,
      "requiredSkills": ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
      "currentTeam": [
        {
          "name": "Anna Kowalska",
          "role": "Tech Lead"
        },
        {
          "name": "Tomasz Zieliński",
          "role": "Backend Dev"
        }
      ]
    }
  ]
}
```

### Project Status

| Status | Description |
|--------|-------------|
| active | W trakcie realizacji |
| completed | Zakończony |
| planned | Planowany |

---

## 10. Skills

Pobiera listę wszystkich umiejętności ze statystykami.

```http
GET /api/skills
```

### Response

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
    },
    {
      "name": "JavaScript",
      "type": "Frontend",
      "level": "language",
      "peopleCount": 12,
      "avgYears": "5.2"
    },
    {
      "name": "Java",
      "type": "Backend",
      "level": "language",
      "peopleCount": 6,
      "avgYears": "6.8"
    }
  ]
}
```

### Skill Types

| Type | Description |
|------|-------------|
| Frontend | Technologie frontendowe |
| Backend | Technologie backendowe |
| DevOps | Narzędzia DevOps |
| Cloud | Platformy chmurowe |
| Database | Bazy danych |
| API | Technologie API |
| Management | Metodyki zarządzania |

### Skill Levels

| Level | Description |
|-------|-------------|
| language | Język programowania |
| framework | Framework |
| tool | Narzędzie |
| platform | Platforma |
| database | Baza danych |
| technology | Technologia |
| methodology | Metodyka |
| practice | Praktyka |

---

## 11. Statistics

Pobiera zagregowane statystyki HR dla dashboardu.

```http
GET /api/stats
```

### Response

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
    {"skill": "React", "count": 8},
    {"skill": "Node.js", "count": 7},
    {"skill": "PostgreSQL", "count": 6},
    {"skill": "Docker", "count": 5},
    {"skill": "TypeScript", "count": 5},
    {"skill": "Java", "count": 4},
    {"skill": "Python", "count": 4},
    {"skill": "AWS", "count": 3},
    {"skill": "Kubernetes", "count": 3}
  ]
}
```

---

## 12. Search

Globalne wyszukiwanie pracowników po nazwisku, roli lub umiejętnościach.

```http
GET /api/search
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | ✅ Yes | Fraza wyszukiwania |

### Examples

```http
GET /api/search?q=React      # Search by skill
GET /api/search?q=Senior     # Search by seniority
GET /api/search?q=Kowalska   # Search by name
```

### Response

```json
{
  "searchTerm": "React",
  "total": 8,
  "results": [
    {
      "person": "Anna Kowalska",
      "role": "Senior Full-Stack Developer",
      "seniority": "Senior",
      "available": true,
      "skills": ["React", "Node.js", "JavaScript", "TypeScript", "PostgreSQL", "Docker"]
    }
  ]
}
```

---

## Error Responses

Wszystkie błędy zwracane są w jednolitym formacie:

```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (missing parameters) |
| 404 | Not Found |
| 500 | Internal Server Error |

### Examples

```json
// 400 Bad Request
{
  "error": "Parameter 'skills' is required"
}

// 404 Not Found
{
  "error": "Person not found"
}

// 500 Internal Server Error
{
  "error": "Database connection failed"
}
```

---

## Example Use Cases

### Use Case 1: Build Team for New Mobile Project

```bash
# 1. Check required skills
curl "https://skillgraph-174e.onrender.com/api/skills"

# 2. Get team recommendations
curl "https://skillgraph-174e.onrender.com/api/team-recommendations?skills=React,Node.js,Docker,AWS&teamSize=4"

# 3. Check availability of specific expert
curl "https://skillgraph-174e.onrender.com/api/experts/React"
```

### Use Case 2: Find Replacement for Team Member

```bash
# 1. Check person's skills
curl "https://skillgraph-174e.onrender.com/api/search?q=Kowalska"

# 2. Find experts with same skills
curl "https://skillgraph-174e.onrender.com/api/experts/React"
curl "https://skillgraph-174e.onrender.com/api/experts/Node.js"

# 3. Check their network
curl "https://skillgraph-174e.onrender.com/api/network/Anna%20Kowalska"
```

### Use Case 3: Project Planning Dashboard

```bash
# 1. Get overall statistics
curl "https://skillgraph-174e.onrender.com/api/stats"

# 2. Check available people
curl "https://skillgraph-174e.onrender.com/api/people/available"

# 3. Review planned projects
curl "https://skillgraph-174e.onrender.com/api/projects?status=planned"
```

---

## Rate Limits

Currently no rate limits are applied. This may change in future versions.

---

## Changelog

### v2.0 (Current)
- Added team recommendations algorithm
- Added project matching
- Added network analysis
- Improved statistics endpoint
- Added search functionality

### v1.0
- Initial release
- Basic CRUD operations
- Graph visualization data

---

## Support

For issues or questions, please open an issue in the GitHub repository.