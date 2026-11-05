import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { api } from '@safescroll/api-client';
import { countries, legalStatusLabels, policyTimeline } from '@safescroll/policy-content';
import { useMemo, useState } from 'react';

export default function PoliciesPage() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<{ title: string; section: string; snippet: string }[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return policyTimeline;
    return policyTimeline.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.typeLabel.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">EU policies</p>
          <h1 className="mt-2 text-3xl font-bold">Policy explainer hub</h1>
          <p className="mt-2 text-sm text-slate-500">
            GDPR Article 8, DSA Articles 28 & 34 themes, digital identity pilots, and national notes.
            Labels distinguish in-force law from proposals and guidance. Not legal advice.
          </p>
        </div>
        <TourHelpButton />
      </header>

      <div className="ss-card" data-tour="policy-search">
        <label htmlFor="policy-search" className="ss-label">Search policy library</label>
        <input
          id="policy-search"
          className="ss-input"
          value={query}
          placeholder="Try GDPR, DSA, France, age verification…"
          onChange={async (e) => {
            const value = e.target.value;
            setQuery(value);
            const res = await api.policy.search(value);
            setHits(res.data || []);
          }}
        />
        {hits.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm">
            {hits.map((h) => (
              <li key={`${h.section}-${h.title}`} className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-white/5">
                <span className="font-medium">{h.title}</span>
                <span className="text-slate-400"> · {h.section}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <section className="space-y-4" data-tour="policy-timeline">
        <h2 className="text-xl font-semibold">Interactive timeline</h2>
        {filtered.map((item) => (
          <article key={item.id} className="ss-card">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>
                {item.month} {item.year}
              </span>
              <span className="rounded-full bg-brand-electric/10 px-2 py-0.5 text-brand-electric">
                {legalStatusLabels[item.legalStatus] || item.badge}
              </span>
              <span>{item.typeLabel}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Impact: {item.impact}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
              {item.officialReference ? (
                <a href={item.officialReference} target="_blank" rel="noreferrer" className="text-brand-electric">
                  Official reference
                </a>
              ) : (
                <span>Source placeholder — verification pending</span>
              )}
              {item.lastReviewed ? <span>Last reviewed {item.lastReviewed}</span> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="ss-card">
        <h2 className="text-xl font-semibold">Country comparison</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <div key={c.code} className="rounded-xl border border-slate-100 p-3 dark:border-white/10">
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-brand-electric">
                Consent age {c.defaultGdprAge} · {legalStatusLabels[c.legalStatus || 'guidance']}
              </div>
              <p className="mt-2 text-sm text-slate-500">{c.under15Status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
