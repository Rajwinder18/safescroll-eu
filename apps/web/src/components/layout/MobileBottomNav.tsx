import { preloadRoute } from '@/App';
import { cn } from '@/lib/cn';
import {
  CalendarCheck2,
  Clock3,
  LayoutDashboard,
  Settings,
  Wind,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/app', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/app/screen-time', label: 'Screen', icon: Clock3 },
  { to: '/app/mindful', label: 'Mindful', icon: Wind },
  { to: '/app/challenges', label: 'Goals', icon: CalendarCheck2 },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-slate-950/95"
      aria-label="Mobile"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between gap-1">
        {items.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              onTouchStart={() => preloadRoute(item.to)}
              onMouseEnter={() => preloadRoute(item.to)}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-slate-500',
                  isActive && 'bg-[#8B7CF6]/10 text-[#8B7CF6]'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
