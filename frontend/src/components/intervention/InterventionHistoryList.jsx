import { Link } from 'react-router-dom';

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// showStudentName: true on the global log page (where entries span many
// students), false on Student Detail (where it's redundant — the whole
// page is already about one student).
export default function InterventionHistoryList({ interventions, showStudentName = false }) {
  if (interventions.length === 0) {
    return (
      <p className="text-sm text-text-muted py-4">
        No interventions logged yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {interventions.map((item) => (
        <div
          key={item.id}
          className="border border-border rounded-md p-3 bg-surface"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-accent uppercase tracking-wide">
              {item.type}
            </span>
            <span className="text-xs text-text-muted">
              {formatDate(item.createdAt)}
            </span>
          </div>
          {showStudentName && (
            <Link
              to={`/student/${item.studentId}`}
              className="text-sm font-medium text-text-primary hover:text-accent"
            >
              {item.studentName}
            </Link>
          )}
          <p className="text-sm text-text-secondary mt-1">{item.note}</p>
        </div>
      ))}
    </div>
  );
}
