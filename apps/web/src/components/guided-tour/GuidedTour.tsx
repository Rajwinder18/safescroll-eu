import { useGuidedTour } from '@/hooks/useGuidedTour';
import { TOURS } from '@/services/tourService';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function GuidedTour() {
  const { activeTourId, stepIndex, next, prev, skip, close } = useGuidedTour();
  const [rect, setRect] = useState<Rect | null>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  const tour = activeTourId ? TOURS[activeTourId] : null;
  const step = tour?.steps[stepIndex];
  const total = tour?.steps.length || 0;

  const measure = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const h = typeof window !== 'undefined' ? window.innerHeight : 768;
    setViewport({ w, h });

    if (!step) {
      setRect(null);
      return;
    }
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (!el) {
      const top = h / 2 - 40;
      const left = w / 2 - 120;
      const width = 240;
      const height = 80;
      setRect({
        top,
        left,
        width,
        height,
        bottom: top + height,
        right: left + width,
      });
      return;
    }
    const r = el.getBoundingClientRect();
    setRect({
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
      bottom: r.bottom,
      right: r.right,
    });
  };

  useLayoutEffect(() => {
    measure();
  }, [activeTourId, stepIndex, step?.selector]);

  useEffect(() => {
    if (!activeTourId) return;
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [activeTourId, stepIndex]);

  useEffect(() => {
    if (!activeTourId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeTourId, next, prev, close]);

  const isMobile = viewport.w > 0 && viewport.w < 768;

  const tooltipStyle = useMemo(() => {
    if (!rect) return { top: 80, left: 24, width: 340 };
    const tipW = Math.min(380, viewport.w - 32);
    const tipH = 200;
    const gap = 16;

    let top = rect.bottom + gap;
    let left = rect.left;
    const placement = step?.placement || 'auto';

    if (placement === 'top' || (placement === 'auto' && rect.bottom > viewport.h * 0.62)) {
      top = rect.top - tipH - gap;
    }
    if (placement === 'right') {
      top = rect.top;
      left = rect.left + rect.width + gap;
    }
    if (placement === 'left') {
      top = rect.top;
      left = rect.left - tipW - gap;
    }

    return {
      top: clamp(top, 16, Math.max(16, viewport.h - tipH - 16)),
      left: clamp(left, 16, Math.max(16, viewport.w - tipW - 16)),
      width: tipW,
    };
  }, [rect, viewport, step?.placement]);

  const isLast = stepIndex >= total - 1;

  return (
    <AnimatePresence>
      {activeTourId && step ? (
        <motion.div
          className="fixed inset-0 z-[95]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-live="polite"
        >
          {/* Spotlight backdrop overlay */}
          <div
            className="absolute inset-0 bg-[#0B1220]/75 backdrop-blur-[2px] transition-all"
            onClick={skip}
            aria-hidden
          />

          {/* Spotlight glowing cutout on target element */}
          {rect ? (
            <motion.div
              className="pointer-events-none absolute rounded-2xl ring-4 ring-[#8B7CF6]/60"
              animate={{
                top: Math.max(0, rect.top - 8),
                left: Math.max(0, rect.left - 8),
                width: rect.width + 16,
                height: rect.height + 16,
              }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                boxShadow:
                  '0 0 0 9999px rgba(11, 18, 32, 0.76), 0 0 35px rgba(139, 124, 246, 0.5)',
              }}
            />
          ) : null}

          {/* Mobile Bottom Sheet Presentation */}
          {isMobile ? (
            <div className="fixed inset-x-0 bottom-0 z-[100] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="tour-step-title"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                key={step.id}
                className="w-full rounded-3xl border border-white/10 bg-white p-5 shadow-2xl dark:border-white/15 dark:bg-slate-900"
              >
                {/* Drag handle */}
                <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-300 dark:bg-white/20" />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B7CF6]">
                      <Sparkles className="h-3 w-3" />
                      {tour?.title}
                    </span>
                    <h3
                      id="tour-step-title"
                      className="mt-1 text-base font-semibold text-slate-900 dark:text-white"
                    >
                      {step.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                    aria-label="Close tour"
                    onClick={close}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.body}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-white/10">
                  <span className="text-[11px] font-medium text-slate-400">
                    Step {stepIndex + 1} of {total}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      onClick={skip}
                    >
                      Skip
                    </button>
                    {stepIndex > 0 ? (
                      <button
                        type="button"
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10"
                        onClick={prev}
                      >
                        <ArrowLeft className="inline mr-1 h-3 w-3" />
                        Back
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded-full bg-[#8B7CF6] px-4 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#7c6bf0]"
                      onClick={next}
                    >
                      {isLast ? (
                        <>
                          <span>Done</span>
                          <Check className="h-3.5 w-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Next</span>
                          <ArrowRight className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Desktop Responsive Floating Tooltip */
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="tour-step-title"
              className="absolute z-[100] rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xl dark:border-white/15 dark:bg-slate-900"
              style={tooltipStyle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              key={step.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B7CF6]">
                    <Sparkles className="h-3 w-3" />
                    {tour?.title}
                  </span>
                  <h3
                    id="tour-step-title"
                    className="mt-1 text-base font-semibold text-slate-900 dark:text-white"
                  >
                    {step.title}
                  </h3>
                </div>
                <button
                  type="button"
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                  aria-label="Close tour"
                  onClick={close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {step.body}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-white/10">
                <span className="text-xs font-medium text-slate-400">
                  Step {stepIndex + 1} of {total}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    onClick={skip}
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10"
                    onClick={prev}
                    disabled={stepIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full bg-[#8B7CF6] px-4 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#7c6bf0]"
                    onClick={next}
                  >
                    {isLast ? (
                      <>
                        <span>Finish</span>
                        <Check className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Next</span>
                        <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
