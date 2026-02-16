// ============================================
// Order Table Headers
// ============================================

import { TableHead, TableHeader, TableRow } from '../ui/table';

export interface TableHeaderColumn {
  label: string;
  className?: string;
}

// ============================================
// Product/Inventory Table Headers
// ============================================

const PRODUCT_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Image', className: 'hidden w-16 sm:table-cell' },
  { label: 'Product' },
  { label: 'Price', className: 'hidden w-28 md:table-cell' },
  { label: 'Stock', className: 'hidden w-28 md:table-cell' },
  { label: 'Featured', className: 'hidden w-16 lg:table-cell' },
  { label: 'Actions', className: 'hidden w-[140px] text-right sm:table-cell' },
];

export function ProductTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {PRODUCT_TABLE_COLUMNS.map((column) => (
          <TableHead key={column.label} className={column.className}>
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
