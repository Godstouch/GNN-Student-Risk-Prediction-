const TIER_ORDER = ['high', 'medium', 'low', 'unscored'];

const TIER_META = {
  high: { label: 'High Risk', colorClass: 'text-risk-high' },
  medium: { label: 'Medium Risk', colorClass: 'text-risk-medium' },
  low: { label: 'Low Risk', colorClass: 'text-risk-low' },
  unscored: { label: 'Not Yet Scored', colorClass: 'text-text-muted' },
};

export default function RiskBreakdownDonut({ counts, size = 160, strokeWidth = 20 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const activeTiers = TIER_ORDER.filter((tier) => counts[tier] > 0);

  let offset = 0;
  const segments = activeTiers.map((tier) => {
    const fraction = total > 0 ? counts[tier] / total : 0;
    const length = circumference * fraction;
    const segment = { tier, length, offset, ...TIER_META[tier] };
    offset += length;
    return segment;
  });

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            strokeWidth={strokeWidth} className="stroke-border"
          />
          {segments.map((seg) => (
            <circle
              key={seg.tier}
              cx={size / 2} cy={size / 2} r={radius} fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.length} ${circumference - seg.length}`}
              strokeDashoffset={-seg.offset}
              className={`${seg.colorClass} stroke-current transition-all duration-700 ease-out`}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-primary">{total}</span>
          <span className="text-[11px] text-text-muted">students</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {activeTiers.map((tier) => (
          <div key={tier} className="flex items-center gap-2 text-sm">
            <span className={`w-2.5 h-2.5 rounded-full bg-current ${TIER_META[tier].colorClass}`} />
            <span className="text-text-secondary">{TIER_META[tier].label}</span>
            <span className="font-semibold text-text-primary ml-auto">{counts[tier]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}