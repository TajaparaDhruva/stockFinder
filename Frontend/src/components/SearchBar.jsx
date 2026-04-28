import React, { useState } from 'react';
import { Search, MapPin, Clock, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, performSearch, clearSearch } from '../redux/searchSlice';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { status, query } = useSelector((state) => state.search);
  const isLoading = status === 'loading';

  // Sync local input with global query (e.g. when search is cleared)
  React.useEffect(() => {
    if (!query) {
      setInputValue('');
    }
  }, [query]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    
    if (inputValue.trim()) {
      dispatch(setSearchQuery(inputValue));
      dispatch(performSearch({ q: inputValue, location: 'Ahmedabad, GJ' }));
    } else {
      dispatch(clearSearch());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-full opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-navy/90 border border-white/10 rounded-full overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="pl-6 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-gray-500 py-4 px-4 focus:outline-none text-sm font-medium"
            placeholder="Search products, brands, or nearby outlets..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="pr-2 py-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primaryHover disabled:opacity-50 text-white px-8 py-2 rounded-full font-bold text-xs tracking-widest transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  SEARCHING...
                </>
              ) : (
                'SEARCH'
              )}
            </button>
          </div>
        </div>
      </form>
      
      <div className="flex items-center justify-center gap-6 mt-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className="text-primary" />
          <span>Ahmedabad, GJ</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-50">
          <Clock size={12} />
          <span>Recent: Skeleton Watch</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
