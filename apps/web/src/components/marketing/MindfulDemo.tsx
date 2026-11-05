import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Step = 'intro' | 'breathe' | 'reflect' | 'choice' | 'done';

export function MindfulDemo() {
  const [step, setStep] = useState<Step>('intro');
  const [seconds, setSeconds] = useState(8);
  const [label, setLabel] = useState<'Inhale' | 'Exhale'>('Inhale');

  useEffect(() => {
    if (step !== 'breathe') return;
    setSeconds(8);
    setLabel('Inhale');
    const tick = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(tick);
          setStep('reflect');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    const breath = window.setInterval(() => {
      setLabel((v) => (v === 'Inhale' ? 'Exhale' : 'Inhale'));
    }, 2000);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(breath);
    };
  }, [step]);

  const restart = () => {
    setStep('intro');
    setSeconds(8);
    setLabel('Inhale');
  };

  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">
          Interactive demo
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          One small pause. A more intentional choice.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
          Try a short mindful break in your browser. This is a product simulation — websites cannot
          intercept native app launches. Device integrations stay available on mobile.
        </p>
        {step === 'intro' ? (
          <button
            type="button"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#B7A6FF]"
            onClick={() => setStep('breathe')}
          >
            Try a mindful break
          </button>
        ) : (
          <button
            type="button"
            className="mt-8 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            onClick={restart}
          >
            Restart demo
          </button>
        )}
      </div>

      <div className="relative mx-auto w-full max-w-[320px]">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/15 bg-[#0a0f1a] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="relative flex aspect-[9/16] flex-col justify-center overflow-hidden rounded-[1.7rem] bg-gradient-to-b from-[#1c2740] to-[#111827] px-5 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {step === 'intro' ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#B7A6FF]">Safe Scroll</p>
                    <h3 className="text-2xl font-semibold text-white">Ready when you are</h3>
                    <p className="text-sm text-white/60">A calm pause before the scroll.</p>
                  </>
                ) : null}

                {step === 'breathe' ? (
                  <>
                    <div className="mx-auto flex h-40 w-40 items-center justify-center">
                      <motion.div
                        className="h-32 w-32 rounded-full bg-gradient-to-br from-[#B7A6FF] to-[#8B7CF6]"
                        animate={{ scale: [0.88, 1.1, 0.88] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <p className="text-lg font-medium text-white">{label}</p>
                    <p className="text-sm text-white/55">{seconds}s remaining</p>
                  </>
                ) : null}

                {step === 'reflect' ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#78E6C1]">Reflect</p>
                    <h3 className="text-xl font-semibold text-white">
                      Why are you opening this app?
                    </h3>
                    <button
                      type="button"
                      className="mt-2 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white"
                      onClick={() => setStep('choice')}
                    >
                      Continue to choose
                    </button>
                  </>
                ) : null}

                {step === 'choice' ? (
                  <>
                    <h3 className="text-xl font-semibold text-white">What would help right now?</h3>
                    <div className="space-y-2">
                      <button
                        type="button"
                        className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#111827]"
                        onClick={() => setStep('done')}
                      >
                        Return to what I was doing
                      </button>
                      <button
                        type="button"
                        className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm text-white"
                        onClick={() => setStep('done')}
                      >
                        Continue intentionally
                      </button>
                    </div>
                  </>
                ) : null}

                {step === 'done' ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#78E6C1]">Complete</p>
                    <h3 className="text-2xl font-semibold text-white">Nice pause.</h3>
                    <p className="text-sm text-white/65">
                      You practiced an intentional choice. Create an account to track demo progress.
                    </p>
                    <button
                      type="button"
                      className="w-full rounded-xl bg-[#8B7CF6] px-4 py-3 text-sm font-semibold text-white"
                      onClick={restart}
                    >
                      Try again
                    </button>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
