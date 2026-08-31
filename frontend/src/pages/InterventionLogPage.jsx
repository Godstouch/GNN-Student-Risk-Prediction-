import { useState, useEffect } from 'react';
import AppLayout from '../layouts/AppLayout';
import InterventionHistoryList from '../components/intervention/InterventionHistoryList';
import { getAllInterventions } from '../lib/db';

export default function InterventionLogPage() {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllInterventions().then((results) => {
      setInterventions(results);
      setLoading(false);
    });
  }, []);

  return (
    <AppLayout
      title="Intervention Log"
      subtitle={loading ? 'Loading…' : `${interventions.length} logged across all students`}
    >
      <div className="mt-4">
        <InterventionHistoryList interventions={interventions} showStudentName />
      </div>
    </AppLayout>
  );
}
