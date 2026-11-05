import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { PageHeader } from '@/components/navigation/PageHeader';
import { api } from '@safescroll/api-client';
import type { WellbeingResult } from '@safescroll/shared-types';
import { useEffect, useState } from 'react';

export default function WellbeingAnalyzerPage() {
  const [social, setSocial] = useState(4);
  const [total, setTotal] = useState(6.5);
  const [sleep, setSleep] = useState(7.5);
  const [exercise, setExercise] = useState(1.5);
  const [breaks, setBreaks] = useState(20);
  const [result, setResult] = useState<WellbeingResult | null>(null);

  useEffect(() => {
    const totalClamped = Math.max(total, social);
    if (totalClamped !== total) setTotal(totalClamped);
    api.wellbeing
      .analyze({
        socialDaily: social,
        totalDaily: totalClamped,
        sleep,
        exercise,
        breakMinutes: breaks,
      })
      .then((r) => setResult(r.data));
  }, [social, total, sleep, exercise, breaks]);

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <PageHeader
        kicker="Improve · Measure"
        title="Digital Wellbeing Analyzer"
        description="Understand your daily digital habits and discover ways to improve them. The experimental index is not a medical diagnosis."
        crumbs={[
          { label: 'Website', to: '/' },
          { label: 'App', to: '/app' },
          { label: 'Wellbeing' },
        ]}
        actions={<TourHelpButton />}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="ss-card space-y-5" data-tour="wellbeing-inputs">
          <Slider label="Social media (hours/day)" value={social} min={0} max={12} step={0.5} onChange={setSocial} />
          <Slider label="Total smartphone use (hours/day)" value={total} min={0} max={16} step={0.5} onChange={setTotal} />
          <Slider label="Sleep (hours/night)" value={sleep} min={3} max={12} step={0.5} onChange={setSleep} />
          <Slider label="Physical exercise (hours/day)" value={exercise} min={0} max={4} step={0.25} onChange={setExercise} />
          <Slider label="Mindful / offline breaks (minutes/day)" value={breaks} min={0} max={120} step={5} onChange={setBreaks} />
        </section>

        {result ? (
          <section className="space-y-4" data-tour="wellbeing-score">
            <div className="ss-card">
              <div className="text-sm text-slate-500">Experimental wellbeing index</div>
              <div className="mt-2 flex items-end gap-3">
                <div className="text-5xl font-bold text-brand-electric">{result.score}</div>
                <div className="pb-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {result.category}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">{result.disclaimer}</p>
            </div>

            <div className="ss-card grid grid-cols-2 gap-3 text-sm" data-tour="exposure-stats">
              <Stat label="Weekly social" value={`${result.weeklySocial}h`} />
              <Stat label="Monthly social" value={`${result.monthlySocial}h`} />
              <Stat label="Annual social" value={`${result.annualSocial}h`} />
              <Stat label="~Days/year equiv." value={`${result.annualDaysEquivalent}`} />
            </div>

            <div className="ss-card" data-tour="wellbeing-breakdown">
              <h2 className="font-semibold">Score breakdown</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Start at 100</li>
                <li>Social penalty: −{result.breakdown.socialPenalty}</li>
                <li>Sleep penalty: −{result.breakdown.sleepPenalty}</li>
                <li>Exercise adjustment: {result.breakdown.exerciseAdjustment > 0 ? '+' : ''}{result.breakdown.exerciseAdjustment}</li>
                <li>Break bonus: +{result.breakdown.breakBonus}</li>
                <li>Clamped between 20 and 98</li>
              </ul>
            </div>

            <div className="ss-card" data-tour="wellbeing-suggestions">
              <h2 className="font-semibold">Suggestions</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {result.suggestions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="text-brand-electric">{value}</span>
      </div>
      <input
        type="range"
        className="w-full accent-brand-electric"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
