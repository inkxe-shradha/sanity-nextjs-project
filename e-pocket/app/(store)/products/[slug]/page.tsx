import ProductGallery from '@/components/project-level/ProductGallery';
import ProductInfo from '@/components/project-level/ProductInfo';
import { client, option } from '@/sanity/client';
import { PRODUCT_BY_SLUG_QUERY } from '@/sanity/queries/product.query';
import { notFound } from 'next/navigation';

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;
  const productDetails = await client.fetch(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    option,
  );
  if (!productDetails) return notFound();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <ProductGallery
            images={productDetails.images}
            productName={productDetails.name}
          />

          {/* Product Info */}
          <ProductInfo product={productDetails} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
