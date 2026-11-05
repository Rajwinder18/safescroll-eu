import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { countries } from '@safescroll/policy-content';
import type { AgeEligibilityResult } from '@safescroll/shared-types';
import { calculateAgeEligibility } from '@safescroll/wellbeing-engine';
import confetti from 'canvas-confetti';
import { useMemo, useState } from 'react';

const THRESHOLDS = [13, 15, 16];

export default function AgeCheckerPage() {
  const [dob, setDob] = useState('2013-05-18');
  const [threshold, setThreshold] = useState(15);
  const [custom, setCustom] = useState('15');
  const [countryCode, setCountryCode] = useState('FR');
  const [result, setResult] = useState<AgeEligibilityResult | null>(null);

  const comparison = useMemo(
    () =>
      countries.map((c) => ({
        ...c,
        relative: c.defaultGdprAge - threshold,
      })),
    [threshold]
  );

  const runCheck = () => {
    const next = calculateAgeEligibility(
      { birthDate: dob, thresholdYears: threshold, countryCode },
      countries
    );
    setResult(next);
    if (next.isEligible && !next.error) {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">Learn · Age eligibility</p>
          <h1 className="mt-2 text-3xl font-bold">Age Eligibility Checker</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            Illustrative threshold simulation for education. Not a legal determination.
            Minimize sharing of children&apos;s personal data — DOB stays in your browser session.
          </p>
        </div>
        <TourHelpButton />
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="ss-card space-y-4" data-tour="age-inputs">
          <div>
            <label htmlFor="dob" className="ss-label">Date of birth</label>
            <input id="dob" type="date" className="ss-input" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <label htmlFor="country" className="ss-label">Country context</label>
            <select id="country" className="ss-input" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} (consent age {c.defaultGdprAge})
                </option>
              ))}
            </select>
          </div>
          <div data-tour="threshold-selector">
            <div className="ss-label">Threshold simulation</div>
            <div className="flex flex-wrap gap-2">
              {THRESHOLDS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={threshold === t ? 'ss-btn-primary' : 'ss-btn-secondary'}
                  onClick={() => {
                    setThreshold(t);
                    setCustom(String(t));
                  }}
                >
                  Under {t}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                className="ss-input"
                type="number"
                min={10}
                max={21}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                aria-label="Custom threshold"
              />
              <button
                type="button"
                className="ss-btn-secondary"
                onClick={() => setThreshold(Number(custom) || 15)}
              >
                Apply custom
              </button>
            </div>
          </div>
          <button type="button" data-tour="calculate-btn" className="ss-btn-primary w-full" onClick={runCheck}>
            Calculate eligibility
          </button>
        </section>

        <section className="ss-card">
          {!result ? (
            <p className="text-sm text-slate-500">Enter a date of birth and calculate to see results.</p>
          ) : result.error ? (
            <p className="text-sm text-rose-600">{result.error}</p>
          ) : (
            <div className="space-y-4">
              <div className={`rounded-2xl border p-4 ${result.isEligible ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10' : 'border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10'}`}>
                <div className="text-sm font-semibold">
                  {result.isEligible ? 'Meets simulated threshold' : 'Below simulated threshold'}
                </div>
                <p className="mt-2 text-sm">
                  Age: <strong>{result.years}y {result.months}m {result.days}d</strong> vs threshold {result.thresholdYears}.
                </p>
                {!result.isEligible ? (
                  <p className="mt-1 text-sm">About {result.monthsUntilEligible} months until the simulated threshold.</p>
                ) : null}
              </div>
              <div>
                <h2 className="font-semibold">{result.country.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{result.country.under15Status}</p>
                <p className="mt-3 text-xs text-slate-400">{result.disclaimer}</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="ss-card" data-tour="country-comparison">
        <h2 className="text-lg font-semibold">Country comparison (educational)</h2>
        <p className="mt-1 text-sm text-slate-500">
          GDPR-related default consent ages and national notes. Distinguish laws, proposals, and guidance.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="py-2 pr-4">Country</th>
                <th className="py-2 pr-4">Consent age</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr key={c.code} className="border-t border-slate-100 dark:border-white/5">
                  <td className="py-2 pr-4 font-medium">{c.name}</td>
                  <td className="py-2 pr-4">{c.defaultGdprAge}</td>
                  <td className="py-2 pr-4 capitalize">{c.legalStatus?.replaceAll('_', ' ')}</td>
                  <td className="py-2 text-slate-500">{c.under15Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
