import { useState } from 'react';
import { PropertyCard, Property } from './PropertyCard';
import { EnhancedFilterSidebar, PropertyFilters } from './EnhancedFilterSidebar';
import { AffordabilityCalculator } from './AffordabilityCalculator';
import { MultiPropertyMap } from './MultiPropertyMap';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LayoutGrid, List, Map, Calculator, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface SearchResultsProps {
  onNavigate: (page: string, propertyId?: number) => void;
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Modern Family Home',
    price: 450000,
    location: 'Harrogate, North Yorkshire',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    type: 'House',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'For Sale',
    description: 'Beautiful modern home in a quiet family-friendly neighborhood',
    amenities: ['Garage', 'Garden', 'Modern Kitchen'],
    commute: '25 min to Leeds city centre',
    schools: ['Harrogate Grammar School (Outstanding)', 'St Aidan\'s Primary (Good)'],
    neighborhood: 'Family-Friendly',
    noiseLevel: 18,
    demographics: ['Families with Children', 'Diverse Community'],
    vibe: ['Safe & Secure', 'Community-Oriented'],
    investmentScore: 85,
    rentalYield: 4.2,
    priceForcast: 'up',
    affordabilityMatch: 92,
    coordinates: { lat: 53.9921, lng: -1.5418 },
  },
  {
    id: 2,
    title: 'Luxury City Centre Apartment',
    price: 2200,
    location: 'Canary Wharf, London',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1619647787040-5583f41eb9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjI0MjA2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'For Rent',
    description: 'Luxury apartment with stunning Thames views',
    amenities: ['Gym', 'Pool', 'Concierge', 'Parking'],
    commute: '10 min to Bank station',
    neighborhood: 'Urban',
    noiseLevel: 65,
    demographics: ['Young Professionals', 'International Community'],
    vibe: ['Upscale & Sophisticated', 'Trendy & Modern'],
    investmentScore: 78,
    rentalYield: 5.8,
    priceForcast: 'stable',
    affordabilityMatch: 68,
    coordinates: { lat: 51.5045, lng: -0.0195 },
  },
  {
    id: 3,
    title: 'Cozy Suburban Home',
    price: 320000,
    location: 'Bristol, South West',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: 'House',
    image: 'https://images.unsplash.com/photo-1681249281123-323694ea0f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwZmFtaWx5JTIwaG9tZXxlbnwxfHx8fDE3NjIzMjkwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'For Sale',
    description: 'Charming home perfect for growing families',
    amenities: ['Backyard', 'Garage', 'Updated Kitchen'],
    commute: '30 min to Bristol city centre',
    schools: ['Redland Green School (Outstanding)', 'St Bonaventure\'s Primary (Good)'],
    neighborhood: 'Quiet',
    noiseLevel: 22,
    demographics: ['Families with Children', 'Retirees'],
    vibe: ['Laid-back & Casual', 'Safe & Secure'],
    investmentScore: 72,
    rentalYield: 3.9,
    priceForcast: 'stable',
    affordabilityMatch: 88,
    coordinates: { lat: 51.4545, lng: -2.5879 },
  },
  {
    id: 4,
    title: 'Victorian Townhouse',
    price: 525000,
    location: 'Notting Hill, London',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2000,
    type: 'Townhouse',
    image: 'https://images.unsplash.com/photo-1624343385944-b99336163b50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHRvd25ob3VzZXxlbnwxfHx8fDE3NjIzNjMwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'For Sale',
    description: 'Beautiful Victorian townhouse in vibrant neighbourhood',
    amenities: ['Rooftop Terrace', 'Original Features', 'Modern Kitchen'],
    commute: '15 min to Paddington',
    neighborhood: 'Urban',
    noiseLevel: 55,
    demographics: ['Young Professionals', 'Families with Children'],
    vibe: ['Trendy & Modern', 'Historic & Charming'],
    investmentScore: 88,
    rentalYield: 4.5,
    priceForcast: 'up',
    affordabilityMatch: 65,
    coordinates: { lat: 51.5074, lng: -0.1948 },
  },
  {
    id: 5,
    title: 'Spacious Family Home',
    price: 1950,
    location: 'Cambridge, East Anglia',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    type: 'House',
    image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvdXNlfGVufDF8fHx8MTc2MjM4OTg5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'For Rent',
    description: 'Large family home with beautiful garden near excellent schools',
    amenities: ['Garden', 'Garage', 'Fireplace', 'Study'],
    commute: '20 min to Cambridge station',
    schools: ['The Perse School (Outstanding)', 'Queen Edith Primary (Outstanding)'],
    neighborhood: 'Family-Friendly',
    noiseLevel: 15,
    demographics: ['Families with Children', 'Academics'],
    vibe: ['Safe & Secure', 'Community-Oriented'],
    investmentScore: 80,
    rentalYield: 4.8,
    priceForcast: 'up',
    affordabilityMatch: 78,
    coordinates: { lat: 52.2053, lng: 0.1218 },
  },
  {
    id: 6,
    title: 'Contemporary Waterfront Apartment',
    price: 385000,
    location: 'Salford Quays, Manchester',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1614622350812-96b09c78af77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI0MDk3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'For Sale',
    description: 'Stylish apartment with canal views and MediaCityUK proximity',
    amenities: ['Balcony', 'Pool', 'Gym', 'Concierge'],
    commute: '15 min to Manchester Piccadilly',
    neighborhood: 'Urban',
    noiseLevel: 45,
    demographics: ['Young Professionals', 'Media Workers'],
    vibe: ['Trendy & Modern', 'Arts & Culture'],
    investmentScore: 76,
    rentalYield: 5.2,
    priceForcast: 'stable',
    affordabilityMatch: 82,
    coordinates: { lat: 53.4723, lng: -2.2967 },
  },
];

export function SearchResults({ onNavigate }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [appliedFilters, setAppliedFilters] = useState<PropertyFilters | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  
  const handleViewDetails = (id: number) => {
    onNavigate('property', id);
  };

  const handleApplyFilters = (filters: PropertyFilters) => {
    setAppliedFilters(filters);
    // In a real app, this would filter the properties based on the filters
    // For now, we'll just log them
    console.log('Applied filters:', filters);
    
    // Simple filter example
    let filtered = mockProperties;
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.priceMax > 0) {
      filtered = filtered.filter(p => p.price <= filters.priceMax);
    }
    setFilteredProperties(filtered);
  };

  const handleClearFilters = () => {
    setAppliedFilters(null);
    setFilteredProperties(mockProperties);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2">Search Results</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Found {filteredProperties.length} properties matching your criteria</p>
          <div className="flex gap-2">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  Filters
                  {appliedFilters && <Badge className="ml-2">Active</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                <EnhancedFilterSidebar
                  onApplyFilters={handleApplyFilters}
                  onClearFilters={handleClearFilters}
                />
              </SheetContent>
            </Sheet>

            {/* Affordability Calculator */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">Affordability</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Affordability Calculator</DialogTitle>
                </DialogHeader>
                <AffordabilityCalculator />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="flex gap-6">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block w-80 shrink-0">
          <EnhancedFilterSidebar
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </aside>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select defaultValue="recommended">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="sqft">Square Footage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('map')}
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Map View */}
          {viewMode === 'map' && (
            <div className="mb-6">
              <MultiPropertyMap
                properties={filteredProperties}
                onSelectProperty={handleViewDetails}
              />
            </div>
          )}
          
          {/* Property Grid/List */}
          {viewMode !== 'map' && (
            <>
              {appliedFilters && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {appliedFilters.lifestyle.map((item) => (
                    <Badge key={item} variant="secondary" className="gap-1">
                      {item}
                      <X className="h-3 w-3 cursor-pointer" onClick={handleClearFilters} />
                    </Badge>
                  ))}
                  {appliedFilters.demographics.map((item) => (
                    <Badge key={item} variant="secondary" className="gap-1">
                      {item}
                      <X className="h-3 w-3 cursor-pointer" onClick={handleClearFilters} />
                    </Badge>
                  ))}
                </div>
              )}
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
