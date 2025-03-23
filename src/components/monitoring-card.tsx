import { ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface MonitoringCardProps {
  status: 'normal' | 'warning' | 'critical';
  occupancy: number;
  maxOccupancy: number;
  currentPeople: number;
  visitors: {
    total: number;
    waiting: number;
    inMeeting: number;
  };
  lastHour: {
    delta: number;
    in: number;
    out: number;
  };
  lastUpdated: string;
}

export function MonitoringCard({
  status = 'normal',
  occupancy,
  maxOccupancy,
  currentPeople,
  visitors,
  lastHour,
  lastUpdated,
}: MonitoringCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Real-Time Monitoring</CardTitle>
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20">
            <CheckCircle className="h-4 w-4 text-success" />
          </div>
          <span className="font-medium">Normal Operations</span>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm">Current Occupancy</div>
            <div className="text-sm font-medium">{occupancy}%</div>
          </div>
          <Progress value={occupancy} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <div>{currentPeople} people on-site</div>
            <div>Max: {maxOccupancy}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-md border p-3">
            <div className="text-sm mb-1">Visitors</div>
            <div className="text-2xl font-bold">{visitors.total}</div>
            <div className="mt-1 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-warning mr-1"></div>
                <span>Waiting: {visitors.waiting}</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-info mr-1"></div>
                <span>In Meeting: {visitors.inMeeting}</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border p-3">
            <div className="text-sm mb-1">Last Hour</div>
            <div className="text-2xl font-bold">+{lastHour.delta}</div>
            <div className="mt-1 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <ArrowUp className="h-3 w-3 text-success mr-1" />
                <span>In: {lastHour.in}</span>
              </div>
              <div className="flex items-center">
                <ArrowDown className="h-3 w-3 text-destructive mr-1" />
                <span>Out: {lastHour.out}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
