import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { Product } from '../types/product';
import ErrorDisplay from '../components/ErrorDisplay';
import { ChevronLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowRight, Check } from 'lucide-react';
import { toast } from '../components/ui/sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

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
          setSelectedImage(data.image);
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
          setSelectedImage(data.image);
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

  const handleAddToCart = () => {
    toast.success('Added to cart', {
      description: `${quantity} ${product?.title} added to your cart`
    });
  };

  const handleBuyNow = () => {
    toast.success('Proceeding to checkout', {
      description: 'You will be redirected to checkout'
    });
  };

  if (error) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-100 rounded w-1/4 mb-4"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-96 bg-gray-100 rounded-lg"></div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
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

  // Generate a few more image URLs for the gallery (in a real app, these would come from the API)
  const galleryImages = [
    product.image,
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ChevronLeft size={20} />
          <span>Back to Products</span>
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Image Gallery */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8">
              <div className="sticky top-24">
                <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center h-96 mb-4">
                  <img 
                    src={selectedImage} 
                    alt={product.title} 
                    className="object-contain max-h-80 transition-all duration-300"
                  />
                </div>
                
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                        selectedImage === img ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.title} view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Product Info */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/5 text-primary rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors">
                      <Heart size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium text-gray-800">{product.rating.rate}</span>
                    <span className="text-gray-500 text-sm ml-1">({product.rating.count} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
                    <span className="text-gray-500 line-through ml-2">₹{(product.price * 1.2).toFixed(2)}</span>
                    <span className="text-green-600 text-sm font-medium ml-2">20% off</span>
                  </div>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button 
                    onClick={handleBuyNow}
                    className="w-full bg-primary/10 text-primary py-3 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Buy Now</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
