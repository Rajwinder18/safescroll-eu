import { api } from '@safescroll/api-client';
import type {
  Achievement,
  Challenge,
  ChallengeProgress,
  ScreenTimeDay,
  UserPreferences,
} from '@safescroll/shared-types';
import { useAuth } from '@/context/AuthContext';
import { DEMO_DATA_LABEL, ensureChartsRegistered } from '@/lib/charts';
import { cn } from '@/lib/cn';
import {
  Flame,
  Lightbulb,
  Target,
  Trophy,
  Wind,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

ensureChartsRegistered();

const DAY_OPTIONS = [7, 14, 30] as const;

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const { user, demoMode } = useAuth();
  const [days, setDays] = useState<(typeof DAY_OPTIONS)[number]>(14);
  const [series, setSeries] = useState<ScreenTimeDay[]>([]);
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [progress, setProgress] = useState<Record<string, ChallengeProgress>>({});
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const [seriesRes, prefsRes, challengeRes, progressRes, achieveRes] =
        await Promise.all([
          api.analytics.getScreenTimeSeries(days),
          api.preferences.get(),
          api.challenges.listChallenges(),
          api.challenges.getProgress(),
          api.challenges.listAchievements(),
        ]);
      if (!active) return;
      setSeries(seriesRes.data || []);
      setPrefs(prefsRes.data);
      setChallenges(challengeRes.data || []);
      setProgress(progressRes.data || {});
      setAchievements(achieveRes.data || []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [days]);

  const latest = series[series.length - 1];
  const avgSocial =
    series.length > 0
      ? series.reduce((s, d) => s + d.socialMinutes, 0) / series.length
      : 0;
  const avgWellbeing =
    series.length > 0
      ? Math.round(series.reduce((s, d) => s + d.wellbeingScore, 0) / series.length)
      : 0;

  const chartData = useMemo(
    () => ({
      labels: series.map((d) => d.date.slice(5)),
      datasets: [
        {
          label: 'Wellbeing index',
          data: series.map((d) => d.wellbeingScore),
          borderColor: '#8B7CF6',
          backgroundColor: 'rgba(139,124,246,0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          borderWidth: 2.5,
        },
      ],
    }),
    [series]
  );

  const goals = prefs?.wellbeingGoals;
  const firstName = user?.displayName?.split(' ')[0] || 'there';
  const activeChallenge = challenges.find((c) => !progress[c.id]?.completed) || challenges[0];
  const unlocked = achievements.filter((a) => a.unlockedAt).length;
  const goalPct = latest
    ? Math.min(
        100,
        Math.round(
          ((goals?.maxSocialHours || 2) / Math.max(latest.socialMinutes / 60, 0.1)) * 50
        )
      )
    : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="mb-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-[#8B7CF6]">
              Website
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-500">Dashboard</span>
          </nav>
          <p className="text-sm font-medium text-[#8B7CF6]">
            {greeting()}, {firstName}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Let&apos;s make today more intentional.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {demoMode ? DEMO_DATA_LABEL : 'Your wellbeing overview'}
          </p>
        </div>
        <div className="flex gap-2" data-tour="date-filters">
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition',
                days === d
                  ? 'bg-[#8B7CF6] text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-white/10'
              )}
              onClick={() => setDays(d)}
            >
              {d}d
            </button>
          ))}
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          dataTour="wellbeing-index"
          label="Digital Wellbeing Index"
          value={loading ? '—' : String(latest?.wellbeingScore ?? avgWellbeing)}
          hint={`Avg ${avgWellbeing} over ${days}d`}
          accent="from-[#B7A6FF] to-[#8B7CF6]"
        />
        <Metric
          dataTour="screen-time-card"
          label="Today's screen time"
          value={
            loading || !latest
              ? '—'
              : `${(latest.totalMinutes / 60).toFixed(1)}h`
          }
          hint={`Social ~${latest ? (latest.socialMinutes / 60).toFixed(1) : '—'}h`}
        />
        <Metric
          label="Mindful sessions"
          value={String(unlocked > 0 ? unlocked : 0)}
          hint="From local demo progress"
          icon={<Wind className="h-4 w-4" />}
        />
        <Metric
          label="Daily goal progress"
          value={`${Math.min(100, Math.max(18, goalPct))}%`}
          hint={`Goal ≤ ${goals?.maxSocialHours ?? 2}h social`}
          icon={<Target className="h-4 w-4" />}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div
          data-tour="screen-charts"
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Weekly wellbeing trend
            </h2>
            <span className="text-xs text-amber-700 dark:text-amber-200">Sample series</span>
          </div>
          <div className="h-64">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    min: 30,
                    max: 100,
                    grid: { color: 'rgba(148,163,184,0.15)' },
                    ticks: { color: '#94a3b8' },
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/80">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Usage snapshot</h2>
          <div className="mt-4 space-y-4">
            <BarRow
              label="Social"
              value={`${(avgSocial / 60).toFixed(1)}h avg`}
              pct={Math.min(100, (avgSocial / 60 / 6) * 100)}
              color="bg-[#8B7CF6]"
            />
            <BarRow
              label="Sleep"
              value={`${latest?.sleepHours ?? '—'}h latest`}
              pct={latest ? Math.min(100, (latest.sleepHours / 9) * 100) : 0}
              color="bg-sky-500"
            />
            <BarRow
              label="Exercise"
              value={`${latest?.exerciseMinutes ?? '—'}m`}
              pct={latest ? Math.min(100, (latest.exerciseMinutes / 60) * 100) : 0}
              color="bg-[#78E6C1]"
            />
          </div>
          <Link to="/app/screen-time" className="mt-5 inline-flex text-sm font-semibold text-[#8B7CF6]">
            Open screen time →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div
          data-tour="challenges-card"
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2 text-[#8B7CF6]">
            <Flame className="h-4 w-4" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Daily challenge</h2>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-100">
            {activeChallenge?.title || 'No challenges'}
          </p>
          <p className="mt-1 text-sm text-slate-500">{activeChallenge?.description}</p>
          <Link to="/app/challenges" className="mt-4 inline-flex text-sm font-semibold text-[#8B7CF6]">
            Continue →
          </Link>
        </div>

        <div
          data-tour="mindful-card"
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/80"
        >
          <div className="flex items-center gap-2 text-[#8B7CF6]">
            <Wind className="h-4 w-4" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Mindful break</h2>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Take a short breathing pause before your next scroll.
          </p>
          <Link to="/app/mindful" className="mt-4 inline-flex text-sm font-semibold text-[#8B7CF6]">
            Start break →
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center gap-2 text-[#8B7CF6]">
            <Lightbulb className="h-4 w-4" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Recommendation</h2>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Charge your phone outside the bedroom tonight to protect sleep opportunity.
          </p>
          <Link to="/app/wellbeing" className="mt-4 inline-flex text-sm font-semibold text-[#8B7CF6]">
            Adjust analyzer →
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center gap-2 text-[#8B7CF6]">
            <Trophy className="h-4 w-4" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Achievements</h2>
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
            {unlocked}/{achievements.length}
          </p>
          <Link to="/app/progress" className="mt-4 inline-flex text-sm font-semibold text-[#8B7CF6]">
            View progress →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  accent,
  icon,
  dataTour,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: string;
  icon?: React.ReactNode;
  dataTour?: string;
}) {
  return (
    <div
      data-tour={dataTour}
      className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/80"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</div>
        {icon}
      </div>
      <div
        className={cn(
          'mt-2 bg-clip-text text-3xl font-semibold text-slate-900 dark:text-white',
          accent && `bg-gradient-to-r ${accent} text-transparent`
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-500">{hint}</div>
    </div>
  );
}

function BarRow({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
