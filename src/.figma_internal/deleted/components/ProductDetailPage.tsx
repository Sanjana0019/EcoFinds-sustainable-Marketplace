import React from 'react';
import { ArrowLeft, ShoppingCart, Calendar, Tag, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  isOwnProduct?: boolean;
}

export function ProductDetailPage({ product, onAddToCart, onBack, isOwnProduct }: ProductDetailPageProps) {
  const handleAddToCart = () => {
    onAddToCart(product);
    // Show a simple confirmation
    alert('Product added to cart!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium text-gray-900 ml-2">Product Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={product.imageUrl || ''}
              alt={product.title}
              className="w-full h-full object-cover"
              fallbackClassName="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100"
              fallbackContent={
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-4xl">📦</span>
                  </div>
                  <p className="text-green-600 font-medium">No Image Available</p>
                  <p className="text-green-500 text-sm mt-1">Product photo not provided</p>
                </div>
              }
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <Badge variant="secondary" className="ml-2">
                {product.category}
              </Badge>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-4">${product.price}</p>
          </div>

          {/* Product Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border border-gray-100">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Tag className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-900">{product.category}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Listed</p>
                  <p className="font-medium text-gray-900">
                    {product.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <Card className="border border-gray-100">
              <CardContent className="p-4">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Seller Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
            <Card className="border border-gray-100">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {isOwnProduct ? 'You' : 'Seller'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isOwnProduct ? 'This is your listing' : 'Verified seller'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isOwnProduct && (
              <Button
                onClick={handleAddToCart}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </Button>
            )}
            
            {isOwnProduct && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">ℹ</span>
                  </div>
                  <p className="text-blue-800 font-medium">This is your listing</p>
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  You can edit or delete this product from your listings page.
                </p>
              </div>
            )}
          </div>

          {/* Sustainability Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🌱</span>
              </div>
              <p className="text-green-800 font-medium">Sustainable Choice</p>
            </div>
            <p className="text-green-700 text-sm">
              By buying second-hand, you're helping reduce waste and supporting a more sustainable future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}