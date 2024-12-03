import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../services/api'; // Ensure this fetches books based on genre
import '../css/Home.css';
import BookCard from '../components/BookCard';

function Genre() {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks(); // Fetch all books first
        const filteredBooks = booksData.filter(book => book.category.toLowerCase() === genre.toLowerCase());
        setBooks(filteredBooks);
      } catch (error) {
        setError('Failed to fetch books. Please try again later.');
      }
    };
    getBooks();
  }, [genre]);

  return (
    <div className="home">
      <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)} Books</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Genre;
