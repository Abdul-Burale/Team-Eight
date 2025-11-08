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
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Home, Search, FileText, CheckCircle, Clock, XCircle,
  CreditCard, Calendar, Bell, MessageSquare, Download,
  Upload, MapPin, DollarSign, User, Building, Mail,
  Phone, Briefcase, Receipt, AlertCircle, Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TenantProfileProps {
  onNavigate: (page: string, propertyId?: number) => void;
}

export function TenantProfile({ onNavigate }: TenantProfileProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Sample data
  const applications = [
    {
      id: 1,
      propertyTitle: 'Modern Flat in Canary Wharf',
      location: 'London',
      rent: 1950,
      landlord: 'Premier Properties Ltd',
      appliedDate: '2025-01-20',
      status: 'Under Review',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
    },
    {
      id: 2,
      propertyTitle: 'Victorian Terrace House',
      location: 'Harrogate',
      rent: 2200,
      landlord: 'Heritage Homes',
      appliedDate: '2025-01-15',
      status: 'Accepted',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994'
    },
    {
      id: 3,
      propertyTitle: 'Studio Apartment',
      location: 'Manchester',
      rent: 1200,
      landlord: 'City Living Estates',
      appliedDate: '2025-01-10',
      status: 'Rejected',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
    }
  ];

  const currentLease = {
    propertyTitle: 'Modern Flat in Canary Wharf',
    address: '45 Riverside Walk, London E14 3TD',
    landlord: 'Premier Properties Ltd',
    landlordEmail: 'contact@premierprops.co.uk',
    landlordPhone: '+44 20 1234 5678',
    monthlyRent: 1950,
    deposit: 3900,
    leaseStart: '2024-03-01',
    leaseEnd: '2025-02-28',
    daysUntilExpiry: 33
  };

  const paymentHistory = [
    { id: 1, date: '2025-01-01', amount: 1950, type: 'Rent', status: 'Paid', method: 'Direct Debit' },
    { id: 2, date: '2024-12-01', amount: 1950, type: 'Rent', status: 'Paid', method: 'Direct Debit' },
    { id: 3, date: '2024-11-01', amount: 1950, type: 'Rent', status: 'Paid', method: 'Direct Debit' },
    { id: 4, date: '2024-03-01', amount: 3900, type: 'Deposit', status: 'Held', method: 'Bank Transfer' }
  ];

  const messages = [
    {
      id: 1,
      from: 'Premier Properties Ltd',
      subject: 'Lease Renewal Offer',
      preview: 'We would like to offer you a lease renewal...',
      date: '2025-01-24',
      unread: true
    },
    {
      id: 2,
      from: 'Maintenance Team',
      subject: 'Repair Completed',
      preview: 'Your heating repair has been completed...',
      date: '2025-01-22',
      unread: false
    }
  ];

  const savedProperties = [
    {
      id: 4,
      title: 'Luxury Apartment',
      location: 'Bristol',
      rent: 1800,
      bedrooms: 2,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    },
    {
      id: 5,
      title: 'Garden Cottage',
      location: 'Cambridge',
      rent: 1650,
      bedrooms: 3,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    }
  ];

  const handleApplyToProperty = (property: any) => {
    setSelectedProperty(property);
    setShowApplicationDialog(true);
  };

  const handleSubmitApplication = () => {
    toast.success('Application submitted successfully!');
    setShowApplicationDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2">Tenant Portal</h1>
        <p className="text-gray-600">Manage your rental applications, leases, and payments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="lease">Current Lease</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Current Lease Alert */}
          {currentLease.daysUntilExpiry < 60 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your lease expires in {currentLease.daysUntilExpiry} days ({currentLease.leaseEnd}). 
                Consider renewing or searching for a new property.
              </AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Active Applications</span>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-3xl mb-1">
                  {applications.filter(a => a.status === 'Under Review').length}
                </div>
                <p className="text-xs text-gray-600">Pending review</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Current Rent</span>
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl mb-1">£{currentLease.monthlyRent}</div>
                <p className="text-xs text-gray-600">Per month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Lease Expiry</span>
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <div className="text-xl mb-1">{currentLease.daysUntilExpiry} days</div>
                <p className="text-xs text-gray-600">Until renewal</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Saved Properties</span>
                  <Home className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-3xl mb-1">{savedProperties.length}</div>
                <p className="text-xs text-gray-600">Favorites</p>
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
                  onClick={() => onNavigate('search')}
                >
                  <Search className="h-6 w-6" />
                  <span>Search Properties</span>
                </Button>
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setActiveTab('payments')}
                >
                  <CreditCard className="h-6 w-6" />
                  <span>Pay Rent</span>
                </Button>
                <Button 
                  className="h-24 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Contact Landlord</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Lease Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Current Lease</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-1">{currentLease.propertyTitle}</h3>
                <p className="text-sm text-gray-600">{currentLease.address}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Monthly Rent</div>
                  <div className="text-xl">£{currentLease.monthlyRent}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Lease Period</div>
                  <div>{currentLease.leaseStart} to {currentLease.leaseEnd}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Deposit Held</div>
                  <div className="text-xl">£{currentLease.deposit}</div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Lease Progress</span>
                  <span className="text-sm text-gray-600">
                    {currentLease.daysUntilExpiry} days remaining
                  </span>
                </div>
                <Progress value={85} />
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Renew Lease</Button>
                <Button variant="outline">Contact Landlord</Button>
                <Button variant="outline">View Contract</Button>
              </div>
            </CardContent>
          </Card>

          {/* Saved Properties */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Saved Properties</CardTitle>
                <Button variant="outline" size="sm" onClick={() => onNavigate('search')}>
                  Browse More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedProperties.map((property) => (
                  <div key={property.id} className="border rounded-lg overflow-hidden">
                    <div className="h-40">
                      <ImageWithFallback
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="mb-1">{property.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        {property.location}
                      </div>
                      <div className="mb-3">
                        <span className="text-xl text-blue-600">£{property.rent}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => onNavigate('property', property.id)}>
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleApplyToProperty(property)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="mb-1">My Applications</h2>
              <p className="text-sm text-gray-600">Track the status of your rental applications</p>
            </div>
            <Button onClick={() => onNavigate('search')} className="gap-2">
              <Search className="h-4 w-4" />
              Find Properties
            </Button>
          </div>

          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={application.image}
                        alt={application.propertyTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="mb-1">{application.propertyTitle}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {application.location}
                          </div>
                        </div>
                        <Badge 
                          className={
                            application.status === 'Accepted' 
                              ? 'bg-green-600' 
                              : application.status === 'Rejected'
                              ? 'bg-red-600'
                              : 'bg-yellow-600'
                          }
                        >
                          {application.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Monthly Rent</div>
                          <div className="text-lg">£{application.rent}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Landlord</div>
                          <div>{application.landlord}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Applied Date</div>
                          <div>{application.appliedDate}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {application.status === 'Under Review' && (
                          <>
                            <Button size="sm" variant="outline">Edit Application</Button>
                            <Button size="sm" variant="outline" className="text-red-600">Withdraw</Button>
                          </>
                        )}
                        {application.status === 'Accepted' && (
                          <>
                            <Button size="sm" className="bg-green-600">Sign Lease</Button>
                            <Button size="sm" variant="outline">Contact Landlord</Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Current Lease Tab */}
        <TabsContent value="lease" className="space-y-6">
          <div>
            <h2 className="mb-1">Current Lease Agreement</h2>
            <p className="text-sm text-gray-600">View and manage your active lease</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{currentLease.propertyTitle}</CardTitle>
              <CardDescription>{currentLease.address}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3">Lease Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span>{currentLease.leaseStart}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span>{currentLease.leaseEnd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rent:</span>
                      <span>£{currentLease.monthlyRent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit:</span>
                      <span>£{currentLease.deposit}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3">Landlord Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Building className="h-4 w-4 text-gray-600 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600">Company</div>
                        <div>{currentLease.landlord}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-600 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div>{currentLease.landlordEmail}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-600 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600">Phone</div>
                        <div>{currentLease.landlordPhone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-3">Lease Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span>Tenancy Agreement.pdf</span>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span>Deposit Protection.pdf</span>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Contact Landlord
                </Button>
                <Button variant="outline">Request Renewal</Button>
                <Button variant="outline">Report Maintenance Issue</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <div>
            <h2 className="mb-1">Payment Management</h2>
            <p className="text-sm text-gray-600">View payment history and manage rent payments</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Next Payment Due</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">February 2025 Rent</span>
                    <Badge>Due Soon</Badge>
                  </div>
                  <div className="text-3xl mb-2">£{currentLease.monthlyRent}</div>
                  <div className="text-sm text-gray-600">Due: 2025-02-01</div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4>Payment Method</h4>
                  <div className="p-3 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <div>Direct Debit</div>
                        <div className="text-sm text-gray-600">Automatic monthly payment</div>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>

                <Button className="w-full gap-1">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </Button>
                <Button variant="outline" className="w-full">
                  Setup Automatic Payments
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deposit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your deposit of £{currentLease.deposit} is protected by a government-approved scheme.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Held:</span>
                    <span>£{currentLease.deposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protection Scheme:</span>
                    <span>DPS (TDS)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className="bg-green-600">Protected</Badge>
                  </div>
                </div>

                <Separator />

                <Button variant="outline" className="w-full gap-1">
                  <Download className="h-4 w-4" />
                  Download Protection Certificate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>£{payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge className={payment.status === 'Paid' ? 'bg-green-600' : 'bg-blue-600'}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Receipt className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="mb-1">Messages</h2>
              <p className="text-sm text-gray-600">Communicate with your landlord</p>
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
            <h2 className="mb-1">Tenant Settings</h2>
            <p className="text-sm text-gray-600">Manage your preferences and profile</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rental Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input defaultValue="Sarah Johnson" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input defaultValue="+44 7700 900123" />
                </div>
              </div>

              <div>
                <Label>Email Address</Label>
                <Input defaultValue="sarah.j@email.com" />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Employment Status</Label>
                  <Input defaultValue="Full-time Employee" />
                </div>
                <div>
                  <Label>Annual Income (£)</Label>
                  <Input type="number" defaultValue="55000" />
                </div>
              </div>

              <div>
                <Label>Employer</Label>
                <Input defaultValue="Tech Corp Ltd" />
              </div>

              <Button>Update Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div>Rent Payment Reminders</div>
                  <div className="text-sm text-gray-600">Get reminded 3 days before rent is due</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>Application Updates</div>
                  <div className="text-sm text-gray-600">Notifications when application status changes</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>New Property Alerts</div>
                  <div className="text-sm text-gray-600">Get notified of properties matching your criteria</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Rental Application</DialogTitle>
            <DialogDescription>
              Complete this application to apply for {selectedProperty?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                All information must be accurate. False information may result in application rejection.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Monthly Rent Offer (£)</Label>
                <Input type="number" defaultValue={selectedProperty?.rent} />
              </div>
              <div>
                <Label>Preferred Move-In Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div>
              <Label>Lease Term (months)</Label>
              <Input type="number" defaultValue="12" />
            </div>

            <Separator />

            <div>
              <Label>Employment Status</Label>
              <Input defaultValue="Full-time Employee" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Employer</Label>
                <Input placeholder="Company name" />
              </div>
              <div>
                <Label>Annual Income (£)</Label>
                <Input type="number" placeholder="55000" />
              </div>
            </div>

            <div>
              <Label>Additional Information</Label>
              <Textarea 
                placeholder="Any additional information you'd like the landlord to know..."
                rows={3}
              />
            </div>

            <Separator />

            <div>
              <Label>Supporting Documents</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Upload proof of income, references, ID</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowApplicationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitApplication}>
                Submit Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
