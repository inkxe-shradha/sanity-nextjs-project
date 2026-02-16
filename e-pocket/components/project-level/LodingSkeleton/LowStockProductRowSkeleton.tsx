import { Skeleton } from '@/components/ui/skeleton';

export default function LowStockProductRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
      <Skeleton className="h-10 w-10 rounded-md" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-5 w-16" />
    </div>
  );
}
