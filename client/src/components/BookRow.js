import React, { useRef, useState } from 'react';
import BookCard from './BookCard';
import '../css/BookRow.css';

const BookRow = ({ title, books }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef(null);

  const handleScroll = (scrollAmount) => {
    if (rowRef.current) {
      const newScrollPosition = scrollPosition + scrollAmount;
      rowRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <div className="book-row">
      <h2>{title}</h2>
      <div className="book-row__container">
        <button
          className="book-row__button book-row__button--left"
          onClick={() => handleScroll(-200)}
        >
          {"<"}
        </button>
        <div
          ref={rowRef}
          className="book-row__list"
          style={{
            width: '1100px',
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
          }}
        >
          <div className="book-row__content-box">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
        <button
          className="book-row__button book-row__button--right"
          onClick={() => handleScroll(200)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default BookRow;
