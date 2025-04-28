
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 h-full"
    >
      <div className="relative p-4 bg-gray-50 flex items-center justify-center h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="object-contain h-full max-h-40 w-auto transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start">
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 mb-2">
            {product.category}
          </span>
          <span className="font-semibold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xs text-gray-500">
              Rating: {product.rating.rate}/5 ({product.rating.count})
            </span>
          </div>
          <button className="text-sm text-primary font-medium hover:underline">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
