import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';

const SearchBar = ({ onSearch, onFilter, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <div className="relative">
      <motion.div
        className="relative"
        animate={{ width: isExpanded ? 320 : 280 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            placeholder={placeholder}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
          
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearSearch}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Search Suggestions */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-sm text-gray-500 border-b">
              Search suggestions
            </div>
            {['Faculty Performance', 'Research Papers', 'Teaching Excellence', 'Student Feedback'].map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSearch(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors"
              >
                <Search className="w-4 h-4 inline mr-2 text-gray-400" />
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Filters</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>All Departments</option>
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>All Status</option>
                  <option>Submitted</option>
                  <option>Pending</option>
                  <option>Reviewed</option>
                </select>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                  Apply
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;