import { references } from '@safescroll/policy-content';
import { ExternalLink } from 'lucide-react';

export default function ResourcesPublicPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">Resources</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Official references & research</h1>
      <p className="mt-4 max-w-2xl text-[#A1A1AA]">
        Source links for EU policy, health guidance, and youth online research. Always verify
        the latest official text.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {references.map((ref) => (
          <a
            key={ref.url}
            href={ref.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-white/10 bg-[#192334] p-5 transition hover:border-[#8B7CF6]/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[#B7A6FF]">
                  {ref.org} · {ref.badge}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-white">{ref.title}</h2>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#A1A1AA]" />
            </div>
            <p className="mt-2 text-sm text-[#A1A1AA]">{ref.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
