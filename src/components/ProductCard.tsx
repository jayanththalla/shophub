import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full"
    >
      <div className="relative p-6 bg-gray-50/50 flex items-center justify-center h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img 
          src={product.image} 
          alt={product.title} 
          className="object-contain h-full max-h-44 w-auto transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <button 
          className="absolute bottom-4 right-4 p-2 rounded-full bg-white/90 shadow-md text-gray-600 hover:text-primary hover:bg-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart functionality here
          }}
        >
          <ShoppingCart size={18} />
        </button>
      </div>
      
      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs px-3 py-1 bg-primary/5 text-primary rounded-full font-medium">
            {product.category}
          </span>
          <span className="font-bold text-lg text-primary">
            ₹{product.price.toFixed(2)}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating.rate}
            </span>
            <span className="text-xs text-gray-500">
              ({product.rating.count})
            </span>
          </div>
          <span className="text-sm font-medium text-primary group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
