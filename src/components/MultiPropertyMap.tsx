import { useEffect, useRef, useState } from 'react';
import { Property } from './PropertyCard';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Bed, Bath, Maximize } from 'lucide-react';

interface MultiPropertyMapProps {
  properties: Property[];
  onSelectProperty: (propertyId: number) => void;
  height?: string;
}

export function MultiPropertyMap({ 
  properties, 
  onSelectProperty,
  height = '600px' 
}: MultiPropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadLeaflet = async () => {
      // @ts-ignore
      const L = await import('leaflet');
      
      // Add Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (mapRef.current && !leafletMapRef.current) {
        // Initialize map - centered on UK
        const map = L.map(mapRef.current).setView([53.8, -1.5], 6);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        leafletMapRef.current = map;
      }

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add markers for each property
      if (leafletMapRef.current && properties.length > 0) {
        const bounds: any[] = [];

        properties.forEach((property) => {
          if (property.coordinates) {
            const { lat, lng } = property.coordinates;
            bounds.push([lat, lng]);

            // Create price marker icon
            const priceLabel = property.status === 'For Rent' 
              ? `£${property.price.toLocaleString()}/mo`
              : `£${property.price.toLocaleString()}`;

            const markerIcon = L.divIcon({
              className: 'custom-price-marker',
              html: `
                <div style="
                  background: white;
                  padding: 6px 12px;
                  border-radius: 20px;
                  border: 2px solid #2563eb;
                  font-weight: 600;
                  font-size: 12px;
                  color: #2563eb;
                  white-space: nowrap;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                  cursor: pointer;
                  transition: all 0.2s;
                ">
                  ${priceLabel}
                </div>
              `,
              iconSize: [100, 30],
              iconAnchor: [50, 15],
            });

            const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(leafletMapRef.current);

            marker.on('click', () => {
              setSelectedProperty(property);
            });

            markersRef.current.push(marker);
          }
        });

        // Fit map to show all markers
        if (bounds.length > 0) {
          leafletMapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    };

    loadLeaflet();

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [properties]);

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height, width: '100%' }} className="rounded-lg overflow-hidden border" />
      
      {/* Property Card Overlay */}
      {selectedProperty && (
        <div className="absolute top-4 right-4 w-80 max-h-[calc(100%-2rem)] overflow-y-auto">
          <Card className="shadow-xl">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-white hover:bg-gray-100 rounded-full h-8 w-8"
                onClick={() => setSelectedProperty(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-600">
                      {selectedProperty.status}
                    </Badge>
                    {selectedProperty.affordabilityMatch && selectedProperty.affordabilityMatch >= 80 && (
                      <Badge className="bg-green-600">Great Match</Badge>
                    )}
                  </div>
                  <h3 className="mb-1">{selectedProperty.title}</h3>
                  <p className="text-sm text-gray-600">{selectedProperty.location}</p>
                </div>

                <div className="text-2xl text-blue-600">
                  £{selectedProperty.price.toLocaleString()}
                  {selectedProperty.status === 'For Rent' && '/mo'}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{selectedProperty.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{selectedProperty.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{selectedProperty.sqft} sqft</span>
                  </div>
                </div>

                {selectedProperty.commute && (
                  <p className="text-sm text-gray-600">🚗 {selectedProperty.commute}</p>
                )}

                <Button 
                  className="w-full"
                  onClick={() => onSelectProperty(selectedProperty.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
