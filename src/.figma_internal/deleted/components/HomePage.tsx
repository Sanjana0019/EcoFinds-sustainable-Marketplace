import React, { useState } from 'react';
import { Search, Plus, Filter, DollarSign, IndianRupee, TrendingUp, TrendingDown, Clock, BarChart3, Users, MapPin, Zap, Recycle } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProductCard } from './ProductCard';
import { Product } from '../App';
import heroImage from 'figma:asset/60df47a3848581ccda063a5432a000b5095f0bb1.png';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddProduct: () => void;
  currency?: 'USD' | 'INR';
  onCurrencyChange?: (currency: 'USD' | 'INR') => void;
  formatPrice?: (price: number) => string;
}

const categories = ['All', 'Clothing', 'Electronics', 'Furniture', 'Books', 'Home & Garden', 'Sports', 'Other'];

// Currency conversion rate (simplified - in real app this would come from an API)
const USD_TO_INR = 83.12;

export function HomePage({ products, onProductClick, onAddProduct, currency = 'USD', onCurrencyChange, formatPrice }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high'>('newest');
  const [priceRange, setPriceRange] = useState<'all' | 'under-50' | '50-200' | 'over-200'>('all');

  // Mock user eco karma score
  const ecoKarmaScore = 847;
  const ecoLevel = 'Green Guardian';
  
  // Format price function - use prop if available, otherwise default formatting
  const formatPriceLocal = formatPrice || ((price: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(price * USD_TO_INR).toLocaleString('en-IN')}`;
    }
    return `${price}`;
  });

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Price range filter (always in USD for consistency)
      let matchesPriceRange = true;
      switch (priceRange) {
        case 'under-50':
          matchesPriceRange = product.price < 50;
          break;
        case '50-200':
          matchesPriceRange = product.price >= 50 && product.price <= 200;
          break;
        case 'over-200':
          matchesPriceRange = product.price > 200;
          break;
      }
      
      return matchesSearch && matchesCategory && matchesPriceRange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#335536' }}>
      {/* Hero Section with Uploaded Design */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={heroImage}
          alt="EcoFinds - From One Hand to Another"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 tracking-wider transform transition-all duration-500 hover:scale-110 hover:text-[#808000] cursor-default">
            FROM ONE<br />HAND TO ANOTHER
          </h1>
        </div>
        
        {/* Button at Bottom */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Button
            onClick={onAddProduct}
            className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus size={20} className="mr-2 relative top-1"/>
            Start Your Journey
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: '#335536' }}>
        {/* Eco Features Dashboard */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-700 flex items-center">
                <Zap size={16} className="mr-2" />
                Eco Karma Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{ecoKarmaScore}</div>
              <Badge variant="secondary" className="text-xs bg-green-200 text-green-800 mt-1">
                {ecoLevel}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-700 flex items-center">
                <BarChart3 size={16} className="mr-2" />
                Lifecycle Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-800">
                <div>CO₂ Saved: 127kg</div>
                <div>Water Saved: 2.4k L</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-700 flex items-center">
                <Users size={16} className="mr-2" />
                Swap Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-800">
                <div>5 Swap Matches</div>
                <div className="text-xs text-purple-600">Near you</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-700 flex items-center">
                <MapPin size={16} className="mr-2" />
                Impact Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-orange-800">
                <div>Local Impact: High</div>
                <div className="text-xs text-orange-600">Your city rank #3</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filters and Currency Toggle */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      Newest First
                    </div>
                  </SelectItem>
                  <SelectItem value="oldest">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      Oldest First
                    </div>
                  </SelectItem>
                  <SelectItem value="price-low">
                    <div className="flex items-center">
                      <TrendingUp size={14} className="mr-2" />
                      Price: Low to High
                    </div>
                  </SelectItem>
                  <SelectItem value="price-high">
                    <div className="flex items-center">
                      <TrendingDown size={14} className="mr-2" />
                      Price: High to Low
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={priceRange} onValueChange={(value: any) => setPriceRange(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-200">$50 - $200</SelectItem>
                <SelectItem value="over-200">Over $200</SelectItem>
              </SelectContent>
            </Select>

            {/* Currency Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onCurrencyChange?.('USD')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currency === 'USD' 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <DollarSign size={16} className="mr-1" />
                USD
              </button>
              <button
                onClick={() => onCurrencyChange?.('INR')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currency === 'INR' 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <IndianRupee size={16} className="mr-1" />
                INR
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {searchQuery || selectedCategory !== 'All' 
                ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} found`
                : 'Discover Sustainable Finds'
              }
            </h2>
            <p className="text-gray-200">
              {searchQuery || selectedCategory !== 'All' 
                ? 'Matching your search criteria'
                : 'Quality second-hand products from trusted sellers'
              }
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`
                }}
              >
                <ProductCard
                  product={product}
                  onClick={() => onProductClick(product)}
                  currency={currency}
                  formatPrice={formatPriceLocal}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="text-gray-400" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No products found</h3>
            <p className="text-gray-200 mb-8 text-lg max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria to find what you\'re looking for'
                : 'Be the first to list a product and start your sustainable selling journey!'
              }
            </p>
            <Button
              onClick={onAddProduct}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Plus size={18} className="mr-2" />
              Add Your First Product
            </Button>
          </div>
        )}

        {/* Eco Features Detailed Section */}
        <div className="mt-16">
          <Tabs defaultValue="karma" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="karma">Eco Karma</TabsTrigger>
              <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
              <TabsTrigger value="swap">Swap Assistant</TabsTrigger>
              <TabsTrigger value="map">Impact Map</TabsTrigger>
            </TabsList>

            <TabsContent value="karma" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 text-green-600" />
                    Your Eco Karma Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-green-600">{ecoKarmaScore}</div>
                      <Badge className="bg-green-100 text-green-800">{ecoLevel}</Badge>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>153 points to next level</div>
                      <div className="text-xs">Green Champion</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-blue-600">23</div>
                      <div className="text-sm text-gray-600">Eco Purchases</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-purple-600">8</div>
                      <div className="text-sm text-gray-600">Recycling Actions</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-orange-600">12</div>
                      <div className="text-sm text-gray-600">Community Events</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lifecycle" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 text-blue-600" />
                    Product Lifecycle Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">127kg</div>
                        <div className="text-sm text-blue-800">CO₂ Saved</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">2,400L</div>
                        <div className="text-sm text-green-800">Water Saved</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Raw Material Source → Manufacturing
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Shipping → Packaging
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        Consumer Use → Recycling
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="swap" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 text-purple-600" />
                    AI-Powered Eco Swap Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-lg font-semibold text-purple-800 mb-2">5 Swap Matches Found</div>
                      <div className="text-sm text-purple-600">
                        Based on your interests and nearby location
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Vintage Camera</div>
                          <div className="text-sm text-gray-600">2.3km away</div>
                        </div>
                        <Badge variant="secondary">Photography</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Designer Books</div>
                          <div className="text-sm text-gray-600">1.8km away</div>
                        </div>
                        <Badge variant="secondary">Literature</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 text-orange-600" />
                    Eco Impact Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-lg font-semibold text-orange-600">#3</div>
                        <div className="text-sm text-orange-800">Your City Rank</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">1,247</div>
                        <div className="text-sm text-green-800">Local Actions</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Recycle className="mr-2 text-green-500" size={16} />
                        <span className="text-sm">423 items recycled this month</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 text-blue-500" size={16} />
                        <span className="text-sm">89 active community members</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 text-purple-500" size={16} />
                        <span className="text-sm">12 local eco-initiatives supported</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={onAddProduct}
          className="fixed bottom-24 md:bottom-8 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-40"
        >
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
}