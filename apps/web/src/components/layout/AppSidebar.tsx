import { preloadRoute } from '@/App';
import { BrandLogo } from '@/components/navigation/BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/cn';
import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CalendarCheck2,
  Clock3,
  HelpCircle,
  Home,
  LayoutDashboard,
  Library,
  MessageSquare,
  Scale,
  Settings,
  Shield,
  Users,
  Wind,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const sections = [
  {
    title: 'Dashboard',
    items: [
      { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true, tour: 'nav-overview' },
      { to: '/app/wellbeing', label: 'My Wellbeing', icon: Activity },
      { to: '/app/screen-time', label: 'Screen Time', icon: Clock3 },
      { to: '/app/mindful', label: 'Mindful Breaks', icon: Wind },
      { to: '/app/challenges', label: 'Daily Challenges', icon: CalendarCheck2 },
      { to: '/app/progress', label: 'Progress', icon: Award },
    ],
  },
  {
    title: 'Learn',
    items: [
      { to: '/app/learn/safety', label: 'Learn', icon: Shield, tour: 'nav-learn' },
      { to: '/app/learn/policies', label: 'Policies', icon: BookOpen },
      { to: '/app/learn/research', label: 'Research', icon: Library },
      { to: '/app/learn/age', label: 'Age Eligibility', icon: Scale },
      { to: '/app/learn/health', label: 'Health Impact', icon: Brain },
      { to: '/app/learn/quiz', label: 'Safety Quiz', icon: HelpCircle },
    ],
  },
  {
    title: 'Community & Family',
    items: [
      { to: '/app/family', label: 'Family Wellbeing', icon: Users },
      { to: '/app/family/parents', label: 'Parent Resources', icon: Users },
      { to: '/app/family/education', label: 'Educational Resources', icon: BookOpen },
    ],
  },
  {
    title: 'Tools',
    items: [
      { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/app/assistant', label: 'AI Assistant', icon: MessageSquare },
      { to: '/app/settings', label: 'Settings', icon: Settings, tour: 'nav-settings' },
    ],
  },
];

export function AppSidebar({
  onNavigate,
  onStartTour,
}: {
  onNavigate?: () => void;
  onStartTour?: () => void;
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <aside
      data-tour="app-sidebar"
      className="flex h-full w-72 flex-col border-r border-slate-200 bg-white/95 dark:border-white/10 dark:bg-slate-950/95"
    >
      <div className="border-b border-slate-200 px-4 py-4 dark:border-white/10">
        <BrandLogo subtitle="Digital wellbeing" tooltip="Return to website" />
      </div>

      <div className="border-b border-slate-200 px-3 py-3 dark:border-white/10">
        <Link
          to="/"
          title="Return to public marketing website"
          onClick={onNavigate}
          className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#8B7CF6] dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-[#8B7CF6]"
        >
          <div className="flex items-center gap-2.5">
            <Home className="h-4 w-4 shrink-0 text-[#8B7CF6] transition-transform group-hover:scale-110" />
            <span>Home</span>
          </div>
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 group-hover:bg-[#8B7CF6]/15 group-hover:text-[#8B7CF6] dark:bg-white/10 dark:text-slate-400">
            Public Site
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="App">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {section.title}
            </div>
            <ul className="mt-2 space-y-1">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={'end' in item ? item.end : undefined}
                    data-tour={'tour' in item ? item.tour : undefined}
                    onClick={onNavigate}
                    onMouseEnter={() => preloadRoute(item.to)}
                    onFocus={() => preloadRoute(item.to)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5',
                        isActive && 'bg-[#8B7CF6]/10 text-[#8B7CF6]'
                      )
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {isAdmin ? (
          <div>
            <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Admin
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <NavLink
                  to="/app/admin"
                  onClick={onNavigate}
                  onMouseEnter={() => preloadRoute('/app/admin')}
                  onFocus={() => preloadRoute('/app/admin')}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5',
                      isActive && 'bg-[#8B7CF6]/10 text-[#8B7CF6]'
                    )
                  }
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>

      <div className="border-t border-slate-200 p-3 dark:border-white/10">
        <button
          type="button"
          onClick={() => {
            onStartTour?.();
            onNavigate?.();
          }}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#8B7CF6] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#8B7CF6]"
        >
          <HelpCircle className="h-4 w-4 text-[#8B7CF6]" />
          Help & Guided Tour
        </button>
      </div>
    </aside>
  );
}
