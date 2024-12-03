import React from 'react';
import { Link } from 'react-router-dom';
import '../css/BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book._id}`}>
        <img src={book.imageUrl} alt={book.title} className="book-image" />
      </Link>
    </div>
    
  );
};

export default BookCard;
