import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import { Product } from '../types/product';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import ErrorDisplay from '../components/ErrorDisplay';

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, sortOrder]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (order: 'asc' | 'desc' | null) => {
    setSortOrder(order);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    
    getProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (error) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Discover Our Collection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated selection of premium products, carefully chosen to enhance your lifestyle
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <ProductFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </div>
        
        <div className="relative">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
          
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria to find what you're looking for.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
