import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import {
  addStudent,
  PARENTAL_EDUCATION_LEVELS,
  TRANSPORT_MODES,
} from '../lib/db';

// Fields here are the STATIC profile fields from feature_cols_final_PLACEHOLDER
// — things entered once and rarely changed (household income, family
// history, travel time, etc.). Recurring fields (attendance, grades) are
// NOT here — those go through the separate "Update Metrics" flow on the
// student detail page, since they change over time.
const initialState = {
  name: '',
  school: '',
  gender: '',
  classLevel: '',
  parentalEducation: PARENTAL_EDUCATION_LEVELS[0],
  householdIncomeLevel: '',
  familyDropoutHistory: false,
  childLaborInvolvement: false,
  travelTimeMinutes: '',
  transportMode: TRANSPORT_MODES[0],
};

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

const inputClass =
  'w-full px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary placeholder:text-text-muted focus:border-accent';

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSaving(true);

    // long_commute_flag / long_walk_flag are derived, not entered directly —
    // matches how these two columns are described in feature_cols_final_PLACEHOLDER.
    const travelMinutes = Number(form.travelTimeMinutes) || 0;
    const longCommuteFlag = travelMinutes > 45 ? 1 : 0;
    const longWalkFlag = form.transportMode === 'Walking' && travelMinutes > 30 ? 1 : 0;

    const id = await addStudent({
      name: form.name.trim(),
      school: form.school.trim(),
      gender: form.gender,
      classLevel: form.classLevel,
      parentalEducation: form.parentalEducation,
      householdIncomeLevel: form.householdIncomeLevel,
      familyDropoutHistory: form.familyDropoutHistory,
      childLaborInvolvement: form.childLaborInvolvement,
      travelTimeMinutes: travelMinutes,
      transportMode: form.transportMode,
      longCommuteFlag,
      longWalkFlag,
    });

    setSaving(false);
    navigate(`/student/${id}`);
  }

  return (
    <AppLayout title="Add Student" subtitle="One-time profile — entered once when a student joins">
      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 max-w-lg">
        <Field label="Full name">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
        </Field>

        <Field label="School">
          <input
            className={inputClass}
            value={form.school}
            onChange={(e) => update('school', e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Gender">
            <select
              className={inputClass}
              value={form.gender}
              onChange={(e) => update('gender', e.target.value)}
            >
              <option value="">Select…</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </Field>

          <Field label="Class level">
            <input
              className={inputClass}
              placeholder="e.g. JHS 2"
              value={form.classLevel}
              onChange={(e) => update('classLevel', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Parental education level">
          <select
            className={inputClass}
            value={form.parentalEducation}
            onChange={(e) => update('parentalEducation', e.target.value)}
          >
            {PARENTAL_EDUCATION_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </Field>

        <Field label="Household income level">
          <select
            className={inputClass}
            value={form.householdIncomeLevel}
            onChange={(e) => update('householdIncomeLevel', e.target.value)}
          >
            <option value="">Select…</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Travel time to school (minutes)">
            <input
              type="number"
              min="0"
              className={inputClass}
              value={form.travelTimeMinutes}
              onChange={(e) => update('travelTimeMinutes', e.target.value)}
            />
          </Field>

          <Field label="Mode of transport">
            <select
              className={inputClass}
              value={form.transportMode}
              onChange={(e) => update('transportMode', e.target.value)}
            >
              {TRANSPORT_MODES.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="flex flex-col gap-2 mt-2 mb-4">
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={form.familyDropoutHistory}
              onChange={(e) => update('familyDropoutHistory', e.target.checked)}
            />
            Family dropout history
          </label>
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={form.childLaborInvolvement}
              onChange={(e) => update('childLaborInvolvement', e.target.checked)}
            />
            Child labor involvement
          </label>
        </div>

        <button
          type="submit"
          disabled={saving || !form.name.trim()}
          className="px-4 py-2 text-sm font-medium rounded-md bg-accent text-text-on-accent disabled:opacity-50 hover:bg-accent-dark transition-colors"
        >
          {saving ? 'Saving…' : 'Add Student'}
        </button>

        <p className="text-xs text-text-muted mt-3">
          After adding, you'll be taken to their profile to enter the first
          set of attendance/academic metrics.
        </p>
      </form>
    </AppLayout>
  );
}
