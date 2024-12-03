// Orders.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext1';
import { fetchOrders } from '../services/api';
import '../css/Orders.css';
import BookCard from '../components/BookCard';

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (token) {
          const ordersData = await fetchOrders(token);
          setOrders(ordersData);
        } else {
          console.error('Token is missing');
        }
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [token]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>Order ID: {order._id}</div>
                <div>Amount: ₹{order.orderAmount}</div>
              </div>
              <div className="order-details">
                <div>Status: {order.isPaid ? 'Paid' : 'Not Paid'}</div>
                <div>Payment Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</div>
                <div>Delivery Status: {order.isDelivered ? 'Delivered' : 'Not Delivered'}</div>
                <div>Delivery Date: {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : 'N/A'}</div>
              </div>
              <div className="order-items">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.bookId} className="order-item">
                      <BookCard 
                        book={item.bookDetails} 
                        showActions={true} 
                        actionButtons={['Buy it again', 'View your item']}
                      />
                    </div>
                  ))
                ) : (
                  <p>No items found in this order.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
