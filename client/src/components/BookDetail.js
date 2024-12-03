import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/BookDetail.css';
import PayButton1 from '../components/PayButton1';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext1';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://bookalogy.onrender.com';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { addToCart, fetchCart } = useCart();

  // State for rating
  const [userRating, setUserRating] = useState(0); // To track the user's selected rating
  const [averageRating, setAverageRating] = useState(0); // To track the average rating

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/books/${id}`);
        setBook(response.data);
        const avgRating = response.data.ratings.reduce((acc, rating) => acc + rating.rating, 0) / (response.data.ratings.length || 1);
        setAverageRating(avgRating.toFixed(1)); // Calculate and set average rating
      } catch (error) {
        setError('Failed to fetch book details. Please try again later.');
      }
    };

    fetchBookDetails();
  }, [id]);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleAddToCartClick = async () => {
    if (user) {
      try {
        await addToCart(book._id, quantity);
        await fetchCart(user.token);
        alert('Book added to cart successfully!');
      } catch (error) {
        console.error('Error adding to cart:', error.response?.data || error.message);
        alert('Failed to add book to cart.');
      }
    } else {
      alert('Please log in to add items to your cart.');
    }
  };

  const handleRatingSubmit = async (newRating) => {
    if (user && user.token) {  // Ensure user and user.token are valid
        console.log("User Token:", user.token); // Log the token for debugging
        try {
            const response = await axios.post(
                `${BASE_URL}/api/books/rate/${id}`,
                { rating: newRating },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            alert('Rating submitted successfully!');
            // Re-fetch the book details to show updated rating
            const bookResponse = await axios.get(`${BASE_URL}/api/books/${id}`);
            setBook(bookResponse.data);
        } catch (error) {
            console.error('Error submitting rating:', error.response?.data || error.message);
            alert('Failed to submit rating.');
        }
    } else {
        console.log("User object or token is undefined."); // Debug log
        alert('Please log in to rate this book.'); // Alert if user is not logged in
    }
};
  
  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="book-details-custom">
      <img src={book.imageUrl} alt={book.title} className="book-image-custom" />
      <div className="book-details-content-custom">
        <h2 className="book-title-custom">{book.title}</h2>
        <p className="book-category-custom">Category: {book.category}</p>
        <p className="book-author-custom">Author: {book.author}</p>

        <div className="book-rating-custom">
          <span>Rating: {averageRating} / 5</span>
        </div>

        <hr className="divider" />
        
        <div className="book-details-main">
          <div className={`book-description-custom ${expanded ? '' : 'book-description-collapsed'}`}>
            {expanded ? (
              <>
                {book.description}
                <span className="expand-description-custom" onClick={toggleDescription}>
                  Read Less
                </span>
              </>
            ) : (
              <>
                {book.description.slice(0, 400)}
                {book.description.length > 400 && (
                  <span className="expand-description-custom" onClick={toggleDescription}>
                    ... Read More
                  </span>
                )}
              </>
            )}
          </div>
          <div className="book-actions-custom">
            {user && (
              <>
                <button onClick={handleAddToCartClick} className="add-to-cart-button">Add to Cart</button>
                <PayButton1
                  orderId={id}
                  orderAmount={book.price * quantity}
                  customerId={user._id}
                  customerName={user.name}
                  customerEmail={user.email}
                  customerPhone={user.phone}
                />
              </>
            )}
          </div>
        </div>

        <div className="quantity-and-price">
          <div className="quantity-selector">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <p className="book-price-custom">Price: ₹{book.price}</p>
        </div>

        {user && (
          <div className="book-rating-input">
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className='star'
                  style={{
                    cursor: 'pointer',
                    color: userRating >= star ? 'gold' : 'gray',
                    fontSize: '35px',
                  }}
                  onClick={() => {
                    setUserRating(star); // Update local rating state on star click
                    handleRatingSubmit(star); // Submit new rating
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="rating-question">What do you think about this book?</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
