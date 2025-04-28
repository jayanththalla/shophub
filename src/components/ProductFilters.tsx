
import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

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
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div className="flex items-center space-x-2">
        <Filter size={18} />
        <span className="text-sm font-medium">Filter by category:</span>
        <select 
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Sort by price:</span>
        <div className="flex">
          <button 
            onClick={() => onSortChange(sortOrder === 'asc' ? null : 'asc')}
            className={`p-2 rounded-l border border-r-0 ${sortOrder === 'asc' ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            title="Sort ascending"
          >
            <SortAsc size={18} />
          </button>
          <button 
            onClick={() => onSortChange(sortOrder === 'desc' ? null : 'desc')}
            className={`p-2 rounded-r border ${sortOrder === 'desc' ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            title="Sort descending"
          >
            <SortDesc size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
