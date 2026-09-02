import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('skt_react_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Pending item waiting for user to login
  const [pendingCartItem, setPendingCartItem] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('skt_react_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // When user logs in, if there's a pending item, auto-add it to cart!
  useEffect(() => {
    if (user && pendingCartItem) {
      performAddToCart(pendingCartItem.product, pendingCartItem.quantity);
      setPendingCartItem(null);
      setShowAuthModal(false);
    }
  }, [user, pendingCartItem]);

  const performAddToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + quantity, 99) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          old_price: product.old_price ? Number(product.old_price) : null,
          category: product.category,
          image_url: product.image_url,
          qty: quantity
        }
      ];
    });
  };

  const addToCart = (product, quantity = 1) => {
    if (!user) {
      // Require login before adding to cart
      setPendingCartItem({ product, quantity });
      setShowAuthModal(true);
      return false;
    }
    performAddToCart(product, quantity);
    return true;
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.min(quantity, 99) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        subtotal,
        showAuthModal,
        setShowAuthModal,
        pendingCartItem,
        setPendingCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
