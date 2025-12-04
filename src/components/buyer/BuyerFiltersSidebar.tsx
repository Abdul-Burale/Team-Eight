import { useState } from 'react';
import { MapPin, TreePine, GraduationCap, Volume2, Funnel } from 'lucide-react';

interface BuyerFiltersSidebarProps {
  location: string;
  setLocation: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  nearPark: boolean;
  setNearPark: (value: boolean) => void;
  nearSchool: boolean;
  setNearSchool: (value: boolean) => void;
  quietArea: boolean;
  setQuietArea: (value: boolean) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function BuyerFiltersSidebar({
  location,
  setLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  bedrooms,
  setBedrooms,
  propertyType,
  setPropertyType,
  nearPark,
  setNearPark,
  nearSchool,
  setNearSchool,
  quietArea,
  setQuietArea,
  sortBy,
  setSortBy,
  onApplyFilters,
  onClearFilters,
}: BuyerFiltersSidebarProps) {
  const bedroomOptions = ['Studio', '1', '2', '3', '4', '5+'];
  const propertyTypes = ['House', 'Apartment', 'Studio', 'Townhouse', 'Bungalow'];

  return (
    <aside className="w-72 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Funnel className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
        </div>

        <div className="space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Postcode / City / Area"
                className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min price"
                className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max price"
                className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setBedrooms(bedrooms === option ? '' : option)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    bedrooms === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Nearby Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Nearby Preferences
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nearPark}
                  onChange={(e) => setNearPark(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <TreePine className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Near Park</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nearSchool}
                  onChange={(e) => setNearSchool(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <GraduationCap className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Near School</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={quietArea}
                  onChange={(e) => setQuietArea(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Volume2 className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Quiet Area</span>
              </label>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price_low">Price (Low → High)</option>
              <option value="price_high">Price (High → Low)</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <button
              onClick={onApplyFilters}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={onClearFilters}
              className="w-full bg-white text-blue-600 border-2 border-blue-600 py-3 px-4 rounded-xl font-medium hover:bg-blue-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

