import { TourHelpButton } from '@/components/guided-tour/TourHelpButton';
import { PageHeader } from '@/components/navigation/PageHeader';
import type { ReactNode } from 'react';

/** Lightweight wrapper for consistent titles, crumbs and tour entry on feature pages. */
export function FeaturePageShell({
  kicker,
  title,
  description,
  crumb,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  crumb: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-6" data-tour="page-root">
      <PageHeader
        kicker={kicker}
        title={title}
        description={description}
        crumbs={[
          { label: 'Website', to: '/' },
          { label: 'App', to: '/app' },
          { label: crumb },
        ]}
        actions={<TourHelpButton />}
      />
      {children}
    </div>
  );
}
