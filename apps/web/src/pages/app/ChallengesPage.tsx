import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { PageHeader } from '@/components/navigation/PageHeader';
import { api } from '@safescroll/api-client';
import type { Challenge, ChallengeProgress } from '@safescroll/shared-types';
import { useEffect, useState } from 'react';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [progress, setProgress] = useState<Record<string, ChallengeProgress>>({});

  const reload = async () => {
    const [c, p] = await Promise.all([api.challenges.listChallenges(), api.challenges.getProgress()]);
    setChallenges(c.data || []);
    setProgress(p.data || {});
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6" data-tour="page-root">
      <PageHeader
        kicker="Daily habits"
        title="Challenges"
        description="Build healthier routines through small achievable goals. Demonstration progress is stored locally."
        crumbs={[
          { label: 'Website', to: '/' },
          { label: 'App', to: '/app' },
          { label: 'Challenges' },
        ]}
        actions={<TourHelpButton />}
      />

      <div className="grid gap-4 md:grid-cols-2" data-tour="challenge-list">
        {challenges.map((challenge) => {
          const p = progress[challenge.id];
          const count = p?.completedCount || 0;
          const pct = Math.min(100, Math.round((count / challenge.targetCount) * 100));
          return (
            <article key={challenge.id} className="ss-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-brand-electric">
                    {challenge.cadence} · {challenge.category.replaceAll('_', ' ')}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold">{challenge.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{challenge.description}</p>
                </div>
                <div className="rounded-xl bg-slate-50 px-2 py-1 text-xs font-semibold dark:bg-white/5">
                  +{challenge.points}
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10" data-tour="challenge-progress-bar">
                <div className="h-full bg-brand-mint transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>
                  {count}/{challenge.targetCount}
                  {p?.completed ? ' · Complete' : ''}
                </span>
                <button
                  type="button"
                  data-tour="challenge-action"
                  className="ss-btn-primary !py-1.5"
                  disabled={Boolean(p?.completed)}
                  onClick={async () => {
                    await api.challenges.increment(challenge.id);
                    await reload();
                  }}
                >
                  Log progress
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
