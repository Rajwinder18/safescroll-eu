import { DemoBanner } from '@/components/ui/DemoBanner';
import { BrandLogo } from '@/components/navigation/BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/cn';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/#features', label: 'Features', hash: 'features' },
  { to: '/#how-it-works', label: 'How it works', hash: 'how-it-works' },
  { to: '/research', label: 'Research' },
  { to: '/about', label: 'About' },
];

export function PublicHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMarketingHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <DemoBanner />
      <div
        className={cn(
          'border-b transition-colors duration-300',
          scrolled || !isMarketingHome
            ? 'border-white/10 bg-[#111827]/85 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="relative z-10" onClick={() => setOpen(false)}>
            <BrandLogo light tooltip="Safe Scroll home" />
          </div>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((link) =>
              link.hash ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#A1A1AA] transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2 text-sm font-medium text-[#A1A1AA] transition hover:bg-white/5 hover:text-white',
                      isActive && 'bg-white/10 text-white'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <Link
                to="/app"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#B7A6FF]"
              >
                Open app
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/sign-in"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/5"
                >
                  Log in
                </Link>
                <Link
                  to="/auth/sign-up"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#B7A6FF]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="rounded-xl border border-white/15 p-2 text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-white/10 bg-[#111827]/95 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/85"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3">
                {user ? (
                  <Link
                    to="/app"
                    className="block w-full rounded-xl bg-white px-3 py-2.5 text-center text-sm font-semibold text-[#111827] transition hover:bg-[#B7A6FF]"
                    onClick={() => setOpen(false)}
                  >
                    Open app
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/auth/sign-in"
                      className="rounded-xl border border-white/15 px-3 py-2.5 text-center text-sm text-white"
                      onClick={() => setOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/auth/sign-up"
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-sm font-semibold text-[#111827]"
                      onClick={() => setOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
