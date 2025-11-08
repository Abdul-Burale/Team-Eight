import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Home, TrendingUp, DollarSign, FileText, Heart } from 'lucide-react';

interface BuyerDashboardProps {
  onNavigate: (page: string) => void;
}

export function BuyerDashboard({ onNavigate }: BuyerDashboardProps) {
  const savedProperties = [
    { id: 1, name: 'Modern Family Home', price: '$450,000', status: 'For Sale' },
    { id: 3, name: 'Urban Townhouse', price: '$525,000', status: 'For Sale' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Buyer Dashboard</h2>
        <p className="text-gray-600">Track your home buying journey and discover investment opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Saved Properties</span>
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl">{savedProperties.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Offers</span>
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl">1</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg. Market Price</span>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-xl">$445k</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Market Trend</span>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <Badge className="bg-green-600">+3.2%</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Saved Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedProperties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="mb-1">{property.name}</div>
                  <div className="text-sm text-gray-600">{property.price}</div>
                </div>
                <Badge className="bg-blue-600">{property.status}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => onNavigate('search')}>
              View All Properties
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Purchase Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span>Modern Family Home</span>
                <Badge className="bg-blue-600">Offer Submitted</Badge>
              </div>
              <div className="text-sm text-gray-600">Offer: $445,000 • Submitted 2 days ago</div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => onNavigate('legal')}>
              View Purchase Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Insights for Your Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Median Home Price</div>
              <div className="text-2xl text-blue-600">$445,000</div>
              <div className="text-xs text-green-600">+3.2% vs last month</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg. Days on Market</div>
              <div className="text-2xl text-green-600">28 days</div>
              <div className="text-xs text-red-600">-5 days vs last month</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">6-Month Forecast</div>
              <div className="text-2xl text-purple-600">+6.7%</div>
              <div className="text-xs text-gray-600">Expected appreciation</div>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => onNavigate('market')}>
            View Full Market Analysis
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <Home className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="mb-2">Search Properties</h3>
            <p className="text-sm text-gray-600 mb-4">
              Find your dream home from thousands of listings
            </p>
            <Button onClick={() => onNavigate('search')}>Browse Homes</Button>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <DollarSign className="h-10 w-10 text-green-600 mb-3" />
            <h3 className="mb-2">Calculate Affordability</h3>
            <p className="text-sm text-gray-600 mb-4">
              See what you can afford with our calculator
            </p>
            <Button onClick={() => onNavigate('search')} variant="outline">
              Get Started
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <TrendingUp className="h-10 w-10 text-purple-600 mb-3" />
            <h3 className="mb-2">Investment Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">
              View market trends and forecasts
            </p>
            <Button onClick={() => onNavigate('market')} variant="outline">
              View Insights
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
