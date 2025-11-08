import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bed, Bath, Maximize, MapPin, Volume2, TrendingUp, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  image: string;
  status: 'For Sale' | 'For Rent';
  description?: string;
  amenities?: string[];
  commute?: string;
  schools?: string[];
  neighborhood?: string;
  // New fields
  noiseLevel?: number;
  demographics?: string[];
  vibe?: string[];
  investmentScore?: number;
  rentalYield?: number;
  priceForcast?: 'up' | 'stable' | 'down';
  affordabilityMatch?: number; // 0-100 score based on user's budget
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: number) => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const getNoiseColor = (level?: number) => {
    if (!level) return 'text-gray-500';
    if (level <= 20) return 'text-green-600';
    if (level <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNoiseLabel = (level?: number) => {
    if (!level) return 'N/A';
    if (level <= 20) return 'Very Quiet';
    if (level <= 40) return 'Quiet';
    if (level <= 60) return 'Moderate';
    if (level <= 80) return 'Noisy';
    return 'Very Noisy';
  };

  return (
    <TooltipProvider>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative overflow-hidden h-48">
          <ImageWithFallback
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 right-2 bg-blue-600">
            {property.status}
          </Badge>
          {property.affordabilityMatch !== undefined && property.affordabilityMatch >= 80 && (
            <Badge className="absolute top-2 left-2 bg-green-600">
              Great Match
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-blue-600 text-2xl">
              ${property.price.toLocaleString()}
              {property.status === 'For Rent' && '/mo'}
            </span>
            {property.priceForcast && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant={property.priceForcast === 'up' ? 'default' : 'secondary'} className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {property.priceForcast}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price forecast: {property.priceForcast === 'up' ? 'Increasing' : property.priceForcast === 'stable' ? 'Stable' : 'Decreasing'}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          <h3 className="mb-2">{property.title}</h3>
          
          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{property.location}</span>
          </div>
          
          <div className="flex items-center gap-4 text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span className="text-sm">{property.sqft} sqft</span>
            </div>
          </div>

          {/* New Info Row */}
          <div className="flex items-center gap-3 text-xs mb-2">
            {property.noiseLevel !== undefined && (
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <Volume2 className={`h-3 w-3 ${getNoiseColor(property.noiseLevel)}`} />
                    <span className={getNoiseColor(property.noiseLevel)}>{getNoiseLabel(property.noiseLevel)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Noise Level: {property.noiseLevel}/100</p>
                </TooltipContent>
              </Tooltip>
            )}
            {property.commute && (
              <span className="text-gray-500">🚗 {property.commute}</span>
            )}
          </div>

          {/* Demographics & Vibe */}
          {(property.demographics || property.vibe) && (
            <div className="flex flex-wrap gap-1 mb-2">
              {property.demographics?.slice(0, 1).map((demo, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {demo}
                </Badge>
              ))}
              {property.vibe?.slice(0, 1).map((v, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {v}
                </Badge>
              ))}
            </div>
          )}

          {property.rentalYield !== undefined && (
            <div className="text-xs text-gray-600">
              Rental Yield: <span className="text-green-600 font-semibold">{property.rentalYield}%</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            onClick={() => onViewDetails(property.id)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
