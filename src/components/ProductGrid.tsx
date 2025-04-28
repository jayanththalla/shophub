import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, index) => (
          <div 
            key={`skeleton-${index}`} 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-[420px] animate-pulse"
          >
            <div className="h-52 bg-gray-100"></div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-100 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="h-4 w-24 bg-gray-100 rounded"></div>
                <div className="h-4 w-20 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or search criteria to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div 
          key={`product-${product.id}`}
          className="transform transition-all duration-300 hover:-translate-y-1"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

