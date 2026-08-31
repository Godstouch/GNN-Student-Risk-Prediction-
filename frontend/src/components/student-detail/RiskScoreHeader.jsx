import Badge from '../ui/Badge';

function ProbabilityBar({ tier, value, colorVar }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-secondary w-16 capitalize">{tier}</span>
      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${value * 100}%`, backgroundColor: colorVar }}
        />
      </div>
      <span className="text-xs text-text-secondary w-9 text-right tabular-nums">
        {(value * 100).toFixed(0)}%
      </span>
    </div>
  );
}

function formatRelativeTime(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export default function RiskScoreHeader({ student }) {
  const { low, medium, high } = student.riskProbabilities;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            {student.name}
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Predicted {formatRelativeTime(student.predictedAt)} · {student.modelVersion}
          </p>
        </div>
        <Badge tier={student.riskTier} />
      </div>

      <div className="flex flex-col gap-2">
        <ProbabilityBar tier="high" value={high} colorVar="var(--color-risk-high)" />
        <ProbabilityBar tier="medium" value={medium} colorVar="var(--color-risk-medium)" />
        <ProbabilityBar tier="low" value={low} colorVar="var(--color-risk-low)" />
      </div>
    </div>
  );
}
