// ========================================
// SKILLGRAPH - SEED DATABASE (POPRAWIONY I BEZPIECZNY)
// Software House: "TechCraft Solutions"
// ========================================

// 1. CZYSZCZENIE BAZY (Ostrożnie!)
MATCH (n) DETACH DELETE n;

// ========================================
// 2. SŁOWNIKI (FIRMY I UMIEJĘTNOŚCI)
// ========================================

// Firmy
MERGE (tc:Company {name: 'TechCraft Solutions'}) SET tc.location = 'Warsaw', tc.size = 45;
MERGE (client1:Company {name: 'FinanceApp Corp'}) SET client1.location = 'London', client1.size = 200;
MERGE (client2:Company {name: 'RetailCloud Inc'}) SET client2.location = 'Berlin', client2.size = 150;
MERGE (client3:Company {name: 'HealthTech GmbH'}) SET client3.location = 'Munich', client3.size = 80;

// Umiejętności (Skills)
MERGE (java:Skill {name: 'Java'}) SET java.type = 'Backend', java.level = 'language';
MERGE (python:Skill {name: 'Python'}) SET python.type = 'Backend', python.level = 'language';
MERGE (node:Skill {name: 'Node.js'}) SET node.type = 'Backend', node.level = 'framework';
MERGE (spring:Skill {name: 'Spring Boot'}) SET spring.type = 'Backend', spring.level = 'framework';
MERGE (django:Skill {name: 'Django'}) SET django.type = 'Backend', django.level = 'framework';
MERGE (express:Skill {name: 'Express.js'}) SET express.type = 'Backend', express.level = 'framework';
MERGE (react:Skill {name: 'React'}) SET react.type = 'Frontend', react.level = 'framework';
MERGE (vue:Skill {name: 'Vue.js'}) SET vue.type = 'Frontend', vue.level = 'framework';
MERGE (angular:Skill {name: 'Angular'}) SET angular.type = 'Frontend', angular.level = 'framework';
MERGE (ts:Skill {name: 'TypeScript'}) SET ts.type = 'Frontend', ts.level = 'language';
MERGE (js:Skill {name: 'JavaScript'}) SET js.type = 'Frontend', js.level = 'language';
MERGE (docker:Skill {name: 'Docker'}) SET docker.type = 'DevOps', docker.level = 'tool';
MERGE (k8s:Skill {name: 'Kubernetes'}) SET k8s.type = 'DevOps', k8s.level = 'tool';
MERGE (aws:Skill {name: 'AWS'}) SET aws.type = 'Cloud', aws.level = 'platform';
MERGE (azure:Skill {name: 'Azure'}) SET azure.type = 'Cloud', azure.level = 'platform';
MERGE (terraform:Skill {name: 'Terraform'}) SET terraform.type = 'DevOps', terraform.level = 'tool';
MERGE (postgres:Skill {name: 'PostgreSQL'}) SET postgres.type = 'Database', postgres.level = 'database';
MERGE (mongo:Skill {name: 'MongoDB'}) SET mongo.type = 'Database', mongo.level = 'database';
MERGE (redis:Skill {name: 'Redis'}) SET redis.type = 'Database', redis.level = 'database';
MERGE (neo4j:Skill {name: 'Neo4j'}) SET neo4j.type = 'Database', neo4j.level = 'database';
MERGE (graphql:Skill {name: 'GraphQL'}) SET graphql.type = 'API', graphql.level = 'technology';
MERGE (rest:Skill {name: 'REST API'}) SET rest.type = 'API', rest.level = 'technology';
MERGE (agile:Skill {name: 'Agile/Scrum'}) SET agile.type = 'Management', agile.level = 'methodology';
MERGE (ci:Skill {name: 'CI/CD'}) SET ci.type = 'DevOps', ci.level = 'practice';


// ========================================
// 3. PROJEKTY (Węzły + Relacje do Firm i Skilli)
// ========================================

// P1: FinanceApp Mobile
MERGE (p:Project {name: 'FinanceApp Mobile'})
SET p.status = 'active', p.startDate = '2024-01-15', p.budget = 250000, p.team_size = 6, p.duration_months = 8, p.description = 'Mobile banking application for iOS and Android'
WITH p
MATCH (c:Company {name: 'FinanceApp Corp'}) MERGE (p)-[:BELONGS_TO]->(c)
WITH p
MATCH (s:Skill {name: 'React'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'Node.js'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s)
WITH p
MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s)
WITH p
MATCH (s:Skill {name: 'AWS'}) MERGE (p)-[:REQUIRES {priority: 'low'}]->(s);

// P2: RetailCloud Platform
MERGE (p:Project {name: 'RetailCloud Platform'})
SET p.status = 'active', p.startDate = '2023-10-01', p.budget = 500000, p.team_size = 10, p.duration_months = 12, p.description = 'E-commerce platform with microservices architecture'
WITH p
MATCH (c:Company {name: 'RetailCloud Inc'}) MERGE (p)-[:BELONGS_TO]->(c)
WITH p
MATCH (s:Skill {name: 'Java'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'Spring Boot'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'React'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'Kubernetes'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s)
WITH p
MATCH (s:Skill {name: 'Redis'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s)
WITH p
MATCH (s:Skill {name: 'GraphQL'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s);

// P3: HealthTech Dashboard
MERGE (p:Project {name: 'HealthTech Dashboard'})
SET p.status = 'active', p.startDate = '2024-03-01', p.budget = 180000, p.team_size = 5, p.duration_months = 6, p.description = 'Healthcare analytics dashboard for doctors'
WITH p
MATCH (c:Company {name: 'HealthTech GmbH'}) MERGE (p)-[:BELONGS_TO]->(c)
WITH p
MATCH (s:Skill {name: 'Vue.js'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'Python'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'Django'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s)
WITH p
MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:REQUIRES {priority: 'low'}]->(s);

// P4: TechCraft Internal CRM
MERGE (p:Project {name: 'TechCraft Internal CRM'})
SET p.status = 'completed', p.startDate = '2023-01-10', p.endDate = '2023-08-30', p.budget = 120000, p.team_size = 4, p.duration_months = 8, p.description = 'Internal CRM system for managing clients'
WITH p
MATCH (c:Company {name: 'TechCraft Solutions'}) MERGE (p)-[:BELONGS_TO]->(c);

// P5: Legacy Migration Project
MERGE (p:Project {name: 'Legacy Migration Project'})
SET p.status = 'completed', p.startDate = '2023-03-01', p.endDate = '2023-11-15', p.budget = 350000, p.team_size = 8, p.duration_months = 9, p.description = 'Migration from monolith to microservices'
WITH p
MATCH (c:Company {name: 'RetailCloud Inc'}) MERGE (p)-[:BELONGS_TO]->(c);

// P6: AI Chatbot Integration
MERGE (p:Project {name: 'AI Chatbot Integration'})
SET p.status = 'planned', p.startDate = '2024-06-01', p.budget = 200000, p.team_size = 5, p.duration_months = 6, p.description = 'Integration of AI chatbot for customer service'
WITH p
MATCH (c:Company {name: 'FinanceApp Corp'}) MERGE (p)-[:BELONGS_TO]->(c)
WITH p
MATCH (s:Skill {name: 'Python'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'Node.js'}) MERGE (p)-[:REQUIRES {priority: 'high'}]->(s)
WITH p
MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s)
WITH p
MATCH (s:Skill {name: 'MongoDB'}) MERGE (p)-[:REQUIRES {priority: 'medium'}]->(s);

// P7: Blockchain Payment System
MERGE (p:Project {name: 'Blockchain Payment System'})
SET p.status = 'planned', p.startDate = '2024-07-01', p.budget = 400000, p.team_size = 7, p.duration_months = 10, p.description = 'Blockchain-based payment processing system'
WITH p
MATCH (c:Company {name: 'HealthTech GmbH'}) MERGE (p)-[:BELONGS_TO]->(c);


// ========================================
// 4. PRACOWNICY (Węzły + Relacje do Skilli i Projektów)
// ========================================

// Anna Kowalska
MERGE (p:Person {name: 'Anna Kowalska'})
SET p.role = 'Senior Full-Stack Developer', p.seniority = 'Senior', p.yearsExp = 8, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 6, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Node.js'}) MERGE (p)-[:HAS_SKILL {years: 5, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'JavaScript'}) MERGE (p)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'TypeScript'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 5, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'FinanceApp Mobile'}) MERGE (p)-[:WORKED_ON {role: 'Tech Lead', from: '2024-01-15'}]->(pr);

// Jan Nowak
MERGE (p:Person {name: 'Jan Nowak'})
SET p.role = 'Senior Backend Developer', p.seniority = 'Senior', p.yearsExp = 10, p.available = false
WITH p MATCH (s:Skill {name: 'Java'}) MERGE (p)-[:HAS_SKILL {years: 9, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Spring Boot'}) MERGE (p)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:HAS_SKILL {years: 5, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Kubernetes'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'REST API'}) MERGE (p)-[:HAS_SKILL {years: 6, proficiency: 'expert'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Backend Lead', from: '2023-10-01'}]->(pr)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'Tech Lead', from: '2023-03-01', to: '2023-11-15'}]->(pr);

// Maria Wiśniewska
MERGE (p:Person {name: 'Maria Wiśniewska'})
SET p.role = 'Senior Frontend Developer', p.seniority = 'Senior', p.yearsExp = 7, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 6, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Vue.js'}) MERGE (p)-[:HAS_SKILL {years: 5, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'JavaScript'}) MERGE (p)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'TypeScript'}) MERGE (p)-[:HAS_SKILL {years: 5, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'GraphQL'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Frontend Lead', from: '2023-10-01'}]->(pr)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'Frontend Lead', from: '2023-08-01', to: '2023-11-15'}]->(pr);

// Piotr Lewandowski
MERGE (p:Person {name: 'Piotr Lewandowski'})
SET p.role = 'DevOps Engineer', p.seniority = 'Senior', p.yearsExp = 9, p.available = true
WITH p MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Kubernetes'}) MERGE (p)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'AWS'}) MERGE (p)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Terraform'}) MERGE (p)-[:HAS_SKILL {years: 5, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'CI/CD'}) MERGE (p)-[:HAS_SKILL {years: 6, proficiency: 'advanced'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'DevOps', from: '2023-10-01'}]->(pr)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'DevOps Lead', from: '2023-03-01', to: '2023-11-15'}]->(pr);

// Katarzyna Dąbrowska
MERGE (p:Person {name: 'Katarzyna Dąbrowska'})
SET p.role = 'Tech Lead', p.seniority = 'Senior', p.yearsExp = 12, p.available = false
WITH p MATCH (s:Skill {name: 'Java'}) MERGE (p)-[:HAS_SKILL {years: 10, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Spring Boot'}) MERGE (p)-[:HAS_SKILL {years: 9, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 7, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Agile/Scrum'}) MERGE (p)-[:HAS_SKILL {years: 10, proficiency: 'expert'}]->(s)
WITH p MATCH (pr:Project {name: 'TechCraft Internal CRM'}) MERGE (p)-[:WORKED_ON {role: 'Tech Lead', from: '2023-01-10', to: '2023-08-30'}]->(pr);

// Tomasz Zieliński
MERGE (p:Person {name: 'Tomasz Zieliński'})
SET p.role = 'Backend Developer', p.seniority = 'Mid', p.yearsExp = 5, p.available = true
WITH p MATCH (s:Skill {name: 'Node.js'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Express.js'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'MongoDB'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'JavaScript'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (pr:Project {name: 'FinanceApp Mobile'}) MERGE (p)-[:WORKED_ON {role: 'Backend Dev', from: '2024-01-15'}]->(pr)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'Backend Dev', from: '2023-05-01', to: '2023-11-15'}]->(pr);

// Aleksandra Szymańska
MERGE (p:Person {name: 'Aleksandra Szymańska'})
SET p.role = 'Frontend Developer', p.seniority = 'Mid', p.yearsExp = 4, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'JavaScript'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'TypeScript'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'REST API'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'FinanceApp Mobile'}) MERGE (p)-[:WORKED_ON {role: 'Frontend Dev', from: '2024-01-15'}]->(pr)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'Frontend Dev', from: '2023-03-01', to: '2023-11-15'}]->(pr);

// Adam Woźniak
MERGE (p:Person {name: 'Adam Woźniak'})
SET p.role = 'Full-Stack Developer', p.seniority = 'Mid', p.yearsExp = 5, p.available = true
WITH p MATCH (s:Skill {name: 'Vue.js'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Python'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Django'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'HealthTech Dashboard'}) MERGE (p)-[:WORKED_ON {role: 'Full-Stack Lead', from: '2024-03-01'}]->(pr);

// Ewa Kozłowska
MERGE (p:Person {name: 'Ewa Kozłowska'})
SET p.role = 'Backend Developer', p.seniority = 'Mid', p.yearsExp = 4, p.available = false
WITH p MATCH (s:Skill {name: 'Python'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Django'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'Redis'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'HealthTech Dashboard'}) MERGE (p)-[:WORKED_ON {role: 'Backend Dev', from: '2024-03-01'}]->(pr);

// Michał Jankowski
MERGE (p:Person {name: 'Michał Jankowski'})
SET p.role = 'Frontend Developer', p.seniority = 'Mid', p.yearsExp = 3, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'TypeScript'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'GraphQL'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Frontend Dev', from: '2023-10-01'}]->(pr);

// Agnieszka Mazur
MERGE (p:Person {name: 'Agnieszka Mazur'})
SET p.role = 'Full-Stack Developer', p.seniority = 'Mid', p.yearsExp = 4, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Node.js'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'MongoDB'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'TechCraft Internal CRM'}) MERGE (p)-[:WORKED_ON {role: 'Full-Stack Dev', from: '2023-01-10', to: '2023-08-30'}]->(pr);

// Łukasz Krawczyk
MERGE (p:Person {name: 'Łukasz Krawczyk'})
SET p.role = 'DevOps Engineer', p.seniority = 'Mid', p.yearsExp = 5, p.available = true
WITH p MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Kubernetes'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'Azure'}) MERGE (p)-[:HAS_SKILL {years: 4, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'CI/CD'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'DevOps', from: '2023-03-01', to: '2023-11-15'}]->(pr);

// Natalia Piotrkowska
MERGE (p:Person {name: 'Natalia Piotrkowska'})
SET p.role = 'Backend Developer', p.seniority = 'Mid', p.yearsExp = 4, p.available = true
WITH p MATCH (s:Skill {name: 'Java'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'Spring Boot'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Backend Dev', from: '2023-10-01'}]->(pr)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'Backend Dev', from: '2023-03-01', to: '2023-11-15'}]->(pr);

// Bartosz Grabowski
MERGE (p:Person {name: 'Bartosz Grabowski'})
SET p.role = 'Frontend Developer', p.seniority = 'Mid', p.yearsExp = 3, p.available = true
WITH p MATCH (s:Skill {name: 'Angular'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'TypeScript'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'advanced'}]->(s)
WITH p MATCH (s:Skill {name: 'REST API'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (pr:Project {name: 'TechCraft Internal CRM'}) MERGE (p)-[:WORKED_ON {role: 'Frontend Dev', from: '2023-01-10', to: '2023-08-30'}]->(pr);

// --- JUNIORZY ---

MERGE (p:Person {name: 'Zofia Pawlak'}) SET p.role = 'Junior Full-Stack Developer', p.seniority = 'Junior', p.yearsExp = 1, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'Node.js'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'JavaScript'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (pr:Project {name: 'FinanceApp Mobile'}) MERGE (p)-[:WORKED_ON {role: 'Junior Dev', from: '2024-02-01'}]->(pr);

MERGE (p:Person {name: 'Mateusz Michalski'}) SET p.role = 'Junior Backend Developer', p.seniority = 'Junior', p.yearsExp = 1, p.available = true
WITH p MATCH (s:Skill {name: 'Java'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'Spring Boot'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'PostgreSQL'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Junior Backend', from: '2024-01-01'}]->(pr);

MERGE (p:Person {name: 'Julia Wróbel'}) SET p.role = 'Junior Frontend Developer', p.seniority = 'Junior', p.yearsExp = 2, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'JavaScript'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'TypeScript'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Junior Frontend', from: '2024-01-01'}]->(pr);

MERGE (p:Person {name: 'Kamil Król'}) SET p.role = 'Junior Backend Developer', p.seniority = 'Junior', p.yearsExp = 1, p.available = true
WITH p MATCH (s:Skill {name: 'Python'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'Django'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (pr:Project {name: 'TechCraft Internal CRM'}) MERGE (p)-[:WORKED_ON {role: 'Junior Backend', from: '2023-03-01', to: '2023-08-30'}]->(pr);

MERGE (p:Person {name: 'Paulina Witkowska'}) SET p.role = 'Junior Frontend Developer', p.seniority = 'Junior', p.yearsExp = 1, p.available = true
WITH p MATCH (s:Skill {name: 'Vue.js'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'JavaScript'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (pr:Project {name: 'HealthTech Dashboard'}) MERGE (p)-[:WORKED_ON {role: 'Junior Frontend', from: '2024-03-15'}]->(pr);

MERGE (p:Person {name: 'Dawid Walczak'}) SET p.role = 'Junior DevOps', p.seniority = 'Junior', p.yearsExp = 1, p.available = true
WITH p MATCH (s:Skill {name: 'Docker'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'AWS'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s);

MERGE (p:Person {name: 'Alicja Bąk'}) SET p.role = 'Junior Backend Developer', p.seniority = 'Junior', p.yearsExp = 1, p.available = true
WITH p MATCH (s:Skill {name: 'Node.js'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'MongoDB'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s);

MERGE (p:Person {name: 'Jakub Szewczyk'}) SET p.role = 'Mid Frontend Developer', p.seniority = 'Mid', p.yearsExp = 3, p.available = true
WITH p MATCH (s:Skill {name: 'React'}) MERGE (p)-[:HAS_SKILL {years: 3, proficiency: 'intermediate'}]->(s)
WITH p MATCH (s:Skill {name: 'TypeScript'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'intermediate'}]->(s);

MERGE (p:Person {name: 'Weronika Kucharska'}) SET p.role = 'Junior Full-Stack Developer', p.seniority = 'Junior', p.yearsExp = 2, p.available = true
WITH p MATCH (s:Skill {name: 'Vue.js'}) MERGE (p)-[:HAS_SKILL {years: 2, proficiency: 'beginner'}]->(s)
WITH p MATCH (s:Skill {name: 'Python'}) MERGE (p)-[:HAS_SKILL {years: 1, proficiency: 'beginner'}]->(s);


// --- QA & MANAGEMENT ---

MERGE (p:Person {name: 'Magdalena Kamińska'}) SET p.role = 'QA Engineer', p.seniority = 'Mid', p.yearsExp = 4, p.available = true
WITH p MATCH (pr:Project {name: 'FinanceApp Mobile'}) MERGE (p)-[:WORKED_ON {role: 'QA', from: '2024-01-15'}]->(pr)
WITH p MATCH (pr:Project {name: 'HealthTech Dashboard'}) MERGE (p)-[:WORKED_ON {role: 'QA', from: '2024-03-01'}]->(pr);

MERGE (p:Person {name: 'Robert Kowalczyk'}) SET p.role = 'QA Lead', p.seniority = 'Senior', p.yearsExp = 6, p.available = false
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'QA Lead', from: '2023-10-01'}]->(pr);

MERGE (p:Person {name: 'Karolina Zając'}) SET p.role = 'Scrum Master', p.seniority = 'Mid', p.yearsExp = 5, p.available = true
WITH p MATCH (s:Skill {name: 'Agile/Scrum'}) MERGE (p)-[:HAS_SKILL {years: 5, proficiency: 'expert'}]->(s)
WITH p MATCH (pr:Project {name: 'FinanceApp Mobile'}) MERGE (p)-[:WORKED_ON {role: 'Scrum Master', from: '2024-01-15'}]->(pr)
WITH p MATCH (pr:Project {name: 'HealthTech Dashboard'}) MERGE (p)-[:WORKED_ON {role: 'Scrum Master', from: '2024-03-01'}]->(pr);

MERGE (p:Person {name: 'Sebastian Adamczyk'}) SET p.role = 'Product Owner', p.seniority = 'Senior', p.yearsExp = 8, p.available = true
WITH p MATCH (s:Skill {name: 'Agile/Scrum'}) MERGE (p)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Product Owner', from: '2023-10-01'}]->(pr);

MERGE (p:Person {name: 'Grzegorz Dudek'}) SET p.role = 'Solutions Architect', p.seniority = 'Senior', p.yearsExp = 15, p.available = false
WITH p MATCH (s:Skill {name: 'Java'}) MERGE (p)-[:HAS_SKILL {years: 12, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Spring Boot'}) MERGE (p)-[:HAS_SKILL {years: 10, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'AWS'}) MERGE (p)-[:HAS_SKILL {years: 8, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Kubernetes'}) MERGE (p)-[:HAS_SKILL {years: 7, proficiency: 'expert'}]->(s)
WITH p MATCH (pr:Project {name: 'RetailCloud Platform'}) MERGE (p)-[:WORKED_ON {role: 'Architect', from: '2023-10-01'}]->(pr)
WITH p MATCH (pr:Project {name: 'Legacy Migration Project'}) MERGE (p)-[:WORKED_ON {role: 'Architect', from: '2023-03-01', to: '2023-11-15'}]->(pr);

MERGE (p:Person {name: 'Monika Nowakowska'}) SET p.role = 'Engineering Manager', p.seniority = 'Senior', p.yearsExp = 11, p.available = true
WITH p MATCH (s:Skill {name: 'Agile/Scrum'}) MERGE (p)-[:HAS_SKILL {years: 11, proficiency: 'expert'}]->(s);

MERGE (p:Person {name: 'Paweł Sikora'}) SET p.role = 'CTO', p.seniority = 'Senior', p.yearsExp = 18, p.available = false
WITH p MATCH (s:Skill {name: 'Java'}) MERGE (p)-[:HAS_SKILL {years: 15, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'AWS'}) MERGE (p)-[:HAS_SKILL {years: 12, proficiency: 'expert'}]->(s)
WITH p MATCH (s:Skill {name: 'Agile/Scrum'}) MERGE (p)-[:HAS_SKILL {years: 18, proficiency: 'expert'}]->(s);


// ========================================
// 5. RELACJE KNOWS (ZNAJOMOŚCI)
// ========================================
MATCH (anna:Person {name: 'Anna Kowalska'}), (jan:Person {name: 'Jan Nowak'}) MERGE (anna)-[:KNOWS {since: 2020, strength: 'strong'}]->(jan);
MATCH (anna:Person {name: 'Anna Kowalska'}), (maria:Person {name: 'Maria Wiśniewska'}) MERGE (anna)-[:KNOWS {since: 2021, strength: 'strong'}]->(maria);
MATCH (jan:Person {name: 'Jan Nowak'}), (piotr:Person {name: 'Piotr Lewandowski'}) MERGE (jan)-[:KNOWS {since: 2019, strength: 'strong'}]->(piotr);
MATCH (maria:Person {name: 'Maria Wiśniewska'}), (kasia:Person {name: 'Katarzyna Dąbrowska'}) MERGE (maria)-[:KNOWS {since: 2022, strength: 'medium'}]->(kasia);
MATCH (kasia:Person {name: 'Katarzyna Dąbrowska'}), (grzegorz:Person {name: 'Grzegorz Dudek'}) MERGE (kasia)-[:KNOWS {since: 2018, strength: 'strong'}]->(grzegorz);
MATCH (piotr:Person {name: 'Piotr Lewandowski'}), (łukasz:Person {name: 'Łukasz Krawczyk'}) MERGE (piotr)-[:KNOWS {since: 2020, strength: 'medium'}]->(łukasz);
MATCH (anna:Person {name: 'Anna Kowalska'}), (tomek:Person {name: 'Tomasz Zieliński'}) MERGE (anna)-[:KNOWS {since: 2023, strength: 'medium'}]->(tomek);
MATCH (tomek:Person {name: 'Tomasz Zieliński'}), (ola:Person {name: 'Aleksandra Szymańska'}) MERGE (tomek)-[:KNOWS {since: 2023, strength: 'medium'}]->(ola);
MATCH (ola:Person {name: 'Aleksandra Szymańska'}), (michał:Person {name: 'Michał Jankowski'}) MERGE (ola)-[:KNOWS {since: 2023, strength: 'strong'}]->(michał);
MATCH (maria:Person {name: 'Maria Wiśniewska'}), (ola:Person {name: 'Aleksandra Szymańska'}) MERGE (maria)-[:KNOWS {since: 2022, strength: 'medium'}]->(ola);
MATCH (jan:Person {name: 'Jan Nowak'}), (natalia:Person {name: 'Natalia Piotrkowska'}) MERGE (jan)-[:KNOWS {since: 2023, strength: 'medium'}]->(natalia);
MATCH (adam:Person {name: 'Adam Woźniak'}), (ewa:Person {name: 'Ewa Kozłowska'}) MERGE (adam)-[:KNOWS {since: 2022, strength: 'medium'}]->(ewa);
MATCH (anna:Person {name: 'Anna Kowalska'}), (zofia:Person {name: 'Zofia Pawlak'}) MERGE (anna)-[:KNOWS {since: 2024, strength: 'medium'}]->(zofia);
MATCH (jan:Person {name: 'Jan Nowak'}), (mateusz:Person {name: 'Mateusz Michalski'}) MERGE (jan)-[:KNOWS {since: 2024, strength: 'medium'}]->(mateusz);
MATCH (maria:Person {name: 'Maria Wiśniewska'}), (julia:Person {name: 'Julia Wróbel'}) MERGE (maria)-[:KNOWS {since: 2024, strength: 'medium'}]->(julia);
MATCH (piotr:Person {name: 'Piotr Lewandowski'}), (dawid:Person {name: 'Dawid Walczak'}) MERGE (piotr)-[:KNOWS {since: 2024, strength: 'weak'}]->(dawid);
MATCH (tomek:Person {name: 'Tomasz Zieliński'}), (alicja:Person {name: 'Alicja Bąk'}) MERGE (tomek)-[:KNOWS {since: 2024, strength: 'medium'}]->(alicja);
MATCH (ola:Person {name: 'Aleksandra Szymańska'}), (tomek:Person {name: 'Tomasz Zieliński'}) MERGE (ola)-[:KNOWS {since: 2024, strength: 'strong'}]->(tomek);
MATCH (ola:Person {name: 'Aleksandra Szymańska'}), (zofia:Person {name: 'Zofia Pawlak'}) MERGE (ola)-[:KNOWS {since: 2024, strength: 'medium'}]->(zofia);
MATCH (michał:Person {name: 'Michał Jankowski'}), (julia:Person {name: 'Julia Wróbel'}) MERGE (michał)-[:KNOWS {since: 2023, strength: 'strong'}]->(julia);
MATCH (natalia:Person {name: 'Natalia Piotrkowska'}), (mateusz:Person {name: 'Mateusz Michalski'}) MERGE (natalia)-[:KNOWS {since: 2023, strength: 'medium'}]->(mateusz);
MATCH (adam:Person {name: 'Adam Woźniak'}), (ewa:Person {name: 'Ewa Kozłowska'}) MERGE (adam)-[:KNOWS {since: 2024, strength: 'strong'}]->(ewa);
MATCH (adam:Person {name: 'Adam Woźniak'}), (paulina:Person {name: 'Paulina Witkowska'}) MERGE (adam)-[:KNOWS {since: 2024, strength: 'medium'}]->(paulina);
MATCH (monika:Person {name: 'Monika Nowakowska'}), (paweł:Person {name: 'Paweł Sikora'}) MERGE (monika)-[:KNOWS {since: 2020, strength: 'strong'}]->(paweł);
MATCH (monika:Person {name: 'Monika Nowakowska'}), (kasia:Person {name: 'Katarzyna Dąbrowska'}) MERGE (monika)-[:KNOWS {since: 2021, strength: 'strong'}]->(kasia);
MATCH (paweł:Person {name: 'Paweł Sikora'}), (grzegorz:Person {name: 'Grzegorz Dudek'}) MERGE (paweł)-[:KNOWS {since: 2019, strength: 'strong'}]->(grzegorz);
MATCH (sebastian:Person {name: 'Sebastian Adamczyk'}), (karolina:Person {name: 'Karolina Zając'}) MERGE (sebastian)-[:KNOWS {since: 2023, strength: 'strong'}]->(karolina);
MATCH (karolina:Person {name: 'Karolina Zając'}), (monika:Person {name: 'Monika Nowakowska'}) MERGE (karolina)-[:KNOWS {since: 2022, strength: 'medium'}]->(monika);


// ========================================
// 6. INDEKSY
// ========================================
CREATE INDEX person_name IF NOT EXISTS FOR (p:Person) ON (p.name);
CREATE INDEX person_available IF NOT EXISTS FOR (p:Person) ON (p.available);
CREATE INDEX skill_name IF NOT EXISTS FOR (s:Skill) ON (s.name);
CREATE INDEX project_status IF NOT EXISTS FOR (p:Project) ON (p.status);

// KONIEC