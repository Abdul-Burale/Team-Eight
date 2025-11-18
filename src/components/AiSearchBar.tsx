import { Search as SearchIcon } from "lucide-react";

export function Search() {
  return (
    <section className="container mx-auto px-4 py-16 lg:py-24">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 md:text-4xl">
          Find Your Perfect Home
        </h1>
        <p className="text-md text-gray-950 max-w-3xl mx-auto">
          Use AI-powered search to discover
          properties that match your lifestyle, preferences, and budget instantly.
        </p>
      </div>

      {/* Search Bar Card */}
      <div className="bg-white rounded-2xl border border-gray-200 max-w-4xl mx-auto shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Input */}
          <div className="flex-1 relative ">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Describe your ideal home (e.g., 2-bedroom near a park)"
              className="w-full rounded-xl text-sm h-12 bg-gray-100 pl-12 pr-4 py-3 text-base placeholder-gray-500 transition focus:border-gray-950 focus:ring-4 focus:ring-blue-100 outline-none"
            />
          </div>

          {/* Button */}
          <button className="shrink-0 bg-gray-800 text-sm text-white font-semibold h-12 rounded-xl px-6 hover:bg-gray-600 transition focus:ring-4 focus:ring-blue-200 outline-none">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default Search;
