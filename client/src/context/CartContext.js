import React, { createContext, useState, useContext, useCallback } from 'react';
import { fetchCart as fetchCartApi, addToCart as addToCartApi, removeFromCart as removeFromCartApi, clearCart as clearCartApi } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await fetchCartApi(token);
      console.log('Cart fetched:', data);
      setCart(data.items); // Adjust based on your cart data structure
    } catch (error) {
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (bookId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await addToCartApi(token, bookId, quantity);
      console.log('Item added to cart');
      fetchCart(); // Refresh the cart after adding
    } catch (error) {
      setError('Failed to add to cart');
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await clearCartApi(token);
      console.log('Cart cleared');
      fetchCart(); // Refresh the cart after clearing
    } catch (error) {
      setError('Failed to clear cart');
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await removeFromCartApi(token, bookId);
      fetchCart(); // Refresh the cart
    } catch (error) {
      setError('Failed to remove book from cart');
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, clearCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
