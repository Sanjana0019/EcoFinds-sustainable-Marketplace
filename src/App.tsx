import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { HomePage } from "./components/HomePage";
import { AddProductPage } from "./components/AddProductPage";
import { MyListingsPage } from "./components/MyListingsPage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { CartPage } from "./components/CartPage";
import { PurchasesPage } from "./components/PurchasesPage";
import { ProfilePage } from "./components/ProfilePage";

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  sellerId: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Screen =
  | "login"
  | "register"
  | "home"
  | "add-product"
  | "my-listings"
  | "product-detail"
  | "cart"
  | "purchases"
  | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("login");
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  // Sample products data with beautiful images
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Vintage Denim Jacket",
      category: "Clothing",
      description:
        "Classic vintage denim jacket in excellent condition. Perfect for sustainable fashion lovers. Timeless style with authentic wear.",
      price: 45,
      sellerId: "user2",
      imageUrl:
        "https://images.unsplash.com/photo-1556041068-5874261f23e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc1NzEzMjcyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Wooden Coffee Table",
      category: "Furniture",
      description:
        "Handcrafted wooden coffee table with natural grain patterns. Some wear but very sturdy. Perfect centerpiece for any living room.",
      price: 120,
      sellerId: "user3",
      imageUrl:
        "https://images.unsplash.com/photo-1754999809963-79a41e8fb648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjb2ZmZWUlMjB0YWJsZSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NTcxMzI3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      title: "iPhone 12 Pro",
      category: "Electronics",
      description:
        "iPhone 12 Pro in excellent condition. Battery health 85%. Includes original charger and protective case. No scratches on screen.",
      price: 599,
      sellerId: "user4",
      imageUrl:
        "https://images.unsplash.com/photo-1674105644415-ceeee2f8eff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpUGhvbmUlMjBzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTcxMzI3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-01"),
    },
    {
      id: "4",
      title: "Leather Work Boots",
      category: "Clothing",
      description:
        "Genuine leather work boots with excellent durability. Well-maintained with plenty of life left. Perfect for outdoor work or fashion.",
      price: 85,
      sellerId: "user5",
      imageUrl:
        "https://images.unsplash.com/photo-1482627663883-327aa8c0cefe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbGVhdGhlciUyMGJvb3RzJTIwc2hvZXN8ZW58MXx8fHwxNzU3MTMyNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-03"),
    },
    {
      id: "5",
      title: "Collection of Classic Books",
      category: "Books",
      description:
        "Curated collection of classic literature books in good condition. Perfect for book lovers and collectors. Mix of genres included.",
      price: 25,
      sellerId: "user6",
      imageUrl:
        "https://images.unsplash.com/photo-1684859634430-3fb8d390e119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3NoZWxmJTIwYm9va3N8ZW58MXx8fHwxNzU3MTMyNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-05"),
    },
    {
      id: "6",
      title: "Urban Commuter Bicycle",
      category: "Sports",
      description:
        "Reliable urban bicycle perfect for daily commuting. Well-maintained with new tires. Includes bike lock and lights.",
      price: 220,
      sellerId: "user7",
      imageUrl:
        "https://images.unsplash.com/photo-1642158097299-ecf5a136247e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhiaWN5Y2xlJTIwdXJiYW4lMjB0cmFuc3BvcnR8ZW58MXx8fHwxNzU3MTMyNzM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-08"),
    },
    {
      id: "7",
      title: "Succulent Plant Collection",
      category: "Home & Garden",
      description:
        "Beautiful collection of healthy succulent plants in decorative pots. Easy to care for and perfect for home decoration.",
      price: 15,
      sellerId: "user8",
      imageUrl:
        "https://images.unsplash.com/photo-1591661287055-96c54cb2e4f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudCUyMHBvdCUyMGhvbWV8ZW58MXx8fHwxNzU3MTMyNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-10"),
    },
    {
      id: "8",
      title: "Hiking Backpack",
      category: "Sports",
      description:
        "High-quality hiking backpack with multiple compartments. Lightly used on a few weekend trips. Great for outdoor adventures.",
      price: 75,
      sellerId: "user9",
      imageUrl:
        "https://images.unsplash.com/photo-1729543983267-4b8b621191a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwYmFja3BhY2slMjBvdXRkb29yJTIwZ2VhcnxlbnwxfHx8fDE3NTcxMzI3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-12"),
    },
    {
      id: "9",
      title: "Vintage Ceramic Mug Set",
      category: "Home & Garden",
      description:
        "Set of 4 vintage ceramic mugs with beautiful glaze patterns. Perfect for your morning coffee or tea routine. No chips or cracks.",
      price: 18,
      sellerId: "user10",
      imageUrl:
        "https://images.unsplash.com/photo-1689402059898-d097d15eeb98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2VyYW1pYyUyMG11ZyUyMGtpdGNoZW58ZW58MXx8fHwxNzU3MTMyNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-14"),
    },
    {
      id: "10",
      title: "Designer Sunglasses",
      category: "Clothing",
      description:
        "Stylish designer sunglasses in excellent condition. UV protection included. Comes with original case and cleaning cloth.",
      price: 65,
      sellerId: "user11",
      imageUrl:
        "https://images.unsplash.com/photo-1523754865311-b886113bb8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMGFjY2Vzc29yeXxlbnwxfHx8fDE3NTcwOTA5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: new Date("2024-02-16"),
    },
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<
    Product[]
  >([]);

  // Currency conversion rate (simplified - in real app this would come from an API)
  const USD_TO_INR = 83.12;

  // Format price based on currency
  const formatPrice = (price: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(price * USD_TO_INR).toLocaleString('en-IN')}`;
    }
    return `${price}`;
  };

  // Check for existing user session
  useEffect(() => {
    const savedUser = localStorage.getItem("ecofinds-user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentScreen("home");
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - in real app this would validate credentials
    const user: User = {
      id: "user1",
      username: email.split("@")[0],
      email: email,
    };
    setCurrentUser(user);
    localStorage.setItem("ecofinds-user", JSON.stringify(user));
    setCurrentScreen("home");
  };

  const register = (
    username: string,
    email: string,
    password: string,
  ) => {
    // Mock registration
    const user: User = {
      id: "user1",
      username: username,
      email: email,
    };
    setCurrentUser(user);
    localStorage.setItem("ecofinds-user", JSON.stringify(user));
    setCurrentScreen("home");
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ecofinds-user");
    setCurrentScreen("login");
    setCartItems([]);
  };

  const addProduct = (
    productData: Omit<Product, "id" | "sellerId" | "createdAt">,
  ) => {
    if (!currentUser) return;

    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      sellerId: currentUser.id,
      createdAt: new Date(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    setCurrentScreen("my-listings");
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) =>
      prev.filter((p) => p.id !== productId),
    );
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const checkout = () => {
    const purchasedProducts = cartItems.map(
      (item) => item.product,
    );
    setPurchaseHistory((prev) => [
      ...prev,
      ...purchasedProducts,
    ]);
    setCartItems([]);
    setCurrentScreen("purchases");
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen("product-detail");
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const userProducts = products.filter(
    (p) => p.sellerId === currentUser?.id,
  );

  // Don't show navigation on auth screens
  const showNavigation =
    currentUser &&
    currentScreen !== "login" &&
    currentScreen !== "register";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#335536' }}>
      {showNavigation && (
        <Navigation
          currentScreen={currentScreen}
          onNavigate={navigateToScreen}
          onLogout={logout}
          cartItemCount={cartItems.length}
        />
      )}

      <main className="flex-1 pb-20 md:pb-0">
        {currentScreen === "login" && (
          <LoginPage
            onLogin={login}
            onSwitchToRegister={() =>
              setCurrentScreen("register")
            }
          />
        )}

        {currentScreen === "register" && (
          <RegisterPage
            onRegister={register}
            onSwitchToLogin={() => setCurrentScreen("login")}
          />
        )}

        {currentScreen === "home" && (
          <HomePage
            products={products}
            onProductClick={navigateToProduct}
            onAddProduct={() => setCurrentScreen("add-product")}
            currency={currency}
            onCurrencyChange={setCurrency}
            formatPrice={formatPrice}
          />
        )}

        {currentScreen === "add-product" && (
          <AddProductPage
            onAddProduct={addProduct}
            onCancel={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "my-listings" && (
          <MyListingsPage
            products={userProducts}
            onProductClick={navigateToProduct}
            onDeleteProduct={deleteProduct}
            currency={currency}
            formatPrice={formatPrice}
          />
        )}

        {currentScreen === "product-detail" &&
          selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onAddToCart={addToCart}
              onBack={() => setCurrentScreen("home")}
              isOwnProduct={
                selectedProduct.sellerId === currentUser?.id
              }
            />
          )}

        {currentScreen === "cart" && (
          <CartPage
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            onCheckout={checkout}
            currency={currency}
            formatPrice={formatPrice}
          />
        )}

        {currentScreen === "purchases" && (
          <PurchasesPage
            purchases={purchaseHistory}
            onProductClick={navigateToProduct}
            currency={currency}
            formatPrice={formatPrice}
          />
        )}

        {currentScreen === "profile" && currentUser && (
          <ProfilePage
            user={currentUser}
            onUpdateUser={setCurrentUser}
          />
        )}
      </main>
    </div>
  );
}