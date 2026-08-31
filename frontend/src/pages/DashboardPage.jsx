import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, RefreshCw } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import StudentListItem from '../components/dashboard/StudentListItem';
import { sortByRisk } from '../utils/riskTier';
import { getAllLocalStudents } from '../lib/db';
import { usePredictions } from '../hooks/usePredictions';

// Locally-added students (via AddStudentPage) live only in this device's
// IndexedDB until a sync mechanism to the backend exists — they show as
// 'unscored' since the model has never actually evaluated them, distinct
// from real predictions coming from the API.
function toRosterShape(localStudent) {
  return {
    id: localStudent.id,
    name: localStudent.name,
    riskTier: 'low',
    riskScore: 0,
    unscored: true,
  };
}

export default function DashboardPage() {
  const { students, loading, error, refresh } = usePredictions();
  const [localStudents, setLocalStudents] = useState([]);

  useEffect(() => {
    getAllLocalStudents().then(setLocalStudents);
  }, []);

  const allStudents = sortByRisk([
    ...students,
    ...localStudents.map(toRosterShape),
  ]);

  return (
    <AppLayout
      title="Class Roster"
      subtitle={loading ? 'Loading…' : `${allStudents.length} students · sorted by risk`}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={refresh}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
        <Link
          to="/students/new"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark"
        >
          <UserPlus size={16} />
          Add Student
        </Link>
      </div>

      {error && (
        <div className="bg-risk-high-bg border border-risk-high-border text-risk-high text-sm rounded-md p-3 mb-3">
          Couldn't reach the prediction server ({error}). Showing cached
          data if available.
        </div>
      )}

      <div className="flex flex-col gap-2 mt-2">
        {allStudents.map((student) => (
          <StudentListItem key={student.id} student={student} />
        ))}
      </div>
    </AppLayout>
  );
}
