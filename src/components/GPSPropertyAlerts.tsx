import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { MapPin, Navigation, Bell, CheckCircle2, AlertCircle } from 'lucide-react';
import { Property } from './PropertyCard';

interface GPSPropertyAlertsProps {
  onViewProperty: (propertyId: number) => void;
}

export function GPSPropertyAlerts({ onViewProperty }: GPSPropertyAlertsProps) {
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyProperties, setNearbyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (gpsEnabled) {
      enableGPS();
    }
  }, [gpsEnabled]);

  const enableGPS = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchNearbyProperties(position.coords.latitude, position.coords.longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
      alert('Geolocation is not supported by your browser');
    }
  };

  const fetchNearbyProperties = (lat: number, lng: number) => {
    // Simulate fetching nearby properties
    // In a real app, this would call an API with the coordinates
    const mockNearbyProperties: Property[] = [
      {
        id: 7,
        title: 'Nearby Modern Condo',
        price: 2800,
        location: '0.5 miles from your location',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1100,
        type: 'Condo',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
        status: 'For Rent',
        noiseLevel: 35,
        demographics: ['Young Professionals'],
        vibe: ['Urban & Vibrant'],
        affordabilityMatch: 85,
      },
      {
        id: 8,
        title: 'Cozy Apartment',
        price: 2200,
        location: '0.8 miles from your location',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 750,
        type: 'Apartment',
        image: 'https://images.unsplash.com/photo-1619647787040-5583f41eb9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjI0MjA2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        status: 'For Rent',
        noiseLevel: 42,
        demographics: ['Students', 'Young Professionals'],
        vibe: ['Affordable', 'Transit-Friendly'],
        affordabilityMatch: 92,
      },
    ];
    setNearbyProperties(mockNearbyProperties);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          GPS Property Alerts
        </CardTitle>
        <CardDescription>
          Get notified about properties near your current location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="gps">Enable GPS Alerts</Label>
            <p className="text-sm text-gray-500">
              Receive real-time notifications for nearby properties
            </p>
          </div>
          <Switch
            id="gps"
            checked={gpsEnabled}
            onCheckedChange={setGpsEnabled}
          />
        </div>

        {loading && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Getting your location...</AlertDescription>
          </Alert>
        )}

        {gpsEnabled && location && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              GPS enabled! Watching for properties near you.
            </AlertDescription>
          </Alert>
        )}

        {nearbyProperties.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Nearby Properties
              </h4>
              <Badge>{nearbyProperties.length} found</Badge>
            </div>

            {nearbyProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="mb-1">{property.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">
                          ${property.price.toLocaleString()}/mo
                        </Badge>
                        <Badge variant="outline">
                          {property.bedrooms} bed
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => onViewProperty(property.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {gpsEnabled && nearbyProperties.length === 0 && !loading && (
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>
              No properties found near your current location. We'll notify you when new listings appear!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
