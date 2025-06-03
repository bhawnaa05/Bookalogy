import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import PayButton1 from '../components/PayButton1'; // Ensure this is default exported
import { useAuth } from '../context/AuthContext1'; // assuming you have an auth context
import '../css/Cart.css';

const Cart = () => {
  const { cart, fetchCart, removeFromCart, clearCart, loading, error } = useCart();
  const { user } = useAuth(); // get user details
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
      setOrderId(`ORDER-${Date.now()}`); // generate a unique order ID
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

  if (!cart.length) return <p>Your cart is empty.</p>;

  const totalAmount = cart.reduce((total, { bookId, quantity }) => total + bookId.price * quantity, 0);

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
        <span>₹{totalAmount}</span>
      </div>

      <div className="cart-buttons">
        <button className="empty" onClick={handleClearCart}>Clear Cart</button>

        {user && (
          <PayButton1
            orderId={orderId}
            orderAmount={totalAmount}
            customerId={user._id}
            customerName={user.name}
            customerEmail={user.email}
            customerPhone={user.phone}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
