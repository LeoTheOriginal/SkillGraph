// ========================================
// SKILLGRAPH - SEED DATABASE
// Software House: "TechCraft Solutions"
// ========================================

// Czyszczenie bazy (UWAGA: usuwa wszystko!)
MATCH (n) DETACH DELETE n;

// ========================================
// 1. FIRMY
// ========================================
CREATE (tc:Company {name: 'TechCraft Solutions', location: 'Warsaw', size: 45})
CREATE (client1:Company {name: 'FinanceApp Corp', location: 'London', size: 200})
CREATE (client2:Company {name: 'RetailCloud Inc', location: 'Berlin', size: 150})
CREATE (client3:Company {name: 'HealthTech GmbH', location: 'Munich', size: 80});

// ========================================
// 2. UMIEJĘTNOŚCI
// ========================================

// Backend
CREATE (java:Skill {name: 'Java', type: 'Backend', level: 'language'})
CREATE (python:Skill {name: 'Python', type: 'Backend', level: 'language'})
CREATE (node:Skill {name: 'Node.js', type: 'Backend', level: 'framework'})
CREATE (spring:Skill {name: 'Spring Boot', type: 'Backend', level: 'framework'})
CREATE (django:Skill {name: 'Django', type: 'Backend', level: 'framework'})
CREATE (express:Skill {name: 'Express.js', type: 'Backend', level: 'framework'})

// Frontend
CREATE (react:Skill {name: 'React', type: 'Frontend', level: 'framework'})
CREATE (vue:Skill {name: 'Vue.js', type: 'Frontend', level: 'framework'})
CREATE (angular:Skill {name: 'Angular', type: 'Frontend', level: 'framework'})
CREATE (ts:Skill {name: 'TypeScript', type: 'Frontend', level: 'language'})
CREATE (js:Skill {name: 'JavaScript', type: 'Frontend', level: 'language'})

// DevOps
CREATE (docker:Skill {name: 'Docker', type: 'DevOps', level: 'tool'})
CREATE (k8s:Skill {name: 'Kubernetes', type: 'DevOps', level: 'tool'})
CREATE (aws:Skill {name: 'AWS', type: 'Cloud', level: 'platform'})
CREATE (azure:Skill {name: 'Azure', type: 'Cloud', level: 'platform'})
CREATE (terraform:Skill {name: 'Terraform', type: 'DevOps', level: 'tool'})

// Databases
CREATE (postgres:Skill {name: 'PostgreSQL', type: 'Database', level: 'database'})
CREATE (mongo:Skill {name: 'MongoDB', type: 'Database', level: 'database'})
CREATE (redis:Skill {name: 'Redis', type: 'Database', level: 'database'})
CREATE (neo4jSkill:Skill {name: 'Neo4j', type: 'Database', level: 'database'})

// Other
CREATE (graphql:Skill {name: 'GraphQL', type: 'API', level: 'technology'})
CREATE (rest:Skill {name: 'REST API', type: 'API', level: 'technology'})
CREATE (agile:Skill {name: 'Agile/Scrum', type: 'Management', level: 'methodology'})
CREATE (ci:Skill {name: 'CI/CD', type: 'DevOps', level: 'practice'});

// ========================================
// 3. PRACOWNICY (30 osób)
// ========================================

// Senior Developers
CREATE (anna:Person {name: 'Anna Kowalska', role: 'Senior Full-Stack Developer', seniority: 'Senior', yearsExp: 8, available: true})
CREATE (jan:Person {name: 'Jan Nowak', role: 'Senior Backend Developer', seniority: 'Senior', yearsExp: 10, available: false})
CREATE (maria:Person {name: 'Maria Wiśniewska', role: 'Senior Frontend Developer', seniority: 'Senior', yearsExp: 7, available: true})
CREATE (piotr:Person {name: 'Piotr Lewandowski', role: 'DevOps Engineer', seniority: 'Senior', yearsExp: 9, available: true})
CREATE (kasia:Person {name: 'Katarzyna Dąbrowska', role: 'Tech Lead', seniority: 'Senior', yearsExp: 12, available: false})

// Mid-level Developers
CREATE (tomek:Person {name: 'Tomasz Zieliński', role: 'Backend Developer', seniority: 'Mid', yearsExp: 5, available: true})
CREATE (ola:Person {name: 'Aleksandra Szymańska', role: 'Frontend Developer', seniority: 'Mid', yearsExp: 4, available: true})
CREATE (adam:Person {name: 'Adam Woźniak', role: 'Full-Stack Developer', seniority: 'Mid', yearsExp: 5, available: true})
CREATE (ewa:Person {name: 'Ewa Kozłowska', role: 'Backend Developer', seniority: 'Mid', yearsExp: 4, available: false})
CREATE (michał:Person {name: 'Michał Jankowski', role: 'Frontend Developer', seniority: 'Mid', yearsExp: 3, available: true})
CREATE (agnieszka:Person {name: 'Agnieszka Mazur', role: 'Full-Stack Developer', seniority: 'Mid', yearsExp: 4, available: true})
CREATE (łukasz:Person {name: 'Łukasz Krawczyk', role: 'DevOps Engineer', seniority: 'Mid', yearsExp: 5, available: true})
CREATE (natalia:Person {name: 'Natalia Piotrkowska', role: 'Backend Developer', seniority: 'Mid', yearsExp: 4, available: true})
CREATE (bartosz:Person {name: 'Bartosz Grabowski', role: 'Frontend Developer', seniority: 'Mid', yearsExp: 3, available: true})

// Junior Developers
CREATE (zofia:Person {name: 'Zofia Pawlak', role: 'Junior Full-Stack Developer', seniority: 'Junior', yearsExp: 1, available: true})
CREATE (mateusz:Person {name: 'Mateusz Michalski', role: 'Junior Backend Developer', seniority: 'Junior', yearsExp: 1, available: true})
CREATE (julia:Person {name: 'Julia Wróbel', role: 'Junior Frontend Developer', seniority: 'Junior', yearsExp: 2, available: true})
CREATE (kamil:Person {name: 'Kamil Król', role: 'Junior Backend Developer', seniority: 'Junior', yearsExp: 1, available: true})
CREATE (paulina:Person {name: 'Paulina Witkowska', role: 'Junior Frontend Developer', seniority: 'Junior', yearsExp: 1, available: true})
CREATE (dawid:Person {name: 'Dawid Walczak', role: 'Junior DevOps', seniority: 'Junior', yearsExp: 1, available: true})

// QA & Others
CREATE (magda:Person {name: 'Magdalena Kamiń ska', role: 'QA Engineer', seniority: 'Mid', yearsExp: 4, available: true})
CREATE (robert:Person {name: 'Robert Kowalczyk', role: 'QA Lead', seniority: 'Senior', yearsExp: 6, available: false})
CREATE (karolina:Person {name: 'Karolina Zając', role: 'Scrum Master', seniority: 'Mid', yearsExp: 5, available: true})
CREATE (sebastian:Person {name: 'Sebastian Adamczyk', role: 'Product Owner', seniority: 'Senior', yearsExp: 8, available: true})

// Architects & Management
CREATE (grzegorz:Person {name: 'Grzegorz Dudek', role: 'Solutions Architect', seniority: 'Senior', yearsExp: 15, available: false})
CREATE (monika:Person {name: 'Monika Nowakowska', role: 'Engineering Manager', seniority: 'Senior', yearsExp: 11, available: true})
CREATE (paweł:Person {name: 'Paweł Sikora', role: 'CTO', seniority: 'Senior', yearsExp: 18, available: false})
CREATE (alicja:Person {name: 'Alicja Bąk', role: 'Junior Backend Developer', seniority: 'Junior', yearsExp: 1, available: true})
CREATE (jakub:Person {name: 'Jakub Szewczyk', role: 'Mid Frontend Developer', seniority: 'Mid', yearsExp: 3, available: true})
CREATE (weronika:Person {name: 'Weronika Kucharska', role: 'Junior Full-Stack Developer', seniority: 'Junior', yearsExp: 2, available: true});

// ========================================
// 4. PROJEKTY
// ========================================

// Aktywne projekty
CREATE (p1:Project {
  name: 'FinanceApp Mobile', 
  status: 'active', 
  startDate: '2024-01-15',
  budget: 250000,
  team_size: 6,
  duration_months: 8,
  description: 'Mobile banking application for iOS and Android'
})

CREATE (p2:Project {
  name: 'RetailCloud Platform', 
  status: 'active',
  startDate: '2023-10-01',
  budget: 500000,
  team_size: 10,
  duration_months: 12,
  description: 'E-commerce platform with microservices architecture'
})

CREATE (p3:Project {
  name: 'HealthTech Dashboard', 
  status: 'active',
  startDate: '2024-03-01',
  budget: 180000,
  team_size: 5,
  duration_months: 6,
  description: 'Healthcare analytics dashboard for doctors'
})

// Zakończone projekty
CREATE (p4:Project {
  name: 'TechCraft Internal CRM', 
  status: 'completed',
  startDate: '2023-01-10',
  endDate: '2023-08-30',
  budget: 120000,
  team_size: 4,
  duration_months: 8,
  description: 'Internal CRM system for managing clients'
})

CREATE (p5:Project {
  name: 'Legacy Migration Project', 
  status: 'completed',
  startDate: '2023-03-01',
  endDate: '2023-11-15',
  budget: 350000,
  team_size: 8,
  duration_months: 9,
  description: 'Migration from monolith to microservices'
})

// Planowane
CREATE (p6:Project {
  name: 'AI Chatbot Integration', 
  status: 'planned',
  startDate: '2024-06-01',
  budget: 200000,
  team_size: 5,
  duration_months: 6,
  description: 'Integration of AI chatbot for customer service'
})

CREATE (p7:Project {
  name: 'Blockchain Payment System', 
  status: 'planned',
  startDate: '2024-07-01',
  budget: 400000,
  team_size: 7,
  duration_months: 10,
  description: 'Blockchain-based payment processing system'
});

// ========================================
// 5. RELACJE: PROJEKTY <-> FIRMY
// ========================================
CREATE (p1)-[:BELONGS_TO]->(client1)
CREATE (p2)-[:BELONGS_TO]->(client2)
CREATE (p3)-[:BELONGS_TO]->(client3)
CREATE (p4)-[:BELONGS_TO]->(tc)
CREATE (p5)-[:BELONGS_TO]->(client2)
CREATE (p6)-[:BELONGS_TO]->(client1)
CREATE (p7)-[:BELONGS_TO]->(client3);

// ========================================
// 6. RELACJE: PROJEKTY -> WYMAGANE UMIEJĘTNOŚCI
// ========================================

// FinanceApp Mobile
CREATE (p1)-[:REQUIRES {priority: 'high'}]->(react)
CREATE (p1)-[:REQUIRES {priority: 'high'}]->(node)
CREATE (p1)-[:REQUIRES {priority: 'medium'}]->(postgres)
CREATE (p1)-[:REQUIRES {priority: 'medium'}]->(docker)
CREATE (p1)-[:REQUIRES {priority: 'low'}]->(aws);

// RetailCloud Platform
CREATE (p2)-[:REQUIRES {priority: 'high'}]->(java)
CREATE (p2)-[:REQUIRES {priority: 'high'}]->(spring)
CREATE (p2)-[:REQUIRES {priority: 'high'}]->(react)
CREATE (p2)-[:REQUIRES {priority: 'high'}]->(k8s)
CREATE (p2)-[:REQUIRES {priority: 'medium'}]->(postgres)
CREATE (p2)-[:REQUIRES {priority: 'medium'}]->(redis)
CREATE (p2)-[:REQUIRES {priority: 'medium'}]->(graphql);

// HealthTech Dashboard
CREATE (p3)-[:REQUIRES {priority: 'high'}]->(vue)
CREATE (p3)-[:REQUIRES {priority: 'high'}]->(python)
CREATE (p3)-[:REQUIRES {priority: 'high'}]->(django)
CREATE (p3)-[:REQUIRES {priority: 'medium'}]->(postgres)
CREATE (p3)-[:REQUIRES {priority: 'low'}]->(docker);

// AI Chatbot (planowany)
CREATE (p6)-[:REQUIRES {priority: 'high'}]->(python)
CREATE (p6)-[:REQUIRES {priority: 'high'}]->(node)
CREATE (p6)-[:REQUIRES {priority: 'medium'}]->(docker)
CREATE (p6)-[:REQUIRES {priority: 'medium'}]->(mongo);

// ========================================
// 7. RELACJE: PRACOWNICY -> UMIEJĘTNOŚCI
// ========================================

// Anna (Senior Full-Stack)
CREATE (anna)-[:HAS_SKILL {years: 6, proficiency: 'expert'}]->(react)
CREATE (anna)-[:HAS_SKILL {years: 5, proficiency: 'expert'}]->(node)
CREATE (anna)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(js)
CREATE (anna)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(ts)
CREATE (anna)-[:HAS_SKILL {years: 5, proficiency: 'advanced'}]->(postgres)
CREATE (anna)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(docker);

// Jan (Senior Backend)
CREATE (jan)-[:HAS_SKILL {years: 9, proficiency: 'expert'}]->(java)
CREATE (jan)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(spring)
CREATE (jan)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(postgres)
CREATE (jan)-[:HAS_SKILL {years: 5, proficiency: 'advanced'}]->(docker)
CREATE (jan)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(k8s)
CREATE (jan)-[:HAS_SKILL {years: 6, proficiency: 'expert'}]->(rest);

// Maria (Senior Frontend)
CREATE (maria)-[:HAS_SKILL {years: 6, proficiency: 'expert'}]->(react)
CREATE (maria)-[:HAS_SKILL {years: 5, proficiency: 'expert'}]->(vue)
CREATE (maria)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(js)
CREATE (maria)-[:HAS_SKILL {years: 5, proficiency: 'expert'}]->(ts)
CREATE (maria)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(graphql);

// Piotr (DevOps)
CREATE (piotr)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(docker)
CREATE (piotr)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(k8s)
CREATE (piotr)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(aws)
CREATE (piotr)-[:HAS_SKILL {years: 5, proficiency: 'advanced'}]->(terraform)
CREATE (piotr)-[:HAS_SKILL {years: 6, proficiency: 'advanced'}]->(ci);

// Kasia (Tech Lead)
CREATE (kasia)-[:HAS_SKILL {years: 10, proficiency: 'expert'}]->(java)
CREATE (kasia)-[:HAS_SKILL {years: 9, proficiency: 'expert'}]->(spring)
CREATE (kasia)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(postgres)
CREATE (kasia)-[:HAS_SKILL {years: 7, proficiency: 'advanced'}]->(react)
CREATE (kasia)-[:HAS_SKILL {years: 10, proficiency: 'expert'}]->(agile);

// Tomek (Mid Backend)
CREATE (tomek)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(node)
CREATE (tomek)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(express)
CREATE (tomek)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(postgres)
CREATE (tomek)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(mongo)
CREATE (tomek)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(js);

// Ola (Mid Frontend)
CREATE (ola)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(react)
CREATE (ola)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(js)
CREATE (ola)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(ts)
CREATE (ola)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(rest);

// Adam (Mid Full-Stack)
CREATE (adam)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(vue)
CREATE (adam)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(python)
CREATE (adam)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(django)
CREATE (adam)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(postgres);

// Ewa (Mid Backend)
CREATE (ewa)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(python)
CREATE (ewa)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(django)
CREATE (ewa)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(postgres)
CREATE (ewa)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(redis);

// Michał (Mid Frontend)
CREATE (michał)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(react)
CREATE (michał)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(ts)
CREATE (michał)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(graphql);

// Agnieszka (Mid Full-Stack)
CREATE (agnieszka)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(react)
CREATE (agnieszka)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(node)
CREATE (agnieszka)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(mongo);

// Łukasz (Mid DevOps)
CREATE (łukasz)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(docker)
CREATE (łukasz)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(k8s)
CREATE (łukasz)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(azure)
CREATE (łukasz)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(ci);

// Natalia (Mid Backend)
CREATE (natalia)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(java)
CREATE (natalia)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(spring)
CREATE (natalia)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(postgres);

// Bartosz (Mid Frontend)
CREATE (bartosz)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(angular)
CREATE (bartosz)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(ts)
CREATE (bartosz)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(rest);

// Juniorzy
CREATE (zofia)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(react)
CREATE (zofia)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(node)
CREATE (zofia)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(js);

CREATE (mateusz)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(java)
CREATE (mateusz)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(spring)
CREATE (mateusz)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(postgres);

CREATE (julia)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(react)
CREATE (julia)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(js)
CREATE (julia)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(ts);

CREATE (kamil)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(python)
CREATE (kamil)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(django);

CREATE (paulina)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(vue)
CREATE (paulina)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(js);

CREATE (dawid)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(docker)
CREATE (dawid)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(aws);

CREATE (alicja)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(node)
CREATE (alicja)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(mongo);

CREATE (jakub)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(react)
CREATE (jakub)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(ts);

CREATE (weronika)-[:HAS_SKILL {years: 2, proficiency: 'beginner'}]->(vue)
CREATE (weronika)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(python);

// ========================================
// 8. RELACJE: PRACOWNICY -> PROJEKTY
// ========================================

// FinanceApp Mobile (Team: 6)
CREATE (anna)-[:WORKED_ON {role: 'Tech Lead', from: '2024-01-15', to: null}]->(p1)
CREATE (ola)-[:WORKED_ON {role: 'Frontend Dev', from: '2024-01-15', to: null}]->(p1)
CREATE (tomek)-[:WORKED_ON {role: 'Backend Dev', from: '2024-01-15', to: null}]->(p1)
CREATE (zofia)-[:WORKED_ON {role: 'Junior Dev', from: '2024-02-01', to: null}]->(p1)
CREATE (magda)-[:WORKED_ON {role: 'QA', from: '2024-01-15', to: null}]->(p1)
CREATE (karolina)-[:WORKED_ON {role: 'Scrum Master', from: '2024-01-15', to: null}]->(p1);

// RetailCloud Platform (Team: 10)
CREATE (jan)-[:WORKED_ON {role: 'Backend Lead', from: '2023-10-01', to: null}]->(p2)
CREATE (maria)-[:WORKED_ON {role: 'Frontend Lead', from: '2023-10-01', to: null}]->(p2)
CREATE (piotr)-[:WORKED_ON {role: 'DevOps', from: '2023-10-01', to: null}]->(p2)
CREATE (natalia)-[:WORKED_ON {role: 'Backend Dev', from: '2023-10-01', to: null}]->(p2)
CREATE (michał)-[:WORKED_ON {role: 'Frontend Dev', from: '2023-10-01', to: null}]->(p2)
CREATE (mateusz)-[:WORKED_ON {role: 'Junior Backend', from: '2024-01-01', to: null}]->(p2)
CREATE (julia)-[:WORKED_ON {role: 'Junior Frontend', from: '2024-01-01', to: null}]->(p2)
CREATE (robert)-[:WORKED_ON {role: 'QA Lead', from: '2023-10-01', to: null}]->(p2)
CREATE (sebastian)-[:WORKED_ON {role: 'Product Owner', from: '2023-10-01', to: null}]->(p2)
CREATE (grzegorz)-[:WORKED_ON {role: 'Architect', from: '2023-10-01', to: null}]->(p2);

// HealthTech Dashboard (Team: 5)
CREATE (adam)-[:WORKED_ON {role: 'Full-Stack Lead', from: '2024-03-01', to: null}]->(p3)
CREATE (ewa)-[:WORKED_ON {role: 'Backend Dev', from: '2024-03-01', to: null}]->(p3)
CREATE (paulina)-[:WORKED_ON {role: 'Junior Frontend', from: '2024-03-15', to: null}]->(p3)
CREATE (magda)-[:WORKED_ON {role: 'QA', from: '2024-03-01', to: null}]->(p3)
CREATE (karolina)-[:WORKED_ON {role: 'Scrum Master', from: '2024-03-01', to: null}]->(p3);

// TechCraft Internal CRM (zakończony)
CREATE (kasia)-[:WORKED_ON {role: 'Tech Lead', from: '2023-01-10', to: '2023-08-30'}]->(p4)
CREATE (agnieszka)-[:WORKED_ON {role: 'Full-Stack Dev', from: '2023-01-10', to: '2023-08-30'}]->(p4)
CREATE (bartosz)-[:WORKED_ON {role: 'Frontend Dev', from: '2023-01-10', to: '2023-08-30'}]->(p4)
CREATE (kamil)-[:WORKED_ON {role: 'Junior Backend', from: '2023-03-01', to: '2023-08-30'}]->(p4);

// Legacy Migration (zakończony)
CREATE (jan)-[:WORKED_ON {role: 'Tech Lead', from: '2023-03-01', to: '2023-11-15'}]->(p5)
CREATE (piotr)-[:WORKED_ON {role: 'DevOps Lead', from: '2023-03-01', to: '2023-11-15'}]->(p5)
CREATE (łukasz)-[:WORKED_ON {role: 'DevOps', from: '2023-03-01', to: '2023-11-15'}]->(p5)
CREATE (natalia)-[:WORKED_ON {role: 'Backend Dev', from: '2023-03-01', to: '2023-11-15'}]->(p5)
CREATE (tomek)-[:WORKED_ON {role: 'Backend Dev', from: '2023-05-01', to: '2023-11-15'}]->(p5)
CREATE (ola)-[:WORKED_ON {role: 'Frontend Dev', from: '2023-03-01', to: '2023-11-15'}]->(p5)
CREATE (maria)-[:WORKED_ON {role: 'Frontend Lead', from: '2023-08-01', to: '2023-11-15'}]->(p5)
CREATE (grzegorz)-[:WORKED_ON {role: 'Architect', from: '2023-03-01', to: '2023-11-15'}]->(p5);

// ========================================
// 9. RELACJE: PRACOWNICY -> PRACOWNICY (KNOWS)
// ========================================

// Senior network
CREATE (anna)-[:KNOWS {since: 2020, strength: 'strong'}]->(jan)
CREATE (anna)-[:KNOWS {since: 2021, strength: 'strong'}]->(maria)
CREATE (jan)-[:KNOWS {since: 2019, strength: 'strong'}]->(piotr)
CREATE (maria)-[:KNOWS {since: 2022, strength: 'medium'}]->(kasia)
CREATE (kasia)-[:KNOWS {since: 2018, strength: 'strong'}]->(grzegorz)
CREATE (piotr)-[:KNOWS {since: 2020, strength: 'medium'}]->(łukasz)

// Cross-team
CREATE (anna)-[:KNOWS {since: 2023, strength: 'medium'}]->(tomek)
CREATE (tomek)-[:KNOWS {since: 2023, strength: 'medium'}]->(ola)
CREATE (ola)-[:KNOWS {since: 2023, strength: 'strong'}]->(michał)
CREATE (maria)-[:KNOWS {since: 2022, strength: 'medium'}]->(ola)
CREATE (jan)-[:KNOWS {since: 2023, strength: 'medium'}]->(natalia)
CREATE (adam)-[:KNOWS {since: 2022, strength: 'medium'}]->(ewa)

// Mentoring relationships
CREATE (anna)-[:KNOWS {since: 2024, strength: 'medium'}]->(zofia)
CREATE (jan)-[:KNOWS {since: 2024, strength: 'medium'}]->(mateusz)
CREATE (maria)-[:KNOWS {since: 2024, strength: 'medium'}]->(julia)
CREATE (piotr)-[:KNOWS {since: 2024, strength: 'weak'}]->(dawid)
CREATE (tomek)-[:KNOWS {since: 2024, strength: 'medium'}]->(alicja)

// Same projects
CREATE (ola)-[:KNOWS {since: 2024, strength: 'strong'}]->(tomek)
CREATE (ola)-[:KNOWS {since: 2024, strength: 'medium'}]->(zofia)
CREATE (michał)-[:KNOWS {since: 2023, strength: 'strong'}]->(julia)
CREATE (natalia)-[:KNOWS {since: 2023, strength: 'medium'}]->(mateusz)
CREATE (adam)-[:KNOWS {since: 2024, strength: 'strong'}]->(ewa)
CREATE (adam)-[:KNOWS {since: 2024, strength: 'medium'}]->(paulina)

// Management
CREATE (monika)-[:KNOWS {since: 2020, strength: 'strong'}]->(paweł)
CREATE (monika)-[:KNOWS {since: 2021, strength: 'strong'}]->(kasia)
CREATE (paweł)-[:KNOWS {since: 2019, strength: 'strong'}]->(grzegorz)
CREATE (sebastian)-[:KNOWS {since: 2023, strength: 'strong'}]->(karolina)
CREATE (karolina)-[:KNOWS {since: 2022, strength: 'medium'}]->(monika);

// ========================================
// 10. INDEKSY (dla wydajności zapytań)
// ========================================
CREATE INDEX person_name IF NOT EXISTS FOR (p:Person) ON (p.name);
CREATE INDEX person_available IF NOT EXISTS FOR (p:Person) ON (p.available);
CREATE INDEX skill_name IF NOT EXISTS FOR (s:Skill) ON (s.name);
CREATE INDEX project_status IF NOT EXISTS FOR (p:Project) ON (p.status);

// ========================================
// SEED ZAKOŃCZONY ✅
// ========================================