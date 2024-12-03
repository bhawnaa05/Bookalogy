import React, { useState, useEffect } from 'react';
import Navbar from '../pages/Navbar';
import CarouselComponent from '../components/CarouselComponent';
import BookRow from '../components/BookRow';
import { fetchBooksByCategory } from '../services/api';
import '../css/Home.css';

const Home = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const popular = await fetchBooksByCategory('popular');
        const wishlist = await fetchBooksByCategory('wishlist');
        const recommended = await fetchBooksByCategory('recommended');

        setPopularBooks(popular);
        setWishlistBooks(wishlist);
        setRecommendedBooks(recommended);
      } catch (error) {
        setError('Failed to fetch books. Please try again later.');
      }
    };
    getBooks();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <CarouselComponent />
      {error && <p className="error-message">{error}</p>}
      <div className="book-rows">
        <BookRow title="Popular Books" books={popularBooks} />
        <BookRow title="Wishlist Books" books={wishlistBooks} />
        <BookRow title="Recommended Books" books={recommendedBooks} />
      </div>
    </div>
  );
};

export default Home;
