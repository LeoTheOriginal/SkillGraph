require('dotenv').config();
const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

// ============================================
// FUNKCJA KONWERSJI NEO4J INTEGERS
// ============================================
function convertNeo4jIntegers(obj) {
  if (obj === null || obj === undefined) return obj;
  
  // Konwertuj Neo4j Integer na zwykłą liczbę
  if (neo4j.isInt(obj)) {
    return obj.toNumber();
  }
  
  // Rekurencyjnie przetwarzaj tablice
  if (Array.isArray(obj)) {
    return obj.map(convertNeo4jIntegers);
  }
  
  // Rekurencyjnie przetwarzaj obiekty
  if (typeof obj === 'object') {
    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertNeo4jIntegers(value);
    }
    return converted;
  }
  
  return obj;
}

const app = express();
app.use(cors());
app.use(express.json());

// Połączenie z Neo4j
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Funkcja pomocnicza do wykonywania zapytań
async function runQuery(query, params = {}) {
    const session = driver.session();
    try {
        const result = await session.run(query, params);
        return result.records;
    } finally {
        await session.close();
    }
}

// ============================================
// ENDPOINTY API
// ============================================

// --- HEALTH CHECK ---
app.get('/', (req, res) => {
    res.json({
        message: '🚀 SkillGraph API - HR Management System',
        version: '2.0',
        endpoints: {
            graph: '/api/graph',
            people: '/api/people',
            available: '/api/people/available',
            experts: '/api/experts/:skill',
            teamRecommendations: '/api/team-recommendations?skills=React,Node.js&teamSize=5',
            projectMatch: '/api/project-match/:projectName',
            network: '/api/network/:personName',
            projects: '/api/projects?status=active',
            skills: '/api/skills',
            stats: '/api/stats',
            search: '/api/search?q=React'
        }
    });
});

// --- GRAF 3D ---
app.get('/api/graph', async (req, res) => {
    try {
        const query = `
            MATCH (n)-[r]->(m)
            RETURN n, r, m
            LIMIT 200
        `;
        const records = await runQuery(query);

        const nodes = new Map();
        const links = [];

        records.forEach(record => {
            const n = record.get('n');
            const m = record.get('m');
            const r = record.get('r');

            // Konwertuj właściwości węzłów
            const nodeN = convertNeo4jIntegers({
                id: n.identity.toString(), 
                label: n.labels[0], 
                ...n.properties
            });
            
            const nodeM = convertNeo4jIntegers({
                id: m.identity.toString(), 
                label: m.labels[0], 
                ...m.properties
            });

            nodes.set(n.identity.toString(), nodeN);
            nodes.set(m.identity.toString(), nodeM);

            links.push({
                source: n.identity.toString(),
                target: m.identity.toString(),
                type: r.type
            });
        });

        res.json({
            nodes: Array.from(nodes.values()),
            links: links
        });
    } catch (error) {
        console.error('Error fetching graph:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- LISTA WSZYSTKICH PRACOWNIKÓW ---
app.get('/api/people', async (req, res) => {
    try {
        const query = `
            MATCH (p:Person)
            OPTIONAL MATCH (p)-[hs:HAS_SKILL]->(s:Skill)
            OPTIONAL MATCH (p)-[wo:WORKED_ON]->(proj:Project)
            WITH p, 
                 collect(DISTINCT {name: s.name, years: hs.years, proficiency: hs.proficiency}) as skills,
                 collect(DISTINCT {name: proj.name, role: wo.role, status: proj.status}) as projects
            RETURN p.name as name,
                   p.role as role,
                   p.seniority as seniority,
                   p.yearsExp as yearsExp,
                   p.available as available,
                   skills,
                   projects
            ORDER BY p.seniority DESC, p.yearsExp DESC
        `;
        const records = await runQuery(query);
        
        const people = records.map(record => {
            const person = {
                name: record.get('name'),
                role: record.get('role'),
                seniority: record.get('seniority'),
                yearsExp: record.get('yearsExp'),
                available: record.get('available'),
                skills: record.get('skills').filter(s => s.name),
                projects: record.get('projects').filter(p => p.name)
            };
            
            // Konwertuj wszystkie Neo4j integers
            return convertNeo4jIntegers(person);
        });

        res.json({
            total: people.length,
            people: people
        });
    } catch (error) {
        console.error('Error fetching people:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- DOSTĘPNI PRACOWNICY ---
app.get('/api/people/available', async (req, res) => {
    try {
        const query = `
            MATCH (p:Person {available: true})
            OPTIONAL MATCH (p)-[hs:HAS_SKILL]->(s:Skill)
            WITH p, 
                 collect(DISTINCT {name: s.name, years: hs.years, proficiency: hs.proficiency}) as skills
            RETURN p.name as name,
                   p.role as role,
                   p.seniority as seniority,
                   p.yearsExp as yearsExp,
                   skills
            ORDER BY p.seniority DESC, p.yearsExp DESC
        `;
        const records = await runQuery(query);
        
        const available = records.map(record => {
            const person = {
                name: record.get('name'),
                role: record.get('role'),
                seniority: record.get('seniority'),
                yearsExp: record.get('yearsExp'),
                skills: record.get('skills').filter(s => s.name)
            };
            
            // Konwertuj wszystkie Neo4j integers
            return convertNeo4jIntegers(person);
        });

        res.json({
            total: available.length,
            available: available
        });
    } catch (error) {
        console.error('Error fetching available people:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- EKSPERCI W DANEJ TECHNOLOGII ---
app.get('/api/experts/:skill', async (req, res) => {
    try {
        const skillName = req.params.skill;
        const query = `
            MATCH (p:Person)-[hs:HAS_SKILL]->(s:Skill)
            WHERE toLower(s.name) CONTAINS toLower($skillName)
            RETURN p.name as name,
                   p.role as role,
                   p.seniority as seniority,
                   p.yearsExp as yearsExp,
                   p.available as available,
                   s.name as skill,
                   hs.years as skillYears,
                   hs.proficiency as proficiency
            ORDER BY hs.proficiency DESC, hs.years DESC
        `;
        const records = await runQuery(query, { skillName });
        
        const experts = records.map(record => {
            const expert = {
                name: record.get('name'),
                role: record.get('role'),
                seniority: record.get('seniority'),
                yearsExp: record.get('yearsExp'),
                available: record.get('available'),
                skill: record.get('skill'),
                skillYears: record.get('skillYears'),
                proficiency: record.get('proficiency')
            };
            
            // Konwertuj wszystkie Neo4j integers
            return convertNeo4jIntegers(expert);
        });

        res.json({
            skill: skillName,
            total: experts.length,
            experts: experts
        });
    } catch (error) {
        console.error('Error fetching experts:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- REKOMENDACJE ZESPOŁU DO PROJEKTU ---
app.get('/api/team-recommendations', async (req, res) => {
    try {
        const { skills, teamSize } = req.query;
        
        if (!skills) {
            return res.status(400).json({ error: 'Parameter "skills" is required (comma-separated)' });
        }

        const requestedSkills = skills.split(',').map(s => s.trim());
        const size = parseInt(teamSize) || 5;

        const query = `
            MATCH (p:Person {available: true})
            OPTIONAL MATCH (p)-[hs:HAS_SKILL]->(s:Skill)
            WHERE s.name IN $requestedSkills
            WITH p, 
                 collect(DISTINCT s.name) as matchedSkills,
                 collect(DISTINCT {name: s.name, years: hs.years, proficiency: hs.proficiency}) as allSkills
            WHERE size(matchedSkills) > 0
            RETURN p.name as name,
                   p.role as role,
                   p.seniority as seniority,
                   p.yearsExp as yearsExp,
                   matchedSkills,
                   allSkills,
                   size(matchedSkills) as matchCount,
                   (size(matchedSkills) * 100.0 / $totalRequired) as matchPercentage
            ORDER BY matchCount DESC, p.seniority DESC, p.yearsExp DESC
            LIMIT $limit
        `;

        const records = await runQuery(query, { 
            requestedSkills, 
            totalRequired: requestedSkills.length,
            limit: neo4j.int(size)
        });

        const recommendations = records.map(record => {
            const rec = {
                name: record.get('name'),
                role: record.get('role'),
                seniority: record.get('seniority'),
                yearsExp: record.get('yearsExp'),
                matchedSkills: record.get('matchedSkills'),
                allSkills: record.get('allSkills'),
                matchScore: Math.round(record.get('matchPercentage'))
            };
            
            // Konwertuj wszystkie Neo4j integers
            return convertNeo4jIntegers(rec);
        });

        res.json({
            requestedSkills: requestedSkills,
            teamSize: size,
            found: recommendations.length,
            recommendations: recommendations
        });
    } catch (error) {
        console.error('Error fetching team recommendations:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- DOPASOWANIE KANDYDATÓW DO PROJEKTU ---
app.get('/api/project-match/:projectName', async (req, res) => {
    try {
        const projectName = req.params.projectName;
        
        const query = `
            MATCH (proj:Project)
            WHERE toLower(proj.name) CONTAINS toLower($projectName)
            MATCH (proj)-[:REQUIRES]->(s:Skill)
            WITH proj, collect(DISTINCT s.name) as requiredSkills
            MATCH (p:Person {available: true})
            OPTIONAL MATCH (p)-[:HAS_SKILL]->(ps:Skill)
            WHERE ps.name IN requiredSkills
            WITH proj, requiredSkills, p,
                 collect(DISTINCT ps.name) as matchedSkills,
                 size(collect(DISTINCT ps.name)) as matchCount
            WHERE matchCount > 0
            RETURN proj.name as project,
                   requiredSkills,
                   p.name as candidate,
                   p.role as role,
                   p.seniority as seniority,
                   matchedSkills,
                   (matchCount * 100.0 / size(requiredSkills)) as matchPercentage
            ORDER BY matchPercentage DESC, p.seniority DESC
        `;

        const records = await runQuery(query, { projectName });

        if (records.length === 0) {
            return res.status(404).json({ error: 'Project not found or no matching candidates' });
        }

        const result = {
            project: records[0].get('project'),
            requiredSkills: records[0].get('requiredSkills'),
            candidates: records.map(record => {
                const candidate = {
                    name: record.get('candidate'),
                    role: record.get('role'),
                    seniority: record.get('seniority'),
                    matchedSkills: record.get('matchedSkills'),
                    matchPercentage: Math.round(record.get('matchPercentage'))
                };
                
                // Konwertuj wszystkie Neo4j integers
                return convertNeo4jIntegers(candidate);
            })
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching project match:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- SIEĆ KONTAKTÓW PRACOWNIKA ---
app.get('/api/network/:personName', async (req, res) => {
    try {
        const personName = req.params.personName;
        
        const query = `
            MATCH (p:Person)
            WHERE toLower(p.name) CONTAINS toLower($personName)
            OPTIONAL MATCH (p)-[k:KNOWS]-(colleague:Person)
            RETURN p.name as person,
                   p.role as role,
                   collect(DISTINCT {
                       name: colleague.name, 
                       role: colleague.role,
                       since: k.since,
                       strength: k.strength
                   }) as network
        `;
        
        const records = await runQuery(query, { personName });
        
        if (records.length === 0) {
            return res.status(404).json({ error: 'Person not found' });
        }

        const networkData = {
            person: records[0].get('person'),
            role: records[0].get('role'),
            network: records[0].get('network').filter(n => n.name),
            networkSize: records[0].get('network').filter(n => n.name).length
        };

        // Konwertuj wszystkie Neo4j integers
        res.json(convertNeo4jIntegers(networkData));
    } catch (error) {
        console.error('Error fetching network:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- LISTA PROJEKTÓW ---
app.get('/api/projects', async (req, res) => {
    try {
        const { status } = req.query;
        
        let query = `
            MATCH (proj:Project)
            ${status ? 'WHERE proj.status = $status' : ''}
            OPTIONAL MATCH (proj)-[:REQUIRES]->(s:Skill)
            OPTIONAL MATCH (p:Person)-[wo:WORKED_ON]->(proj)
            OPTIONAL MATCH (proj)-[:BELONGS_TO]->(c:Company)
            WITH proj, c,
                 collect(DISTINCT s.name) as requiredSkills,
                 collect(DISTINCT {name: p.name, role: wo.role}) as team
            RETURN proj.name as name,
                   proj.status as status,
                   proj.description as description,
                   proj.budget as budget,
                   proj.team_size as teamSize,
                   proj.startDate as startDate,
                   proj.endDate as endDate,
                   c.name as client,
                   requiredSkills,
                   team
            ORDER BY proj.status, proj.startDate DESC
        `;
        
        const records = await runQuery(query, { status });
        
        const projects = records.map(record => {
            const project = {
                name: record.get('name'),
                status: record.get('status'),
                description: record.get('description'),
                budget: record.get('budget'),
                teamSize: record.get('teamSize'),
                startDate: record.get('startDate'),
                endDate: record.get('endDate'),
                client: record.get('client'),
                requiredSkills: record.get('requiredSkills'),
                currentTeam: record.get('team').filter(t => t.name)
            };
            
            // Konwertuj wszystkie Neo4j integers
            return convertNeo4jIntegers(project);
        });

        res.json({
            total: projects.length,
            projects: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- LISTA UMIEJĘTNOŚCI ---
app.get('/api/skills', async (req, res) => {
    try {
        const query = `
            MATCH (s:Skill)
            OPTIONAL MATCH (p:Person)-[hs:HAS_SKILL]->(s)
            WITH s, count(p) as peopleCount, avg(hs.years) as avgYears
            RETURN s.name as name,
                   s.type as type,
                   s.level as level,
                   peopleCount,
                   avgYears
            ORDER BY s.type, peopleCount DESC
        `;
        
        const records = await runQuery(query);
        
        const skills = records.map(record => {
            const skill = {
                name: record.get('name'),
                type: record.get('type'),
                level: record.get('level'),
                peopleCount: record.get('peopleCount'),
                avgYears: record.get('avgYears') ? parseFloat(record.get('avgYears').toFixed(1)) : 0
            };
            
            // Konwertuj wszystkie Neo4j integers
            return convertNeo4jIntegers(skill);
        });

        res.json({
            total: skills.length,
            skills: skills
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- STATYSTYKI ---
app.get('/api/stats', async (req, res) => {
    try {
        const queries = {
            totalPeople: `MATCH (p:Person) RETURN count(p) as count`,
            availablePeople: `MATCH (p:Person {available: true}) RETURN count(p) as count`,
            totalProjects: `MATCH (proj:Project) RETURN count(proj) as count`,
            activeProjects: `MATCH (proj:Project {status: 'active'}) RETURN count(proj) as count`,
            totalSkills: `MATCH (s:Skill) RETURN count(s) as count`,
            seniorityDistribution: `
                MATCH (p:Person)
                RETURN p.seniority as seniority, count(p) as count
                ORDER BY count DESC
            `,
            topSkills: `
                MATCH (p:Person)-[:HAS_SKILL]->(s:Skill)
                RETURN s.name as skill, count(p) as count
                ORDER BY count DESC
                LIMIT 10
            `
        };

        const stats = {};
        
        // Total people
        let records = await runQuery(queries.totalPeople);
        stats.totalPeople = convertNeo4jIntegers(records[0].get('count'));
        
        // Available people
        records = await runQuery(queries.availablePeople);
        stats.availablePeople = convertNeo4jIntegers(records[0].get('count'));
        
        // Total projects
        records = await runQuery(queries.totalProjects);
        stats.totalProjects = convertNeo4jIntegers(records[0].get('count'));
        
        // Active projects
        records = await runQuery(queries.activeProjects);
        stats.activeProjects = convertNeo4jIntegers(records[0].get('count'));
        
        // Total skills
        records = await runQuery(queries.totalSkills);
        stats.totalSkills = convertNeo4jIntegers(records[0].get('count'));
        
        // Seniority distribution
        records = await runQuery(queries.seniorityDistribution);
        stats.seniorityDistribution = records.map(r => ({
            seniority: r.get('seniority'),
            count: convertNeo4jIntegers(r.get('count'))
        }));
        
        // Top skills
        records = await runQuery(queries.topSkills);
        stats.topSkills = records.map(r => ({
            skill: r.get('skill'),
            count: convertNeo4jIntegers(r.get('count'))
        }));

        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- WYSZUKIWARKA ---
app.get('/api/search', async (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) return res.status(400).json({ error: "Parameter 'q' is required" });

    const query = `
        MATCH (p:Person)-[:HAS_SKILL]->(s:Skill)
        WHERE toLower(s.name) CONTAINS toLower($searchTerm)
           OR toLower(p.name) CONTAINS toLower($searchTerm)
           OR toLower(p.role) CONTAINS toLower($searchTerm)
        RETURN DISTINCT p.name as person,
               p.role as role,
               p.seniority as seniority,
               collect(DISTINCT s.name) as skills
    `;

    try {
        const records = await runQuery(query, { searchTerm });
        const results = records.map(record => {
            const result = {
                person: record.get('person'),
                role: record.get('role'),
                seniority: record.get('seniority'),
                skills: record.get('skills')
            };
            
            // Konwertuj wszystkie Neo4j integers
            return convertNeo4jIntegers(result);
        });
        
        res.json({
            searchTerm: searchTerm,
            results: results
        });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: error.message });
    }
});


// ============================================
// START SERWERA
// ============================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 SkillGraph API running on port ${port}`);
    console.log(`📊 Health check: http://localhost:${port}/`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await driver.close();
    console.log('✅ Neo4j driver closed');
    process.exit(0);
});