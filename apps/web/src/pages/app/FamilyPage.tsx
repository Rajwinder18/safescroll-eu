import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { api } from '@safescroll/api-client';
import type { FamilyOverview } from '@safescroll/shared-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FamilyPage() {
  const [family, setFamily] = useState<FamilyOverview | null>(null);

  useEffect(() => {
    api.family.getOverview().then((r) => setFamily(r.data));
  }, []);

  if (!family) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">Family wellbeing</p>
          <h1 className="mt-2 text-3xl font-bold">{family.name}</h1>
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-200">
            Demonstration family data. Not covert surveillance — consent required for shared views.
          </p>
        </div>
        <TourHelpButton />
      </header>

      <section className="ss-card" data-tour="family-consent">
        <h2 className="font-semibold">Privacy & consent</h2>
        <p className="mt-2 text-sm text-slate-500">
          Shared family progress should only appear when adults and capable teens agree. Safe Scroll
          does not build hidden monitoring.
        </p>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 accent-brand-electric"
            checked={family.consentGranted}
            onChange={async (e) => {
              const res = await api.family.setConsent(e.target.checked);
              setFamily(res.data);
            }}
          />
          Household consent granted for shared wellbeing summaries (demo)
        </label>
      </section>

      <section className="grid gap-4 md:grid-cols-3" data-tour="family-members">
        {family.members.map((m) => (
          <article key={m.id} className="ss-card">
            <div className="text-xs uppercase tracking-wide text-slate-400">{m.role} · {m.ageBand}</div>
            <h2 className="mt-1 text-lg font-semibold">{m.name}</h2>
            <p className="mt-3 text-sm text-slate-500">
              Demo wellbeing index:{' '}
              <span className="font-semibold text-brand-electric">
                {family.consentGranted ? m.wellbeingScore : 'Hidden'}
              </span>
            </p>
          </article>
        ))}
      </section>

      <section className="ss-card" data-tour="family-guidelines">
        <h2 className="font-semibold">Shared goals</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {family.sharedGoals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/app/family/parents" className="ss-btn-secondary">
            Parent resources
          </Link>
          <Link to="/app/family/education" className="ss-btn-secondary">
            Educational resources
          </Link>
          <Link to="/app/challenges" className="ss-btn-primary">
            Family challenges
          </Link>
        </div>
      </section>
    </div>
  );
}
