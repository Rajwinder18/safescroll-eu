import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { references } from '@safescroll/policy-content';
import { ExternalLink } from 'lucide-react';

export default function ResearchLibraryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">Research library</p>
          <h1 className="mt-2 text-3xl font-bold">Research & official sources</h1>
        </div>
        <TourHelpButton />
      </header>
      <div className="grid gap-4 md:grid-cols-2" data-tour="research-cards">
        {references.map((ref) => (
          <a
            key={ref.url}
            href={ref.url}
            target="_blank"
            rel="noreferrer"
            className="ss-card transition hover:shadow-glow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-electric">
                  {ref.type} · {ref.badge}
                </div>
                <h2 className="mt-2 font-semibold">{ref.title}</h2>
                <div className="mt-1 text-xs text-slate-400">
                  {ref.org} · {ref.date}
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-3 text-sm text-slate-500">{ref.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
