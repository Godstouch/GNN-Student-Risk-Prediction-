import { useState, useEffect, useCallback } from 'react';
import { getStudents } from '../lib/api';

// Fetches the roster from the real Flask backend. If the fetch fails
// (backend/Pi unreachable), the service worker's NetworkFirst cache
// (configured in vite.config.js) will have already served a cached
// response before this ever sees a failure — this hook's error state
// only fires on a genuinely first-ever offline load with nothing cached
// yet, or a real backend/server error.
export function usePredictions() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { students, loading, error, refresh };
}
