import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, RefreshCw } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import StudentListItem from '../components/dashboard/StudentListItem';
import RiskOverview from '../../components/dashboard/RiskOverview';
import { sortByRisk } from '../utils/riskTier';
import { getAllLocalStudents } from '../lib/db';
import { usePredictions } from '../hooks/usePredictions';

function toRosterShape(localStudent) {
  return {
    id: localStudent.id,
    name: localStudent.name,
    riskTier: 'low',
    riskScore: 0,
    unscored: true,
  };
}

function getRiskCounts(allStudents) {
  return allStudents.reduce(
    (counts, student) => {
      const key = student.unscored ? 'unscored' : student.riskTier;
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    },
    { high: 0, medium: 0, low: 0, unscored: 0 }
  );
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

  const riskCounts = getRiskCounts(allStudents);

  return (
    <AppLayout
      title="Class Roster"
      subtitle={loading ? 'Loading…' : `${allStudents.length} students · sorted by risk`}
    >
      {allStudents.length > 0 && <RiskOverview counts={riskCounts} />}

      <div className="flex items-center justify-between mb-2">
        <button
          onClick={refresh}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
        <Link
          to="/students/new"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
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
        {allStudents.map((student, i) => (
          <StudentListItem key={student.id} student={student} index={i} />
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.35s ease-out both; }
        .animate-rise { animation: rise 0.3s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in, .animate-rise { animation: none; }
        }
      `}</style>
    </AppLayout>
  );
}