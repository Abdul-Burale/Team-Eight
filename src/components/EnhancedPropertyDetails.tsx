import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { RentalOfferFlow } from './RentalOfferFlow';
import { PropertyMap } from './PropertyMap';
import { 
  Bed, Bath, Maximize, MapPin, School, Car, TrendingUp, Home, Calculator,
  Volume2, Users, Heart, Share2, AlertCircle, CheckCircle2, Building, Zap
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';

interface EnhancedPropertyDetailsProps {
  propertyId: number;
  onNavigate: (page: string) => void;
}

export function EnhancedPropertyDetails({ propertyId, onNavigate }: EnhancedPropertyDetailsProps) {
  const [showRentalFlow, setShowRentalFlow] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Mock property data - in real app would fetch based on propertyId
  const property = {
    id: propertyId,
    title: 'Modern Family Home',
    price: 450000,
    monthlyRent: 1950, // For rental properties
    location: 'Harrogate, North Yorkshire',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    type: 'House',
    status: 'For Rent' as const,
    coordinates: { lat: 53.9921, lng: -1.5418 },
    description: 'This stunning modern home offers the perfect blend of style and functionality. With an open floor plan, high-end finishes, and a spacious backyard, this property is ideal for families looking for their dream home. The kitchen features state-of-the-art appliances, and the master suite includes a luxurious en-suite bathroom.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1681249281123-323694ea0f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwZmFtaWx5JTIwaG9tZXxlbnwxfHx8fDE3NjIzMjkwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1614622350812-96b09c78af77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI0MDk3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['2-Car Garage', 'Garden', 'Modern Kitchen', 'Hardwood Floors', 'Central AC', 'Pet-Friendly', 'Security System'],
    nearbyAmenities: {
      schools: ['Harrogate Grammar School - 0.5 miles (Outstanding)', 'St Aidan\'s CE Primary - 0.8 miles (Good)'],
      parks: ['Valley Gardens - 0.3 miles', 'Harlow Carr Gardens - 2 miles'],
      shops: ['Victoria Shopping Centre - 1 mile', 'Waitrose - 0.6 miles'],
      transport: ['Bus Stop - 0.2 miles', 'Harrogate Railway Station - 1.5 miles'],
      restaurants: ['The Ivy Harrogate - 0.8 miles', 'Norse Restaurant - 1 mile'],
      healthcare: ['Harrogate District Hospital - 2 miles', 'Starbeck Surgery - 0.5 miles'],
    },
    commute: {
      downtown: '25 min to Leeds',
      airport: '35 min to Leeds Bradford Airport',
      businessDistrict: '20 min to Harrogate town centre',
    },
    // New Enhanced Fields
    noiseLevel: 18,
    demographics: ['Families with Children', 'Young Professionals', 'Diverse Community'],
    vibe: ['Safe & Secure', 'Community-Oriented', 'Family-Friendly'],
    investmentScore: 85,
    rentalYield: 4.2,
    priceForcast: 'up' as const,
    priceForecastDetails: {
      currentValue: 450000,
      projected1Year: 472500,
      projected3Year: 513000,
      appreciation: '+5% annually',
    },
    affordabilityAnalysis: {
      monthlyMortgage: 1850,
      propertyTax: 175, // Council Tax Band E
      insurance: 45,
      hoaFees: 0,
      utilities: 180,
      totalMonthly: 2250,
      recommendedIncome: 6750,
      rentToIncomeRatio: 30,
    },
    aiInsights: [
      'This property is in a rapidly appreciating neighborhood',
      'Excellent school ratings make it ideal for families',
      'Low noise levels and safe environment',
      'Great investment potential with 4.2% rental yield',
      'Close proximity to major amenities and transport',
    ],
  };

  const getNoiseDescription = (level: number) => {
    if (level <= 20) return { label: 'Very Quiet', color: 'text-green-600', bg: 'bg-green-50' };
    if (level <= 50) return { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Noisy', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const noiseInfo = getNoiseDescription(property.noiseLevel);

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

      {/* Location Map */}
      {property.coordinates && (
        <div className="mb-8">
          <h2 className="mb-4">Location</h2>
          <PropertyMap
            latitude={property.coordinates.lat}
            longitude={property.coordinates.lng}
            address={property.location}
            height="450px"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSaved(!saved)}
                  >
                    <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-baseline gap-4 mb-6">
                <div className="text-3xl text-blue-600">
                  £{property.status === 'For Rent' ? property.monthlyRent.toLocaleString() : property.price.toLocaleString()}
                  {property.status === 'For Rent' && <span className="text-lg">/mo</span>}
                </div>
                <Badge className="bg-blue-600">{property.status}</Badge>
                {property.priceForcast && (
                  <Badge variant={property.priceForcast === 'up' ? 'default' : 'secondary'} className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {property.priceForcast}
                  </Badge>
                )}
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
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Different Information */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="lifestyle">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                  <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
                  <TabsTrigger value="investment">Investment</TabsTrigger>
                  <TabsTrigger value="affordability">Affordability</TabsTrigger>
                </TabsList>

                <TabsContent value="lifestyle" className="space-y-6 mt-4">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Commute Times
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Downtown</span>
                        <Badge variant="outline">{property.commute.downtown}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Airport</span>
                        <Badge variant="outline">{property.commute.airport}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Business District</span>
                        <Badge variant="outline">{property.commute.businessDistrict}</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-3">Nearby Amenities</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm flex items-center gap-2 mb-2">
                          <School className="h-4 w-4" /> Schools
                        </p>
                        <div className="space-y-1 text-sm text-gray-600 ml-6">
                          {property.nearbyAmenities.schools.map((school, i) => (
                            <p key={i}>• {school}</p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4" /> Shopping & Dining
                        </p>
                        <div className="space-y-1 text-sm text-gray-600 ml-6">
                          {property.nearbyAmenities.shops.map((shop, i) => (
                            <p key={i}>• {shop}</p>
                          ))}
                          {property.nearbyAmenities.restaurants.map((rest, i) => (
                            <p key={i}>• {rest}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="neighborhood" className="space-y-6 mt-4">
                  <div className={`p-4 rounded-lg ${noiseInfo.bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="flex items-center gap-2">
                        <Volume2 className={`h-4 w-4 ${noiseInfo.color}`} />
                        Noise Level
                      </h4>
                      <Badge variant="outline" className={noiseInfo.color}>
                        {noiseInfo.label}
                      </Badge>
                    </div>
                    <Progress value={property.noiseLevel} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">
                      Score: {property.noiseLevel}/100 - Perfect for those seeking a peaceful environment
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Community Demographics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {property.demographics.map((demo, i) => (
                        <Badge key={i} variant="secondary">{demo}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Neighborhood Vibe
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {property.vibe.map((v, i) => (
                        <Badge key={i}>{v}</Badge>
                      ))}
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>AI Insight:</strong> This neighborhood has a strong sense of community with 
                      regular neighborhood events and active social groups.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="investment" className="space-y-6 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Investment Score</p>
                      <p className="text-2xl">{property.investmentScore}/100</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Rental Yield</p>
                      <p className="text-2xl">{property.rentalYield}%</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3">Price Forecast</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Current Value</span>
                        <span>£{property.priceForecastDetails.currentValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Projected (1 Year)</span>
                        <span className="text-green-600">
                          £{property.priceForecastDetails.projected1Year.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Projected (3 Years)</span>
                        <span className="text-green-600">
                          £{property.priceForecastDetails.projected3Year.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Appreciation Rate</span>
                        <Badge className="bg-green-600">
                          {property.priceForecastDetails.appreciation}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Market Analysis:</strong> This property is in a high-growth area with 
                      strong rental demand and consistent property value appreciation.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="affordability" className="space-y-6 mt-4">
                  <Alert>
                    <Calculator className="h-4 w-4" />
                    <AlertDescription>
                      Based on standard financial guidelines, here's what you need to afford this property:
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="mb-3">Monthly Costs Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Mortgage Payment</span>
                        <span>£{property.affordabilityAnalysis.monthlyMortgage.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Council Tax</span>
                        <span>£{property.affordabilityAnalysis.propertyTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Insurance</span>
                        <span>£{property.affordabilityAnalysis.insurance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Estimated Utilities</span>
                        <span>£{property.affordabilityAnalysis.utilities.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total Monthly</span>
                        <span className="text-xl">£{property.affordabilityAnalysis.totalMonthly.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Recommended Monthly Income</p>
                    <p className="text-2xl">£{property.affordabilityAnalysis.recommendedIncome.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      (Based on 30% rent-to-income ratio)
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2">AI Insights</h4>
                    <div className="space-y-2">
                      {property.aiInsights.map((insight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - Actions */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4">Interested in this property?</h3>
              
              {property.status === 'For Rent' ? (
                <Button 
                  className="w-full mb-3"
                  onClick={() => setShowRentalFlow(true)}
                >
                  Make Rental Offer
                </Button>
              ) : (
                <Button className="w-full mb-3">
                  Schedule Viewing
                </Button>
              )}
              
              <Button variant="outline" className="w-full mb-3">
                Contact Agent
              </Button>
              
              <Button variant="outline" className="w-full">
                Get Pre-Approved
              </Button>
            </CardContent>
          </Card>

          {/* Agent Card */}
          <Card>
            <CardContent className="p-6">
              <h4 className="mb-4">Listed By</h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p>Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Licensed Agent</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 (555) 123-4567</p>
                <p>✉️ sarah@realestate.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rental Offer Dialog */}
      <Dialog open={showRentalFlow} onOpenChange={setShowRentalFlow}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Submit Rental Application</DialogTitle>
          </DialogHeader>
          <RentalOfferFlow
            propertyId={property.id}
            monthlyRent={property.monthlyRent}
            propertyTitle={property.title}
            onClose={() => setShowRentalFlow(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
