import { useEffect, useState, useCallback, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import './Graph3D.css';

function Graph3D({ apiUrl }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGraphData();
  }, [apiUrl]);

  const fetchGraphData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/graph`);
      if (!response.ok) throw new Error('Failed to fetch graph data');
      const data = await response.json();
      
      // Upewnij się, że węzły mają poprawne id jako stringi
      const processedData = {
        nodes: data.nodes.map(node => ({
          ...node,
          id: String(node.id),
          // Upewnij się że label istnieje
          label: node.label || 'Unknown'
        })),
        links: data.links.map(link => ({
          ...link,
          source: String(link.source),
          target: String(link.target)
        }))
      };
      
      setGraphData(processedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Definiujemy kolory jako stałe
  const nodeColors = useMemo(() => ({
    'Person': '#ef4444',    // czerwony
    'Skill': '#10b981',     // zielony
    'Project': '#3b82f6',   // niebieski
    'Company': '#f59e0b',   // żółty/pomarańczowy
    'Unknown': '#9ca3af'    // szary
  }), []);

  // Callback dla koloru węzła
  const getNodeColor = useCallback((node) => {
    const label = node.label || 'Unknown';
    return nodeColors[label] || nodeColors['Unknown'];
  }, [nodeColors]);

  // Callback dla etykiety węzła
  const getNodeLabel = useCallback((node) => {
    const label = node.label || 'Unknown';
    const name = node.name || node.id;
    return `<div style="background: rgba(0,0,0,0.8); padding: 8px 12px; border-radius: 6px; color: white; font-size: 14px;">
      <strong>${label}</strong><br/>
      ${name}
    </div>`;
  }, []);

  // Rozmiar węzła na podstawie typu
  const getNodeSize = useCallback((node) => {
    switch(node.label) {
      case 'Person': return 6;
      case 'Skill': return 4;
      case 'Project': return 8;
      case 'Company': return 10;
      default: return 5;
    }
  }, []);

  if (loading) return <div className="loading">Loading 3D graph...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="graph-container">
      <div className="graph-legend">
        <h3>🌐 3D Network Graph</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {graphData.nodes.length} nodes, {graphData.links.length} connections
        </p>
        <div className="legend-items">
          <span>
            <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
            Person ({graphData.nodes.filter(n => n.label === 'Person').length})
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
            Skill ({graphData.nodes.filter(n => n.label === 'Skill').length})
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span>
            Project ({graphData.nodes.filter(n => n.label === 'Project').length})
          </span>
          <span>
            <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
            Company ({graphData.nodes.filter(n => n.label === 'Company').length})
          </span>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
          Drag to rotate • Scroll to zoom • Click node for details
        </div>
      </div>

      <ForceGraph3D
        graphData={graphData}
        nodeLabel={getNodeLabel}
        nodeColor={getNodeColor}
        nodeVal={getNodeSize}
        nodeOpacity={0.9}
        nodeResolution={16}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        linkOpacity={0.4}
        linkWidth={1}
        linkColor={() => '#475569'}
        backgroundColor="#0f172a"
        width={window.innerWidth - 320}
        height={window.innerHeight - 120}
        enableNodeDrag={true}
        enableNavigationControls={true}
        showNavInfo={false}
      />
    </div>
  );
}

export default Graph3D;