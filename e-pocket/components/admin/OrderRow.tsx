import { getOrderStatus } from '@/lib/constants/order_status';
import { formatDate, formatOrderNumber, formatPrice } from '@/lib/utils';
import { DocumentHandle, useDocumentProjection } from '@sanity/sdk-react';
import { Suspense } from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { OrderRowSkeleton } from '../project-level/LodingSkeleton/RecentOrdersSkeleton';
import { TableCell, TableRow } from '../ui/table';

interface OrderProjection {
  orderNumber: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
  itemCount: number;
}

function OrderRow(handle: DocumentHandle) {
  const { data } = useDocumentProjection<OrderProjection>({
    ...handle,
    projection: `{
      orderNumber,
      email,
      total,
      status,
      createdAt,
      "itemCount": count(items)
    }`,
  });

  if (!data) return null;

  const status = getOrderStatus(data.status);
  const StatusIcon = status.icon;

  return (
    <Suspense fallback={<OrderRowSkeleton />}>
      <TableRow className="group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
        {/* Order Info - Mobile: includes email, items, total */}
        <TableCell className="py-3 sm:py-4">
          <Link href={`/admin/orders/${handle.documentId}`} className="block">
            <div className="flex items-center justify-between gap-2 sm:block">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                #{formatOrderNumber(data.orderNumber)}
              </span>
              {/* Mobile: Total inline */}
              <span className="font-medium text-zinc-900 dark:text-zinc-100 sm:hidden">
                {formatPrice(data.total)}
              </span>
            </div>
            {/* Mobile: Email and items */}
            <div className="mt-1 sm:hidden">
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {data.email}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                {data.itemCount} {data.itemCount === 1 ? 'item' : 'items'}
                {data.createdAt && (
                  <>
                    {' · '}
                    {formatDate(data.createdAt, 'short')}
                  </>
                )}
              </p>
            </div>
          </Link>
        </TableCell>
        {/* Email - Desktop only */}
        <TableCell className="hidden py-4 text-zinc-500 dark:text-zinc-400 sm:table-cell">
          <Link
            href={`/admin/orders/${handle.documentId}`}
            className="block truncate"
          >
            {data.email}
          </Link>
        </TableCell>

        {/* Items - Desktop only */}
        <TableCell className="hidden py-4 text-center md:table-cell">
          <Link href={`/admin/orders/${handle.documentId}`} className="block">
            {data.itemCount}
          </Link>
        </TableCell>

        {/* Total - Desktop only */}
        <TableCell className="hidden py-4 font-medium text-zinc-900 dark:text-zinc-100 sm:table-cell">
          <Link href={`/admin/orders/${handle.documentId}`} className="block">
            {formatPrice(data.total)}
          </Link>
        </TableCell>

        {/* Status - Always visible */}
        <TableCell className="py-3 sm:py-4">
          <Link
            href={`/admin/orders/${handle.documentId}`}
            className="flex justify-center sm:justify-start"
          >
            <Badge
              className={`${status.color} flex w-fit items-center gap-1 text-[10px] sm:text-xs`}
            >
              <StatusIcon className="h-3 w-3" />
              <span className="hidden sm:inline">{status.label}</span>
            </Badge>
          </Link>
        </TableCell>

        {/* Date - Desktop only */}
        <TableCell className="hidden py-4 text-zinc-500 dark:text-zinc-400 md:table-cell">
          <Link href={`/admin/orders/${handle.documentId}`} className="block">
            {formatDate(data.createdAt, 'long', '—')}
          </Link>
        </TableCell>
      </TableRow>
    </Suspense>
  );
}
export default OrderRow;
