import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  currency?: 'USD' | 'INR';
  formatPrice?: (price: number) => string;
}

export function ProductCard({ product, onClick, showActions, onEdit, onDelete, currency = 'USD', formatPrice }: ProductCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when action buttons are clicked
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick();
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden group transform hover:-translate-y-2"
      onClick={handleCardClick}
    >
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <ImageWithFallback
          src={product.imageUrl || ''}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold shadow-sm">
            {product.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
            <span className="text-green-600 text-sm">❤️</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors duration-200">{product.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <p className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-200">
              {formatPrice ? formatPrice(product.price) : `${product.price}`}
            </p>
            <div className="text-right">
              <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                {product.createdAt.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="flex-1 px-3 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}