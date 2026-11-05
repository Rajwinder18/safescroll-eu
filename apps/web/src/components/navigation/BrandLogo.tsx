import { SafeScrollLogo } from '@/components/marketing/SafeScrollLogo';
import { cn } from '@/lib/cn';
import { Link } from 'react-router-dom';

export function BrandLogo({
  className,
  light = false,
  subtitle,
  tooltip = 'Return to website',
}: {
  className?: string;
  light?: boolean;
  subtitle?: string;
  tooltip?: string;
}) {
  return (
    <Link
      to="/"
      title={tooltip}
      aria-label={tooltip}
      className={cn(
        'group inline-flex items-center gap-2 rounded-xl outline-none transition focus-visible:ring-2 focus-visible:ring-[#8B7CF6]',
        className
      )}
    >
      {subtitle ? (
        <>
          <SafeScrollLogo light={light} wordmark={false} />
          <span className="min-w-0">
            <span
              className={cn(
                'block text-[1.05rem] font-semibold tracking-tight group-hover:text-[#8B7CF6]',
                light ? 'text-white' : 'text-slate-900 dark:text-white'
              )}
            >
              Safe Scroll
            </span>
            <span className={cn('block text-xs', light ? 'text-white/60' : 'text-slate-500')}>
              {subtitle}
            </span>
          </span>
        </>
      ) : (
        <SafeScrollLogo light={light} wordmark />
      )}
    </Link>
  );
}
