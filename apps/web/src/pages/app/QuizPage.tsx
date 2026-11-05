import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { api } from '@safescroll/api-client';
import type { QuizQuestion } from '@safescroll/shared-types';
import confetti from 'canvas-confetti';
import { useEffect, useMemo, useState } from 'react';

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [percent, setPercent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    api.quiz.getQuestions().then((r) => setQuestions(r.data || []));
  }, []);

  const current = questions[index];
  const progress = questions.length ? ((index + (submitted ? 1 : 0)) / questions.length) * 100 : 0;

  const categories = useMemo(
    () => Array.from(new Set(questions.map((q) => q.category))),
    [questions]
  );

  const submit = async () => {
    const result = await api.quiz.saveAttempt(answers);
    setPercent(result.data?.percent || 0);
    setSubmitted(true);
    confetti({ particleCount: 60, spread: 55, origin: { y: 0.65 } });
  };

  const retake = () => {
    setIndex(0);
    setAnswers({});
    setSubmitted(false);
    setPercent(0);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl ss-card" data-tour="page-root">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="ss-kicker">Learn · Safety quiz</p>
            <h1 className="mt-2 text-3xl font-bold">Digital Safety Quiz</h1>
          </div>
          <TourHelpButton />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          10 questions covering EU rules, sleep health, privacy defaults, and online safety.
          Instant explanations help you learn as you go.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" data-tour="quiz-categories">
          {categories.map((c) => (
            <li key={c} className="rounded-full bg-brand-electric/10 px-3 py-1 text-xs font-medium text-brand-electric">
              {c}
            </li>
          ))}
        </ul>
        <button type="button" data-tour="quiz-start-card" className="ss-btn-primary mt-6" onClick={() => setStarted(true)}>
          Start quiz
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl space-y-4" data-tour="page-root">
        <div className="ss-card flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Your score: {percent}%</h1>
            <p className="mt-2 text-sm text-slate-500">Review explanations below, then retake anytime.</p>
          </div>
          <div className="flex items-center gap-2">
            <TourHelpButton />
            <button type="button" className="ss-btn-primary" onClick={retake}>
              Retake quiz
            </button>
          </div>
        </div>
        {questions.map((q, i) => {
          const chosen = answers[i];
          const correct = chosen === q.correctIndex;
          return (
            <article key={q.id} className="ss-card">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{q.category}</div>
              <h2 className="mt-1 font-semibold">{q.question}</h2>
              <p className={`mt-2 text-sm ${correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                {correct ? 'Correct' : 'Needs review'} — you chose: {q.options[chosen] || '—'}
              </p>
              <p className="mt-2 text-sm text-slate-500">{q.explanation}</p>
            </article>
          );
        })}
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-4" data-tour="page-root">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10" data-tour="quiz-progress-bar">
          <div className="h-full bg-brand-electric transition-all" style={{ width: `${progress}%` }} />
        </div>
        <TourHelpButton />
      </div>
      <div className="ss-card" data-tour="quiz-question-card">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Question {index + 1} of {questions.length} · {current.category}
        </div>
        <h1 className="mt-2 text-2xl font-bold">{current.question}</h1>
        <div className="mt-5 space-y-2" data-tour="quiz-options">
          {current.options.map((opt, oi) => {
            const selected = answers[index] === oi;
            return (
              <button
                key={opt}
                type="button"
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selected
                    ? 'border-brand-electric bg-brand-electric/10 text-brand-electric'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5'
                }`}
                onClick={() => setAnswers((prev) => ({ ...prev, [index]: oi }))}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            className="ss-btn-secondary"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            Back
          </button>
          {index < questions.length - 1 ? (
            <button
              type="button"
              className="ss-btn-primary"
              disabled={answers[index] === undefined}
              onClick={() => setIndex((i) => i + 1)}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="ss-btn-primary"
              disabled={Object.keys(answers).length < questions.length}
              onClick={submit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
