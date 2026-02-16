import { ProductTableHeader } from '@/components/admin/ProductTableHeader';
import { Table, TableBody } from '@/components/ui/table';
import ProductRowSkeleton from './ProductRowSkeleton';

function ProductListSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <Table>
        <ProductTableHeader />
        <TableBody>
          {[1, 2, 3, 4, 5].map((i) => (
            <ProductRowSkeleton key={i} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductListSkeleton;
