import CategoryTitles from '@/components/project-level/CategoryTitles';
import FeaturedCarousel from '@/components/project-level/FeaturedCarousel';
import { FeaturedCarouselSkeleton } from '@/components/project-level/LodingSkeleton/CarouselSkeleton';
import ProductSection from '@/components/project-level/ProductSection';
import { client, option } from '@/sanity/client';
import { ALL_CATEGORIES_QUERY } from '@/sanity/queries/categories.query';
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from '@/sanity/queries/product.query';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    color?: string;
    sort?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    inStock?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  const categorySlug = params.category || '';
  const color = params.color || '';
  const material = params.material || '';
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : 0;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : 0;
  const sort = params.sort || 'name asc';
  const inStock = params.inStock === 'true' ? true : false;

  // * Select the query based on presence of search query
  const getQuery = () => {
    if (searchQuery && sort === 'relevance')
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    switch (sort) {
      case 'price_asc':
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case 'price_desc':
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case 'relevance':
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };
  const categoryDataList = await client.fetch(ALL_CATEGORIES_QUERY, {}, option);
  const featureProducts = await client.fetch(
    FEATURED_PRODUCTS_QUERY,
    {},
    option,
  );
  const products = await client.fetch(
    getQuery(),
    {
      searchQuery,
      categorySlug,
      color,
      material,
      minPrice,
      maxPrice,
      inStock,
    },
    option,
  );

  return (
    <div>
      {/* Feature Product Carousel */}
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel products={featureProducts} />
      </Suspense>
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Shop {categorySlug ? categorySlug : 'All Products'}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Premium furniture for your home
          </p>
        </div>

        {/* Category Tiles - Full width */}
        <div className="mt-6">
          <CategoryTitles
            categories={categoryDataList}
            activeCategorySlug={categorySlug || undefined}
          />
        </div>
      </div>

      {/* Product Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductSection categories={categoryDataList} products={products} searchQuery={searchQuery} />
      </div>

    </div>
  );
}
