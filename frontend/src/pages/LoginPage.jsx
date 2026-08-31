import { useNavigate } from 'react-router-dom';
import { MOCK_TEACHERS, setCurrentTeacher } from '../lib/session';

// Not real authentication — this is a shared classroom device, so the
// need is "which teacher's name attaches to this session's intervention
// logs," not password-protected login. Replace MOCK_TEACHERS with a real
// staff list (or real auth) once that's decided at the school level.
export default function LoginPage() {
  const navigate = useNavigate();

  function selectTeacher(name) {
    setCurrentTeacher(name);
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-brand">EarlyFlag</h1>
          <p className="text-sm text-text-secondary mt-1">
            Select your name to continue
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {MOCK_TEACHERS.map((name) => (
            <button
              key={name}
              onClick={() => selectTeacher(name)}
              className="w-full text-left px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary hover:border-accent hover:bg-accent-light transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
