import OrderDetailContent from '@/components/admin/OrderDetailContent';
import { OrderDetailSkeleton } from '@/components/project-level/LodingSkeleton/OrderDetailSkeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const handle = {
    documentId: id,
    documentType: 'order',
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Link>

      {/* Order Detail */}
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetailContent handle={handle} />
      </Suspense>
    </div>
  );
};

export default OrderDetailsPage;
