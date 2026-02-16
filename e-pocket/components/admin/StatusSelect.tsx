import {
  DocumentHandle,
  publishDocument,
  useApplyDocumentActions,
  useDocument,
  useEditDocument,
} from '@sanity/sdk-react';
import { Skeleton } from '../ui/skeleton';
import { Suspense } from 'react';
import {
  getOrderStatus,
  ORDER_STATUS_CONFIG,
} from '@/lib/constants/order_status';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function StatusSelectSkeleton() {
  return <Skeleton className="h-10 w-[180px]" />;
}

function StatusSelectContent(handle: DocumentHandle) {
  const { data: status } = useDocument({ ...handle, path: 'status' });
  const editStatus = useEditDocument({ ...handle, path: 'status' });
  const apply = useApplyDocumentActions();

  const currentStatus = (status as string) ?? 'paid';
  const statusConfig = getOrderStatus(currentStatus);
  const StatusIcon = statusConfig.icon;

  const handleStatusChange = async (value: string) => {
    editStatus(value);
    // Auto-publish status changes so they take effect immediately
    await apply(publishDocument(handle));
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-45">
        <SelectValue>
          <div className="flex items-center gap-2">
            <StatusIcon className="h-4 w-4" />
            {statusConfig.label}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(ORDER_STATUS_CONFIG).map(([value, config]) => {
          const Icon = config.icon;
          return (
            <SelectItem key={value} value={value}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {config.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

const StatusSelect: React.FC<DocumentHandle> = (props) => {
  return (
    <Suspense fallback={<StatusSelectSkeleton />}>
      <StatusSelectContent {...props} />
    </Suspense>
  );
};

export default StatusSelect;
