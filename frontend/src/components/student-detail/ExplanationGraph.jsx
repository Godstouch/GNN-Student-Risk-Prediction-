import { useMemo, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { colors } from '../../styles/theme';

// Renders the GNNExplainer output: which peer connections contributed to
// this student's risk flag. Edge thickness/opacity encodes attention
// weight (0-1) — the stronger the peer influence, the more visually
// prominent the connection, directly mirroring what GATConv learned.
export default function ExplanationGraph({ graph }) {
  const fgRef = useRef();

  const graphData = useMemo(() => {
    const nodes = graph.nodes.map((n) => ({ ...n }));
    const links = graph.edges.map((e) => ({
      source: e.source,
      target: e.target,
      attentionWeight: e.attentionWeight,
    }));
    return { nodes, links };
  }, [graph]);

  if (graph.nodes.length <= 1) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          Peer Influence
        </h3>
        <p className="text-sm text-text-muted">
          No peer connections contributed to this risk flag.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-text-primary mb-1">
        Peer Influence
      </h3>
      <p className="text-xs text-text-secondary mb-3">
        Thicker lines indicate stronger influence on this student's risk score.
      </p>
      <div className="border border-border rounded-md overflow-hidden" style={{ height: 280 }}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={undefined}
          height={280}
          backgroundColor={colors.surface}
          nodeLabel="name"
          nodeColor={(node) => (node.isTarget ? colors.brand : colors.accent)}
          nodeRelSize={7}
          linkWidth={(link) => 1 + link.attentionWeight * 4}
          linkColor={() => 'rgba(37, 99, 235, 0.35)'}
          linkDirectionalParticles={0}
          cooldownTicks={80}
          enableZoomInteraction={false}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 11 / globalScale;
            ctx.font = `${node.isTarget ? '600' : '400'} ${fontSize}px sans-serif`;
            ctx.fillStyle = colors.text.primary;
            ctx.textAlign = 'center';
            ctx.fillText(label, node.x, node.y + 14 / globalScale);
          }}
        />
      </div>
    </div>
  );
}
