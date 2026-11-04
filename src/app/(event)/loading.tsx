
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";

const LoadingPage2 = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">

      {/* Loading Spinner */}
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle className="h-12 w-12 animate-spin text-green-600" />

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Loading...
        </h2>

        <p className="text-sm text-muted-foreground">
          Please wait while we load your content.
        </p>
      </div>

      {/* Skeleton Loading */}
      <div className="w-full max-w-3xl space-y-4">
        <Skeleton className="h-10 w-1/2 mx-auto rounded-lg" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="space-y-3 rounded-xl border p-4"
            >
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LoadingPage2;
