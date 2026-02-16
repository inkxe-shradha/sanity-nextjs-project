import { useDocuments } from '@sanity/sdk-react';
import React, { Suspense } from 'react';
import LowStockProductRowSkeleton from '../project-level/LodingSkeleton/LowStockProductRowSkeleton';
import LowStockProductRow from './LowStockProductRow';
import Link from 'next/link';

const LowStockAlertContent = () => {
  // Fetch products with low stock (stock <= 5)
  const { data: lowStockProducts } = useDocuments({
    documentType: 'product',
    filter: 'stock <= 5',
    orderings: [{ field: 'stock', direction: 'asc' }],
    batchSize: 10,
  });

  if (!lowStockProducts || lowStockProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <span className="text-2xl">✓</span>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          All products are well stocked!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {lowStockProducts.slice(0, 5).map((handle) => (
        <Suspense
          key={handle.documentId}
          fallback={<LowStockProductRowSkeleton />}
        >
          <LowStockProductRow {...handle} />
        </Suspense>
      ))}
      {lowStockProducts.length > 5 && (
        <Link
          href="/admin/inventory?filter=low-stock"
          className="block text-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          View all {lowStockProducts.length} low stock items →
        </Link>
      )}
    </div>
  );
};

export default LowStockAlertContent;
