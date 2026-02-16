import { Skeleton } from '@/components/ui/skeleton';

export const OrderRowSkeleton = () => (
  <div className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
    <div className="space-y-1">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-3 w-32" />
    </div>
    <div className="flex items-center gap-3">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
  </div>
);

const RecentOrdersSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <OrderRowSkeleton key={index} />
      ))}
    </div>
  );
};

export default RecentOrdersSkeleton;
