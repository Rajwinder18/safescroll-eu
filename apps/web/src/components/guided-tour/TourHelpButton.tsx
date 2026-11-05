import { useGuidedTour } from '@/hooks/useGuidedTour';
import { HelpCircle } from 'lucide-react';

export function TourHelpButton({ label = 'Take a Tour' }: { label?: string }) {
  const { replayCurrent } = useGuidedTour();

  return (
    <button
      type="button"
      onClick={replayCurrent}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-[#8B7CF6]/40 hover:text-[#8B7CF6] dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
      title="Help & Guided Tour"
    >
      <HelpCircle className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
