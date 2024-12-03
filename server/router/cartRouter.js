const express = require('express');
const Cart = require('../models/cartModel');
const { protect } = require('../middleware/authMiddleware'); // Ensure this path is correct
const router = express.Router();

// Add a book to the cart
router.post('/add', protect, async (req, res) => {
  const { bookId, quantity } = req.body;
  console.log({ bookId, quantity });

  // Validation: Ensure bookId and quantity are provided
  if (!bookId || !quantity) {
    return res.status(400).json({ error: 'bookId and quantity are required' });
  }

  const userId = req.user.id;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: { bookId, quantity } } },
      { new: true, upsert: true }
    ).populate('items.bookId');

    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get cart items for the logged-in user
router.get('/', protect, async (req, res) => {
  const userId = req.user.id;
  console.log(`Fetching cart for user: ${userId}`);

  try {
    const cart = await Cart.findOne({ userId }).populate('items.bookId');
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Remove a specific book from the cart
router.post('/remove', protect, async (req, res) => {
  const { bookId } = req.body;
  console.log(`Removing book ${bookId} from cart`);

  // Validation: Ensure bookId is provided
  if (!bookId) {
    return res.status(400).json({ error: 'bookId is required' });
  }

  const userId = req.user.id;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { bookId } } }, // Remove the specific item from the cart
      { new: true }
    ).populate('items.bookId');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Clear the cart for the logged-in user
router.post('/clear', protect, async (req, res) => {
  const userId = req.user.id;
  console.log(`Clearing cart for user: ${userId}`);

  try {
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } } // Clear all items in the cart
    );
    console.log('Cart cleared successfully');
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
