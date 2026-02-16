'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';

export default function NotFound({
  className,
  title = 'Page not found',
  description = 'Sorry, the page you are looking for does not exist.',
  searchparams,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  searchparams?: Record<string, string | string[] | undefined>;
}) {
  return (
    <div
      data-slot="not-found"
      {...{ searchparams }}
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16',
        className,
      )}
      {...props}
    >
      <div className="bg-muted text-foreground flex size-16 items-center justify-center rounded-full">
        <TriangleAlert className="size-8" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-2 text-base">{description}</p>
      </div>
    </div>
  );
}
