import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Building, DollarSign, Users, TrendingUp, Plus, FileText } from 'lucide-react';
import { PropertyListingForm } from '../PropertyListingForm';

interface LandlordDashboardProps {
  onNavigate: (page: string) => void;
}

export function LandlordDashboard({ onNavigate }: LandlordDashboardProps) {
  const [showAddPropertyDialog, setShowAddPropertyDialog] = useState(false);
  const myProperties = [
    { id: 1, name: 'Downtown Apartment 201', rent: '$3,200/mo', status: 'Occupied', tenant: 'John Smith' },
    { id: 2, name: 'Suburban House', rent: '$2,800/mo', status: 'Available', tenant: null },
  ];

  const applications = [
    { id: 1, property: 'Suburban House', applicant: 'Sarah Johnson', status: 'Pending Review' },
    { id: 2, property: 'Suburban House', applicant: 'Mike Davis', status: 'Pending Review' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Landlord Dashboard</h2>
        <p className="text-gray-600">Manage your rental properties and track your income.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Properties</span>
              <Building className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl">{myProperties.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Monthly Income</span>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl">$6,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Occupancy Rate</span>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-3xl">50%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Applications</span>
              <Users className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-3xl">{applications.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                My Properties
              </CardTitle>
              <Button size="sm" className="gap-2" onClick={() => setShowAddPropertyDialog(true)}>
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {myProperties.map((property) => (
              <div key={property.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="mb-1">{property.name}</div>
                    <div className="text-sm text-gray-600">{property.rent}</div>
                  </div>
                  <Badge className={property.status === 'Occupied' ? 'bg-green-600' : 'bg-yellow-600'}>
                    {property.status}
                  </Badge>
                </div>
                {property.tenant && (
                  <div className="text-sm text-gray-600">
                    Tenant: {property.tenant}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications.length > 0 ? (
              applications.map((application) => (
                <div key={application.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="mb-1">{application.applicant}</div>
                      <div className="text-sm text-gray-600">{application.property}</div>
                    </div>
                    <Badge variant="outline">{application.status}</Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">Review</Button>
                    <Button size="sm" className="bg-green-600">Approve</Button>
                    <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No pending applications</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">This Month</div>
              <div className="text-2xl text-green-600">$6,000</div>
              <div className="text-xs text-gray-600">From 1 occupied unit</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Projected (Full Occupancy)</div>
              <div className="text-2xl text-blue-600">$12,000</div>
              <div className="text-xs text-gray-600">With all units occupied</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Annual Revenue</div>
              <div className="text-2xl text-purple-600">$72,000</div>
              <div className="text-xs text-gray-600">Year to date</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <Plus className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="mb-2">List New Property</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add a new rental property to your portfolio
            </p>
            <Button onClick={() => setShowAddPropertyDialog(true)}>Add Property</Button>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <TrendingUp className="h-10 w-10 text-purple-600 mb-3" />
            <h3 className="mb-2">Market Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">
              View rental trends in your area
            </p>
            <Button onClick={() => onNavigate('market')} variant="outline">
              View Insights
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <Users className="h-10 w-10 text-green-600 mb-3" />
            <h3 className="mb-2">Tenant Management</h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage leases and communications
            </p>
            <Button variant="outline">Manage Tenants</Button>
          </CardContent>
        </Card>
      </div>

      {/* Add Property Dialog */}
      <Dialog open={showAddPropertyDialog} onOpenChange={setShowAddPropertyDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Create a new property listing for your portfolio
            </DialogDescription>
          </DialogHeader>
          <PropertyListingForm 
            onSuccess={(property) => {
              setShowAddPropertyDialog(false);
              // Optionally refresh property list here
            }}
            onCancel={() => setShowAddPropertyDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
