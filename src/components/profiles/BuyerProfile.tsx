import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Home, TrendingUp, FileText, CheckCircle, Clock, XCircle,
  DollarSign, Calendar, MessageSquare, Download, MapPin, 
  Building, Mail, Phone, Calculator, PoundSterling, Target,
  ChartBar, Settings, AlertCircle, Eye, Heart, Search
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BuyerProfileProps {
  onNavigate: (page: string, propertyId?: number) => void;
}

export function BuyerProfile({ onNavigate }: BuyerProfileProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showCalculatorDialog, setShowCalculatorDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Sample data
  const myOffers = [
    {
      id: 1,
      propertyTitle: 'Georgian Townhouse',
      location: 'Bristol',
      askingPrice: 485000,
      offerAmount: 475000,
      offerDate: '2025-01-22',
      status: 'Under Consideration',
      seller: 'Heritage Homes Ltd',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    },
    {
      id: 2,
      propertyTitle: 'Modern Apartment',
      location: 'Manchester',
      askingPrice: 295000,
      offerAmount: 290000,
      offerDate: '2025-01-18',
      status: 'Accepted',
      seller: 'City Living Estates',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
    },
    {
      id: 3,
      propertyTitle: 'Detached House',
      location: 'Cambridge',
      askingPrice: 625000,
      offerAmount: 600000,
      offerDate: '2025-01-15',
      status: 'Rejected',
      seller: 'Prime Properties',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    }
  ];

  const savedProperties = [
    {
      id: 4,
      title: 'Victorian Semi-Detached',
      location: 'Harrogate',
      price: 425000,
      bedrooms: 4,
      bathrooms: 2,
      sqft: 1850,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      priceChange: 'down',
      priceChangeAmount: 10000
    },
    {
      id: 5,
      title: 'Luxury Flat',
      location: 'London',
      price: 650000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      priceChange: 'up',
      priceChangeAmount: 15000
    }
  ];

  const purchaseProgress = {
    propertyTitle: 'Modern Apartment',
    location: 'Manchester',
    price: 290000,
    seller: 'City Living Estates',
    currentStage: 3,
    stages: [
      { id: 1, name: 'Offer Made', status: 'completed', date: '2025-01-18' },
      { id: 2, name: 'Offer Accepted', status: 'completed', date: '2025-01-20' },
      { id: 3, name: 'Mortgage Application', status: 'in-progress', date: '2025-01-22' },
      { id: 4, name: 'Survey & Valuation', status: 'pending', date: null },
      { id: 5, name: 'Legal Process', status: 'pending', date: null },
      { id: 6, name: 'Exchange Contracts', status: 'pending', date: null },
      { id: 7, name: 'Completion', status: 'pending', date: null }
    ]
  };

  const investmentInsights = {
    averageROI: 8.5,
    rentalYield: 4.2,
    capitalGrowth: 6.8,
    marketTrend: 'rising'
  };

  const messages = [
    {
      id: 1,
      from: 'City Living Estates',
      subject: 'Survey Scheduled',
      preview: 'Your property survey has been scheduled for...',
      date: '2025-01-24',
      unread: true
    },
    {
      id: 2,
      from: 'Mortgage Advisor',
      subject: 'Application Update',
      preview: 'Your mortgage application is progressing well...',
      date: '2025-01-23',
      unread: true
    }
  ];

  const handleMakeOffer = (property: any) => {
    setSelectedProperty(property);
    setShowOfferDialog(true);
  };

  const handleSubmitOffer = () => {
    toast.success('Offer submitted successfully!');
    setShowOfferDialog(false);
  };

  const handleWithdrawOffer = (offerId: number) => {
    toast.info('Offer withdrawn');
  };

  const handleCounterOffer = (offerId: number) => {
    toast.info('Counter offer submitted');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2">Buyer Portal</h1>
        <p className="text-gray-600">Manage your property purchases, offers, and investments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="offers">My Offers</TabsTrigger>
          <TabsTrigger value="saved">Saved Properties</TabsTrigger>
          <TabsTrigger value="purchase">Purchase Tracker</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Active Offers</span>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-3xl mb-1">
                  {myOffers.filter(o => o.status === 'Under Consideration').length}
                </div>
                <p className="text-xs text-gray-600">Awaiting response</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Properties Saved</span>
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div className="text-3xl mb-1">{savedProperties.length}</div>
                <p className="text-xs text-gray-600">Favorites</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Avg. ROI Potential</span>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl mb-1">{investmentInsights.averageROI}%</div>
                <p className="text-xs text-gray-600">Based on saved properties</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Offer Acceptance Rate</span>
                  <Target className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-3xl mb-1">50%</div>
                <p className="text-xs text-gray-600">1 of 2 accepted</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  onClick={() => onNavigate('search')}
                >
                  <Search className="h-6 w-6" />
                  <span>Search Properties</span>
                </Button>
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setShowCalculatorDialog(true)}
                >
                  <Calculator className="h-6 w-6" />
                  <span>Mortgage Calculator</span>
                </Button>
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => onNavigate('market')}
                >
                  <ChartBar className="h-6 w-6" />
                  <span>Market Intelligence</span>
                </Button>
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setActiveTab('saved')}
                >
                  <Heart className="h-6 w-6" />
                  <span>Saved Properties</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Investment Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Investment Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Average ROI</span>
                  </div>
                  <div className="text-2xl text-green-600">{investmentInsights.averageROI}%</div>
                  <div className="text-xs text-gray-600">Expected annual return</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <PoundSterling className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Rental Yield</span>
                  </div>
                  <div className="text-2xl text-blue-600">{investmentInsights.rentalYield}%</div>
                  <div className="text-xs text-gray-600">Potential rental income</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <ChartBar className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Capital Growth</span>
                  </div>
                  <div className="text-2xl text-purple-600">{investmentInsights.capitalGrowth}%</div>
                  <div className="text-xs text-gray-600">Expected appreciation</div>
                </div>
              </div>

              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  The market is currently <strong>{investmentInsights.marketTrend}</strong>. 
                  This is a {investmentInsights.marketTrend === 'rising' ? 'good' : 'challenging'} time to invest.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Offers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {myOffers.slice(0, 3).map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="mb-1">{offer.propertyTitle}</div>
                      <div className="text-sm text-gray-600">£{offer.offerAmount.toLocaleString()}</div>
                    </div>
                    <Badge 
                      className={
                        offer.status === 'Accepted' 
                          ? 'bg-green-600' 
                          : offer.status === 'Rejected'
                          ? 'bg-red-600'
                          : 'bg-yellow-600'
                      }
                    >
                      {offer.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="mb-1">{property.title}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          £{property.price.toLocaleString()}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={property.priceChange === 'down' ? 'text-green-600' : 'text-red-600'}
                        >
                          {property.priceChange === 'down' ? '↓' : '↑'} £{property.priceChangeAmount.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* My Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="mb-1">My Offers</h2>
              <p className="text-sm text-gray-600">Track and manage your property offers</p>
            </div>
            <Button onClick={() => onNavigate('search')} className="gap-2">
              <Search className="h-4 w-4" />
              Find More Properties
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Asking Price</TableHead>
                    <TableHead>Your Offer</TableHead>
                    <TableHead>Offer Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myOffers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 rounded overflow-hidden">
                            <ImageWithFallback
                              src={offer.image}
                              alt={offer.propertyTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div>{offer.propertyTitle}</div>
                            <div className="text-xs text-gray-600">{offer.seller}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{offer.location}</TableCell>
                      <TableCell>£{offer.askingPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <div>
                          <div>£{offer.offerAmount.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">
                            {((1 - offer.offerAmount / offer.askingPrice) * 100).toFixed(1)}% below asking
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{offer.offerDate}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            offer.status === 'Accepted' 
                              ? 'bg-green-600' 
                              : offer.status === 'Rejected'
                              ? 'bg-red-600'
                              : 'bg-yellow-600'
                          }
                        >
                          {offer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          {offer.status === 'Under Consideration' && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleCounterOffer(offer.id)}>
                                Revise Offer
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600"
                                onClick={() => handleWithdrawOffer(offer.id)}
                              >
                                Withdraw
                              </Button>
                            </>
                          )}
                          {offer.status === 'Accepted' && (
                            <Button size="sm" onClick={() => setActiveTab('purchase')}>
                              View Progress
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => onNavigate('property', offer.id)}>
                            View Property
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Properties Tab */}
        <TabsContent value="saved" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="mb-1">Saved Properties</h2>
              <p className="text-sm text-gray-600">Properties you're interested in</p>
            </div>
            <Button onClick={() => onNavigate('search')} className="gap-2">
              <Search className="h-4 w-4" />
              Browse More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-2 right-2 bg-white/90"
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                  {property.priceChange && (
                    <Badge 
                      className={`absolute top-2 left-2 ${
                        property.priceChange === 'down' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {property.priceChange === 'down' ? '↓' : '↑'} £{property.priceChangeAmount.toLocaleString()}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2">{property.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </div>

                  <div className="mb-3">
                    <span className="text-2xl text-blue-600">£{property.price.toLocaleString()}</span>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    {property.bedrooms} bed • {property.bathrooms} bath • {property.sqft} sqft
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => onNavigate('property', property.id)}>
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleMakeOffer(property)}
                    >
                      Make Offer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Purchase Tracker Tab */}
        <TabsContent value="purchase" className="space-y-6">
          <div>
            <h2 className="mb-1">Purchase Progress Tracker</h2>
            <p className="text-sm text-gray-600">Track your property purchase journey</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{purchaseProgress.propertyTitle}</CardTitle>
                  <CardDescription>{purchaseProgress.location}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-blue-600">£{purchaseProgress.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{purchaseProgress.seller}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Overall Progress</span>
                  <span className="text-sm text-gray-600">
                    Stage {purchaseProgress.currentStage} of {purchaseProgress.stages.length}
                  </span>
                </div>
                <Progress value={(purchaseProgress.currentStage / purchaseProgress.stages.length) * 100} />
              </div>

              <Separator />

              <div className="space-y-4">
                {purchaseProgress.stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          stage.status === 'completed' 
                            ? 'bg-green-600' 
                            : stage.status === 'in-progress'
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                        }`}
                      >
                        {stage.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : stage.status === 'in-progress' ? (
                          <Clock className="h-5 w-5 text-white animate-pulse" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      {index < purchaseProgress.stages.length - 1 && (
                        <div 
                          className={`w-0.5 h-12 ${
                            stage.status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div>{stage.name}</div>
                          {stage.date && (
                            <div className="text-sm text-gray-600">{stage.date}</div>
                          )}
                        </div>
                        <Badge 
                          variant={
                            stage.status === 'completed' 
                              ? 'default' 
                              : stage.status === 'in-progress'
                              ? 'default'
                              : 'outline'
                          }
                          className={
                            stage.status === 'completed'
                              ? 'bg-green-600'
                              : stage.status === 'in-progress'
                              ? 'bg-blue-600'
                              : ''
                          }
                        >
                          {stage.status === 'completed' 
                            ? 'Complete' 
                            : stage.status === 'in-progress'
                            ? 'In Progress'
                            : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Contact Agent
                </Button>
                <Button variant="outline">View Documents</Button>
                <Button variant="outline">Track Mortgage</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="mb-1">Messages</h2>
              <p className="text-sm text-gray-600">Communicate with sellers and agents</p>
            </div>
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              New Message
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          {message.from.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span>{message.from}</span>
                            {message.unread && (
                              <Badge className="bg-blue-600 text-xs">New</Badge>
                            )}
                          </div>
                          <div className="text-sm">{message.subject}</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{message.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-12">{message.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div>
            <h2 className="mb-1">Buyer Settings</h2>
            <p className="text-sm text-gray-600">Manage your preferences and buying criteria</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Purchase Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Maximum Budget (£)</Label>
                  <Input type="number" defaultValue="500000" />
                </div>
                <div>
                  <Label>Available Deposit (£)</Label>
                  <Input type="number" defaultValue="100000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Locations</Label>
                  <Input defaultValue="London, Manchester, Bristol" />
                </div>
                <div>
                  <Label>Property Type</Label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="flat">Flat/Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Bedrooms</Label>
                  <Input type="number" defaultValue="2" />
                </div>
                <div>
                  <Label>Purchase Timeline</Label>
                  <Select defaultValue="3-6">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="3-6">3-6 months</SelectItem>
                      <SelectItem value="6-12">6-12 months</SelectItem>
                      <SelectItem value="1year+">1+ year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div>Offer Status Updates</div>
                  <div className="text-sm text-gray-600">Get notified when offer status changes</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>Price Drop Alerts</div>
                  <div className="text-sm text-gray-600">Notifications when saved properties reduce price</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>New Listings</div>
                  <div className="text-sm text-gray-600">Alert for properties matching your criteria</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Make Offer Dialog */}
      <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Make an Offer</DialogTitle>
            <DialogDescription>
              Submit an offer for {selectedProperty?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Asking price: £{selectedProperty?.price.toLocaleString()}
              </AlertDescription>
            </Alert>

            <div>
              <Label>Your Offer Amount (£)</Label>
              <Input 
                type="number" 
                placeholder={selectedProperty?.price} 
                defaultValue={selectedProperty?.price * 0.95}
              />
              <p className="text-xs text-gray-600 mt-1">
                Consider offering 5-10% below asking price for negotiation room
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Deposit Available (£)</Label>
                <Input type="number" defaultValue="100000" />
              </div>
              <div>
                <Label>Mortgage Pre-Approval</Label>
                <Select defaultValue="yes">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Pre-Approved</SelectItem>
                    <SelectItem value="process">In Process</SelectItem>
                    <SelectItem value="no">Not Yet</SelectItem>
                    <SelectItem value="cash">Cash Buyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Proposed Completion Date</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>Additional Terms or Comments</Label>
              <Textarea 
                placeholder="Any special conditions or information the seller should know..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowOfferDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitOffer}>
                Submit Offer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mortgage Calculator Dialog */}
      <Dialog open={showCalculatorDialog} onOpenChange={setShowCalculatorDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mortgage & Affordability Calculator</DialogTitle>
            <DialogDescription>
              Calculate your mortgage payments and affordability
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Property Price (£)</Label>
                <Input type="number" defaultValue="300000" />
              </div>
              <div>
                <Label>Deposit (£)</Label>
                <Input type="number" defaultValue="60000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Interest Rate (%)</Label>
                <Input type="number" step="0.1" defaultValue="4.5" />
              </div>
              <div>
                <Label>Mortgage Term (years)</Label>
                <Input type="number" defaultValue="25" />
              </div>
            </div>

            <Separator />

            <div className="p-4 bg-blue-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span>£240,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="text-xl">£1,337</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total to Repay:</span>
                <span>£401,100</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Annual Income (£)</Label>
                <Input type="number" defaultValue="65000" />
              </div>
              <div>
                <Label>Monthly Debts (£)</Label>
                <Input type="number" defaultValue="500" />
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Based on your income, you can comfortably afford this property. 
                Your debt-to-income ratio is healthy at 28%.
              </AlertDescription>
            </Alert>

            <Button className="w-full">Get Mortgage Quote</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
