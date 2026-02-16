import { StatCardProps } from '@/components/admin/StatCard';
import { Skeleton } from '@/components/ui/skeleton';

function StatCardSkeleton({
  title,
  icon: Icon,
}: Pick<StatCardProps, 'title' | 'icon'>) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <Skeleton className="mt-2 h-9 w-20" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <Icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
        </div>
      </div>
    </div>
  );
}

export default StatCardSkeleton;
