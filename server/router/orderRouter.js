const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware

// Get orders for a logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Save order details
router.post('/saveOrder', protect, async (req, res) => {
  try {
    const { orderId, orderAmount, customerId, customerName, customerEmail, customerPhone } = req.body;
    console.log({ orderId, orderAmount, customerId, customerName, customerEmail, customerPhone});
    const newOrder = new Order({
      orderId,
      orderAmount,
      customer: {
        customerId,
        customerName,
        customerEmail,
        customerPhone
      },
      user: req.user._id, // Assuming the user is attached to the request by the protect middleware
      // You might want to add other fields like status, payment details, etc.
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
