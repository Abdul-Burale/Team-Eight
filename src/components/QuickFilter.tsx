import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function Filters() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-800">Quick Filters</h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Price Range */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Price Range</label>
            <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition">
              <span>Any price</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Bedrooms</label>
            <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition">
              <span>Any</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </div>

          {/* Property Type */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Property Type</label>
            <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition">
              <span>Any type</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Location</label>
            <input
              type="text"
              placeholder="Enter city"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full mt-4 bg-gray-950 hover:bg-gray-700 text-white rounded-md py-2 text-sm transition">
          Apply Filters
        </button>
      </div>
    </section>
  );
}
