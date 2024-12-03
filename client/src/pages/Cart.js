import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../css/Cart.css';

const Cart = () => {
  const { cart, fetchCart, removeFromCart, clearCart, loading, error } = useCart();

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };

    loadCart();
  }, [fetchCart]);

  const handleRemoveFromCart = async (bookId) => {
    try {
      await removeFromCart(bookId);
    } catch (error) {
      console.error('Failed to remove book from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!cart.length) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map(({ bookId, quantity }) => (
          <div key={bookId._id} className="cart-item">
            <img src={bookId.imageUrl} alt={bookId.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{bookId.title}</h3>
              <p>Author: {bookId.author}</p>
              <p>Quantity: {quantity}</p>
              <p>Price: ₹{bookId.price}</p>
              <div className="cart-item-controls">
                <button className="remove" onClick={() => handleRemoveFromCart(bookId._id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <span>Total:</span>
        <span>₹{cart.reduce((total, { bookId, quantity }) => total + bookId.price * quantity, 0)}</span>
      </div>
      <div className="cart-buttons">
        <button className="empty" onClick={handleClearCart}>Clear Cart</button>
        <button className="checkout">Proceed to Pay</button>
      </div>
    </div>
  );
};

export default Cart;
