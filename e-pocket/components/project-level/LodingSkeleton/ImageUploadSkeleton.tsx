import { Skeleton } from '@/components/ui/skeleton';

function ImageUploaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="aspect-square rounded-lg" />
      </div>
    </div>
  );
}

export default ImageUploaderSkeleton;
