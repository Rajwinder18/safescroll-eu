import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { PageHeader } from '@/components/navigation/PageHeader';
import { api } from '@safescroll/api-client';
import type { ScreenTimeDay } from '@safescroll/shared-types';
import { DEMO_DATA_LABEL, ensureChartsRegistered } from '@/lib/charts';
import { useEffect, useMemo, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

ensureChartsRegistered();

export default function ScreenTimePage() {
  const [days, setDays] = useState(14);
  const [series, setSeries] = useState<ScreenTimeDay[]>([]);

  useEffect(() => {
    api.analytics.getScreenTimeSeries(days).then((r) => setSeries(r.data || []));
  }, [days]);

  const latest = series[series.length - 1];
  const barData = useMemo(
    () => ({
      labels: series.map((d) => d.date.slice(5)),
      datasets: [
        {
          label: 'Social (min)',
          data: series.map((d) => d.socialMinutes),
          backgroundColor: '#A78BFA',
          borderRadius: 8,
        },
        {
          label: 'Total screen (min)',
          data: series.map((d) => d.totalMinutes),
          backgroundColor: '#6366F1',
          borderRadius: 8,
        },
      ],
    }),
    [series]
  );

  const doughnut = useMemo(() => {
    if (!latest) return null;
    const other = Math.max(0, latest.totalMinutes - latest.socialMinutes);
    const sleepMin = latest.sleepHours * 60;
    const remaining = Math.max(0, 24 * 60 - latest.totalMinutes - sleepMin - latest.exerciseMinutes);
    return {
      labels: ['Social', 'Other screen', 'Sleep', 'Exercise', 'Offline / other'],
      datasets: [
        {
          data: [latest.socialMinutes, other, sleepMin, latest.exerciseMinutes, remaining],
          backgroundColor: ['#A78BFA', '#6366F1', '#3B82F6', '#34D399', '#E2E8F0'],
        },
      ],
    };
  }, [latest]);

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <PageHeader
        kicker="Screen time"
        title="Screen-time overview"
        description="Explore your daily, weekly and monthly digital exposure. Charts use demonstration data on the web."
        crumbs={[
          { label: 'Website', to: '/' },
          { label: 'App', to: '/app' },
          { label: 'Screen Time' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <TourHelpButton />
            <div className="flex gap-2" data-tour="date-filters">
              {[7, 14, 30].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={days === d ? 'ss-btn-primary' : 'ss-btn-secondary'}
                  onClick={() => setDays(d)}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
        }
      />
      <p className="text-sm text-amber-700 dark:text-amber-200">{DEMO_DATA_LABEL}</p>

      <div className="grid gap-4 md:grid-cols-4" data-tour="summary-stats">
        <Stat label="Latest social" value={`${latest ? (latest.socialMinutes / 60).toFixed(1) : '—'}h`} />
        <Stat label="Latest total" value={`${latest ? (latest.totalMinutes / 60).toFixed(1) : '—'}h`} />
        <Stat label="Sleep" value={`${latest?.sleepHours ?? '—'}h`} />
        <Stat label="Wellbeing index" value={`${latest?.wellbeingScore ?? '—'}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]" data-tour="screen-charts">
        <div className="ss-card h-80">
          <h2 className="mb-3 font-semibold">Daily usage trend</h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } },
            }}
          />
        </div>
        <div className="ss-card h-80" data-tour="doughnut-chart">
          <h2 className="mb-3 font-semibold">Latest day allocation</h2>
          {doughnut ? (
            <Doughnut data={doughnut} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          ) : null}
        </div>
      </div>

      <div className="ss-card text-sm text-slate-500">
        The web app cannot read native UsageStats or iOS Screen Time. Connect the Expo mobile
        app and grant platform permissions when those integrations are authorized.
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="ss-card">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
