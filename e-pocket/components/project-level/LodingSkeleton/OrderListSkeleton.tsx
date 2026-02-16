import { Table, TableBody } from '@/components/ui/table';
import { OrderTableHeader } from '@/components/admin/OrderTableHeader';
import OrderRowSkeleton from './OrderRowSkeleton';

function OrderListSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <Table>
        <OrderTableHeader />
        <TableBody>
          {[1, 2, 3, 4, 5].map((i) => (
            <OrderRowSkeleton key={i} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderListSkeleton;
