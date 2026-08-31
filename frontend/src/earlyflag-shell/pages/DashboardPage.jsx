import AppLayout from '../layouts/AppLayout';
import StudentListItem from '../components/dashboard/StudentListItem';
import { mockStudents } from '../utils/mockStudents';
import { sortByRisk } from '../utils/riskTier';

export default function DashboardPage() {
  const students = sortByRisk(mockStudents);

  return (
    <AppLayout
      title="Class Roster"
      subtitle={`${students.length} students · sorted by risk`}
    >
      <div className="flex flex-col gap-2 mt-4">
        {students.map((student) => (
          <StudentListItem key={student.id} student={student} />
        ))}
      </div>
    </AppLayout>
  );
}
