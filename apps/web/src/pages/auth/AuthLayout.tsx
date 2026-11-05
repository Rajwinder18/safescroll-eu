import { isDemoMode } from '@/lib/demo';
import { Shield } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-navy via-slate-900 to-indigo-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.28),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.22),transparent_36%)]"
        />
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-3 font-bold tracking-tight">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-lavender to-brand-electric shadow-glow">
              <Shield className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-xl">Safe Scroll</span>
          </Link>
          <p className="ss-kicker mt-14 text-indigo-200">EU digital wellbeing</p>
          <h1 className="mt-3 max-w-md text-4xl font-semibold leading-tight tracking-tight">
            Healthier scrolling habits, grounded in European policy context.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
            Track mindful routines, explore age and consent rules, and keep family
            digital wellbeing conversations practical.
          </p>
        </div>
        <p className="relative text-xs text-slate-400">
          Demonstration authentication only — not a production-secure identity
          system until Supabase Auth is connected.
        </p>
      </aside>

      <div className="flex flex-col bg-brand-soft dark:bg-[#0B1220]">
        <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3 lg:hidden dark:border-white/10">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-lavender to-brand-electric text-white">
              <Shield className="h-4 w-4" aria-hidden />
            </span>
            Safe Scroll
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {isDemoMode() ? (
              <p className="mb-4 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
                Demo auth is local mock storage only — not production-secure.
              </p>
            ) : null}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
