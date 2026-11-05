import { useGuidedTour } from '@/hooks/useGuidedTour';
import { TOURS } from '@/services/tourService';
import { AnimatePresence, motion } from 'framer-motion';

export function FeatureTourOffer() {
  const { offerFeatureTourId, dismissFeatureOffer } = useGuidedTour();
  const title = offerFeatureTourId ? TOURS[offerFeatureTourId]?.title : '';

  return (
    <AnimatePresence>
      {offerFeatureTourId ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-20 left-4 right-4 z-[70] mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl lg:bottom-6 dark:border-white/10 dark:bg-slate-900"
          role="dialog"
          aria-label="Feature tour offer"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8B7CF6]">{title}</p>
          <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
            Want a quick tour of this feature?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="rounded-full bg-[#8B7CF6] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => dismissFeatureOffer(true)}
            >
              Show Me Around
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold dark:border-white/10"
              onClick={() => dismissFeatureOffer(false)}
            >
              Skip
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
