import { useState, useEffect, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // Pobieramy dane z Twojego backendu
    fetch('http://localhost:3000/api/graph')
      .then(res => res.json())
      .then(data => {
        // Mały fix: upewniamy się, że linki używają ID węzłów
        console.log("Dane z API:", data);
        setGraphData(data);
      })
      .catch(err => console.error("Błąd pobierania:", err));
  }, []);

  // Konfiguracja kolorów dla różnych typów węzłów
  const getNodeColor = (node) => {
    switch(node.label) {
      case 'Person': return '#ff0000'; // Czerwony dla ludzi
      case 'Skill': return '#00ff00';  // Zielony dla skilli
      case 'Project': return '#0000ff'; // Niebieski dla projektów
      case 'Company': return '#ffff00'; // Żółty dla firm
      default: return '#ffffff';
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', zIndex: 1000, fontFamily: 'Arial' }}>
        <h1>SkillGraph 3D</h1>
        <p>Legenda: <span style={{color:'red'}}>Osoba</span> | <span style={{color:'green'}}>Skill</span> | <span style={{color:'blue'}}>Projekt</span> | <span style={{color:'yellow'}}>Firma</span></p>
      </div>
      
      {graphData.nodes.length > 0 && (
        <ForceGraph3D
          graphData={graphData}
          nodeLabel="name"             // Co wyświetlać po najechaniu myszką
          nodeAutoColorBy="label"      // Automatyczne kolory (opcjonalne, nadpisujemy niżej)
          nodeColor={getNodeColor}     // Nasze kolory
          linkDirectionalArrowLength={3.5} // Strzałki na liniach
          linkDirectionalArrowRelPos={1}
          nodeThreeObjectExtend={true} // Opcja dla lepszej wydajności
          linkOpacity={0.5}
        />
      )}
    </div>
  );
}

export default App;