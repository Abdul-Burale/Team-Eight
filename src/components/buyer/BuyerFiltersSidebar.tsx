import { MapPin, TreePine, GraduationCap, Volume2, Funnel, ChevronDown } from 'lucide-react';

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
  listingType: string;
  setListingType: (value: string) => void;
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
  listingType,
  setListingType,
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
  const propertyTypes = ['House', 'Flat', 'Apartment', 'Studio', 'Penthouse', 'Bungalow', 'Cottage'];

  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 sticky top-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Funnel className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
        </div>

        <div className="space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Postcode / City / Area"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max price"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Select type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Type
            </label>
            <div className="relative">
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">All</option>
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Nearby Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Nearby Preferences
            </label>
            <div className="space-y-3">
              {/* Near Park */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Near Park</span>
                </div>
                <button
                  onClick={() => setNearPark(!nearPark)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    nearPark ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle Near Park"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      nearPark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Near School */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Near School</span>
                </div>
                <button
                  onClick={() => setNearSchool(!nearSchool)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    nearSchool ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle Near School"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      nearSchool ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Quiet Area */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Quiet Area</span>
                </div>
                <button
                  onClick={() => setQuietArea(!quietArea)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    quietArea ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle Quiet Area"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      quietArea ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price (Low→High)</option>
                <option value="price_high">Price (High→Low)</option>
                <option value="bedrooms">Bedrooms</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onApplyFilters}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={onClearFilters}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

