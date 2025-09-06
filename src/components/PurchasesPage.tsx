import React from 'react';
import { Calendar, Package, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App';

interface PurchasesPageProps {
  purchases: Product[];
  onProductClick: (product: Product) => void;
  currency?: 'USD' | 'INR';
  formatPrice?: (price: number) => string;
}

export function PurchasesPage({ purchases, onProductClick, currency = 'USD', formatPrice }: PurchasesPageProps) {
  const totalSpent = purchases.reduce((sum, product) => sum + product.price, 0);
  const uniqueCategories = new Set(purchases.map(p => p.category)).size;

  // Group purchases by month for better organization
  const purchasesByMonth = purchases.reduce((groups, purchase) => {
    const monthKey = purchase.createdAt.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(purchase);
    return groups;
  }, {} as Record<string, Product[]>);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Purchase History</h1>
        <p className="text-gray-600">Your sustainable shopping journey</p>
      </div>

      {purchases.length > 0 ? (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="border border-gray-100 bg-green-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="text-white" size={20} />
                </div>
                <p className="text-2xl font-bold text-green-600">{purchases.length}</p>
                <p className="text-sm text-green-700">Items Purchased</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 bg-blue-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">💰</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {formatPrice ? formatPrice(totalSpent) : `${totalSpent.toFixed(2)}`}
                </p>
                <p className="text-sm text-blue-700">Total Spent</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 bg-purple-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">🏷️</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{uniqueCategories}</p>
                <p className="text-sm text-purple-700">Categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Purchase History */}
          <div className="space-y-6">
            {Object.entries(purchasesByMonth)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([month, monthPurchases]) => (
                <div key={month}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="text-gray-400" size={16} />
                    <h3 className="font-semibold text-gray-900">{month}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {monthPurchases.length} item{monthPurchases.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {monthPurchases.map((product) => (
                      <Card 
                        key={product.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                        onClick={() => onProductClick(product)}
                      >
                        <div className="aspect-square bg-gray-100 relative overflow-hidden rounded-t-lg">
                          <ImageWithFallback
                            src={product.imageUrl || ''}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            fallbackClassName="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100"
                            fallbackContent={
                              <div className="text-center">
                                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <span className="text-green-600 text-xl">📦</span>
                                </div>
                                <p className="text-green-600 text-sm font-medium">No Image</p>
                              </div>
                            }
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                              {product.category}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-500 text-white text-xs">
                              Purchased
                            </Badge>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900 line-clamp-2">{product.title}</h4>
                            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-bold text-green-600">
                                {formatPrice ? formatPrice(product.price) : `${product.price}`}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Environmental Impact */}
          <Card className="border border-green-200 bg-green-50 mt-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Environmental Impact</h3>
                  <p className="text-green-700 text-sm">Your contribution to sustainability</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">♻️</span>
                  <span className="text-green-700">
                    {purchases.length} items given a second life
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">🌍</span>
                  <span className="text-green-700">
                    Reduced waste and carbon footprint
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
          <p className="text-gray-600 mb-6">
            Start your sustainable shopping journey by browsing our marketplace!
          </p>
        </div>
      )}
    </div>
  );
}