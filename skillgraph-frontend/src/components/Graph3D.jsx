import { useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import './Graph3D.css';

function Graph3D({ apiUrl }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGraphData();
  }, []);

  const fetchGraphData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/graph`);
      if (!response.ok) throw new Error('Failed to fetch graph data');
      const data = await response.json();
      setGraphData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getNodeColor = (node) => {
    switch(node.label) {
      case 'Person':
        return '#ef4444'; // czerwony
      case 'Skill':
        return '#10b981'; // zielony
      case 'Project':
        return '#3b82f6'; // niebieski
      case 'Company':
        return '#f59e0b'; // żółty/pomarańczowy
      default:
        return '#9ca3af'; // szary
    }
  };

  if (loading) return <div className="loading">Loading 3D graph...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="graph-container">
      <div className="graph-legend">
        <h3>🌐 3D Network Graph</h3>
        <div className="legend-items">
          <span>
            <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
            Person
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
            Skill
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span>
            Project
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
            Company
          </span>
        </div>
      </div>

      <ForceGraph3D
        graphData={graphData}
        nodeLabel={(node) => `${node.label}: ${node.name || node.id}`}
        nodeColor={getNodeColor}
        nodeOpacity={0.9}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        linkOpacity={0.5}
        linkWidth={1.5}
        backgroundColor="#000000"
        width={window.innerWidth - 280}
        height={window.innerHeight - 100}
      />
    </div>
  );
}

export default Graph3D;