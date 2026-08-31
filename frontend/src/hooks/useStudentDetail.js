import { useState, useEffect, useCallback } from 'react';
import { getStudentDetail } from '../lib/api';
import { enrichFeatures } from '../utils/featureLabels';

export function useStudentDetail(id) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudentDetail(id);
      setStudent({
        ...data,
        features: enrichFeatures(data.features),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { student, loading, error, refresh };
}
