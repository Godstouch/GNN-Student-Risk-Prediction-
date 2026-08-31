import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Renders numeric/percentage features with a bar; renders categorical or
// flag features (strings, 0/1 flags) as plain text — a progress bar on
// "Mode of transport: Walking" would be meaningless.
function FeatureRow({ feature }) {
  const isNumericBar =
    typeof feature.value === 'number' &&
    (feature.unit === '%' || feature.key.includes('quality') || feature.key.includes('difference'));

  const displayValue =
    feature.unit === '%'
      ? `${(feature.value * 100).toFixed(0)}%`
      : `${feature.value}${feature.unit ? ' ' + feature.unit : ''}`;

  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-text-primary">
          {feature.label}
        </span>
        <span className="text-sm text-text-secondary tabular-nums">
          {displayValue}
        </span>
      </div>
      {isNumericBar && (
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(Math.abs(feature.value) * 100, 100)}%`,
              backgroundColor:
                feature.value < 0 ? 'var(--color-risk-high)' : 'var(--color-accent)',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function FeatureBreakdown({ features }) {
  const [showAll, setShowAll] = useState(false);

  const priority = features.filter((f) => f.displayPriority);
  const rest = features.filter((f) => !f.displayPriority);
  const visible = showAll ? features : priority;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-text-primary mb-2">
        Indicators
      </h3>
      <div>
        {visible.map((f) => (
          <FeatureRow key={f.key} feature={f} />
        ))}
      </div>
      {rest.length > 0 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-dark mt-3"
        >
          {showAll ? (
            <>
              Show fewer <ChevronUp size={14} />
            </>
          ) : (
            <>
              Show all {features.length} indicators <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
