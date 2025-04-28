import React from 'react';
import { Filter, SortAsc, SortDesc, X } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: 'asc' | 'desc' | null;
  onSortChange: (order: 'asc' | 'desc' | null) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Filters & Sorting</h2>
        {(selectedCategory || sortOrder) && (
          <button
            onClick={() => {
              onCategoryChange('');
              onSortChange(null);
            }}
            className="text-sm text-gray-500 hover:text-primary flex items-center space-x-1 transition-colors"
          >
            <X size={16} />
            <span>Clear all</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-1 w-full md:w-auto">
          <div className="flex items-center space-x-3 mb-2">
            <Filter size={18} className="text-primary" />
            <span className="text-sm font-medium text-gray-700">Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !selectedCategory
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-sm font-medium text-gray-700">Sort by Price</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => onSortChange(sortOrder === 'asc' ? null : 'asc')}
              className={`p-2 rounded-md transition-all duration-200 ${
                sortOrder === 'asc'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
              title="Sort ascending"
            >
              <SortAsc size={18} />
            </button>
            <button 
              onClick={() => onSortChange(sortOrder === 'desc' ? null : 'desc')}
              className={`p-2 rounded-md transition-all duration-200 ${
                sortOrder === 'desc'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
              title="Sort descending"
            >
              <SortDesc size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
