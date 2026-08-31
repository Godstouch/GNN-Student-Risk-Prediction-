import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Settings } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/interventions', label: 'Interventions', icon: ClipboardList },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function NavBar() {
  return (
    <nav className="bg-brand text-text-on-brand">
      <div className="max-w-5xl mx-auto px-4 flex items-center h-14 gap-6">
        <span className="font-semibold tracking-tight">EarlyFlag</span>
        <div className="flex gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
