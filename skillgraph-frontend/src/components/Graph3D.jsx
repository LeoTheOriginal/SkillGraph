import { useState, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import './Graph3D.css';

function Graph3D({ apiUrl }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/graph`)
      .then(res => res.json())
      .then(data => {
        setGraphData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [apiUrl]);

  const getNodeColor = (node) => {
    switch(node.label) {
      case 'Person': return '#ff0000';
      case 'Skill': return '#00ff00';
      case 'Project': return '#0000ff';
      case 'Company': return '#ffff00';
      default: return '#ffffff';
    }
  };

  if (loading) return <div className="loading">Loading 3D graph...</div>;

  return (
    <div className="graph-container">
      <div className="graph-legend">
        <h3>🌐 3D Network Graph</h3>
        <div className="legend-items">
          <span><span className="legend-color" style={{background: '#ff0000'}}></span> Person</span>
          <span><span className="legend-color" style={{background: '#00ff00'}}></span> Skill</span>
          <span><span className="legend-color" style={{background: '#0000ff'}}></span> Project</span>
          <span><span className="legend-color" style={{background: '#ffff00'}}></span> Company</span>
        </div>
      </div>
      
      {graphData.nodes.length > 0 && (
        <ForceGraph3D
          graphData={graphData}
          nodeLabel="name"
          nodeColor={getNodeColor}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          nodeThreeObjectExtend={true}
          linkOpacity={0.5}
          backgroundColor="#000000"
        />
      )}
    </div>
  );
}

export default Graph3D;