import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Bell, Home, DollarSign, MapPin, Trash2 } from 'lucide-react';
import { GPSPropertyAlerts } from './GPSPropertyAlerts';

interface Alert {
  id: number;
  name: string;
  criteria: string;
  enabled: boolean;
  matches: number;
}

export function SmartAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      name: 'Family Home in Suburbs',
      criteria: '3+ bedrooms, Suburban Heights, $400k-$500k',
      enabled: true,
      matches: 3,
    },
    {
      id: 2,
      name: 'Downtown Apartments',
      criteria: '2 bedrooms, Downtown area, For Rent',
      enabled: true,
      matches: 7,
    },
    {
      id: 3,
      name: 'Investment Properties',
      criteria: 'Any type, High rental yield, Under $300k',
      enabled: false,
      matches: 2,
    },
  ]);
  
  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };
  
  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleViewProperty = (propertyId: number) => {
    // This would navigate to the property details page
    window.location.href = `#property-${propertyId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2">Smart Alerts</h1>
        <p className="text-gray-600">Get notified when properties matching your preferences become available</p>
      </div>
      
      <div className="space-y-6">
        {/* GPS Property Alerts */}
        <GPSPropertyAlerts onViewProperty={handleViewProperty} />

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Your Active Alerts
              </span>
              <Badge>{alerts.filter(a => a.enabled).length} Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No alerts configured yet</p>
                <p className="text-sm">Create your first alert below</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{alert.name}</h3>
                        {alert.matches > 0 && (
                          <Badge variant="outline" className="bg-blue-50">
                            {alert.matches} new
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{alert.criteria}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={alert.enabled}
                            onCheckedChange={() => toggleAlert(alert.id)}
                          />
                          <span className="text-sm text-gray-600">
                            {alert.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAlert(alert.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        
        {/* Create New Alert */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="alertName">Alert Name</Label>
              <Input
                id="alertName"
                placeholder="e.g., Family Home in Suburbs"
              />
            </div>
            
            <Separator />
            
            <h4>Search Criteria</h4>
            
            <div>
              <Label htmlFor="alertLocation" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="alertLocation"
                placeholder="City, neighborhood, or zip code"
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alertMinPrice" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Min Price
                </Label>
                <Input
                  id="alertMinPrice"
                  type="number"
                  placeholder="e.g., 300000"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="alertMaxPrice">Max Price</Label>
                <Input
                  id="alertMaxPrice"
                  type="number"
                  placeholder="e.g., 500000"
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alertBedrooms" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Min Bedrooms
                </Label>
                <Input
                  id="alertBedrooms"
                  type="number"
                  placeholder="e.g., 3"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="alertBathrooms">Min Bathrooms</Label>
                <Input
                  id="alertBathrooms"
                  type="number"
                  placeholder="e.g., 2"
                  className="mt-2"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="alertType">Property Type</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">House</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Apartment</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Condo</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Townhouse</span>
                </label>
              </div>
            </div>
            
            <Separator />
            
            <h4>Notification Settings</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Email Notifications</div>
                  <div className="text-xs text-gray-600">Receive alerts via email</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Push Notifications</div>
                  <div className="text-xs text-gray-600">Receive browser notifications</div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Daily Digest</div>
                  <div className="text-xs text-gray-600">Summary of new matches once per day</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <Separator />
            
            <Button className="w-full">Create Alert</Button>
          </CardContent>
        </Card>
        
        {/* Alert Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div>Global Notifications</div>
                <div className="text-sm text-gray-600">Enable all alert notifications</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <div>Price Drop Alerts</div>
                <div className="text-sm text-gray-600">Get notified when prices decrease</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div>New Listing Alerts</div>
                <div className="text-sm text-gray-600">Get notified of new properties</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div>Open House Reminders</div>
                <div className="text-sm text-gray-600">Reminders for scheduled viewings</div>
              </div>
              <Switch />
            </div>
            
            <Separator />
            
            <Button variant="outline" className="w-full">Clear All Notifications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
