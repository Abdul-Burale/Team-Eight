import { useAuth } from './auth/AuthContext';
import { EnhancedLandlordProfile } from './profiles/EnhancedLandlordProfile';
import { TenantProfile } from './profiles/TenantProfile';
import { BuyerProfile } from './profiles/BuyerProfile';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { User, Home, DollarSign, Settings } from 'lucide-react';
import { useState } from 'react';

interface UserProfileProps {
  onNavigate?: (page: string, propertyId?: number) => void;
}

export function UserProfile({ onNavigate }: UserProfileProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile-specific');

  // If user has a specific type, show their profile
  if (user?.userType && onNavigate) {
    switch (user.userType) {
      case 'landlord':
        return <EnhancedLandlordProfile onNavigate={onNavigate} />;
      case 'tenant':
        return <TenantProfile onNavigate={onNavigate} />;
      case 'buyer':
        return <BuyerProfile onNavigate={onNavigate} />;
    }
  }

  // Fallback to general profile settings
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="mb-2">Profile & Preferences</h1>
        <p className="text-gray-600">Manage your account and property preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile-specific">
            {user?.userType === 'landlord' 
              ? 'Landlord Profile' 
              : user?.userType === 'tenant'
              ? 'Tenant Profile'
              : user?.userType === 'buyer'
              ? 'Buyer Profile'
              : 'My Profile'}
          </TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile-specific" className="space-y-6">
          {/* Personal Information */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5" />
                <h3>Personal Information</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" defaultValue={user?.name?.split(' ')[0] || ''} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Smith" defaultValue={user?.name?.split(' ')[1] || ''} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+44 7700 900123" />
                </div>
                
                <div>
                  <Label htmlFor="location">Current Location</Label>
                  <Input id="location" placeholder="City, Postcode" defaultValue="London, UK" />
                </div>

                <Button>Update Information</Button>
              </div>
            </div>
          </Card>

          {/* User Type Specific Info */}
          {user?.userType === 'landlord' && (
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Home className="h-5 w-5" />
                  <h3>Landlord Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business/Company Name</Label>
                    <Input id="businessName" placeholder="Optional" />
                  </div>
                  <div>
                    <Label htmlFor="taxId">Tax ID/UTR Number</Label>
                    <Input id="taxId" placeholder="For tax purposes" />
                  </div>
                  <div>
                    <Label htmlFor="propertyCount">Number of Properties</Label>
                    <Input id="propertyCount" type="number" defaultValue="0" />
                  </div>
                  <Button>Save Landlord Details</Button>
                </div>
              </div>
            </Card>
          )}

          {user?.userType === 'tenant' && (
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="h-5 w-5" />
                  <h3>Tenant Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employment">Employment Status</Label>
                    <Select>
                      <SelectTrigger id="employment">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="income">Annual Income (£)</Label>
                    <Input id="income" type="number" placeholder="e.g., 35000" />
                  </div>
                  <div>
                    <Label htmlFor="employer">Employer</Label>
                    <Input id="employer" placeholder="Company name" />
                  </div>
                  <Button>Save Tenant Details</Button>
                </div>
              </div>
            </Card>
          )}

          {user?.userType === 'buyer' && (
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="h-5 w-5" />
                  <h3>Buyer Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Maximum Budget (£)</Label>
                    <Input id="budget" type="number" placeholder="e.g., 500000" />
                  </div>
                  <div>
                    <Label htmlFor="deposit">Available Deposit (£)</Label>
                    <Input id="deposit" type="number" placeholder="e.g., 100000" />
                  </div>
                  <div>
                    <Label htmlFor="mortgage">Mortgage Pre-Approval Status</Label>
                    <Select>
                      <SelectTrigger id="mortgage">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Pre-Approved</SelectItem>
                        <SelectItem value="process">In Process</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="cash">Cash Buyer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Buyer Details</Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          {/* Lifestyle Preferences */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Home className="h-5 w-5" />
                <h3>Lifestyle Preferences</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Property Type Preferences</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="house" defaultChecked />
                      <label htmlFor="house" className="text-sm cursor-pointer">House</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="flat" />
                      <label htmlFor="flat" className="text-sm cursor-pointer">Flat</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="bungalow" />
                      <label htmlFor="bungalow" className="text-sm cursor-pointer">Bungalow</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cottage" />
                      <label htmlFor="cottage" className="text-sm cursor-pointer">Cottage</label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="neighborhood">Neighborhood Type</Label>
                  <Select defaultValue="family">
                    <SelectTrigger id="neighborhood" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiet">Quiet & Peaceful</SelectItem>
                      <SelectItem value="family">Family-Friendly</SelectItem>
                      <SelectItem value="urban">Urban & Busy</SelectItem>
                      <SelectItem value="suburban">Suburban</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="commute">Maximum Commute Time</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="commute" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="workLocation">Work Location</Label>
                  <Input id="workLocation" placeholder="Enter work address" className="mt-2" />
                </div>
                
                <Separator />
                
                <div>
                  <Label>Important Nearby Amenities</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="schools" defaultChecked />
                      <label htmlFor="schools" className="text-sm cursor-pointer">Good Schools</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="parks" defaultChecked />
                      <label htmlFor="parks" className="text-sm cursor-pointer">Parks</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="transit" />
                      <label htmlFor="transit" className="text-sm cursor-pointer">Public Transport</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="shopping" />
                      <label htmlFor="shopping" className="text-sm cursor-pointer">Shopping</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dining" />
                      <label htmlFor="dining" className="text-sm cursor-pointer">Restaurants</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="gym" />
                      <label htmlFor="gym" className="text-sm cursor-pointer">Gyms</label>
                    </div>
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </div>
            </div>
          </Card>

          {/* Financial Profile */}
          {(user?.userType === 'buyer' || user?.userType === 'tenant') && (
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="h-5 w-5" />
                  <h3>Financial Profile</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="budget">
                      {user?.userType === 'buyer' ? 'Maximum Budget' : 'Maximum Rent'} (£)
                    </Label>
                    <Input id="budget" type="number" placeholder="e.g., 500000" className="mt-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income (£)</Label>
                      <Input id="monthlyIncome" type="number" placeholder="e.g., 5000" />
                    </div>
                    {user?.userType === 'buyer' && (
                      <div>
                        <Label htmlFor="downPayment">Available Deposit (£)</Label>
                        <Input id="downPayment" type="number" placeholder="e.g., 100000" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="timeline">
                      {user?.userType === 'buyer' ? 'Purchase' : 'Moving'} Timeline
                    </Label>
                    <Select defaultValue="3-6">
                      <SelectTrigger id="timeline" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As Soon As Possible</SelectItem>
                        <SelectItem value="3-6">3-6 months</SelectItem>
                        <SelectItem value="6-12">6-12 months</SelectItem>
                        <SelectItem value="1year+">1+ year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button>Save Financial Profile</Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="h-5 w-5" />
                <h3>Notification Preferences</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div>Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive property alerts and updates via email</div>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div>SMS Alerts</div>
                    <div className="text-sm text-gray-600">Get text messages for urgent updates</div>
                  </div>
                  <Checkbox />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div>Marketing Communications</div>
                    <div className="text-sm text-gray-600">Receive news and special offers</div>
                  </div>
                  <Checkbox />
                </div>
                <Button>Save Settings</Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5" />
                <h3>Privacy & Security</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Change Password</Label>
                  <div className="space-y-2 mt-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <Button>Update Password</Button>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <div>Profile Visibility</div>
                    <div className="text-sm text-gray-600">Make your profile visible to {user?.userType === 'landlord' ? 'tenants' : 'landlords and sellers'}</div>
                  </div>
                  <Checkbox defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
