export default function ScoreRing({ score, tier, size = 44, strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, score));
  const dash = circumference * progress;

  const tierColorClass =
    { high: 'text-risk-high', medium: 'text-risk-medium', low: 'text-risk-low' }[tier] ??
    'text-text-muted';

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          strokeWidth={strokeWidth} className="stroke-border"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          className={`${tierColorClass} stroke-current transition-all duration-500 ease-out`}
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-semibold ${tierColorClass}`}>
        {Math.round(progress * 100)}
      </span>
    </div>
  );
}