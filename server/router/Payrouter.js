const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const CF_API_BASE_URL = process.env.CF_API_BASE_URL;
const CF_APP_ID = process.env.CF_APP_ID;
const CF_SECRET_KEY = process.env.CF_SECRET_KEY;

router.post('/createOrder', async (req, res) => {
  try {
    const { orderId, orderAmount, customer_id, customerName, customerEmail, customerPhone } = req.body;

    console.log('Received data:', { orderId, orderAmount, customer_id, customerName, customerEmail, customerPhone });

    const orderData = {
      customer_details: {
        customer_id,
        customer_phone: customerPhone,
        customer_email: customerEmail,
      },
      order_amount: orderAmount,
      order_currency: 'INR',
      order_id: orderId,
    };

    const response = await axios.post(CF_API_BASE_URL, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': CF_APP_ID,
        'x-client-secret': CF_SECRET_KEY,
        'x-api-version': '2023-08-01',
      },
    });

    console.log('Cashfree response:', response.data);

    const responseData = response.data;

    if (responseData.order_status === 'ACTIVE') {
      res.json({ sessionId: responseData.payment_session_id });
    } else {
      throw new Error(responseData.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error creating Cashfree order:', error.message);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
