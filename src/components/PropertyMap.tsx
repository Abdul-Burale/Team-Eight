import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  address?: string;
  zoom?: number;
  height?: string;
}

export function PropertyMap({ 
  latitude, 
  longitude, 
  address, 
  zoom = 14,
  height = '400px' 
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    // Only load Leaflet on the client side
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
        // Initialize map
        const map = L.map(mapRef.current).setView([latitude, longitude], zoom);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Create custom icon
        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div style="
              background: #2563eb;
              width: 40px;
              height: 40px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg 
                style="transform: rotate(45deg); width: 20px; height: 20px;" 
                fill="white" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });

        // Add marker with slight random offset for privacy
        const offset = 0.002; // Approximately 200 meters
        const randomLat = latitude + (Math.random() - 0.5) * offset;
        const randomLng = longitude + (Math.random() - 0.5) * offset;

        const marker = L.marker([randomLat, randomLng], { icon: customIcon }).addTo(map);

        if (address) {
          marker.bindPopup(`
            <div style="padding: 8px;">
              <strong style="font-size: 14px;">${address}</strong>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Approximate location for privacy</p>
            </div>
          `);
        }

        leafletMapRef.current = map;
      }
    };

    loadLeaflet();

    // Cleanup
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, address]);

  return (
    <div className="relative rounded-lg overflow-hidden border">
      <div ref={mapRef} style={{ height, width: '100%' }} />
      <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-md shadow-md text-xs flex items-center gap-1.5">
        <MapPin className="h-3 w-3 text-blue-600" />
        <span className="text-gray-600">Approximate location</span>
      </div>
    </div>
  );
}
