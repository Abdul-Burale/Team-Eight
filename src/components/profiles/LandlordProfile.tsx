import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Building, DollarSign, Users, TrendingUp, Plus, FileText, 
  Home, Mail, Bell, CheckCircle, XCircle, Clock, Eye,
  Edit, Trash, MapPin, Bed, Bath, Square, Calendar,
  MessageSquare, Download, Upload, QrCode, Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LandlordProfileProps {
  onNavigate: (page: string, propertyId?: number) => void;
}

export function LandlordProfile({ onNavigate }: LandlordProfileProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewListingDialog, setShowNewListingDialog] = useState(false);

  // Sample data - in real app, fetch from backend
  const stats = {
    totalProperties: 8,
    occupied: 6,
    pendingOffers: 3,
    monthlyRevenue: 18500
  };

  const properties = [
    { 
      id: 1, 
      title: 'Modern Flat in Canary Wharf',
      location: 'London',
      rent: 1950,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 950,
      status: 'Rented',
      tenant: 'Sarah Johnson',
      leaseEnd: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
    },
    { 
      id: 2, 
      title: 'Victorian Terrace House',
      location: 'Harrogate',
      rent: 2200,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1400,
      status: 'Available',
      tenant: null,
      leaseEnd: null,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994'
    },
    { 
      id: 3, 
      title: 'Luxury Apartment',
      location: 'Manchester',
      rent: 1750,
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      status: 'Rented',
      tenant: 'Michael Chen',
      leaseEnd: '2025-09-15',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
    }
  ];

  const rentalOffers = [
    {
      id: 1,
      propertyTitle: 'Victorian Terrace House',
      applicantName: 'Emma Thompson',
      applicantEmail: 'emma.t@email.com',
      offerAmount: 2200,
      leaseTerm: 12,
      moveInDate: '2025-03-01',
      status: 'Pending',
      appliedDate: '2025-01-15',
      employmentStatus: 'Full-time',
      annualIncome: 65000,
      references: 2
    },
    {
      id: 2,
      propertyTitle: 'Victorian Terrace House',
      applicantName: 'David Wilson',
      applicantEmail: 'david.w@email.com',
      offerAmount: 2150,
      leaseTerm: 18,
      moveInDate: '2025-02-15',
      status: 'Pending',
      appliedDate: '2025-01-18',
      employmentStatus: 'Full-time',
      annualIncome: 58000,
      references: 3
    },
    {
      id: 3,
      propertyTitle: 'Modern Flat in Canary Wharf',
      applicantName: 'Sophie Martin',
      applicantEmail: 'sophie.m@email.com',
      offerAmount: 1950,
      leaseTerm: 12,
      moveInDate: '2025-04-01',
      status: 'Under Review',
      appliedDate: '2025-01-20',
      employmentStatus: 'Self-employed',
      annualIncome: 72000,
      references: 2
    }
  ];

  const contracts = [
    {
      id: 1,
      propertyTitle: 'Modern Flat in Canary Wharf',
      tenant: 'Sarah Johnson',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      monthlyRent: 1950,
      deposit: 3900,
      status: 'Active',
      signed: true
    },
    {
      id: 2,
      propertyTitle: 'Luxury Apartment',
      tenant: 'Michael Chen',
      startDate: '2024-09-15',
      endDate: '2025-09-15',
      monthlyRent: 1750,
      deposit: 3500,
      status: 'Active',
      signed: true
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'Sarah Johnson',
      subject: 'Heating Issue',
      preview: 'The heating in the living room has stopped working...',
      date: '2025-01-25',
      unread: true
    },
    {
      id: 2,
      from: 'Emma Thompson',
      subject: 'Viewing Request',
      preview: 'Would it be possible to schedule a viewing for...',
      date: '2025-01-24',
      unread: true
    },
    {
      id: 3,
      from: 'Michael Chen',
      subject: 'Lease Renewal',
      preview: 'I would like to discuss renewing my lease...',
      date: '2025-01-22',
      unread: false
    }
  ];

  const handleAcceptOffer = (offerId: number) => {
    toast.success('Offer accepted! Contract generation initiated.');
  };

  const handleRejectOffer = (offerId: number) => {
    toast.error('Offer rejected and applicant notified.');
  };

  const handleCounterOffer = (offerId: number) => {
    toast.info('Counter offer form opened');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2">Landlord Portal</h1>
        <p className="text-gray-600">Manage your properties, tenants, and rental income</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="offers">Rental Offers</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
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
                  <span className="text-sm text-gray-600">Total Properties</span>
                  <Building className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-3xl mb-1">{stats.totalProperties}</div>
                <p className="text-xs text-gray-600">Active listings</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Occupied</span>
                  <Home className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl mb-1">{stats.occupied}</div>
                <p className="text-xs text-gray-600">{Math.round((stats.occupied / stats.totalProperties) * 100)}% occupancy rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pending Offers</span>
                  <FileText className="h-5 w-5 text-orange-500" />
                </div>
                <div className="text-3xl mb-1">{stats.pendingOffers}</div>
                <p className="text-xs text-gray-600">Awaiting review</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                  <DollarSign className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-2xl mb-1">£{stats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-gray-600">Current rental income</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  onClick={() => setShowNewListingDialog(true)}
                >
                  <Plus className="h-6 w-6" />
                  <span>Create New Listing</span>
                </Button>
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setActiveTab('offers')}
                >
                  <FileText className="h-6 w-6" />
                  <span>Review Applications</span>
                </Button>
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => onNavigate('market')}
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>Market Intelligence</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rentalOffers.slice(0, 3).map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="mb-1">{offer.applicantName}</div>
                      <div className="text-sm text-gray-600">{offer.propertyTitle}</div>
                    </div>
                    <Badge variant="outline">{offer.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Lease Renewals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contracts.map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="mb-1">{contract.tenant}</div>
                      <div className="text-sm text-gray-600">Expires {contract.endDate}</div>
                    </div>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="mb-1">My Property Listings</h2>
              <p className="text-sm text-gray-600">Manage your rental properties</p>
            </div>
            <Button onClick={() => setShowNewListingDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Listing
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      property.status === 'Rented' 
                        ? 'bg-green-600' 
                        : property.status === 'Available'
                        ? 'bg-blue-600'
                        : 'bg-yellow-600'
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2">{property.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      {property.sqft} sqft
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-2xl text-blue-600">£{property.rent}</span>
                    <span className="text-gray-600">/month</span>
                  </div>

                  {property.tenant && (
                    <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                      <div className="text-gray-600">Current Tenant:</div>
                      <div>{property.tenant}</div>
                      <div className="text-xs text-gray-600">Lease until {property.leaseEnd}</div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rental Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <div>
            <h2 className="mb-1">Rental Offer Management</h2>
            <p className="text-sm text-gray-600">Review and respond to tenant applications</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Offer Amount</TableHead>
                    <TableHead>Move-In Date</TableHead>
                    <TableHead>Employment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rentalOffers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>
                        <div>
                          <div>{offer.applicantName}</div>
                          <div className="text-xs text-gray-600">{offer.applicantEmail}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Applied: {offer.appliedDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{offer.propertyTitle}</TableCell>
                      <TableCell>
                        <div>
                          <div>£{offer.offerAmount}/mo</div>
                          <div className="text-xs text-gray-600">{offer.leaseTerm} months</div>
                        </div>
                      </TableCell>
                      <TableCell>{offer.moveInDate}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{offer.employmentStatus}</div>
                          <div className="text-xs text-gray-600">£{offer.annualIncome.toLocaleString()}/yr</div>
                          <div className="text-xs text-gray-600">{offer.references} refs</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={offer.status === 'Pending' ? 'outline' : 'secondary'}>
                          {offer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            className="gap-1 bg-green-600"
                            onClick={() => handleAcceptOffer(offer.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCounterOffer(offer.id)}
                          >
                            Counter
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600"
                            onClick={() => handleRejectOffer(offer.id)}
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
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

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <div>
            <h2 className="mb-1">Contract & Deposit Management</h2>
            <p className="text-sm text-gray-600">Manage active leases and security deposits</p>
          </div>

          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>
              All deposits are held securely by a government-approved deposit protection scheme.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{contract.propertyTitle}</CardTitle>
                      <CardDescription>Tenant: {contract.tenant}</CardDescription>
                    </div>
                    <Badge className={contract.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'}>
                      {contract.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Lease Period</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-4 w-4" />
                        {contract.startDate} to {contract.endDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Monthly Rent</div>
                      <div className="text-lg mt-1">£{contract.monthlyRent}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Deposit Held</div>
                      <div className="text-lg mt-1">£{contract.deposit}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Contract Status</div>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Digitally Signed
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download Contract
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Contact Tenant
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <FileText className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div>
            <h2 className="mb-1">Messages</h2>
            <p className="text-sm text-gray-600">Communicate with tenants and applicants</p>
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
            <h2 className="mb-1">Landlord Settings</h2>
            <p className="text-sm text-gray-600">Manage your account preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div>New Rental Applications</div>
                  <div className="text-sm text-gray-600">Receive notifications for new tenant applications</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>Contract Expiry Alerts</div>
                  <div className="text-sm text-gray-600">Get reminded 60 days before lease expiration</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>Maintenance Requests</div>
                  <div className="text-sm text-gray-600">Instant alerts for tenant maintenance requests</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Business Name</Label>
                  <Input defaultValue="Premier Properties Ltd" />
                </div>
                <div>
                  <Label>Contact Number</Label>
                  <Input defaultValue="+44 20 1234 5678" />
                </div>
              </div>
              <div>
                <Label>Business Address</Label>
                <Input defaultValue="123 Property Lane, London, UK" />
              </div>
              <Button>Update Information</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Listing Dialog */}
      <Dialog open={showNewListingDialog} onOpenChange={setShowNewListingDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Property Listing</DialogTitle>
            <DialogDescription>
              Add a new rental property to your portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Property Title</Label>
                <Input placeholder="e.g., Modern 2-Bed Flat" />
              </div>
              <div>
                <Label>Property Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="bungalow">Bungalow</SelectItem>
                    <SelectItem value="cottage">Cottage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Full Address</Label>
              <Input placeholder="Street, City, Postcode" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Bedrooms</Label>
                <Input type="number" min="0" placeholder="2" />
              </div>
              <div>
                <Label>Bathrooms</Label>
                <Input type="number" min="0" step="0.5" placeholder="1" />
              </div>
              <div>
                <Label>Square Feet</Label>
                <Input type="number" placeholder="850" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Monthly Rent (£)</Label>
                <Input type="number" placeholder="1500" />
              </div>
              <div>
                <Label>Deposit (£)</Label>
                <Input type="number" placeholder="3000" />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea 
                placeholder="Describe your property, amenities, and any special features..." 
                rows={4}
              />
            </div>

            <div>
              <Label>Property Images</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowNewListingDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success('Property listing created successfully!');
                setShowNewListingDialog(false);
              }}>
                Create Listing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
