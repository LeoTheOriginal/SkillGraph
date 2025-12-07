import { useEffect, useState, useCallback, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import './Graph3D.css';

function Graph3D({ apiUrl }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    fetchGraphData();
    
    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [apiUrl]);

  const fetchGraphData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/graph`);
      if (!response.ok) throw new Error('Failed to fetch graph data');
      const data = await response.json();
      
      const processedData = {
        nodes: data.nodes.map(node => ({
          ...node,
          id: String(node.id),
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

  const nodeColors = useMemo(() => ({
    'Person': '#ef4444',
    'Skill': '#10b981',
    'Project': '#3b82f6',
    'Company': '#f59e0b',
    'Unknown': '#9ca3af'
  }), []);

  const getNodeColor = useCallback((node) => {
    const label = node.label || 'Unknown';
    return nodeColors[label] || nodeColors['Unknown'];
  }, [nodeColors]);

  const getNodeLabel = useCallback((node) => {
    const label = node.label || 'Unknown';
    const name = node.name || node.id;
    return `<div style="background: rgba(0,0,0,0.8); padding: 8px 12px; border-radius: 6px; color: white; font-size: 14px;">
      <strong>${label}</strong><br/>
      ${name}
    </div>`;
  }, []);

  const getNodeSize = useCallback((node) => {
    switch(node.label) {
      case 'Person': return 6;
      case 'Skill': return 4;
      case 'Project': return 8;
      case 'Company': return 10;
      default: return 5;
    }
  }, []);

  // Calculate responsive dimensions
  const getGraphDimensions = () => {
    const isMobile = dimensions.width <= 1024;
    
    return {
      width: isMobile 
        ? dimensions.width - 40 // 20px padding on each side
        : dimensions.width - 320, // sidebar width on desktop
      height: isMobile
        ? dimensions.height - 200 // space for header + legend
        : dimensions.height - 120
    };
  };

  if (loading) {
    return (
      <div className="graph-loading">
        <div className="graph-loading-spinner"></div>
        <div className="graph-loading-text">Loading 3D graph...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="graph-error">
        <span className="material-icons-outlined">error_outline</span>
        <div className="graph-error-message">Error: {error}</div>
        <button className="graph-error-retry" onClick={fetchGraphData}>
          <span className="material-icons-outlined">refresh</span>
          Retry
        </button>
      </div>
    );
  }

  const graphDimensions = getGraphDimensions();

  return (
    <div className="graph-container">
      {/* Legend */}
      <div className="graph-legend">
        <div className="legend-header">
          <span className="material-icons-outlined">account_tree</span>
          <h3>3D Network</h3>
        </div>
        <p className="legend-stats">
          {graphData.nodes.length} nodes • {graphData.links.length} connections
        </p>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color person"></div>
            <span>Person ({graphData.nodes.filter(n => n.label === 'Person').length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-color skill"></div>
            <span>Skill ({graphData.nodes.filter(n => n.label === 'Skill').length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-color project"></div>
            <span>Project ({graphData.nodes.filter(n => n.label === 'Project').length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-color company"></div>
            <span>Company ({graphData.nodes.filter(n => n.label === 'Company').length})</span>
          </div>
        </div>
        <div className="legend-controls">
          Drag • Scroll • Click
        </div>
      </div>

      {/* 3D Graph */}
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
        width={graphDimensions.width}
        height={graphDimensions.height}
        enableNodeDrag={true}
        enableNavigationControls={true}
        showNavInfo={false}
      />
    </div>
  );
}

export default Graph3D;