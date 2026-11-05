import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

type Screen =
  | 'breath-prompt'
  | 'breathing'
  | 'social-icon'
  | 'reflection'
  | 'intentional'
  | 'summary';

const sequence: { id: Screen; duration: number }[] = [
  { id: 'breath-prompt', duration: 2800 },
  { id: 'breathing', duration: 3600 },
  { id: 'social-icon', duration: 2400 },
  { id: 'reflection', duration: 2800 },
  { id: 'intentional', duration: 2600 },
  { id: 'summary', duration: 3400 },
];

export function HeroPhone({ interactive = false }: { interactive?: boolean }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);
  const screen = sequence[index]?.id || 'breath-prompt';

  useEffect(() => {
    if (reduce || interactive) return;
    const current = sequence[index];
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % sequence.length);
    }, current.duration);
    return () => window.clearTimeout(timer);
  }, [index, reduce, interactive]);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  return (
    <div
      ref={frameRef}
      className="relative mx-auto w-[240px] sm:w-[270px] lg:w-[300px]"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <motion.div
        className="relative z-10"
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformPerspective: 900,
        }}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <div
          className="relative overflow-hidden rounded-[2.4rem] border border-white/20 bg-[#0a0f1a] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
          style={{ transform: 'rotate(8deg)' }}
        >
          <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
          <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-[#1b2436] to-[#111827]">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
              >
                {screen === 'breath-prompt' ? (
                  <>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#B7A6FF]">
                      Safe Scroll
                    </p>
                    <h3 className="mt-4 text-xl font-semibold leading-snug text-white">
                      It&apos;s time to take a deep breath...
                    </h3>
                  </>
                ) : null}

                {screen === 'breathing' ? (
                  <>
                    <div className="relative flex h-36 w-36 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#8B7CF6]/25 blur-xl" />
                      <motion.div
                        className="h-28 w-28 rounded-full bg-gradient-to-br from-[#B7A6FF] to-[#8B7CF6]"
                        animate={reduce ? undefined : { scale: [0.86, 1.08, 0.86] }}
                        transition={
                          reduce
                            ? undefined
                            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                        }
                      />
                    </div>
                    <p className="mt-4 text-sm font-medium text-white/90">Inhale · Exhale</p>
                  </>
                ) : null}

                {screen === 'social-icon' ? (
                  <>
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-white/90">
                        <div className="h-3 w-3 rounded-full bg-white/90" />
                      </div>
                    </div>
                    <p className="mt-5 text-sm text-white/80">Social app waiting…</p>
                    <p className="mt-1 text-xs text-white/45">Generic demo icon</p>
                  </>
                ) : null}

                {screen === 'reflection' ? (
                  <>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#78E6C1]">
                      Reflection
                    </p>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      Why are you opening this app?
                    </h3>
                  </>
                ) : null}

                {screen === 'intentional' ? (
                  <>
                    <h3 className="text-xl font-semibold leading-snug text-white">
                      Your time matters.
                      <br />
                      Make it intentional.
                    </h3>
                  </>
                ) : null}

                {screen === 'summary' ? (
                  <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B7A6FF]">
                      Wellbeing summary
                    </p>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-bold text-white">78</div>
                        <div className="text-xs text-white/55">Index · sample</div>
                      </div>
                      <div className="text-right text-xs text-white/70">
                        <div>2 mindful breaks</div>
                        <div className="mt-1 text-[#78E6C1]">Goal on track</div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-1">
                      {[40, 55, 48, 62, 70, 66, 78].map((h, i) => (
                        <div key={i} className="flex-1 rounded-full bg-white/10">
                          <div
                            className="rounded-full bg-gradient-to-t from-[#8B7CF6] to-[#78E6C1]"
                            style={{ height: `${h}%`, minHeight: 18 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[#8B7CF6]/25 blur-3xl" />
    </div>
  );
}
