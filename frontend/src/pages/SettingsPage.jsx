import { useNavigate } from 'react-router-dom';
import { RefreshCw, LogOut } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import { getCurrentTeacher, clearCurrentTeacher } from '../lib/session';

// Model metadata shown here is currently hardcoded to match the
// PLACEHOLDER contract used in mockStudentDetails.js. Once /api/meta
// exists, fetch modelVersion + lastComputedAt from there instead.
const MOCK_MODEL_META = {
  modelVersion: 'gated-gat-v2-PLACEHOLDER',
  lastComputedAt: '2026-08-01T00:00:00Z',
};

function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="text-sm font-medium text-text-primary">{value}</span>
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { isOnline, checking, refresh } = useConnectionStatus();
  const teacher = getCurrentTeacher();

  function handleSignOut() {
    clearCurrentTeacher();
    navigate('/login');
  }

  return (
    <AppLayout title="Settings" subtitle="Sync status and app preferences">
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-2">
            Connection
          </h3>
          <Row
            label="Status"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: isOnline
                      ? 'var(--color-status-online)'
                      : 'var(--color-status-offline)',
                  }}
                />
                {isOnline ? 'Connected' : 'Offline'}
              </span>
            }
          />
          <button
            onClick={refresh}
            disabled={checking}
            className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark mt-3 disabled:opacity-50"
          >
            <RefreshCw size={14} className={checking ? 'animate-spin' : ''} />
            {checking ? 'Checking…' : 'Check connection'}
          </button>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-2">
            Prediction Model
          </h3>
          <Row label="Version" value={MOCK_MODEL_META.modelVersion} />
          <Row
            label="Last updated"
            value={formatDateTime(MOCK_MODEL_META.lastComputedAt)}
          />
          <p className="text-xs text-text-muted mt-3">
            Predictions are computed in a batch job, not live per request —
            this timestamp shows how fresh the current risk scores are.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-2">
            Session
          </h3>
          <Row label="Signed in as" value={teacher ?? 'Unknown'} />
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm font-medium text-risk-high hover:opacity-80 mt-3"
          >
            <LogOut size={14} />
            Switch teacher
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
