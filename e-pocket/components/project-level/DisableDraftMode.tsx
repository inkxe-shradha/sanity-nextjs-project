'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useDraftModeEnvironment } from 'next-sanity/hooks';
import { disableDraftMode } from '@/app/action';
import { Button } from '../ui/button';

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        'Disabling draft mode...'
      ) : (
        <Button
          variant="outline"
          color="secondary"
          type="button"
          onClick={disable}
        >
          Disable draft mode
        </Button>
      )}
    </div>
  );
}
