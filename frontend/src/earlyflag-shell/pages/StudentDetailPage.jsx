import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

// Placeholder — Person B builds the real explanation graph and feature
// breakdown here in Week 2. Wired into routing now so navigation works
// end-to-end from day one.
export default function StudentDetailPage() {
  const { id } = useParams();

  return (
    <AppLayout title="Student Detail" subtitle={`Student ID: ${id}`}>
      <div className="mt-4 bg-surface border border-border rounded-lg p-6 text-text-secondary">
        Risk explanation and feature breakdown coming in Week 2.
      </div>
    </AppLayout>
  );
}
