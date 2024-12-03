// src/components/PayButton1.js
import React from 'react';
import axios from 'axios';
import pay from '../Payments/pay1';
import { useAuth } from '../context/AuthContext1'; // Import useAuth hook

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://bookalogy.onrender.com';

const PayButton1 = ({ orderId, orderAmount, customerId, customerName, customerEmail, customerPhone }) => {
  const { token } = useAuth(); // Use getToken from AuthContext

  const handlePayment = async () => {
    try {
      const uniqueOrderId = `order_${Date.now()}`;

      // Save order details to the backend
      const orderResponse = await axios.post(`${BASE_URL}/api/orders/saveOrder`, {
        orderId: uniqueOrderId,
        orderAmount,
        customerId,
        customerName,
        customerEmail,
        customerPhone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (orderResponse.data) {
        console.log('Order saved:', orderResponse.data);

        // Create payment session
        const paymentResponse = await axios.post(`${BASE_URL}/api/pay/createOrder`, {
          orderId: uniqueOrderId,
          orderAmount,
          customer_id: customerId,
          customerName,
          customerEmail,
          customerPhone,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (paymentResponse.data.sessionId) {
          await pay(paymentResponse.data.sessionId);
        } else {
          console.error('No session ID received from the backend');
        }
      } else {
        console.error('Failed to save order');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <button className="buy-button-custom" onClick={handlePayment}>
      Buy Now
    </button>
  );
};

export default PayButton1;
