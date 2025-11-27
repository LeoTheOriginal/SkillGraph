require('dotenv').config();
const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

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

// --- BASIC ENDPOINTS ---

app.get('/', (req, res) => {
    res.json({
        message: '🚀 SkillGraph API - HR Management System',
        version: '2.0',
        endpoints: {
            graph: '/api/graph',
            people: '/api/people',
            available: '/api/people/available',
            experts: '/api/experts/:skill',
            teamRecommendations: '/api/team-recommendations',
            projectMatch: '/api/project-match/:projectName',
            network: '/api/network/:personName',
            projects: '/api/projects',
            skills: '/api/skills',
            stats: '/api/stats',
            search: '/api/search?q=...'
        }
    });
});

// --- GRAF 3D (oryginalny endpoint) ---
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

            nodes.set(n.identity.toString(), { 
                id: n.identity.toString(), 
                label: n.labels[0], 
                ...n.properties 
            });
            nodes.set(m.identity.toString(), { 
                id: m.identity.toString(), 
                label: m.labels[0], 
                ...m.properties 
            });

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
        console.error(error);
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
        
        const people = records.map(record => ({
            name: record.get('name'),
            role: record.get('role'),
            seniority: record.get('seniority'),
            yearsExp: record.get('yearsExp'),
            available: record.get('available'),
            skills: record.get('skills').filter(s => s.name),
            projects: record.get('projects').filter(p => p.name)
        }));

        res.json({
            total: people.length,
            people: people
        });
    } catch (error) {
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
        
        const available = records.map(record => ({
            name: record.get('name'),
            role: record.get('role'),
            seniority: record.get('seniority'),
            yearsExp: record.get('yearsExp'),
            skills: record.get('skills').filter(s => s.name)
        }));

        res.json({
            total: available.length,
            available: available
        });
    } catch (error) {
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
        
        const experts = records.map(record => ({
            name: record.get('name'),
            role: record.get('role'),
            seniority: record.get('seniority'),
            yearsExp: record.get('yearsExp'),
            available: record.get('available'),
            skill: record.get('skill'),
            skillYears: record.get('skillYears'),
            proficiency: record.get('proficiency')
        }));

        res.json({
            skill: skillName,
            total: experts.length,
            experts: experts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- REKOMENDACJE ZESPOŁU DO PROJEKTU ---
app.get('/api/team-recommendations', async (req, res) => {
    try {
        const { project, skills, teamSize } = req.query;
        
        if (!skills) {
            return res.status(400).json({ error: 'Parameter "skills" is required (comma-separated)' });
        }

        const requiredSkills = skills.split(',').map(s => s.trim());
        const size = parseInt(teamSize) || 5;

        const query = `
            MATCH (p:Person {available: true})-[hs:HAS_SKILL]->(s:Skill)
            WHERE s.name IN $skills
            WITH p, 
                 count(DISTINCT s) as matchedSkills,
                 collect(DISTINCT {name: s.name, years: hs.years, proficiency: hs.proficiency}) as skills,
                 avg(hs.years) as avgSkillYears
            RETURN p.name as name,
                   p.role as role,
                   p.seniority as seniority,
                   p.yearsExp as yearsExp,
                   matchedSkills,
                   skills,
                   avgSkillYears,
                   (matchedSkills * 1.0 / $totalSkills) as matchScore
            ORDER BY matchScore DESC, p.seniority DESC, avgSkillYears DESC
            LIMIT $teamSize
        `;
        
        const records = await runQuery(query, { 
            skills: requiredSkills,
            totalSkills: requiredSkills.length,
            teamSize: size
        });
        
        const recommendations = records.map(record => ({
            name: record.get('name'),
            role: record.get('role'),
            seniority: record.get('seniority'),
            yearsExp: record.get('yearsExp'),
            matchedSkills: record.get('matchedSkills').toInt(),
            skills: record.get('skills'),
            avgSkillYears: record.get('avgSkillYears'),
            matchScore: (record.get('matchScore') * 100).toFixed(1) + '%'
        }));

        res.json({
            project: project || 'New Project',
            requiredSkills: requiredSkills,
            teamSize: size,
            recommendations: recommendations
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- DOPASOWANIE DO KONKRETNEGO PROJEKTU ---
app.get('/api/project-match/:projectName', async (req, res) => {
    try {
        const projectName = req.params.projectName;
        
        const query = `
            MATCH (proj:Project)
            WHERE toLower(proj.name) CONTAINS toLower($projectName)
            OPTIONAL MATCH (proj)-[:REQUIRES]->(s:Skill)
            WITH proj, collect(s.name) as requiredSkills
            
            MATCH (p:Person {available: true})-[hs:HAS_SKILL]->(skill:Skill)
            WHERE skill.name IN requiredSkills
            WITH proj, requiredSkills, p,
                 count(DISTINCT skill) as matchedSkills,
                 collect(DISTINCT {name: skill.name, years: hs.years, proficiency: hs.proficiency}) as personSkills
            
            RETURN proj.name as projectName,
                   proj.description as description,
                   proj.status as status,
                   proj.team_size as teamSize,
                   requiredSkills,
                   p.name as personName,
                   p.role as role,
                   p.seniority as seniority,
                   matchedSkills,
                   personSkills,
                   (matchedSkills * 100.0 / size(requiredSkills)) as matchPercentage
            ORDER BY matchPercentage DESC, p.seniority DESC
            LIMIT 10
        `;
        
        const records = await runQuery(query, { projectName });
        
        if (records.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const projectInfo = {
            name: records[0].get('projectName'),
            description: records[0].get('description'),
            status: records[0].get('status'),
            teamSize: records[0].get('teamSize'),
            requiredSkills: records[0].get('requiredSkills')
        };

        const candidates = records.map(record => ({
            name: record.get('personName'),
            role: record.get('role'),
            seniority: record.get('seniority'),
            matchedSkills: record.get('matchedSkills').toInt(),
            skills: record.get('personSkills'),
            matchPercentage: record.get('matchPercentage').toFixed(1) + '%'
        }));

        res.json({
            project: projectInfo,
            candidates: candidates
        });
    } catch (error) {
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

        const result = {
            person: records[0].get('person'),
            role: records[0].get('role'),
            network: records[0].get('network').filter(n => n.name),
            networkSize: records[0].get('network').filter(n => n.name).length
        };

        res.json(result);
    } catch (error) {
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
        
        const projects = records.map(record => ({
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
        }));

        res.json({
            total: projects.length,
            projects: projects
        });
    } catch (error) {
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
        
        const skills = records.map(record => ({
            name: record.get('name'),
            type: record.get('type'),
            level: record.get('level'),
            peopleCount: record.get('peopleCount').toInt(),
            avgYears: record.get('avgYears') ? record.get('avgYears').toFixed(1) : 0
        }));

        res.json({
            total: skills.length,
            skills: skills
        });
    } catch (error) {
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
        stats.totalPeople = records[0].get('count').toInt();
        
        // Available people
        records = await runQuery(queries.availablePeople);
        stats.availablePeople = records[0].get('count').toInt();
        
        // Total projects
        records = await runQuery(queries.totalProjects);
        stats.totalProjects = records[0].get('count').toInt();
        
        // Active projects
        records = await runQuery(queries.activeProjects);
        stats.activeProjects = records[0].get('count').toInt();
        
        // Total skills
        records = await runQuery(queries.totalSkills);
        stats.totalSkills = records[0].get('count').toInt();
        
        // Seniority distribution
        records = await runQuery(queries.seniorityDistribution);
        stats.seniorityDistribution = records.map(r => ({
            seniority: r.get('seniority'),
            count: r.get('count').toInt()
        }));
        
        // Top skills
        records = await runQuery(queries.topSkills);
        stats.topSkills = records.map(r => ({
            skill: r.get('skill'),
            count: r.get('count').toInt()
        }));

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- WYSZUKIWARKA (oryginalna) ---
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
        const results = records.map(record => ({
            person: record.get('person'),
            role: record.get('role'),
            seniority: record.get('seniority'),
            skills: record.get('skills')
        }));
        res.json({
            searchTerm: searchTerm,
            results: results
        });
    } catch (error) {
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
    await driver.close();
    process.exit(0);
});