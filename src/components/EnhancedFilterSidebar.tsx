import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import {
  MapPin,
  DollarSign,
  Home,
  Zap,
  Volume2,
  Users,
  TrendingUp,
  Train,
  School,
  Coffee,
  ShoppingBag,
  Heart,
  X,
} from 'lucide-react';

export interface PropertyFilters {
  location: string;
  priceMin: number;
  priceMax: number;
  sizeMin: number;
  sizeMax: number;
  bedrooms: string;
  bathrooms: string;
  propertyType: string[];
  lifestyle: string[];
  maxCommute: number;
  noiseLevel: number[];
  amenities: string[];
  demographics: string[];
  neighborhoodVibe: string[];
  affordabilityMax: number;
}

interface EnhancedFilterSidebarProps {
  onApplyFilters: (filters: PropertyFilters) => void;
  onClearFilters: () => void;
}

const lifestyleOptions = [
  'Quiet & Peaceful',
  'Family-Friendly',
  'Urban & Vibrant',
  'Suburban Comfort',
  'Nightlife & Entertainment',
  'Green & Eco-Friendly',
  'Pet-Friendly',
  'Arts & Culture',
  'Fitness & Wellness',
  'Tech Hub',
];

const amenityOptions = [
  'Parking',
  'Gym',
  'Pool',
  'Garden',
  'Concierge',
  'Security',
  'Playground',
  'Coworking Space',
  'Rooftop Terrace',
  'Pet Area',
  'Bike Storage',
  'EV Charging',
];

const demographicOptions = [
  'Young Professionals',
  'Families with Children',
  'Retirees',
  'Students',
  'International Community',
  'LGBTQ+ Friendly',
  'Artists & Creatives',
  'Diverse Community',
];

const vibeOptions = [
  'Trendy & Modern',
  'Historic & Charming',
  'Laid-back & Casual',
  'Upscale & Sophisticated',
  'Bohemian & Artistic',
  'Safe & Secure',
  'Community-Oriented',
  'Progressive & Liberal',
];

export function EnhancedFilterSidebar({ onApplyFilters, onClearFilters }: EnhancedFilterSidebarProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    location: '',
    priceMin: 0,
    priceMax: 1000000,
    sizeMin: 0,
    sizeMax: 5000,
    bedrooms: '',
    bathrooms: '',
    propertyType: [],
    lifestyle: [],
    maxCommute: 60,
    noiseLevel: [0, 50],
    amenities: [],
    demographics: [],
    neighborhoodVibe: [],
    affordabilityMax: 0,
  });

  const [selectedLifestyleCount, setSelectedLifestyleCount] = useState(0);
  const [refinedOptions, setRefinedOptions] = useState({
    lifestyle: lifestyleOptions,
    amenities: amenityOptions,
  });

  // Simulate dynamic refinement based on selections
  useEffect(() => {
    if (filters.lifestyle.includes('Family-Friendly')) {
      setRefinedOptions(prev => ({
        ...prev,
        amenities: amenityOptions.filter(a => 
          ['Playground', 'Garden', 'Security', 'Pool'].includes(a) || prev.amenities.includes(a)
        ),
      }));
    } else if (filters.lifestyle.includes('Urban & Vibrant')) {
      setRefinedOptions(prev => ({
        ...prev,
        amenities: amenityOptions.filter(a => 
          ['Gym', 'Concierge', 'Coworking Space', 'Rooftop Terrace'].includes(a) || prev.amenities.includes(a)
        ),
      }));
    } else {
      setRefinedOptions({
        lifestyle: lifestyleOptions,
        amenities: amenityOptions,
      });
    }
  }, [filters.lifestyle]);

  const updateFilter = <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: keyof PropertyFilters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as any);
  };

  const handleClear = () => {
    setFilters({
      location: '',
      priceMin: 0,
      priceMax: 1000000,
      sizeMin: 0,
      sizeMax: 5000,
      bedrooms: '',
      bathrooms: '',
      propertyType: [],
      lifestyle: [],
      maxCommute: 60,
      noiseLevel: [0, 50],
      amenities: [],
      demographics: [],
      neighborhoodVibe: [],
      affordabilityMax: 0,
    });
    onClearFilters();
  };

  const getNoiseDescription = (level: number) => {
    if (level <= 20) return 'Very Quiet';
    if (level <= 40) return 'Quiet';
    if (level <= 60) return 'Moderate';
    if (level <= 80) return 'Noisy';
    return 'Very Noisy';
  };

  const activeFilterCount = 
    (filters.location ? 1 : 0) +
    filters.propertyType.length +
    filters.lifestyle.length +
    filters.amenities.length +
    filters.demographics.length +
    filters.neighborhoodVibe.length;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3>Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear All
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4 pr-4">
          <Accordion type="multiple" defaultValue={['location', 'price', 'lifestyle']} className="space-y-2">
            {/* Location */}
            <AccordionItem value="location" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Input
                  placeholder="Enter city, neighborhood, or ZIP"
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                />
                <div className="text-xs text-gray-500">
                  GPS-based suggestions will appear as you type
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price & Size */}
            <AccordionItem value="price" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Price & Size</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <Label className="text-xs">Price Range</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin || ''}
                      onChange={(e) => updateFilter('priceMin', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax || ''}
                      onChange={(e) => updateFilter('priceMax', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Size (sq ft)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.sizeMin || ''}
                      onChange={(e) => updateFilter('sizeMin', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.sizeMax || ''}
                      onChange={(e) => updateFilter('sizeMax', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Bedrooms</Label>
                    <Select value={filters.bedrooms} onValueChange={(v) => updateFilter('bedrooms', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Bathrooms</Label>
                    <Select value={filters.bathrooms} onValueChange={(v) => updateFilter('bathrooms', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Lifestyle */}
            <AccordionItem value="lifestyle" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Lifestyle Preferences</span>
                  {filters.lifestyle.length > 0 && (
                    <Badge variant="secondary" className="ml-auto mr-2">
                      {filters.lifestyle.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 mb-3">
                    Select preferences to refine other options dynamically
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {refinedOptions.lifestyle.map((option) => (
                      <Badge
                        key={option}
                        variant={filters.lifestyle.includes(option) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleArrayFilter('lifestyle', option)}
                      >
                        {option}
                        {filters.lifestyle.includes(option) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Commute & Amenities */}
            <AccordionItem value="commute" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Train className="h-4 w-4" />
                  <span>Commute & Local Amenities</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-xs">Max Commute Time</Label>
                    <span className="text-xs text-gray-600">{filters.maxCommute} min</span>
                  </div>
                  <Slider
                    value={[filters.maxCommute]}
                    onValueChange={(v) => updateFilter('maxCommute', v[0])}
                    min={10}
                    max={90}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10 min</span>
                    <span>90 min</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs mb-2">Nearby Amenities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {refinedOptions.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant={filters.amenities.includes(amenity) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleArrayFilter('amenities', amenity)}
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Noise Level */}
            <AccordionItem value="noise" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <span>Noise Level</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">
                      {getNoiseDescription(filters.noiseLevel[0])} - {getNoiseDescription(filters.noiseLevel[1])}
                    </span>
                    <span className="text-xs text-gray-600">
                      {filters.noiseLevel[0]} - {filters.noiseLevel[1]}
                    </span>
                  </div>
                  <Slider
                    value={filters.noiseLevel}
                    onValueChange={(v) => updateFilter('noiseLevel', v as [number, number])}
                    min={0}
                    max={100}
                    step={10}
                    minStepsBetweenThumbs={1}
                  />
                  <div className="text-xs text-gray-500 space-y-1 mt-2">
                    <div>• 0-20: Very quiet, rural or residential</div>
                    <div>• 50: Moderate, typical suburban</div>
                    <div>• 100: Very noisy, airport/construction nearby</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Demographics & Vibe */}
            <AccordionItem value="demographics" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Demographics & Vibe</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <Label className="text-xs mb-2">Community Type</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {demographicOptions.map((demo) => (
                      <Badge
                        key={demo}
                        variant={filters.demographics.includes(demo) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleArrayFilter('demographics', demo)}
                      >
                        {demo}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs mb-2">Neighborhood Vibe</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {vibeOptions.map((vibe) => (
                      <Badge
                        key={vibe}
                        variant={filters.neighborhoodVibe.includes(vibe) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleArrayFilter('neighborhoodVibe', vibe)}
                      >
                        {vibe}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button className="w-full mt-4" onClick={() => onApplyFilters(filters)}>
            Apply Filters
          </Button>
        </div>
      </ScrollArea>
    </Card>
  );
}
