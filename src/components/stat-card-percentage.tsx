"use client";

import { ArrowUp, ArrowDown, Percent, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface StatCardPercentageProps {
  title: string;
  value: number | string;
  prevValue?: number | string;
  change: number;
  icon: React.ReactNode;
  isLoading?: boolean;
}

export function StatCardPercentage({
  title,
  value,
  prevValue,
  change,
  icon,
  isLoading = false
}: StatCardPercentageProps) {
  // Bestimme, ob die Veränderung positiv, negativ oder neutral ist
  const isPositive = change > 0;
  const isNeutral = change === 0;

  // Bestimme die Farben basierend auf der Veränderung
  const changeColor = isPositive
    ? 'text-green-500'
    : isNeutral
      ? 'text-muted-foreground'
      : 'text-red-500';

  const changeBgColor = isPositive
    ? 'bg-green-500/10'
    : isNeutral
      ? 'bg-muted/20'
      : 'bg-red-500/10';

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-500/20">
            {icon}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl font-bold">{value}</p>

            {prevValue && (
              <p className="text-xs text-muted-foreground">
                Vorwoche: {prevValue}
              </p>
            )}

            <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
              {!isNeutral && (
                <>
                  {isPositive ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </>
              )}
              <span className="font-medium">{change > 0 ? '+' : ''}{change}%</span>
              <span className="text-xs text-muted-foreground ml-1">gegenüber Vorwoche</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
