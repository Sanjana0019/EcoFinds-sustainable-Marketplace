import React from 'react';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CartItem } from '../App';

interface CartPageProps {
  cartItems: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
  currency?: 'USD' | 'INR';
  formatPrice?: (price: number) => string;
}

export function CartPage({ cartItems, onRemoveFromCart, onCheckout, currency = 'USD', formatPrice }: CartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const totalFormatted = formatPrice ? formatPrice(total) : `${total.toFixed(2)}`;
    if (window.confirm(`Proceed with checkout for ${totalFormatted}?`)) {
      onCheckout();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.product.id} className="border border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.imageUrl || ''}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">{item.product.category}</p>
                      <p className="font-medium text-green-600">
                        {formatPrice ? formatPrice(item.product.price) : `${item.product.price}`}
                      </p>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Qty</p>
                        <p className="font-medium">{item.quantity}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold text-gray-900">
                          {formatPrice ? formatPrice(item.product.price * item.quantity) : `${(item.product.price * item.quantity).toFixed(2)}`}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border border-gray-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice ? formatPrice(subtotal) : `${subtotal.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>{formatPrice ? formatPrice(tax) : `${tax.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice ? formatPrice(total) : `${total.toFixed(2)}`}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Secure checkout powered by EcoFinds
                </p>
              </CardContent>
            </Card>

            {/* Sustainability Impact */}
            <Card className="border border-green-200 bg-green-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-800 mb-2">🌱 Environmental Impact</h4>
                <p className="text-sm text-green-700">
                  By choosing second-hand items, you're preventing {cartItems.length} product{cartItems.length !== 1 ? 's' : ''} from going to waste and reducing environmental impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Empty Cart */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">
            Discover amazing second-hand products and start your sustainable shopping journey!
          </p>
        </div>
      )}
    </div>
  );
}