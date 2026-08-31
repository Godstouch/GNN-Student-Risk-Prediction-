import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

export default function StudentListItem({ student }) {
  return (
    <Link
      to={`/student/${student.id}`}
      className="flex items-center justify-between bg-surface border border-border rounded-lg px-4 py-3 hover:border-border-strong hover:shadow-sm transition-all"
    >
      <div>
        <p className="font-medium text-text-primary">{student.name}</p>
        <p className="text-xs text-text-muted mt-0.5">
          Risk score: {(student.riskScore * 100).toFixed(0)}%
        </p>
      </div>
      <Badge tier={student.riskTier} />
    </Link>
  );
}
