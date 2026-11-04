
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowLeft,
  SearchX,
  Compass,
} from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-background">
      <div className="max-w-xl w-full text-center space-y-7">

        {/* 404 Illustration */}
        <div className="relative flex justify-center">
          <h1 className="text-[140px] sm:text-[180px] font-black leading-none tracking-tighter text-green-600/10">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
              <SearchX className="h-12 w-12 sm:h-14 sm:w-14 text-green-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-600">
            Page Not Found
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Oops! Lost Your Way?
          </h2>

          <p className="text-muted-foreground leading-7 max-w-md mx-auto">
            The page you're looking for doesn't exist or may have
            been moved. Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            <Link href="/" className="flex items-center gap-1">
              <Home className="mr-2 h-4 w-4" />
              <div>Back to Home</div>
            </Link>
          </Button>

          <Link href={'/'}>
            <Button
            variant="outline"
            className="rounded-lg flex items-center gap-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
           <div> Go Back</div>
          </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-5 border-t">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Compass className="h-4 w-4 text-green-600" />
            <span>
              Need help? Explore our CareConnect community.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
