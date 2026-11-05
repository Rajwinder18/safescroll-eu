import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { PageHeader } from '@/components/navigation/PageHeader';
import { api } from '@safescroll/api-client';
import type { MindfulSessionEvent } from '@safescroll/shared-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const reflections = [
  'Why are you opening this application?',
  'Are you looking for something specific?',
  'Are you feeling bored?',
  'Would a short break help?',
];

type Phase = 'idle' | 'breathe' | 'reflect' | 'done';

export default function MindfulPage() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [seconds, setSeconds] = useState(60);
  const [breathLabel, setBreathLabel] = useState('Inhale');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [events, setEvents] = useState<MindfulSessionEvent[]>([]);
  const [nativeNotes, setNativeNotes] = useState<
    { platform: string; feature: string; active: boolean; notes: string }[]
  >([]);

  useEffect(() => {
    let active = true;

    const unwrap = async <T,>(value: Promise<T> | T): Promise<T> => value;

    (async () => {
      try {
        const [eventsResult, nativeResult] = await Promise.all([
          unwrap(api.mindful.listEvents()),
          unwrap(api.mindful.getNativeIntegrationStatuses()),
        ]);
        if (!active) return;
        setEvents(eventsResult?.data || []);
        setNativeNotes(
          (nativeResult?.data || []).map((item) => ({
            platform: item.platform,
            feature: item.feature,
            active: item.active,
            notes: item.active
              ? item.notes
              : item.notes.includes('mobile')
                ? item.notes
                : `${item.notes} Available on mobile.`,
          }))
        );
      } catch (error) {
        console.error('Failed to load mindful service metadata', error);
        if (!active) return;
        setNativeNotes([
          {
            platform: 'web',
            feature: 'Native integrations',
            active: false,
            notes: 'Native device integrations are available on mobile only. Web demo remains fully usable.',
          },
        ]);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'breathe') return;
    setSeconds(60);
    const tick = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(tick);
          setPhase('done');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    const breath = window.setInterval(() => {
      setBreathLabel((label) => (label === 'Inhale' ? 'Exhale' : 'Inhale'));
    }, 4000);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(breath);
    };
  }, [phase]);

  const record = async (
    action: MindfulSessionEvent['action'],
    type: MindfulSessionEvent['type'] = 'breathing'
  ) => {
    const res = await api.mindful.record({
      type,
      durationSeconds: 60 - seconds,
      reflectionAnswers: answers,
      action,
    });
    if (res.data) setEvents((prev) => [res.data!, ...prev]);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6" data-tour="page-root">
      <PageHeader
        kicker="Mindful scrolling"
        title="Pause before you continue"
        description="Create a moment between an impulse and your next action. This web demo does not intercept native apps."
        crumbs={[
          { label: 'Website', to: '/' },
          { label: 'App', to: '/app' },
          { label: 'Mindful Breaks' },
        ]}
        actions={<TourHelpButton />}
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section
          data-tour="mindful-session"
          className="ss-card relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950"
        >
          <AnimatePresence mode="wait">
            {phase === 'idle' || phase === 'done' ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 py-8 text-center"
              >
                <h2 className="text-2xl font-semibold">
                  {phase === 'done' ? 'Session complete' : 'Ready for a mindful break?'}
                </h2>
                <p className="text-sm text-slate-500">
                  Choose a breathing exercise or a short reflection before continuing.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button type="button" className="ss-btn-primary" onClick={() => setPhase('breathe')}>
                    Start breathing
                  </button>
                  <button type="button" className="ss-btn-secondary" onClick={() => setPhase('reflect')}>
                    Reflect first
                  </button>
                </div>
                {phase === 'done' ? (
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <button
                      type="button"
                      className="ss-btn-secondary"
                      onClick={async () => {
                        await record('continue', 'breathing');
                        setPhase('idle');
                      }}
                    >
                      Continue to destination
                    </button>
                    <button
                      type="button"
                      className="ss-btn-secondary"
                      onClick={async () => {
                        await record('return', 'breathing');
                        setPhase('idle');
                      }}
                    >
                      Return to previous activity
                    </button>
                  </div>
                ) : null}
              </motion.div>
            ) : null}

            {phase === 'breathe' ? (
              <motion.div
                key="breathe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-10"
              >
                <div className="relative flex h-56 w-56 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-brand-lavender/30 blur-xl" />
                  <div className="absolute inset-6 animate-breathe rounded-full bg-gradient-to-br from-brand-lavender to-brand-electric opacity-80" />
                  <div className="relative text-center text-white">
                    <div className="text-sm uppercase tracking-[0.2em]">{breathLabel}</div>
                    <div className="mt-2 text-4xl font-bold">{seconds}s</div>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate-500">Follow the circle. Soften your shoulders.</p>
              </motion.div>
            ) : null}

            {phase === 'reflect' ? (
              <motion.div
                key="reflect"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4 py-4"
              >
                <h2 className="text-xl font-semibold">Reflection</h2>
                {reflections.map((q) => (
                  <label key={q} className="block">
                    <span className="ss-label">{q}</span>
                    <input
                      className="ss-input"
                      value={answers[q] || ''}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q]: e.target.value }))}
                    />
                  </label>
                ))}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="ss-btn-primary"
                    onClick={async () => {
                      await record('reflect', 'reflection');
                      setPhase('breathe');
                    }}
                  >
                    Continue to breathing
                  </button>
                  <button
                    type="button"
                    className="ss-btn-secondary"
                    onClick={async () => {
                      await record('return', 'reflection');
                      setPhase('idle');
                    }}
                  >
                    Return instead
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

        <aside className="space-y-4">
          <div className="ss-card" data-tour="mindful-history">
            <h2 className="font-semibold">Demo session log</h2>
            <p className="mt-1 text-xs text-slate-500">Stored locally. Marked as demonstration events.</p>
            <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto text-sm">
              {events.length === 0 ? (
                <li className="text-slate-400">No sessions yet.</li>
              ) : (
                events.slice(0, 8).map((e) => (
                  <li key={e.id} className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-white/5">
                    {e.type} · {e.action} · {new Date(e.createdAt).toLocaleString()}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="ss-card" data-tour="native-status">
            <h2 className="font-semibold">Native integration readiness</h2>
            <p className="mt-1 text-xs text-slate-500">
              Web fallback only. Native features are not active in the browser.
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              {nativeNotes.map((n) => (
                <li key={`${n.platform}-${n.feature}`} className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <div className="flex flex-wrap items-center gap-2 font-medium">
                    <span>
                      {n.platform}: {n.feature}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        n.active
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200'
                      }`}
                    >
                      {n.active ? 'Active' : 'Available on mobile'}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{n.notes}</div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
