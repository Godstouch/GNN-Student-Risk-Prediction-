import { useState } from 'react';
import { INTERVENTION_TYPES } from '../../lib/db';

export default function InterventionForm({ studentName, onSubmit }) {
  const [type, setType] = useState(INTERVENTION_TYPES[0]);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!note.trim()) return;

    setSubmitting(true);
    await onSubmit({ studentName, type, note: note.trim() });
    setSubmitting(false);
    setNote('');
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3">
        Log an Intervention
      </h3>

      <label className="block text-xs font-medium text-text-secondary mb-1">
        Type
      </label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full mb-3 px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:border-accent"
      >
        {INTERVENTION_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label className="block text-xs font-medium text-text-secondary mb-1">
        Notes
      </label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="What did you discuss or arrange?"
        className="w-full mb-3 px-3 py-2 text-sm border border-border rounded-md bg-surface text-text-primary placeholder:text-text-muted focus:border-accent resize-none"
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !note.trim()}
          className="px-4 py-2 text-sm font-medium rounded-md bg-accent text-text-on-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-dark transition-colors"
        >
          {submitting ? 'Saving…' : 'Log Intervention'}
        </button>
        {justSaved && (
          <span className="text-xs text-risk-low font-medium">Saved ✓</span>
        )}
      </div>
    </form>
  );
}
