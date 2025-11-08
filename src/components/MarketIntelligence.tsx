import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Home, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function MarketIntelligence() {
  // Mock data for charts
  const priceData = [
    { month: 'Jan 2024', price: 420000, forecast: null },
    { month: 'Feb 2024', price: 425000, forecast: null },
    { month: 'Mar 2024', price: 430000, forecast: null },
    { month: 'Apr 2024', price: 435000, forecast: null },
    { month: 'May 2024', price: 440000, forecast: null },
    { month: 'Jun 2024', price: 445000, forecast: null },
    { month: 'Jul 2024', price: null, forecast: 450000 },
    { month: 'Aug 2024', price: null, forecast: 455000 },
    { month: 'Sep 2024', price: null, forecast: 460000 },
    { month: 'Oct 2024', price: null, forecast: 465000 },
    { month: 'Nov 2024', price: null, forecast: 470000 },
    { month: 'Dec 2024', price: null, forecast: 475000 },
  ];
  
  const rentalYieldData = [
    { area: 'Downtown', yield: 4.8 },
    { area: 'Suburbs', yield: 3.2 },
    { area: 'Harbor View', yield: 4.5 },
    { area: 'City Center', yield: 5.1 },
    { area: 'Greenwood', yield: 3.8 },
  ];
  
  const marketActivity = [
    { month: 'Jan', listings: 245, sales: 180 },
    { month: 'Feb', listings: 260, sales: 195 },
    { month: 'Mar', listings: 280, sales: 220 },
    { month: 'Apr', listings: 295, sales: 240 },
    { month: 'May', listings: 310, sales: 255 },
    { month: 'Jun', listings: 300, sales: 250 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Market Intelligence</h1>
        <p className="text-gray-600">Real-time market insights and price forecasts to help you make informed decisions</p>
      </div>
      
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Median Price</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl mb-1">$445,000</div>
            <div className="text-xs text-green-600">+3.2% from last month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg. Days on Market</span>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl mb-1">28 days</div>
            <div className="text-xs text-red-600">-5 days from last month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Listings</span>
              <Home className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl mb-1">1,247</div>
            <div className="text-xs text-gray-600">In your area</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Market Trend</span>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl mb-1">
              <Badge className="bg-green-600">Hot</Badge>
            </div>
            <div className="text-xs text-gray-600">Seller's market</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Location Selector */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter city or neighborhood" className="mt-2" />
            </div>
            <div className="w-48">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select defaultValue="all">
                <SelectTrigger id="propertyType" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Generate Forecast</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Forecast Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Price Forecast - Suburban Heights, CA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  fill="#3b82f6" 
                  name="Historical Price"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#10b981" 
                  fill="#34d399" 
                  name="Forecast"
                  fillOpacity={0.4}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="mb-2">6-Month Forecast</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Expected Price</div>
                  <div className="text-xl text-blue-600">$475,000</div>
                </div>
                <div>
                  <div className="text-gray-600">Appreciation</div>
                  <div className="text-xl text-green-600">+6.7%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Rental Yield Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Rental Yield by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rentalYieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="yield" fill="#8b5cf6" name="Rental Yield %" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h4 className="mb-2">Best Investment Area</h4>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">City Center</span>
                  <span>5.1% yield</span>
                </div>
                <p className="text-xs text-gray-600">Highest rental yield with strong demand</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Market Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Market Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="listings" stroke="#f59e0b" strokeWidth={2} name="New Listings" />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="Sales" />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h4 className="mb-2">Market Velocity</h4>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Inventory Turnover</span>
                  <span>83%</span>
                </div>
                <p className="text-xs text-gray-600">Properties are selling quickly in this market</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Investment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Potential Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="mb-1">Strong Growth Potential</h4>
              <p className="text-sm text-gray-600">
                Historical data shows consistent 3-5% annual appreciation in this area
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="mb-1">High Rental Demand</h4>
              <p className="text-sm text-gray-600">
                Average occupancy rate of 96% with median rent of $2,800/month
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h4 className="mb-1">Infrastructure Development</h4>
              <p className="text-sm text-gray-600">
                New metro station opening in 2025 expected to boost property values
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h4 className="mb-1">Market Competition</h4>
              <p className="text-sm text-gray-600">
                Moderate competition with average 12 offers per property
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4>Overall Investment Score</h4>
                <Badge className="bg-green-600">8.2/10</Badge>
              </div>
              <p className="text-sm text-gray-600">
                This area shows excellent investment potential with strong fundamentals
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Neighborhood Comparison */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Neighborhood Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Neighborhood</th>
                  <th className="text-left py-3 px-4">Median Price</th>
                  <th className="text-left py-3 px-4">Price Change</th>
                  <th className="text-left py-3 px-4">Rental Yield</th>
                  <th className="text-left py-3 px-4">Market Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Suburban Heights</td>
                  <td className="py-3 px-4">$445,000</td>
                  <td className="py-3 px-4 text-green-600">+3.2%</td>
                  <td className="py-3 px-4">3.8%</td>
                  <td className="py-3 px-4"><Badge className="bg-green-600">Hot</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Downtown Metro</td>
                  <td className="py-3 px-4">$625,000</td>
                  <td className="py-3 px-4 text-green-600">+5.1%</td>
                  <td className="py-3 px-4">4.8%</td>
                  <td className="py-3 px-4"><Badge className="bg-green-600">Hot</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Maple Grove</td>
                  <td className="py-3 px-4">$380,000</td>
                  <td className="py-3 px-4 text-green-600">+2.1%</td>
                  <td className="py-3 px-4">3.2%</td>
                  <td className="py-3 px-4"><Badge variant="outline">Stable</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Harbor View</td>
                  <td className="py-3 px-4">$520,000</td>
                  <td className="py-3 px-4 text-green-600">+4.5%</td>
                  <td className="py-3 px-4">4.5%</td>
                  <td className="py-3 px-4"><Badge className="bg-green-600">Hot</Badge></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Greenwood Park</td>
                  <td className="py-3 px-4">$395,000</td>
                  <td className="py-3 px-4 text-red-600">-0.8%</td>
                  <td className="py-3 px-4">3.5%</td>
                  <td className="py-3 px-4"><Badge variant="outline">Cooling</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
