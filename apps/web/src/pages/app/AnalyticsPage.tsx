import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { api } from '@safescroll/api-client';
import type { ScreenTimeDay } from '@safescroll/shared-types';
import { DEMO_DATA_LABEL, ensureChartsRegistered } from '@/lib/charts';
import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

ensureChartsRegistered();

export default function AnalyticsPage() {
  const [days, setDays] = useState(14);
  const [series, setSeries] = useState<ScreenTimeDay[]>([]);
  const [history, setHistory] = useState<{ at: string; score: number }[]>([]);

  useEffect(() => {
    api.analytics.getScreenTimeSeries(days).then((r) => setSeries(r.data || []));
    api.wellbeing.history().then((r) => setHistory((r.data as { at: string; score: number }[]) || []));
  }, [days]);

  const chart = useMemo(
    () => ({
      labels: series.map((d) => d.date.slice(5)),
      datasets: [
        {
          label: 'Wellbeing index (demo)',
          data: series.map((d) => d.wellbeingScore),
          borderColor: '#6366F1',
          backgroundColor: 'rgba(99,102,241,0.15)',
          fill: true,
          tension: 0.35,
        },
        {
          label: 'Social hours (demo)',
          data: series.map((d) => Number((d.socialMinutes / 60).toFixed(1))),
          borderColor: '#A78BFA',
          backgroundColor: 'transparent',
          tension: 0.35,
          yAxisID: 'y1',
        },
      ],
    }),
    [series]
  );

  const exportJson = () => {
    const blob = new Blob(
      [JSON.stringify({ series, analyzerHistory: history, note: DEMO_DATA_LABEL }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'safescroll-demo-analytics.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="ss-kicker">Analytics</p>
          <h1 className="mt-2 text-3xl font-bold">Visual analytics</h1>
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-200">{DEMO_DATA_LABEL}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TourHelpButton />
          <div className="flex gap-2" data-tour="analytics-filters">
            {[7, 14, 30].map((d) => (
              <button key={d} type="button" className={days === d ? 'ss-btn-primary' : 'ss-btn-secondary'} onClick={() => setDays(d)}>
                {d}d
              </button>
            ))}
          </div>
          <button type="button" data-tour="export-button" className="ss-btn-secondary" onClick={exportJson}>
            Export JSON
          </button>
        </div>
      </header>

      <div className="ss-card h-96" data-tour="analytics-chart">
        <Line
          data={chart}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
              y: { min: 0, max: 100, title: { display: true, text: 'Index' } },
              y1: {
                position: 'right',
                min: 0,
                max: 12,
                grid: { drawOnChartArea: false },
                title: { display: true, text: 'Hours' },
              },
            },
            plugins: { legend: { position: 'bottom' } },
          }}
        />
      </div>

      <div className="ss-card">
        <h2 className="font-semibold">Analyzer history (local demo)</h2>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Use the wellbeing analyzer to create history points.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {history.slice(0, 10).map((h) => (
              <li key={h.at} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-white/5">
                <span>{new Date(h.at).toLocaleString()}</span>
                <span className="font-semibold">{h.score}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
