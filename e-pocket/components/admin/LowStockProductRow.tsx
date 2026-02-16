import { Badge } from '@/components/ui/badge';
import { DocumentHandle, useDocumentProjection } from '@sanity/sdk-react';
import Image from 'next/image';
import Link from 'next/link';
interface ProductProjection {
  name: string;
  stock: number;
  image: {
    asset: {
      url: string;
    } | null;
  } | null;
}
const LowStockProductRow = (handle: DocumentHandle) => {
  const { data } = useDocumentProjection<ProductProjection>({
    ...handle,
    projection: `{
      name,
      stock,
      "image": images[0]{
        asset->{
          url
        }
      }
    }`,
  });

  if (!data) return null;

  const isOutOfStock = data.stock === 0;
  return (
    <Link
      href={`/admin/inventory/${handle.documentId}`}
      className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 p-3 transition-colors hover:border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-700">
        {data.image?.asset?.url ? (
          <Image
            src={data.image.asset.url}
            alt={data.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">
            ?
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {data.name}
        </p>
      </div>
      <Badge
        variant={isOutOfStock ? 'destructive' : 'secondary'}
        className="shrink-0"
      >
        {isOutOfStock ? 'Out of stock' : `${data.stock} left`}
      </Badge>
    </Link>
  );
};

export default LowStockProductRow;
