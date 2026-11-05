import { preloadRoute } from '@/App';
import { FeatureTourOffer } from '@/components/guided-tour/FeatureTourOffer';
import { GuidedTour } from '@/components/guided-tour/GuidedTour';
import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { TourWelcomeModal } from '@/components/guided-tour/TourWelcomeModal';
import { BrandLogo } from '@/components/navigation/BrandLogo';
import { PageTransition } from '@/components/transitions/PageTransition';
import { PageSkeleton } from '@/components/transitions/PageSkeleton';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { GuidedTourProvider, useGuidedTour } from '@/hooks/useGuidedTour';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { MobileBottomNav } from './MobileBottomNav';

function AppShell() {
  const { user, signOut, demoMode } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const { replayCurrent } = useGuidedTour();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const idlePreload = () => {
      [
        '/app/wellbeing',
        '/app/screen-time',
        '/app/mindful',
        '/app/challenges',
        '/app/progress',
        '/app/learn/safety',
        '/app/learn/age',
        '/app/learn/policies',
        '/app/learn/health',
        '/app/learn/quiz',
      ].forEach((route) => preloadRoute(route));
    };
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(idlePreload);
      } else {
        setTimeout(idlePreload, 1500);
      }
    }
  }, []);

  if (!user) return <Navigate to="/auth/sign-in" replace />;

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 dark:bg-[#0B1220] dark:text-slate-100">
      <DemoBanner />
      <div className="flex min-h-[calc(100vh-36px)]">
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen">
            <AppSidebar onStartTour={replayCurrent} />
          </div>
        </div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/40"
              aria-label="Close navigation overlay"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative h-full w-72">
              <AppSidebar
                onNavigate={() => setMobileOpen(false)}
                onStartTour={replayCurrent}
              />
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-200 p-2 lg:hidden dark:border-white/10"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="lg:hidden">
                <BrandLogo tooltip="Return to website" />
              </div>
              <div className="hidden min-w-0 sm:block">
                <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  Hello, {user.displayName.split(' ')[0]}
                </div>
                <div className="truncate text-xs text-slate-500">
                  {demoMode ? 'Demo session' : 'Signed in'} · {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TourHelpButton />
              <button
                type="button"
                className="ss-btn-secondary !px-3"
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <Link to="/app/settings" className="ss-btn-secondary hidden sm:inline-flex">
                Settings
              </Link>
              <button type="button" className="ss-btn-secondary" onClick={() => signOut()}>
                Log out
              </button>
            </div>
          </header>

          <main className="flex-1 bg-[#F8F9FC] px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-6 dark:bg-[#0B1220]">
            <PageTransition />
          </main>
          <MobileBottomNav />
        </div>
      </div>

      <TourWelcomeModal />
      <FeatureTourOffer />
      <GuidedTour />
    </div>
  );
}

export function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] p-8 dark:bg-[#0B1220]">
        <PageSkeleton />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth/sign-in" replace />;

  return (
    <GuidedTourProvider>
      <AppShell />
    </GuidedTourProvider>
  );
}
