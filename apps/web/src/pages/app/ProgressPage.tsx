import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { api } from '@safescroll/api-client';
import type { Achievement, ChallengeProgress, MindfulSessionEvent, QuizAttempt } from '@safescroll/shared-types';
import { Award, Flame, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProgressPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progress, setProgress] = useState<Record<string, ChallengeProgress>>({});
  const [mindful, setMindful] = useState<MindfulSessionEvent[]>([]);
  const [quiz, setQuiz] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    (async () => {
      const [a, p, m, q] = await Promise.all([
        api.challenges.listAchievements(),
        api.challenges.getProgress(),
        api.mindful.listEvents(),
        api.quiz.listAttempts(),
      ]);
      setAchievements(a.data || []);
      setProgress(p.data || {});
      setMindful(m.data || []);
      setQuiz(q.data || []);
    })();
  }, []);

  const completed = Object.values(progress).filter((p) => p.completed).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6" data-tour="page-root">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="ss-kicker">Progress</p>
          <h1 className="mt-2 text-3xl font-bold">Progress & achievements</h1>
        </div>
        <TourHelpButton />
      </header>

      <div className="grid gap-4 sm:grid-cols-3" data-tour="progress-stats">
        <div className="ss-card flex items-center gap-3">
          <Flame className="h-8 w-8 text-brand-electric" />
          <div>
            <div className="text-xs text-slate-500">Challenges completed</div>
            <div className="text-2xl font-bold">{completed}</div>
          </div>
        </div>
        <div className="ss-card flex items-center gap-3">
          <Wind className="h-8 w-8 text-brand-lavender" />
          <div>
            <div className="text-xs text-slate-500">Mindful sessions</div>
            <div className="text-2xl font-bold">{mindful.length}</div>
          </div>
        </div>
        <div className="ss-card flex items-center gap-3">
          <Award className="h-8 w-8 text-brand-mint" />
          <div>
            <div className="text-xs text-slate-500">Best quiz score</div>
            <div className="text-2xl font-bold">
              {quiz.length ? Math.max(...quiz.map((q) => q.percent)) : 0}%
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3" data-tour="achievements-grid">
        {achievements.map((a) => (
          <article
            key={a.id}
            className={`ss-card ${a.unlockedAt ? '' : 'opacity-55'}`}
          >
            <div className="text-sm font-semibold">{a.title}</div>
            <p className="mt-1 text-sm text-slate-500">{a.description}</p>
            <p className="mt-3 text-xs text-slate-400">
              {a.unlockedAt ? `Unlocked ${new Date(a.unlockedAt).toLocaleDateString()}` : 'Locked'}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
