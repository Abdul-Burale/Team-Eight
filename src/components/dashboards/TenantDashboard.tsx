import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Home, Bell, Heart, Calendar, MessageSquare } from 'lucide-react';

interface TenantDashboardProps {
  onNavigate: (page: string) => void;
}

export function TenantDashboard({ onNavigate }: TenantDashboardProps) {
  const savedProperties = [
    { id: 1, name: 'Luxury Downtown Apartment', price: '$3,200/mo', status: 'Available' },
    { id: 2, name: 'Cozy Suburban Home', price: '$2,800/mo', status: 'Available' },
  ];

  const scheduledViewings = [
    { id: 1, property: 'Luxury Downtown Apartment', date: 'Nov 15, 2025', time: '2:00 PM' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Tenant Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your property search.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Saved Properties</span>
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl">{savedProperties.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Alerts</span>
              <Bell className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Scheduled Viewings</span>
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-3xl">{scheduledViewings.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Saved Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedProperties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="mb-1">{property.name}</div>
                  <div className="text-sm text-gray-600">{property.price}</div>
                </div>
                <Badge className="bg-green-600">{property.status}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => onNavigate('search')}>
              View All Properties
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Viewings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scheduledViewings.length > 0 ? (
              scheduledViewings.map((viewing) => (
                <div key={viewing.id} className="p-3 border rounded-lg">
                  <div className="mb-2">{viewing.property}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📅 {viewing.date}</span>
                    <span>🕐 {viewing.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No upcoming viewings scheduled</p>
            )}
            <Button variant="outline" className="w-full">
              Schedule a Viewing
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span>Agent: Jane Doe</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600">
                The property viewing for tomorrow at 2 PM is confirmed. Looking forward to meeting you!
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-3">
            View All Messages
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <Home className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="mb-2">Find Your Perfect Rental</h3>
            <p className="text-sm text-gray-600 mb-4">
              Browse thousands of rental properties in your desired location
            </p>
            <Button onClick={() => onNavigate('search')}>Start Searching</Button>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <Bell className="h-10 w-10 text-purple-600 mb-3" />
            <h3 className="mb-2">Set Up Smart Alerts</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get notified when new properties match your preferences
            </p>
            <Button onClick={() => onNavigate('alerts')} variant="outline">
              Manage Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
