import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import type { Property } from '../../types';

interface ExtendedProperty extends Property {
  bathrooms?: number;
  size?: number;
  updated_at?: string;
}

interface BuyerPropertyCardProps {
  property: ExtendedProperty;
  showBadge?: boolean;
  badgeText?: string;
}

export default function BuyerPropertyCard({ property, showBadge, badgeText }: BuyerPropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check if property is already saved
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('saved_properties')
          .select('id')
          .eq('user_id', user.id)
          .eq('property_id', property.id)
          .single();

        if (data) {
          setIsSaved(true);
        }
      } catch (err) {
        // Not saved
      }
    };

    checkIfSaved();
  }, [property.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect to signin - open in new window to prevent navigation
        window.location.href = '/signin';
        return;
      }

      if (isSaved) {
        // Remove from saved
        const { error } = await supabase
          .from('saved_properties')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', property.id);

        if (!error) {
          setIsSaved(false);
        }
      } else {
        // Add to saved
        const { error } = await supabase
          .from('saved_properties')
          .insert({
            user_id: user.id,
            property_id: property.id,
          });

        if (!error) {
          setIsSaved(true);
        }
      }
    } catch (err) {
      console.error('Error saving property:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const location = `${property.location || ''}${property.city ? (property.location ? ', ' : '') + property.city : ''}${property.postcode ? (property.location || property.city ? ' ' : '') + property.postcode : ''}`;

  return (
    <Link
      to={`/property/${property.id}`}
      className="block w-full"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer">
      {/* Image Container */}
      <div className="relative">
        <img
          src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        {showBadge && badgeText && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {badgeText}
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
          aria-label={isSaved ? 'Remove from saved' : 'Save property'}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{property.title}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.size !== undefined && (
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.size.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900 mb-4">{formatPrice(property.price)}</p>

        {/* View Property Button - Now just visual since whole card is clickable */}
        <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-center">
          View Property
        </div>
      </div>
      </div>
    </Link>
  );
}

