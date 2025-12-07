# SkillGraph Frontend 🎨

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Graph-000000?style=flat-square&logo=three.js)](https://threejs.org/)

> Modern React SPA frontend for SkillGraph HR Management System

---

## 🔗 Live Demo

**Frontend:** [https://skillgraph-frontend.onrender.com](https://skillgraph-frontend.onrender.com)

---

## 📖 Description

SkillGraph Frontend is a Single Page Application (SPA) built with React 19 and Vite. It provides a modern, responsive interface for the SkillGraph HR Management System with 3D graph visualization capabilities.

### ✨ Features

| Feature | Description |
|---------|-------------|
| **SPA Architecture** | Seamless navigation without page reloads |
| **3D Graph Visualization** | Interactive network visualization using Three.js |
| **Dark Glassmorphism UI** | Modern design with glass effects and neon accents |
| **Responsive Design** | Works on desktop, tablet, and mobile |
| **Real-time Search** | Live filtering with dynamic result counters |
| **Team Builder** | Intelligent team composition recommendations |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Library |
| Vite | 7.2.4 | Build Tool & Dev Server |
| react-force-graph-3d | 1.29.0 | 3D Graph Visualization |
| Three.js | (via r-f-g-3d) | WebGL 3D Rendering |
| CSS3 | - | Styling (Glassmorphism) |
| Material Icons | - | Icon Set |

---

## 📁 Project Structure

```
skillgraph-frontend/
├── public/                    # Static assets
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Main component with routing
│   ├── App.css               # App-level styles
│   ├── index.css             # Global styles & CSS variables
│   └── components/
│       ├── Navigation.jsx    # Sidebar navigation
│       ├── Navigation.css
│       ├── Dashboard.jsx     # Statistics dashboard
│       ├── Dashboard.css
│       ├── PeopleList.jsx    # Employee list with search
│       ├── PeopleList.css
│       ├── TeamBuilder.jsx   # Team composition tool
│       ├── TeamBuilder.css
│       ├── ExpertFinder.jsx  # Technology expert search
│       ├── ExpertFinder.css
│       ├── ProjectList.jsx   # Project management
│       ├── ProjectList.css
│       ├── Graph3D.jsx       # 3D network visualization
│       └── Graph3D.css
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository (if not already)
git clone https://github.com/yourusername/skillgraph.git
cd skillgraph/skillgraph-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## ⚙️ Configuration

### API URL

Edit `src/App.jsx` to change the backend API URL:

```javascript
// Production
const API_URL = 'https://skillgraph-174e.onrender.com';

// Local development
const API_URL = 'http://localhost:3000';
```

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

---

## 📱 Components

### Navigation

Sidebar navigation with glassmorphism effect and responsive mobile menu.

```jsx
<Navigation 
  currentView={currentView} 
  setCurrentView={setCurrentView} 
/>
```

**Features:**
- 6 navigation items with Material Icons
- Active state with neon glow effect
- Mobile hamburger menu (< 1024px)
- Animated transitions

### Dashboard

Statistics overview panel with key HR metrics.

```jsx
<Dashboard apiUrl={API_URL} />
```

**Displays:**
- Total Employees
- Available Now
- Active Projects
- Availability Rate
- Seniority Distribution
- Top Skills

### PeopleList

Employee list with real-time search and filtering.

```jsx
<PeopleList apiUrl={API_URL} />
```

**Features:**
- Live search (name, role, skills)
- Dynamic result counter
- Availability filter (All/Available/Busy)
- Employee cards with skills tags

### TeamBuilder

Intelligent team composition tool.

```jsx
<TeamBuilder apiUrl={API_URL} />
```

**Features:**
- Multi-select skills dropdown with checkboxes
- Role filter dropdown
- Team size selector (1-10)
- Match score calculation
- Recommended candidates grid

### ExpertFinder

Technology expert search tool.

```jsx
<ExpertFinder apiUrl={API_URL} />
```

**Features:**
- Search input with suggestions
- Popular skills quick buttons
- Results sorted by proficiency
- Expert cards with skill years

### ProjectList

Project management and overview.

```jsx
<ProjectList apiUrl={API_URL} />
```

**Features:**
- Search by name, company, technology
- Status filter (All/Active/Completed/Planned)
- Project cards with team info
- Required skills tags

### Graph3D

Interactive 3D network visualization.

```jsx
<Graph3D apiUrl={API_URL} />
```

**Features:**
- WebGL 3D rendering (Three.js)
- Force-directed layout
- Color-coded node types
- Interactive controls (rotate, zoom, drag)
- Floating legend with statistics
- Animated neon border

---

## 🎨 Design System

### CSS Variables

```css
:root {
  /* Background */
  --brand-bg: #0f172a;
  --glass-bg: rgba(15, 23, 42, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-hover: rgba(255, 255, 255, 0.05);
  
  /* Accents */
  --brand-accent-cyan: #00F6FF;
  --brand-accent-magenta: #D400FF;
  
  /* Text */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  
  /* Shadows */
  --shadow-glow-cyan: 0 0 20px rgba(0, 246, 255, 0.3);
  --shadow-glow-magenta: 0 0 20px rgba(212, 0, 255, 0.3);
  --shadow-glow-mixed: 0 0 30px rgba(0, 246, 255, 0.2), 
                       0 0 60px rgba(212, 0, 255, 0.1);
}
```

### Glassmorphism Effect

```css
.glass-component {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}
```

### Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Desktop | > 1024px | Full sidebar, 3-4 column grid |
| Tablet | 768-1024px | Hidden sidebar, 2 column grid |
| Mobile | < 768px | Hamburger menu, 1 column grid |

---

## 🔧 Development

### Adding New Component

1. Create component files:
```bash
touch src/components/NewComponent.jsx
touch src/components/NewComponent.css
```

2. Import in `App.jsx`:
```jsx
import NewComponent from './components/NewComponent';
```

3. Add to navigation in `Navigation.jsx`:
```javascript
const menuItems = [
  // ...existing items
  { id: 'new-component', icon: 'icon_name', label: 'New Component' }
];
```

4. Add to router in `App.jsx`:
```jsx
case 'new-component':
  return <NewComponent apiUrl={API_URL} />;
```

### Code Style

- Use functional components with hooks
- Prefer `const` over `let`
- Use async/await for API calls
- CSS files named same as component

---

## 📦 Build

### Production Build

```bash
npm run build
```

Output directory: `dist/`

### Preview Build

```bash
npm run preview
```

### Deployment

The build output can be deployed to any static hosting:
- Render.com (recommended)
- Vercel
- Netlify
- GitHub Pages

---

## 🐛 Troubleshooting

### Common Issues

**1. CORS errors in development**

Ensure backend has CORS enabled:
```javascript
app.use(cors());
```

**2. 3D Graph not rendering**

Check WebGL support in browser:
```javascript
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
console.log('WebGL supported:', !!gl);
```

**3. Slow initial load on Render.com**

Free tier services sleep after inactivity. First request wakes them up (~30s).

**4. Mobile navigation not working**

Ensure viewport meta tag is present in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📄 License

MIT License

---

## 🔗 Related

- [Main Project README](../README.md)
- [API Documentation](../API.md)
- [Backend Server](../server.js)

---

<p align="center">
  Built with ❤️ using React, Vite & Three.js
</p>