'use client';

import LoadingSpinner from '@/components/project-level/LoadingSpinner';
import dynamic from 'next/dynamic';

const SanityAppProvider = dynamic(
  () =>
    import('@/sanity/lib/store/providers/Provider').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <LoadingSpinner text="Loading Sanity App SDK..." isFullScreen size="lg" />
    ),
  },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <SanityAppProvider>{children}</SanityAppProvider>;
}
