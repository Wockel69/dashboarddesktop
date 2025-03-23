import { MapPin, Users, UserRound, Package, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface LocationCardProps {
  id: string;
  name: string;
  location: string;
  address: string;
  status: 'active' | 'inactive';
  employees: {
    current: number;
    total: number;
  };
  visitors: {
    count: number;
    status: string;
  };
  deliveries: {
    count: number;
    status: string;
  };
}

export function LocationCard({
  id,
  name,
  location,
  address,
  status,
  employees,
  visitors,
  deliveries,
}: LocationCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>{name}</CardTitle>
            <Badge
              variant="outline"
              className={
                status === 'active'
                  ? 'bg-success/20 text-success border-success/20'
                  : 'bg-muted text-muted-foreground'
              }
            >
              {status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{address}</p>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Users size={20} className="text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Employees</div>
              <div className="font-medium">
                {employees.current} / {employees.total}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserRound size={20} className="text-warning" />
            <div>
              <div className="text-xs text-muted-foreground">Visitors</div>
              <div className="font-medium">
                {visitors.count}{' '}
                <span className="text-xs text-muted-foreground">
                  {visitors.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Package size={20} className="text-info" />
            <div>
              <div className="text-xs text-muted-foreground">Deliveries</div>
              <div className="font-medium">
                {deliveries.count}{' '}
                <span className="text-xs text-muted-foreground">
                  {deliveries.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between py-3">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Dashboard
          </Button>
          <Button variant="outline" size="sm">
            Check In/Out
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="px-2">
          <span className="sr-only">Manage</span>
          <span className="text-sm text-muted-foreground">Manage</span>
          <ChevronRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}
