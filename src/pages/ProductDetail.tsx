
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { Product } from '../types/product';
import ErrorDisplay from '../components/ErrorDisplay';
import { ChevronLeft } from 'lucide-react';
import { toast } from '../components/ui/sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if ID exists and is a valid number
    if (!id) {
      setError('Product ID is missing');
      setIsLoading(false);
      return;
    }

    const productId = parseInt(id);
    
    // Check if the parsed ID is a valid number
    if (isNaN(productId) || productId <= 0) {
      setError('Invalid product ID format');
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getProduct(productId);
        if (!data) {
          setError('Product not found');
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleRetry = () => {
    if (!id) {
      // If there's no ID at all, go back to product listing
      navigate('/');
      return;
    }
    
    const productId = parseInt(id);
    if (isNaN(productId) || productId <= 0) {
      // If ID is invalid, go back to product listing
      navigate('/');
      toast('Redirected to product listing', {
        description: 'The product ID was invalid'
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    getProduct(productId)
      .then(data => {
        if (!data) {
          setError('Product not found');
        } else {
          setProduct(data);
        }
      })
      .catch(err => {
        setError('Failed to load product details. Please try again later.');
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (error) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-100 rounded w-1/4 mb-4"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-80 bg-gray-100 rounded"></div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-10 bg-gray-100 rounded w-1/3 mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <ErrorDisplay message="Product not found" onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
        <ChevronLeft size={20} />
        <span>Back to Products</span>
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="object-contain max-h-80"
            />
          </div>
          
          <div className="w-full md:w-1/2 p-8">
            <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-gray-600 text-sm mb-4">
              {product.category}
            </span>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-500">
                  Rating: {product.rating.rate}/5 ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            
            <p className="text-xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
