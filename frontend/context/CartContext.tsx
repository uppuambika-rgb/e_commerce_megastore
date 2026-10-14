import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartTotals, Order, Product } from '../types';
import {
  fetchCart,
  apiAddToCart,
  apiUpdateCartItem,
  apiRemoveCartItem,
  apiClearCart,
  apiApplyCoupon,
} from '../services/api';

import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
  addToCart: (productId: number, quantity?: number, color?: string, size?: string) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<string>;
  couponCode: string;
  couponMessage: string | null;
  notificationMessage: string | null;
  clearNotification: () => void;
}

const defaultTotals: CartTotals = {
  subtotal: 0,
  discount: 0,
  shippingFee: 0,
  tax: 0,
  total: 0,
  itemCount: 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<CartTotals>(defaultTotals);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpenState] = useState<boolean>(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState<boolean>(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState<boolean>(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const setIsCheckoutOpen = (open: boolean) => {
    if (open && !isAuthenticated) {
      showNotification('Please sign in or create an account to proceed to checkout.');
      openAuthModal('login');
      return;
    }
    setIsCheckoutOpenState(open);
  };

  useEffect(() => {
    async function loadCartData() {
      try {
        const res = await fetchCart(couponCode || undefined);
        setItems(res.items);
        setTotals(res.totals);
      } catch (err) {
        console.error('Failed to load initial cart:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCartData();
  }, [couponCode, isAuthenticated]);

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const clearNotification = () => {
    setNotificationMessage(null);
  };

  const addToCart = async (
    productId: number,
    quantity: number = 1,
    color?: string,
    size?: string
  ): Promise<boolean> => {
    // ENFORCE USER AUTHENTICATION: Must be logged in to add to cart
    if (!isAuthenticated) {
      showNotification('Please sign in or create an account to add items to your cart.');
      openAuthModal('login');
      return false;
    }

    try {
      const res = await apiAddToCart(productId, quantity, color, size, couponCode);
      setItems(res.items);
      setTotals(res.totals);
      showNotification('Added to bag successfully!');
      return true;
    } catch (err: any) {
      console.error('Failed to add to cart:', err);
      if (err.message && err.message.includes('sign in')) {
        openAuthModal('login');
      }
      showNotification(err.message || 'Failed to add item');
      return false;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await apiUpdateCartItem(itemId, quantity, couponCode);
      setItems(res.items);
      setTotals(res.totals);
    } catch (err: any) {
      console.error('Failed to update quantity:', err);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await apiRemoveCartItem(itemId, couponCode);
      setItems(res.items);
      setTotals(res.totals);
      showNotification('Item removed from bag');
    } catch (err: any) {
      console.error('Failed to remove item:', err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await apiClearCart();
      setItems(res.items);
      setTotals(res.totals);
    } catch (err: any) {
      console.error('Failed to clear cart:', err);
    }
  };

  const applyCoupon = async (code: string): Promise<string> => {
    try {
      const res = await apiApplyCoupon(code);
      setCouponCode(res.couponCode);
      setCouponMessage(res.message);
      setTotals(res.totals);
      return res.message;
    } catch (err: any) {
      setCouponMessage(null);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isLoading,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        couponCode,
        couponMessage,
        notificationMessage,
        clearNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
