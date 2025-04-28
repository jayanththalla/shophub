
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
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-gray-600 mb-8">Discover our quality collection</p>
      
      <ProductFilters 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      
      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default ProductListing;
