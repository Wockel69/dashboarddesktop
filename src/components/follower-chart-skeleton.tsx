"use client";

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export function FollowerChartSkeleton() {
  // Predetermined heights to avoid hydration errors
  const pointHeights = [65, 72, 60, 68, 75, 63, 70, 67, 72, 78, 69, 73];

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Skeleton className="h-6 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80 w-full flex flex-col">
          <div className="flex-1 grid grid-cols-1">
            {/* Chart axes skeletons */}
            <div className="relative">
              {/* Y-axis ticks */}
              <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between px-2 py-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-7" />
                <Skeleton className="h-4 w-9" />
                <Skeleton className="h-4 w-8" />
              </div>

              {/* Chart area with grid lines */}
              <div className="absolute inset-0 ml-12 flex items-center justify-center">
                <Skeleton className="h-full w-full opacity-30" />

                {/* Simulated data points */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full h-1/3 flex justify-around">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="relative flex flex-col items-center"
                        style={{ height: `${pointHeights[i]}%` }}
                      >
                        <Skeleton className="w-2 h-2 rounded-full absolute -top-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* X-axis ticks */}
              <div className="absolute bottom-0 left-12 right-0 h-8 flex justify-between px-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
