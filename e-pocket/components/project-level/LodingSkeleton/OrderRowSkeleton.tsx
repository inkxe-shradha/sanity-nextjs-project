import { Skeleton } from '@/components/ui/skeleton';
import { TableRow, TableCell } from '@/components/ui/table';

const OrderRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="py-3 sm:py-4">
        <div>
          <div className="flex items-center justify-between gap-2 sm:block">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14 sm:hidden" />
          </div>
          <div className="mt-1 sm:hidden">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-1 h-3 w-20" />
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden py-4 sm:table-cell">
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell className="hidden py-4 text-center md:table-cell">
        <Skeleton className="mx-auto h-4 w-8" />
      </TableCell>
      <TableCell className="hidden py-4 sm:table-cell">
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell className="py-3 sm:py-4">
        <div className="flex justify-center sm:justify-start">
          <Skeleton className="h-5 w-8 sm:w-20" />
        </div>
      </TableCell>
      <TableCell className="hidden py-4 md:table-cell">
        <Skeleton className="h-4 w-24" />
      </TableCell>
    </TableRow>
  );
};

export default OrderRowSkeleton;
