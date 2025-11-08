import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { 
  Upload, MapPin, Home, DollarSign, Bed, Bath, 
  Square, Calendar, CheckCircle, AlertCircle, X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PropertyListingFormProps {
  onSuccess?: (property: any) => void;
  onCancel?: () => void;
  editMode?: boolean;
  existingProperty?: any;
}

export function PropertyListingForm({ 
  onSuccess, 
  onCancel,
  editMode = false,
  existingProperty 
}: PropertyListingFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form state
  const [formData, setFormData] = useState({
    title: existingProperty?.title || '',
    price: existingProperty?.price || '',
    propertyType: existingProperty?.propertyType || '',
    address: existingProperty?.address || '',
    location: existingProperty?.location || '',
    description: existingProperty?.description || '',
    bedrooms: existingProperty?.bedrooms || '',
    bathrooms: existingProperty?.bathrooms || '',
    sqft: existingProperty?.sqft || '',
    listingDuration: existingProperty?.listingDuration || '30',
    // GPS coordinates
    latitude: existingProperty?.coordinates?.lat || '',
    longitude: existingProperty?.coordinates?.lng || '',
  });

  const [features, setFeatures] = useState<string[]>(existingProperty?.features || []);
  const [images, setImages] = useState<string[]>(existingProperty?.images || []);

  const availableFeatures = [
    'Garden', 'Parking', 'Swimming Pool', 'Gym', 'Balcony',
    'Terrace', 'Furnished', 'Pet Friendly', 'Security System',
    'Central Heating', 'Air Conditioning', 'Fireplace', 'Storage',
    'Laundry Room', 'Dishwasher', 'Elevator', 'Wheelchair Accessible'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Property title is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.bedrooms || parseInt(formData.bedrooms) < 0) {
      newErrors.bedrooms = 'Number of bedrooms is required';
    }

    if (!formData.bathrooms || parseFloat(formData.bathrooms) < 0) {
      newErrors.bathrooms = 'Number of bathrooms is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // Get access token
      const accessToken = localStorage.getItem('supabase_access_token');
      
      if (!accessToken) {
        toast.error('Please sign in to create a listing');
        return;
      }

      // Prepare property data
      const propertyData = {
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        propertyType: formData.propertyType,
        address: formData.address.trim(),
        location: formData.location.trim() || formData.address.trim(),
        description: formData.description.trim(),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        sqft: formData.sqft ? parseInt(formData.sqft) : null,
        features: features,
        images: images,
        listingDuration: formData.listingDuration,
        coordinates: formData.latitude && formData.longitude ? {
          lat: parseFloat(formData.latitude),
          lng: parseFloat(formData.longitude)
        } : null,
      };

      const url = editMode 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/properties/${existingProperty.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/properties`;

      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(propertyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${editMode ? 'update' : 'create'} property`);
      }

      toast.success(`Property ${editMode ? 'updated' : 'created'} successfully!`);
      
      if (onSuccess) {
        onSuccess(data.property);
      }
    } catch (error: any) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} property:`, error);
      toast.error(error.message || `Failed to ${editMode ? 'update' : 'create'} property`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Enter the basic details of your property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Property Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Modern 2-Bed Flat in Canary Wharf"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (£) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="price"
                  type="number"
                  placeholder="1500"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
                  min="0"
                  step="50"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">{errors.price}</p>
              )}
              <p className="text-xs text-gray-600 mt-1">Monthly rent or sale price</p>
            </div>

            <div>
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select 
                value={formData.propertyType} 
                onValueChange={(value) => handleInputChange('propertyType', value)}
              >
                <SelectTrigger id="propertyType" className={errors.propertyType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat/Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="cottage">Cottage</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
              {errors.propertyType && (
                <p className="text-sm text-red-500 mt-1">{errors.propertyType}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Full Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="address"
                placeholder="123 High Street, London, SW1A 1AA"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <Label htmlFor="location">Location/Area (Optional)</Label>
            <Input
              id="location"
              placeholder="e.g., Canary Wharf, London"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <p className="text-xs text-gray-600 mt-1">Display name for the area</p>
          </div>

          <div>
            <Label htmlFor="description">Property Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your property, its features, and what makes it special..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={5}
            />
            <p className="text-xs text-gray-600 mt-1">Provide a detailed description to attract potential tenants/buyers</p>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Square className="h-5 w-5" />
            Property Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms *</Label>
              <div className="relative">
                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="2"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  className={`pl-10 ${errors.bedrooms ? 'border-red-500' : ''}`}
                  min="0"
                />
              </div>
              {errors.bedrooms && (
                <p className="text-sm text-red-500 mt-1">{errors.bedrooms}</p>
              )}
            </div>

            <div>
              <Label htmlFor="bathrooms">Bathrooms *</Label>
              <div className="relative">
                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="bathrooms"
                  type="number"
                  placeholder="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  className={`pl-10 ${errors.bathrooms ? 'border-red-500' : ''}`}
                  min="0"
                  step="0.5"
                />
              </div>
              {errors.bathrooms && (
                <p className="text-sm text-red-500 mt-1">{errors.bathrooms}</p>
              )}
            </div>

            <div>
              <Label htmlFor="sqft">Square Feet (Optional)</Label>
              <div className="relative">
                <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="sqft"
                  type="number"
                  placeholder="850"
                  value={formData.sqft}
                  onChange={(e) => handleInputChange('sqft', e.target.value)}
                  className="pl-10"
                  min="0"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features & Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Features & Amenities</CardTitle>
          <CardDescription>Select all that apply to your property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Checkbox
                  id={feature}
                  checked={features.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <label htmlFor={feature} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GPS Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            GPS Location (Optional)
          </CardTitle>
          <CardDescription>
            Add GPS coordinates for precise location mapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                placeholder="51.5074"
                value={formData.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                step="any"
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                placeholder="-0.1278"
                value={formData.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                step="any"
              />
            </div>
          </div>
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You can find GPS coordinates by searching your address on Google Maps and copying the coordinates
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Images & Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Property Images
          </CardTitle>
          <CardDescription>
            Add high-quality photos of your property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, HEIC up to 10MB each
            </p>
            <Button type="button" variant="outline" className="mt-4">
              Choose Files
            </Button>
          </div>
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Note: Image upload will be fully functional once connected to cloud storage
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Listing Duration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Listing Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="listingDuration">How long should this listing be active?</Label>
          <Select 
            value={formData.listingDuration} 
            onValueChange={(value) => handleInputChange('listingDuration', value)}
          >
            <SelectTrigger id="listingDuration" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="60">60 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="180">6 months</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-600 mt-2">
            Your listing will automatically expire after this period unless renewed
          </p>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading} className="gap-2">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {editMode ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              {editMode ? 'Update Property' : 'Create Property Listing'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
