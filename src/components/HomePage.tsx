import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Search, SlidersHorizontal, Bell, TrendingUp, Home, MapPin, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from './auth/AuthContext';
import { TenantDashboard } from './dashboards/TenantDashboard';
import { BuyerDashboard } from './dashboards/BuyerDashboard';
import { LandlordDashboard } from './dashboards/LandlordDashboard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { user } = useAuth();

  // If user is logged in, show role-specific dashboard
  if (user) {
    return (
      <div className="container mx-auto px-4 py-8">
        {user.userType === 'tenant' && <TenantDashboard onNavigate={onNavigate} />}
        {user.userType === 'buyer' && <BuyerDashboard onNavigate={onNavigate} />}
        {user.userType === 'landlord' && <LandlordDashboard onNavigate={onNavigate} />}
      </div>
    );
  }

  // Default public homepage for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="mb-4">Find Your Perfect Home</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use AI-powered search to discover properties that match your lifestyle, preferences, and budget
          </p>
        </div>
        
        {/* Search Bar */}
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Describe your ideal home (e.g., 2-bedroom house near a park with good schools)"
                  className="pl-10 py-6"
                />
              </div>
              <Button size="lg" onClick={() => onNavigate('search')}>
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Key Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-5 w-5" />
            <h3>Quick Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Price Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100k-300k">$100k - $300k</SelectItem>
                  <SelectItem value="300k-500k">$300k - $500k</SelectItem>
                  <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                  <SelectItem value="1m+">$1M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Bedrooms</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Property Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Location</label>
              <Input placeholder="Enter city" />
            </div>
          </div>
          
          <Button className="w-full mt-4" onClick={() => onNavigate('search')}>
            Apply Filters
          </Button>
        </div>
      </section>
      
      {/* Smart Alerts Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-blue-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="h-6 w-6" />
                  <h2>Smart Alerts</h2>
                </div>
                <p className="mb-4 opacity-90">
                  Get notified instantly when new properties matching your preferences become available. 
                  Our AI learns from your searches to send you the most relevant listings.
                </p>
                <Button variant="secondary" onClick={() => onNavigate('alerts')}>
                  Set Up Alerts
                </Button>
              </div>
              <Badge className="bg-yellow-400 text-yellow-900">3 New Matches</Badge>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-center mb-8">Why Choose HomeMatch?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('search')}>
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Smart Matching</h3>
              <p className="text-gray-600 text-sm">
                AI-powered search finds homes that perfectly match your lifestyle and preferences
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('market')}>
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2">Market Intelligence</h3>
              <p className="text-gray-600 text-sm">
                Access real-time price forecasts and investment potential analysis
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('search')}>
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2">Lifestyle Matching</h3>
              <p className="text-gray-600 text-sm">
                Find neighborhoods that match your commute needs and lifestyle preferences
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
