import ProductDetailsContent from '@/components/admin/ProductDetailsContent';
import ProductDetailSkeleton from '@/components/project-level/LodingSkeleton/ProductDetailSkeleton';
import { DocumentHandle } from '@sanity/sdk-react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const handle: DocumentHandle = {
    documentId: id,
    documentType: 'product',
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back Link */}
      <Link
        href={'/admin/inventory'}
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Inventory
      </Link>
      {/* Product Details */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailsContent handle={handle} />
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
