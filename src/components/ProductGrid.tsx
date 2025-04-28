
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 h-80">
            <div className="h-48 bg-gray-100 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
