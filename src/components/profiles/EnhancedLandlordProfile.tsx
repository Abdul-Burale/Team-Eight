import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PropertyListingForm } from '../PropertyListingForm';
import { PropertyQRCode } from '../PropertyQRCode';
import { 
  Building, DollarSign, TrendingUp, Plus, FileText, 
  Home, Bell, CheckCircle, XCircle, Eye,
  Edit, Trash, MapPin, Bed, Bath, Square,
  MessageSquare, QrCode, RefreshCw, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface EnhancedLandlordProfileProps {
  onNavigate: (page: string, propertyId?: any) => void;
}

export function EnhancedLandlordProfile({ onNavigate }: EnhancedLandlordProfileProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewListingDialog, setShowNewListingDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  // State for backend data
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    occupiedProperties: 0,
    pendingOffers: 0,
    monthlyRevenue: 0,
  });
  const [properties, setProperties] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('supabase_access_token');
      
      if (!accessToken) {
        toast.error('Please sign in to view your dashboard');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/dashboard/landlord`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setStats(data.stats);
      setProperties(data.properties);
      setOffers(data.recentOffers.filter((o: any) => o.status === 'pending'));
    } catch (error: any) {
      console.error('Error fetching dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch properties
  const fetchProperties = async () => {
    try {
      const accessToken = localStorage.getItem('supabase_access_token');
      
      if (!accessToken) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/properties/landlord`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties);
      }
    } catch (error: any) {
      console.error('Error fetching properties:', error);
    }
  };

  // Fetch offers
  const fetchOffers = async () => {
    try {
      const accessToken = localStorage.getItem('supabase_access_token');
      
      if (!accessToken) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/offers/landlord`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOffers(data.offers);
      }
    } catch (error: any) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchOffers();
  }, []);

  const handlePropertyCreated = (property: any) => {
    setShowNewListingDialog(false);
    fetchDashboardData();
    fetchProperties();
    toast.success('Property created successfully!');
  };

  const handlePropertyUpdated = (property: any) => {
    setShowEditDialog(false);
    setSelectedProperty(null);
    fetchDashboardData();
    fetchProperties();
    toast.success('Property updated successfully!');
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    try {
      const accessToken = localStorage.getItem('supabase_access_token');
      
      if (!accessToken) {
        toast.error('Please sign in');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/properties/${propertyId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete property');
      }

      toast.success('Property deleted successfully');
      fetchDashboardData();
      fetchProperties();
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast.error(error.message || 'Failed to delete property');
    }
  };

  const handleAcceptOffer = async (offerId: string) => {
    try {
      const accessToken = localStorage.getItem('supabase_access_token');
      
      if (!accessToken) {
        toast.error('Please sign in');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/offers/${offerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: 'accepted' }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to accept offer');
      }

      toast.success('Offer accepted! Contract generation initiated.');
      fetchDashboardData();
      fetchOffers();
    } catch (error: any) {
      console.error('Error accepting offer:', error);
      toast.error(error.message || 'Failed to accept offer');
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    if (!confirm('Are you sure you want to reject this offer?')) {
      return;
    }

    try {
      const accessToken = localStorage.getItem('supabase_access_token');
      
      if (!accessToken) {
        toast.error('Please sign in');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/offers/${offerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: 'rejected' }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to reject offer');
      }

      toast.success('Offer rejected and applicant notified.');
      fetchDashboardData();
      fetchOffers();
    } catch (error: any) {
      console.error('Error rejecting offer:', error);
      toast.error(error.message || 'Failed to reject offer');
    }
  };

  const handleViewQRCode = (property: any) => {
    setSelectedProperty(property);
    setShowQRDialog(true);
  };

  const handleEditProperty = (property: any) => {
    setSelectedProperty(property);
    setShowEditDialog(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="mb-2">Landlord Portal</h1>
          <p className="text-gray-600">Manage your properties, tenants, and rental income</p>
        </div>
        <Button onClick={() => fetchDashboardData()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="offers">Rental Offers</TabsTrigger>
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
                  <span className="text-sm text-gray-600">Active Listings</span>
                  <Home className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl mb-1">{stats.activeListings}</div>
                <p className="text-xs text-gray-600">Available for rent</p>
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
                  <span>Review Applications ({stats.pendingOffers})</span>
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

          {/* Recent Offers */}
          {offers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {offers.slice(0, 3).map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="mb-1">{offer.applicantName}</div>
                      <div className="text-sm text-gray-600">{offer.propertyTitle}</div>
                      <div className="text-xs text-gray-500">£{offer.offerAmount}/mo</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptOffer(offer.id)} className="bg-green-600">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRejectOffer(offer.id)}>
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
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

          {properties.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="mb-2">No Properties Yet</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Start by creating your first property listing
                </p>
                <Button onClick={() => setShowNewListingDialog(true)}>
                  Create First Listing
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative h-48 bg-gray-200">
                    {property.images && property.images.length > 0 ? (
                      <ImageWithFallback
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        property.status === 'rented' 
                          ? 'bg-green-600' 
                          : property.status === 'available'
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
                      {property.sqft && (
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          {property.sqft} sqft
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <span className="text-2xl text-blue-600">£{property.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>

                    {property.tenantName && (
                      <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                        <div className="text-gray-600">Current Tenant:</div>
                        <div>{property.tenantName}</div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 gap-1"
                        onClick={() => onNavigate('property', property.id)}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1"
                        onClick={() => handleViewQRCode(property)}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1 text-red-600"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Rental Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <div>
            <h2 className="mb-1">Rental Offer Management</h2>
            <p className="text-sm text-gray-600">Review and respond to tenant applications</p>
          </div>

          {offers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="mb-2">No Pending Offers</h3>
                <p className="text-sm text-gray-600">
                  You'll see tenant applications here when they apply for your properties
                </p>
              </CardContent>
            </Card>
          ) : (
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
                    {offers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell>
                          <div>
                            <div>{offer.applicantName}</div>
                            <div className="text-xs text-gray-600">{offer.applicantEmail}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              Applied: {new Date(offer.createdAt).toLocaleDateString()}
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
                        <TableCell>{offer.moveInDate || 'Flexible'}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{offer.employmentStatus}</div>
                            {offer.annualIncome > 0 && (
                              <div className="text-xs text-gray-600">£{offer.annualIncome.toLocaleString()}/yr</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={offer.status === 'pending' ? 'outline' : 'secondary'}>
                            {offer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {offer.status === 'pending' && (
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
                                className="text-red-600"
                                onClick={() => handleRejectOffer(offer.id)}
                              >
                                <XCircle className="h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div>
            <h2 className="mb-1">Messages</h2>
            <p className="text-sm text-gray-600">Communicate with tenants and applicants</p>
          </div>

          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="mb-2">No Messages Yet</h3>
              <p className="text-sm text-gray-600">
                Messages from tenants and applicants will appear here
              </p>
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
                  <div>Offer Status Updates</div>
                  <div className="text-sm text-gray-600">Get notified when offers are accepted or rejected</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Listing Dialog */}
      <Dialog open={showNewListingDialog} onOpenChange={setShowNewListingDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Property Listing</DialogTitle>
            <DialogDescription>
              Add a new rental property to your portfolio
            </DialogDescription>
          </DialogHeader>
          <PropertyListingForm
            onSuccess={handlePropertyCreated}
            onCancel={() => setShowNewListingDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property Listing</DialogTitle>
            <DialogDescription>
              Update your property details
            </DialogDescription>
          </DialogHeader>
          <PropertyListingForm
            editMode={true}
            existingProperty={selectedProperty}
            onSuccess={handlePropertyUpdated}
            onCancel={() => {
              setShowEditDialog(false);
              setSelectedProperty(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Property QR Code</DialogTitle>
            <DialogDescription>
              Share this QR code to promote your property
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <PropertyQRCode
              propertyId={selectedProperty.id}
              propertyTitle={selectedProperty.title}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
