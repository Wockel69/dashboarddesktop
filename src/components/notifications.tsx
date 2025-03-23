import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Notification {
  id: string;
  type: 'system' | 'feature';
  title: string;
  message: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bell size={18} />
          <CardTitle>Notifications</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item notification-item-${notification.type}`}
          >
            <h4 className="font-medium mb-1">{notification.title}</h4>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <p>No new notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
