import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { setSearchQuery, performSearch } from '../redux/searchSlice';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebounce(inputValue, 300);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue));
    if (debouncedValue.trim()) {
      dispatch(performSearch({ q: debouncedValue, location: 'Mumbai, MH' }));
    }
  }, [debouncedValue, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(performSearch({ q: inputValue, location: 'Mumbai, MH' }));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-full opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-navy/90 border border-white/10 rounded-full overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="pl-6 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-gray-500 py-4 px-4 focus:outline-none"
            placeholder="Search products, brands, or nearby outlets..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="pr-2 py-2">
            <button 
              type="submit"
              className="bg-primary hover:bg-primaryHover text-white px-8 py-2 rounded-full font-medium transition-colors"
            >
              SEARCH
            </button>
          </div>
        </div>
      </form>
      
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-gray-400">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-gray-500" />
          <span>Mumbai, MH</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-gray-500" />
          <span>Recent: Rolex Day-Date</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
