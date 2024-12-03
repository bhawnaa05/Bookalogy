// server/controllers/orderController.js
const Order = require('../models/orderModel');

const getOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getOrdersForUser };
