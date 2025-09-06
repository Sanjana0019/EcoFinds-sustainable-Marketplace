import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { Product } from '../App';

interface MyListingsPageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  currency?: 'USD' | 'INR';
  formatPrice?: (price: number) => string;
}

export function MyListingsPage({ products, onProductClick, onDeleteProduct, currency = 'USD', formatPrice }: MyListingsPageProps) {
  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      onDeleteProduct(productId);
    }
  };

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Listings</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{products.length}</p>
              <p className="text-sm text-gray-600">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {formatPrice ? formatPrice(totalValue) : `${totalValue.toFixed(2)}`}
              </p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              showActions
              onDelete={() => handleDelete(product.id)}
              currency={currency}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-gray-400 text-2xl">📦</div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start selling your items on EcoFinds! Add your first product to begin your sustainable marketplace journey.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      {products.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-sm text-green-700 mb-1">Most Expensive</p>
            <p className="text-xl font-bold text-green-800">
              {formatPrice ? formatPrice(Math.max(...products.map(p => p.price))) : `${Math.max(...products.map(p => p.price)).toFixed(2)}`}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-700 mb-1">Average Price</p>
            <p className="text-xl font-bold text-blue-800">
              {formatPrice ? formatPrice(totalValue / products.length) : `${(totalValue / products.length).toFixed(2)}`}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-sm text-purple-700 mb-1">Categories</p>
            <p className="text-xl font-bold text-purple-800">
              {new Set(products.map(p => p.category)).size}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}