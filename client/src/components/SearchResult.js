import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard'; // Import the BookCard component
import '../css/SearchResult.css';

const SearchResult = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books?query=${query}`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch search results. Please try again later.');
        setLoading(false);
      }
    };
    fetchBooksData();
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="search-result-container">
      <div className="search-result-header">
        <h2 className="search-result-title">Search Results</h2>
        <span className="search-result-count">{books.length} results found</span>
      </div>
      <div className="book-list">
        {books.length > 0 ? (
          books.map(book => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
