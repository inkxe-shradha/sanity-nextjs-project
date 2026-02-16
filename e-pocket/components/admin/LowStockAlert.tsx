import { AlertTriangle } from 'lucide-react';
import React, { Suspense } from 'react';
import LowStockProductRowSkeleton from '../project-level/LodingSkeleton/LowStockProductRowSkeleton';
import LowStockAlertContent from './LowStockAlertContent';
function LowStockAlertSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <LowStockProductRowSkeleton key={i} />
      ))}
    </div>
  );
}
const LowStockAlert = () => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
          Low Stock Alerts
        </h2>
      </div>
      <div className="p-4">
        <Suspense fallback={<LowStockAlertSkeleton />}>
          <LowStockAlertContent />
        </Suspense>
      </div>
    </div>
  );
};

export default LowStockAlert;
