import { Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SearchSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to search page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full bg-blue-600 rounded-3xl p-8 flex flex-col gap-4 text-white">
      {/* First Row: Icon + Title/Subtitle */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-500 p-4 rounded-full flex-shrink-0">
          <Sparkles className="h-6 w-6 text-white" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Search for your next home</h2>
          <p className="text-blue-100">
            Use AI-powered search to find homes that match your lifestyle.
          </p>
        </div>
      </div>

      {/* Second Row: Search Input + Button */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white rounded-xl px-4 py-3 w-full">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for your next home..."
            className="ml-3 w-full text-gray-700 outline-none bg-transparent"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-white text-blue-600 font-medium rounded-xl px-6 py-3 hover:bg-blue-50 transition whitespace-nowrap flex-shrink-0"
        >
          Explore Properties
        </button>
      </div>
    </div>
  );
}

