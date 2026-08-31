import { useState, useEffect, useCallback } from 'react';
import { addMetricsUpdate, getMetricsHistoryForStudent } from '../lib/db';

export function useMetricsHistory(studentId) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const results = await getMetricsHistoryForStudent(studentId);
    setUpdates(results);
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logUpdate = useCallback(
    async (metrics) => {
      await addMetricsUpdate({ studentId, ...metrics });
      await refresh();
    },
    [studentId, refresh]
  );

  return { updates, loading, logUpdate };
}
