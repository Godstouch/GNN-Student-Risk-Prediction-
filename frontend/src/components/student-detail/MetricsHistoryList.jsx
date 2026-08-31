function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function MetricsHistoryList({ updates }) {
  if (updates.length === 0) {
    return (
      <p className="text-sm text-text-muted py-2">
        No metrics logged yet — use "New Update" above to add the first one.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      {updates.map((u) => (
        <div key={u.id} className="border border-border rounded-md p-3 text-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-text-primary">
              {formatDate(u.recordedAt)}
            </span>
            <span className="text-xs text-text-muted">
              Attendance: {(u.attendance_mean * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            Sem 1: {(u['Semester 1 average'] * 100).toFixed(0)}% · Sem 2:{' '}
            {(u['Semester 2 average'] * 100).toFixed(0)}%
          </p>
        </div>
      ))}
    </div>
  );
}
