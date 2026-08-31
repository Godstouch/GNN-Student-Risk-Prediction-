import { useState, useEffect, useCallback } from 'react';
import { addIntervention, getInterventionsForStudent } from '../lib/db';

// Encapsulates all Dexie interaction for a single student's intervention
// history, so InterventionForm and InterventionHistoryList stay pure
// presentation components with no storage logic of their own.
export function useInterventions(studentId) {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const results = await getInterventionsForStudent(studentId);
    setInterventions(results);
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logIntervention = useCallback(
    async ({ studentName, type, note }) => {
      await addIntervention({ studentId, studentName, type, note });
      await refresh();
    },
    [studentId, refresh]
  );

  return { interventions, loading, logIntervention };
}
