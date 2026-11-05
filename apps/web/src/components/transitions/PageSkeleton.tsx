import { Skeleton } from '@/components/ui/Skeleton';

/**
 * Premium skeleton that perfectly inherits the app shell background and cards.
 * Never flashes blank white.
 */
export function PageSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl space-y-6 animate-in fade-in duration-100"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="space-y-2">
        <Skeleton className="h-4 w-36 bg-slate-200/90 dark:bg-slate-800/90" />
        <Skeleton className="h-9 w-64 bg-slate-200/90 dark:bg-slate-800/90" />
        <Skeleton className="h-4 w-full max-w-md bg-slate-200/70 dark:bg-slate-800/70" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/70">
          <Skeleton className="h-3.5 w-24 bg-slate-200/80 dark:bg-slate-800/80" />
          <Skeleton className="mt-3 h-8 w-16 bg-slate-200/90 dark:bg-slate-800/90" />
          <Skeleton className="mt-2 h-3 w-32 bg-slate-200/60 dark:bg-slate-800/60" />
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/70">
          <Skeleton className="h-3.5 w-28 bg-slate-200/80 dark:bg-slate-800/80" />
          <Skeleton className="mt-3 h-8 w-20 bg-slate-200/90 dark:bg-slate-800/90" />
          <Skeleton className="mt-2 h-3 w-28 bg-slate-200/60 dark:bg-slate-800/60" />
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/70">
          <Skeleton className="h-3.5 w-24 bg-slate-200/80 dark:bg-slate-800/80" />
          <Skeleton className="mt-3 h-8 w-16 bg-slate-200/90 dark:bg-slate-800/90" />
          <Skeleton className="mt-2 h-3 w-24 bg-slate-200/60 dark:bg-slate-800/60" />
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/70">
          <Skeleton className="h-3.5 w-28 bg-slate-200/80 dark:bg-slate-800/80" />
          <Skeleton className="mt-3 h-8 w-20 bg-slate-200/90 dark:bg-slate-800/90" />
          <Skeleton className="mt-2 h-3 w-32 bg-slate-200/60 dark:bg-slate-800/60" />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft dark:border-white/10 dark:bg-slate-900/70">
        <div className="flex items-center justify-between pb-4">
          <Skeleton className="h-5 w-44 bg-slate-200/80 dark:bg-slate-800/80" />
          <Skeleton className="h-4 w-20 bg-slate-200/60 dark:bg-slate-800/60" />
        </div>
        <Skeleton className="h-56 w-full rounded-2xl bg-slate-200/60 dark:bg-slate-800/60" />
      </div>
    </div>
  );
}
