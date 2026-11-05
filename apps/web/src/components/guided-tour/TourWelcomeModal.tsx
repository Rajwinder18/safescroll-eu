import { useGuidedTour } from '@/hooks/useGuidedTour';
import { AnimatePresence, motion } from 'framer-motion';

export function TourWelcomeModal() {
  const { showWelcome, dismissWelcome } = useGuidedTour();

  return (
    <AnimatePresence>
      {showWelcome ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#111827]/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-welcome-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B7CF6]">
              Getting started
            </p>
            <h2 id="tour-welcome-title" className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Welcome to Safe Scroll!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Your journey towards a more intentional digital life starts here. Let us show you
              around.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-[#8B7CF6] px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => dismissWelcome(false)}
              >
                Start Guided Tour
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200"
                onClick={() => dismissWelcome(true)}
              >
                Skip for Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
