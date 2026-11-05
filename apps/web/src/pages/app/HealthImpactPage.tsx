import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { healthImpactItems } from '@safescroll/policy-content';
import { useMemo, useState } from 'react';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'physical', label: 'Physical' },
  { id: 'mental', label: 'Mental & emotional' },
  { id: 'cognitive', label: 'Cognitive & behavioural' },
] as const;

export default function HealthImpactPage() {
  const [hours, setHours] = useState(4);
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');

  const items = useMemo(
    () =>
      healthImpactItems.filter((item) => filter === 'all' || item.category === filter),
    [filter]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">Health impact</p>
          <h1 className="mt-2 text-3xl font-bold">Health Impact Matrix</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            Educational visualizations of commonly discussed associations with high screen exposure.
            Not causal medical claims or a diagnosis.
          </p>
        </div>
        <TourHelpButton />
      </header>

      <section className="ss-card">
        <label className="block" data-tour="duration-slider">
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>Daily screen duration (hours)</span>
            <span className="text-brand-electric">{hours}h</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={hours}
            className="w-full accent-brand-electric"
            onChange={(e) => setHours(Number(e.target.value))}
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2" data-tour="category-filters">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={filter === f.id ? 'ss-btn-primary' : 'ss-btn-secondary'}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-tour="impact-cards">
        {items.map((item) => {
          const intensity = item.intensityAtHours(hours);
          const color =
            intensity === 'low'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200'
              : intensity === 'moderate'
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200';
          return (
            <article key={item.id} className="ss-card">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold">{item.title}</h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${color}`}>
                  {intensity}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{item.summary}</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
              {item.citation ? (
                <p className="mt-3 text-xs text-slate-400">Citation note: {item.citation}</p>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
