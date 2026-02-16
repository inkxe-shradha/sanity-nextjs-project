import { Suspense } from 'react';
import RecentOrdersSkeleton, {
  OrderRowSkeleton,
} from '../project-level/LodingSkeleton/RecentOrdersSkeleton';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import OrderRow from './OrderRow';
import { useDocuments } from '@sanity/sdk-react';

function RecentOrdersContent() {
  const { data: orders } = useDocuments({
    documentType: 'order',
    orderings: [{ field: '_createdAt', direction: 'desc' }],
    batchSize: 5,
  });

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <ShoppingCart className="h-6 w-6 text-zinc-400" />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No orders yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {orders.slice(0, 5).map((handle) => (
        <Suspense key={handle.documentId} fallback={<OrderRowSkeleton />}>
          <OrderRow {...handle} />
        </Suspense>
      ))}
    </div>
  );
}

export function RecentOrders() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
          Recent Orders
        </h2>
        <Link
          href="/admin/orders"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          View all →
        </Link>
      </div>
      <div className="p-4">
        <Suspense fallback={<RecentOrdersSkeleton />}>
          <RecentOrdersContent />
        </Suspense>
      </div>
    </div>
  );
}
