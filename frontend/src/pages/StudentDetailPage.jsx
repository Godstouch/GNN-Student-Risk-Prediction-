import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import RiskScoreHeader from '../components/student-detail/RiskScoreHeader';
import FeatureBreakdown from '../components/student-detail/FeatureBreakdown';
import ExplanationGraph from '../components/student-detail/ExplanationGraph';
import UpdateMetricsForm from '../components/student-detail/UpdateMetricsForm';
import MetricsHistoryList from '../components/student-detail/MetricsHistoryList';
import InterventionForm from '../components/intervention/InterventionForm';
import InterventionHistoryList from '../components/intervention/InterventionHistoryList';
import { useStudentDetail } from '../hooks/useStudentDetail';
import { useInterventions } from '../hooks/useInterventions';
import { useMetricsHistory } from '../hooks/useMetricsHistory';

export default function StudentDetailPage() {
  const { id } = useParams();
  const { student, loading, error } = useStudentDetail(id);
  const { interventions, logIntervention } = useInterventions(id);
  const { updates, logUpdate } = useMetricsHistory(id);

  return (
    <AppLayout title="Student Detail" subtitle={student?.name ?? '…'}>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark mb-4"
      >
        <ArrowLeft size={14} />
        Back to roster
      </Link>

      {loading && (
        <p className="text-sm text-text-muted">Loading student data…</p>
      )}

      {error && !student && (
        <div className="bg-risk-high-bg border border-risk-high-border text-risk-high text-sm rounded-md p-3">
          Couldn't reach the prediction server ({error}), and no cached
          data is available for this student yet.
        </div>
      )}

      {student && (
        <div className="flex flex-col gap-4">
          <RiskScoreHeader student={student} />
          <ExplanationGraph graph={student.explanationGraph} />
          <FeatureBreakdown features={student.features} />

          <UpdateMetricsForm onSubmit={logUpdate} />
          {updates.length > 0 && (
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-1">
                Metrics History
              </h3>
              <p className="text-xs text-text-secondary">
                Locally logged updates — not yet reflected in the risk score
                above until the next batch prediction run.
              </p>
              <MetricsHistoryList updates={updates} />
            </div>
          )}

          <InterventionForm studentName={student.name} onSubmit={logIntervention} />

          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Intervention History
            </h3>
            <InterventionHistoryList interventions={interventions} />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
