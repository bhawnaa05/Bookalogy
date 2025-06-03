import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CarouselComponent.css';

const CarouselComponent = () => {
  return (
    <div className="carousel-container">
      <Carousel controls={false} indicators={false} fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.tyndale.com/sites/readthearc/wp-content/uploads/sites/12/2022/01/open-book-image-420x280.jpg"
            alt="BookAlogy slide"
          />
          <Carousel.Caption className="left-center">
            <h2>Welcome</h2>
            <h3>to our</h3>
            <h1>BookAlogy</h1>
            <h4>You are here</h4>
            <h4>Where Book Lovers Belong.</h4>
            <h4>Book Your Journey to Imagination.</h4>
          </Carousel.Caption>
          <div className="card-overlay">
            <div className="card-content">
              <h3>Get your book</h3>
              <h3>at a very reasonable price.</h3>
              <img
                src="https://www.computerworld.com/wp-content/uploads/2024/10/3574465-0-21363200-1729533128-books_shelves_libary_reading_learning_education_the_last_bookstore_los_angeles_united_states_by_jaredd_craig_cc0_via_unsplash_1200x800-100765106-orig.jpg?quality=50&strip=all"
                alt="Books Library"
                className="card-image"
              />
              <h3>Learn.Live.Laugh.</h3>
            </div>
          </div>
        </Carousel.Item>
        {/* Additional slides can be added here */}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
