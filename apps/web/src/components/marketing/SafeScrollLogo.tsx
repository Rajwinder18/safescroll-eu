import { cn } from '@/lib/cn';
import { useId } from 'react';

export function SafeScrollLogo({
  className,
  wordmark = true,
  light = false,
}: {
  className?: string;
  wordmark?: boolean;
  light?: boolean;
}) {
  const gradId = useId().replace(/:/g, '');

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect width="36" height="36" rx="11" fill={`url(#${gradId})`} />
        <path
          d="M11 18.5c0-3.5 2.4-5.5 7-5.5 3.2 0 5.2 1.1 6.2 2.8"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="18.5" r="3.2" fill="white" fillOpacity="0.95" />
        <path
          d="M25 17.5c0 3.5-2.4 5.5-7 5.5-3.2 0-5.2-1.1-6.2-2.8"
          stroke="#78E6C1"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id={gradId} x1="4" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B7A6FF" />
            <stop offset="1" stopColor="#8B7CF6" />
          </linearGradient>
        </defs>
      </svg>
      {wordmark ? (
        <span
          className={cn(
            'text-[1.05rem] font-semibold tracking-tight',
            light ? 'text-white' : 'text-slate-900 dark:text-white'
          )}
        >
          Safe Scroll
        </span>
      ) : null}
    </span>
  );
}
