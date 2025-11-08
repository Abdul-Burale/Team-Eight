import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Separator } from './ui/separator';
import { Bed, Bath, Maximize, MapPin, School, Car, TrendingUp, Home, Calculator } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyDetailsProps {
  propertyId: number;
  onNavigate: (page: string) => void;
}

export function PropertyDetails({ propertyId, onNavigate }: PropertyDetailsProps) {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [affordability, setAffordability] = useState<number | null>(null);
  
  // Mock property data - in real app would fetch based on propertyId
  const property = {
    id: propertyId,
    title: 'Modern Family Home',
    price: 450000,
    location: 'Suburban Heights, CA',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    type: 'House',
    status: 'For Sale',
    description: 'This stunning modern home offers the perfect blend of style and functionality. With an open floor plan, high-end finishes, and a spacious backyard, this property is ideal for families looking for their dream home. The kitchen features state-of-the-art appliances, and the master suite includes a luxurious en-suite bathroom.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1681249281123-323694ea0f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwZmFtaWx5JTIwaG9tZXxlbnwxfHx8fDE3NjIzMjkwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1614622350812-96b09c78af77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI0MDk3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['2-Car Garage', 'Garden', 'Modern Kitchen', 'Hardwood Floors', 'Central AC'],
    nearbyAmenities: {
      schools: ['Lincoln Elementary School - 0.5 miles (9/10 rating)', 'Valley High School - 1.2 miles (8/10 rating)'],
      parks: ['Suburban Park - 0.3 miles', 'Community Recreation Center - 0.8 miles'],
      shops: ['Suburban Mall - 2 miles', 'Whole Foods Market - 1.5 miles'],
      transport: ['Bus Stop - 0.2 miles', 'Metro Station - 3 miles'],
    },
    commute: {
      downtown: '25 minutes',
      airport: '35 minutes',
      businessDistrict: '20 minutes',
    },
    neighborhood: 'Family-Friendly',
    neighborhoodVibe: 'Quiet suburban area with tree-lined streets, excellent schools, and a strong sense of community.',
  };
  
  const calculateAffordability = () => {
    const income = parseFloat(monthlyIncome);
    const down = parseFloat(downPayment);
    
    if (income && down) {
      const loanAmount = property.price - down;
      const monthlyPayment = (loanAmount * 0.004) / (1 - Math.pow(1 + 0.004, -360)); // Assuming 4.8% APR, 30 years
      const ratio = (monthlyPayment / income) * 100;
      setAffordability(ratio);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => onNavigate('search')} className="mb-6">
        ← Back to Search
      </Button>
      
      {/* Image Gallery */}
      <div className="mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {property.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Property Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-5 w-5" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <Badge className="bg-blue-600">{property.status}</Badge>
              </div>
              
              <div className="text-3xl text-blue-600 mb-6">
                ${property.price.toLocaleString()}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                    <div>{property.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                    <div>{property.bathrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Square Feet</div>
                    <div>{property.sqft}</div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="mb-3">Description</h3>
                <p className="text-gray-600">{property.description}</p>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lifestyle Matching */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Lifestyle Matching
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-2 flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Commute Times
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• Downtown: {property.commute.downtown}</p>
                  <p>• Airport: {property.commute.airport}</p>
                  <p>• Business District: {property.commute.businessDistrict}</p>
                </div>
              </div>
              
              <div>
                <h4 className="mb-2">Neighborhood Vibe</h4>
                <p className="text-sm text-gray-600">{property.neighborhoodVibe}</p>
                <Badge className="mt-2">{property.neighborhood}</Badge>
              </div>
              
              <div>
                <h4 className="mb-2 flex items-center gap-2">
                  <School className="h-4 w-4" />
                  Nearby Schools
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {property.nearbyAmenities.schools.map((school, index) => (
                    <p key={index}>• {school}</p>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="mb-2">Parks & Recreation</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {property.nearbyAmenities.parks.map((park, index) => (
                    <p key={index}>• {park}</p>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="mb-2">Shopping & Dining</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {property.nearbyAmenities.shops.map((shop, index) => (
                    <p key={index}>• {shop}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Affordability Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Affordability Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="income">Monthly Income ($)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="e.g., 8000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="downpayment">Down Payment ($)</Label>
                <Input
                  id="downpayment"
                  type="number"
                  placeholder="e.g., 90000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateAffordability} className="w-full">
                Calculate Affordability
              </Button>
              
              {affordability !== null && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Monthly Payment to Income Ratio</div>
                  <div className="text-2xl text-blue-600 mb-2">{affordability.toFixed(1)}%</div>
                  <p className="text-sm text-gray-600">
                    {affordability <= 28 
                      ? '✓ This property is well within your budget' 
                      : affordability <= 36
                      ? '⚠ This property is at the upper limit of your budget'
                      : '✗ This property may be outside your comfortable budget'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4">Interested in this property?</h3>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => onNavigate('legal')}>
                  Make an Offer
                </Button>
                <Button variant="outline" className="w-full" onClick={() => onNavigate('contact')}>
                  Contact Agent
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule a Tour
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Investment Potential */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Investment Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">5-Year Appreciation Forecast</div>
                  <div className="text-xl text-green-600">+12.5%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Estimated Rental Yield</div>
                  <div className="text-xl">4.2%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Market Trend</div>
                  <Badge className="bg-green-600">Growing</Badge>
                </div>
              </div>
              <Button variant="link" className="w-full mt-4" onClick={() => onNavigate('market')}>
                View Full Market Analysis →
              </Button>
            </CardContent>
          </Card>
          
          {/* Agent Info */}
          <Card>
            <CardContent className="p-6">
              <h4 className="mb-3">Property Agent</h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  JD
                </div>
                <div>
                  <div>Jane Doe</div>
                  <div className="text-sm text-gray-600">Licensed Agent</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📞 (555) 123-4567</p>
                <p>✉️ jane.doe@homematch.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
