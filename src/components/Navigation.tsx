import React from 'react';
import { Home, Plus, Package, ShoppingCart, History, User, LogOut } from 'lucide-react';
import { Screen } from '../App';
import logoImage from 'figma:asset/76d6c4f9bf1e01a42845334754c1cab274c67eff.png';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  cartItemCount: number;
}

export function Navigation({ currentScreen, onNavigate, onLogout, cartItemCount }: NavigationProps) {
  const navItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home', showOnMobile: true },
    { screen: 'add-product' as Screen, icon: Plus, label: 'Add Product', showOnMobile: true },
    { screen: 'my-listings' as Screen, icon: Package, label: 'My Listings', showOnMobile: true },
    { screen: 'cart' as Screen, icon: ShoppingCart, label: 'Cart', showOnMobile: true, badge: cartItemCount },
    { screen: 'purchases' as Screen, icon: History, label: 'Purchases', showOnMobile: false },
    { screen: 'profile' as Screen, icon: User, label: 'Profile', showOnMobile: false },
  ];

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <nav className="hidden md:flex bg-white shadow-sm border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img
                src={logoImage}
                alt="EcoFinds Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">EcoFinds</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navItems.map(({ screen, icon: Icon, label, badge }) => (
              <button
                key={screen}
                onClick={() => onNavigate(screen)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors relative ${
                  currentScreen === screen
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          {navItems
            .filter(item => item.showOnMobile)
            .map(({ screen, icon: Icon, label, badge }) => (
              <button
                key={screen}
                onClick={() => onNavigate(screen)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors relative ${
                  currentScreen === screen
                    ? 'text-green-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          
          {/* Mobile Menu for Other Options */}
          <div className="relative">
            <button
              onClick={() => onNavigate('profile')}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                ['profile', 'purchases'].includes(currentScreen)
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}
            >
              <User size={20} />
              <span className="text-xs">More</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Header with Logo */}
      <header className="md:hidden bg-white shadow-sm border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img
                src={logoImage}
                alt="EcoFinds Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">EcoFinds</h1>
          </div>
          
          {/* Mobile-only actions */}
          <div className="flex items-center space-x-2">
            {!['profile', 'purchases'].includes(currentScreen) && (
              <>
                <button
                  onClick={() => onNavigate('purchases')}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <History size={20} />
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}