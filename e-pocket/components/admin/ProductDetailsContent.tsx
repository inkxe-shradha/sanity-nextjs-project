'use client';

import {
  DocumentHandle,
  useDocument,
  useDocumentProjection,
} from '@sanity/sdk-react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { DeleteButton } from './DeleteButton';
import { Suspense } from 'react';
import { RevertButton } from './PublishButton';
import { PublishButton } from './RevertButton';
import { Label } from '../ui/label';
import {
  AssemblyEditor,
  ColorEditor,
  DescriptionEditor,
  DimensionsEditor,
  FeaturedEditor,
  MaterialEditor,
  NameEditor,
  PriceEditor,
  SlugEditor,
  StockEditor,
} from '../project-level/Editors';
import { Skeleton } from '../ui/skeleton';
import { ImageUploader } from './ImageUploader';

interface ProductSlugProjection {
  slug: {
    current: string;
  } | null;
}
function ProductStoreLink(handle: DocumentHandle) {
  const { data } = useDocumentProjection<ProductSlugProjection>({
    ...handle,
    projection: `{ slug }`,
  });

  const slug = data?.slug?.current;

  if (!slug) return null;

  return (
    <Link
      href={`/products/${slug}`}
      target="_blank"
      className="flex items-center justify-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      View on store
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  );
}

const ProductDetailsContent = ({ handle }: { handle: DocumentHandle }) => {
  const { data: name } = useDocument<string>({ ...handle, path: 'name' });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            {(name as string) || 'New Product'}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Edit product details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DeleteButton handle={handle} />
          <Suspense fallback={null}>
            <RevertButton {...handle} />
          </Suspense>
          <Suspense fallback={null}>
            <PublishButton {...handle} />
          </Suspense>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Main Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <NameEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <SlugEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Suspense fallback={<Skeleton className="h-24" />}>
                  <DescriptionEditor {...handle} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Pricing & Inventory
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (£)</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <PriceEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <StockEditor {...handle} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Attributes
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Material</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <MaterialEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <ColorEditor {...handle} />
                </Suspense>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Dimensions</Label>
                <Suspense fallback={<Skeleton className="h-10" />}>
                  <DimensionsEditor {...handle} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Options
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    Featured Product
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Show on homepage and promotions
                  </p>
                </div>
                <Suspense fallback={<Skeleton className="h-6 w-11" />}>
                  <FeaturedEditor {...handle} />
                </Suspense>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    Assembly Required
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Customer will need to assemble
                  </p>
                </div>
                <Suspense fallback={<Skeleton className="h-6 w-11" />}>
                  <AssemblyEditor {...handle} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Product Images
            </h2>
            <ImageUploader {...handle} />
            <div className="mt-4">
              <Suspense fallback={null}>
                <ProductStoreLink {...handle} />
              </Suspense>
            </div>
          </div>

          {/* Studio Link */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Advanced Editing
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Set category and other options in Sanity Studio.
            </p>
            <Link
              href={`/studio/structure/product;${handle.documentId}`}
              target="_blank"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              Open in Studio
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContent;
