const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect } = require('../middleware/authMiddleware'); // Ensure you have authentication middleware

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, description, price, imageUrl, category } = req.body;
    const book = new Book({ title, author, description, price, imageUrl, category });
    await book.save();
    res.status(201).json(book); // Changed to JSON response for consistency
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all books or search books by title
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    const searchCriteria = query ? { title: new RegExp(query, 'i') } : {};
    const books = await Book.find(searchCriteria);
    res.json(books);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get books by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const books = await Book.find({ category: new RegExp(genre, 'i') }); // Case-insensitive match
    res.json(books);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Rate a book
router.post('/rate/:id', protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const { rating } = req.body; // Destructure rating from request body
    const userId = req.user._id; // User ID from token

    // Ensure rating is within a valid range (e.g., 1 to 5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user has already rated this book
    const existingRating = book.ratings.find(r => r.user.toString() === userId.toString());
    if (existingRating) {
      existingRating.rating = rating; // Update existing rating
    } else {
      book.ratings.push({ user: userId, rating }); // Add new rating
    }

    await book.save();
    res.json({ message: 'Rating submitted successfully', book }); // Send a success message with updated book
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
