import { useState } from 'react';

// Fields here are the RECURRING indicators — the ones that actually change
// over time and drive updated risk predictions, as opposed to the static
// profile fields entered once via AddStudentPage. Values entered as
// intuitive units (e.g. "attended 4 of 5 days") and converted to the
// 0-1 ratios the model expects.
const inputClass =
  'w-full px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary placeholder:text-text-muted focus:border-accent';

function Field({ label, children }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-text-secondary mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const initialState = {
  daysAttended: '',
  daysScheduled: '',
  semester1Avg: '',
  semester2Avg: '',
  teacherRelationship: '3',
  peerRelationship: '3',
  extraCurricular: false,
};

export default function UpdateMetricsForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const attended = Number(form.daysAttended) || 0;
    const scheduled = Number(form.daysScheduled) || 1;
    const sem1 = Number(form.semester1Avg) || 0;
    const sem2 = Number(form.semester2Avg) || 0;

    await onSubmit({
      attendance_mean: attended / scheduled,
      'Semester 1 average': sem1 / 100,
      'Semester 2 average': sem2 / 100,
      'Semester difference': (sem2 - sem1) / 100,
      'Teacher relationship quality': Number(form.teacherRelationship) / 5,
      'Peer relationship quality': Number(form.peerRelationship) / 5,
      'Extra-curricular activities': form.extraCurricular ? 1 : 0,
    });

    setSaving(false);
    setForm(initialState);
    setExpanded(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  if (!expanded) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">
            Update Metrics
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            Log this student's latest attendance and academic data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {justSaved && (
            <span className="text-xs text-risk-low font-medium">Saved ✓</span>
          )}
          <button
            onClick={() => setExpanded(true)}
            className="px-4 py-2 text-sm font-medium rounded-md bg-accent text-text-on-accent hover:bg-accent-dark transition-colors"
          >
            + New Update
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3">
        Update Metrics
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Days attended (this period)">
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.daysAttended}
            onChange={(e) => update('daysAttended', e.target.value)}
            required
          />
        </Field>
        <Field label="Days scheduled (this period)">
          <input
            type="number"
            min="1"
            className={inputClass}
            value={form.daysScheduled}
            onChange={(e) => update('daysScheduled', e.target.value)}
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Semester 1 average (%)">
          <input
            type="number"
            min="0"
            max="100"
            className={inputClass}
            value={form.semester1Avg}
            onChange={(e) => update('semester1Avg', e.target.value)}
          />
        </Field>
        <Field label="Semester 2 average (%)">
          <input
            type="number"
            min="0"
            max="100"
            className={inputClass}
            value={form.semester2Avg}
            onChange={(e) => update('semester2Avg', e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Teacher relationship quality (1–5)">
          <input
            type="range"
            min="1"
            max="5"
            value={form.teacherRelationship}
            onChange={(e) => update('teacherRelationship', e.target.value)}
            className="w-full"
          />
        </Field>
        <Field label="Peer relationship quality (1–5)">
          <input
            type="range"
            min="1"
            max="5"
            value={form.peerRelationship}
            onChange={(e) => update('peerRelationship', e.target.value)}
            className="w-full"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-text-primary mb-4">
        <input
          type="checkbox"
          checked={form.extraCurricular}
          onChange={(e) => update('extraCurricular', e.target.checked)}
        />
        Participates in extra-curricular activities
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm font-medium rounded-md bg-accent text-text-on-accent disabled:opacity-50 hover:bg-accent-dark transition-colors"
        >
          {saving ? 'Saving…' : 'Save Update'}
        </button>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-sm text-text-secondary hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
