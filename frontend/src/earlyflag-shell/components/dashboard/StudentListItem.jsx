import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import ScoreRing from './ScoreRing';

const TIER_HOVER = {
  high: 'hover:border-risk-high',
  medium: 'hover:border-risk-medium',
  low: 'hover:border-risk-low',
};

export default function StudentListItem({ student, index = 0 }) {
  const scorePercent = Math.round((student.riskScore ?? 0) * 100);

  return (
    <Link
      to={`/student/${student.id}`}
      style={{ animationDelay: `${index * 40}ms` }}
      className={`animate-rise flex items-center justify-between gap-4 bg-surface border border-border rounded-lg px-4 py-3 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 ${
        TIER_HOVER[student.riskTier] ?? ''
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {student.unscored ? (
          <div className="w-11 h-11 rounded-full border-2 border-dashed border-border flex items-center justify-center text-[10px] text-text-muted shrink-0">
            —
          </div>
        ) : (
          <ScoreRing score={student.riskScore ?? 0} tier={student.riskTier} />
        )}
        <div className="min-w-0">
          <p className="font-medium text-text-primary truncate">{student.name}</p>
          <p className="text-xs text-text-muted mt-0.5">
            {student.unscored ? 'Not yet scored' : `Risk score: ${scorePercent}%`}
          </p>
        </div>
      </div>
      <Badge tier={student.riskTier} />
    </Link>
  );
}