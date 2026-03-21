import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 20;

export const MovieListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="flex justify-center">
          <Card className="relative aspect-[2/3] w-full overflow-hidden p-0">
            <Skeleton className="absolute inset-0 rounded-none" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-12" />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
