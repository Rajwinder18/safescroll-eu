import { isDemoMode } from '@/lib/demo';
import { Beaker } from 'lucide-react';

export function DemoBanner() {
  if (!isDemoMode()) return null;
  return (
    <div className="border-b border-amber-400/20 bg-amber-500/15 text-amber-100">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 text-xs sm:text-sm">
        <Beaker className="h-4 w-4 shrink-0 text-amber-200" aria-hidden />
        <p>
          <span className="font-semibold text-amber-50">Development / demo mode.</span>{' '}
          Mock services and demonstration data are active. Charts are not real device
          measurements.
        </p>
      </div>
    </div>
  );
}
