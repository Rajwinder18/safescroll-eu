import { legalStatusLabels, policyTimeline } from '@safescroll/policy-content';
import { Link } from 'react-router-dom';

export default function PoliciesPublicPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">Explore policies</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">EU digital protection, explained</h1>
      <p className="mt-4 max-w-2xl text-[#A1A1AA]">
        Browse a curated timeline of GDPR Article 8 themes, Digital Services Act protections,
        and national approaches. Status labels distinguish laws from proposals and guidance.
      </p>
      <Link
        to="/app/learn/policies"
        className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#111827]"
      >
        Open full policy hub
      </Link>

      <ol className="mt-10 space-y-4">
        {policyTimeline.map((item) => (
          <li key={item.id} className="rounded-3xl border border-white/10 bg-[#192334] p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#A1A1AA]">
              <span>
                {item.month} {item.year}
              </span>
              <span className="rounded-full bg-[#8B7CF6]/20 px-2 py-0.5 text-[#B7A6FF]">
                {legalStatusLabels[item.legalStatus] || item.badge}
              </span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-[#A1A1AA]">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
