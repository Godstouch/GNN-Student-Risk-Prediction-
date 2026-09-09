import RiskBreakdownDonut from './RiskBreakdownDonut';

const TILES = [
  { tier: 'high', label: 'High Risk', bg: 'bg-risk-high-bg', border: 'border-risk-high-border', text: 'text-risk-high' },
  { tier: 'medium', label: 'Medium Risk', bg: 'bg-risk-medium-bg', border: 'border-risk-medium-border', text: 'text-risk-medium' },
  { tier: 'low', label: 'Low Risk', bg: 'bg-risk-low-bg', border: 'border-risk-low-border', text: 'text-risk-low' },
];

export default function RiskOverview({ counts }) {
  return (
    <div className="animate-fade-in bg-surface border border-border rounded-2xl p-6 mb-6">
      <h2 className="text-sm font-semibold text-text-primary mb-4">Risk Overview</h2>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <RiskBreakdownDonut counts={counts} />

        <div className="grid grid-cols-3 gap-3 flex-1 w-full">
          {TILES.map(({ tier, label, bg, border, text }) => (
            <div
              key={tier}
              className={`${bg} border ${border} rounded-xl p-4 flex flex-col gap-1 transition-transform duration-200 hover:-translate-y-0.5`}
            >
              <span className={`text-2xl font-bold ${text}`}>{counts[tier] ?? 0}</span>
              <span className="text-xs font-medium text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}