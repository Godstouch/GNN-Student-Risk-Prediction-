import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import StudentDetailPage from './pages/StudentDetailPage';
import InterventionLogPage from './pages/InterventionLogPage';
import SettingsPage from './pages/SettingsPage';

// LoginPage intentionally left out of routing for now — add it back in
// once auth is decided (simple teacher-name select vs real auth), and
// change the default redirect below from /dashboard to /login.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/student/:id" element={<StudentDetailPage />} />
        <Route path="/interventions" element={<InterventionLogPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
