import { TableHead, TableHeader, TableRow } from '../ui/table';

// ============================================
// Order Table Headers
// ============================================

interface TableHeaderColumn {
  label: string;
  className?: string;
}

const ORDER_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Order' },
  { label: 'Customer', className: 'hidden sm:table-cell' },
  { label: 'Items', className: 'hidden text-center md:table-cell' },
  { label: 'Total', className: 'hidden sm:table-cell' },
  { label: 'Status', className: 'text-center sm:text-left' },
  { label: 'Date', className: 'hidden md:table-cell' },
];

export function OrderTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {ORDER_TABLE_COLUMNS.map((column) => (
          <TableHead key={column.label} className={column.className}>
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
