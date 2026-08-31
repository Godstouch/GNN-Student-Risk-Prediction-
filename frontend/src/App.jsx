import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import StudentDetailPage from './pages/StudentDetailPage';
import InterventionLogPage from './pages/InterventionLogPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import AddStudentPage from './pages/AddStudentPage';
import { getCurrentTeacher } from './lib/session';

function RequireTeacher({ children }) {
  const teacher = getCurrentTeacher();
  return teacher ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireTeacher>
              <DashboardPage />
            </RequireTeacher>
          }
        />
        <Route
          path="/students/new"
          element={
            <RequireTeacher>
              <AddStudentPage />
            </RequireTeacher>
          }
        />
        <Route
          path="/student/:id"
          element={
            <RequireTeacher>
              <StudentDetailPage />
            </RequireTeacher>
          }
        />
        <Route
          path="/interventions"
          element={
            <RequireTeacher>
              <InterventionLogPage />
            </RequireTeacher>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireTeacher>
              <SettingsPage />
            </RequireTeacher>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
