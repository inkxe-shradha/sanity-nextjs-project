import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

function ProductRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="hidden py-3 sm:table-cell">
        <Skeleton className="h-12 w-12 rounded-md" />
      </TableCell>
      <TableCell className="py-3 sm:py-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-12 w-12 shrink-0 rounded-md sm:hidden" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-1 h-3 w-20" />
            <div className="mt-1.5 flex gap-2 sm:hidden">
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-3.5 w-16" />
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden py-4 md:table-cell">
        <Skeleton className="h-8 w-24" />
      </TableCell>
      <TableCell className="hidden py-4 md:table-cell">
        <Skeleton className="h-8 w-20" />
      </TableCell>
      <TableCell className="hidden py-4 lg:table-cell">
        <Skeleton className="h-8 w-8" />
      </TableCell>
      <TableCell className="hidden py-4 sm:table-cell">
        <Skeleton className="h-8 w-[100px]" />
      </TableCell>
    </TableRow>
  );
}

export default ProductRowSkeleton;
