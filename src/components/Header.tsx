import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            ShopHub
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-primary/50"
              />
            </div>
            
            <button 
              className="p-2.5 rounded-full hover:bg-primary/5 text-gray-600 hover:text-primary transition-all duration-200 relative group" 
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
