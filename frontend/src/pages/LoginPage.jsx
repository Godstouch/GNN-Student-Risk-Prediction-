import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TEACHERS, setCurrentTeacher } from '../lib/session';

// Not real authentication — this is a shared classroom device, so the
// need is "which teacher's name attaches to this session's intervention
// logs," not password-protected login. Replace MOCK_TEACHERS with a real
// staff list (or real auth) once that's decided at the school level.
export default function LoginPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  function selectTeacher(name) {
    setSelected(name);
    setCurrentTeacher(name);
    setTimeout(() => navigate('/dashboard'), 260);
  }

  function initials(name) {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-start px-6 sm:px-12 lg:px-24 py-16 bg-accent">
      {/* Full-page background layers, derived from --accent */}
      <div
        className="absolute inset-0 bg-accent"
        style={{
          filter: 'hue-rotate(50deg) saturate(1.3)',
          clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 55% 100%)',
        }}
      />
      <div
        className="absolute inset-0 bg-accent"
        style={{
          filter: 'brightness(0.55) saturate(1.2)',
          clipPath: 'polygon(0 0, 40% 0, 15% 100%, 0% 100%)',
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full animate-drift"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="650" cy="120" r="240" fill="white" fillOpacity="0.12" />
        <circle
          cx="100" cy="680" r="280"
          fill="white" fillOpacity="0.15"
          style={{ filter: 'hue-rotate(80deg)' }}
        />
        <circle cx="700" cy="650" r="150" fill="white" fillOpacity="0.18" />
      </svg>

      {/* Brand content, floats over the background on larger screens */}
      <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 max-w-sm text-white z-10">
        <h2 className="text-4xl font-bold leading-tight drop-shadow-sm">
          Welcome to
          <br />
          <span className="font-normal opacity-90">EarlyFlag</span>
        </h2>
        <p className="mt-4 text-sm text-white/85">
          Log a concern in seconds, right when you notice it — so no student
          falls through the cracks.
        </p>
        <div className="mt-12 animate-float">
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <rect
              x="30" y="20" width="80" height="100" rx="8"
              fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.6" strokeWidth="2"
            />
            <rect x="52" y="12" width="36" height="16" rx="4" fill="white" />
            <line x1="46" y1="52" x2="94" y2="52" stroke="white" strokeOpacity="0.6" strokeWidth="2" />
            <line x1="46" y1="68" x2="94" y2="68" stroke="white" strokeOpacity="0.6" strokeWidth="2" />
            <line x1="46" y1="84" x2="78" y2="84" stroke="white" strokeOpacity="0.6" strokeWidth="2" />
            <path
              d="M94 32 L118 32 L118 60 L106 52 L94 60 Z"
              fill="white"
              style={{ filter: 'hue-rotate(60deg) saturate(2) brightness(1.3)' }}
            />
          </svg>
        </div>
      </div>

      {/* Floating login card */}
      <div className="relative z-10 w-full max-w-sm bg-surface border border-border rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-brand">EarlyFlag</h1>
          <p className="text-sm text-text-secondary mt-1">
            Select your name to continue
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {MOCK_TEACHERS.map((name, i) => (
            <button
              key={name}
              onClick={() => selectTeacher(name)}
              disabled={selected !== null}
              style={{ animationDelay: `${i * 45}ms` }}
              className={`
                animate-roll-in group w-full flex items-center gap-3 text-left px-4 py-3
                bg-background border border-border rounded-lg text-sm font-medium text-text-primary
                transition-all duration-200 ease-out
                hover:border-accent hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-sm
                active:translate-y-0 active:shadow-none
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
                disabled:cursor-default
                ${selected === name ? 'border-accent bg-accent-light' : ''}
                ${selected && selected !== name ? 'opacity-40' : ''}
              `}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-xs font-semibold shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{ filter: `hue-rotate(${(i * 47) % 360}deg)` }}
              >
                {initials(name)}
              </span>
              <span className="flex-1">{name}</span>
              <svg
                className={`w-4 h-4 text-accent shrink-0 transition-all duration-200 ${
                  selected === name ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.9 3.9 6.7-6.7a1 1 0 011.4 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes roll-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-2%, 2%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out both; }
        .animate-roll-in { animation: roll-in 0.35s ease-out both; }
        .animate-drift { animation: drift 14s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in, .animate-roll-in, .animate-drift, .animate-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}