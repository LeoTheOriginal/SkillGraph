require('dotenv').config();
const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

const app = express();
app.use(cors()); // Pozwala frontendowi łączyć się z innego portu
app.use(express.json());

// 1. Połączenie z bazą
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Funkcja pomocnicza do zamykania sesji
async function runQuery(query, params = {}) {
    const session = driver.session();
    try {
        const result = await session.run(query, params);
        return result.records;
    } finally {
        await session.close();
    }
}

// --- ENDPOINTY ---

// A. Test - czy działa
app.get('/', (req, res) => {
    res.send('SkillGraph API działa! 🚀');
});

// B. Pobierz cały graf (do wizualizacji)
app.get('/api/graph', async (req, res) => {
    try {
        // Pobieramy wszystkie węzły i relacje
        const query = `
            MATCH (n)-[r]->(m)
            RETURN n, r, m
            LIMIT 100
        `;
        const records = await runQuery(query);

        // Formatujemy dane pod bibliotekę 'react-force-graph', której użyjemy na froncie
        const nodes = new Map();
        const links = [];

        records.forEach(record => {
            const n = record.get('n'); // Węzeł źródłowy
            const m = record.get('m'); // Węzeł docelowy
            const r = record.get('r'); // Relacja

            // Dodajemy węzły do Mapy (żeby uniknąć duplikatów)
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

            // Dodajemy krawędź
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
        res.status(500).send(error.message);
    }
});

// C. Wyszukiwarka - znajdź ludzi znających daną technologię
app.get('/api/search', async (req, res) => {
    const skillName = req.query.q; // np. ?q=Java
    if (!skillName) return res.status(400).send("Podaj parametr q");

    const query = `
        MATCH (p:Person)-[:HAS_SKILL]->(s:Skill)
        WHERE toLower(s.name) CONTAINS toLower($skillName)
        RETURN p, s
    `;

    try {
        const records = await runQuery(query, { skillName });
        const results = records.map(record => ({
            person: record.get('p').properties,
            skill: record.get('s').properties
        }));
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});