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
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tyndale.com%2Fsites%2Freadthearc%2Ftag%2Fchristian-novels%2F&psig=AOvVaw1Kx3w2UoakkxwFoeVnFZ3z&ust=1742374539542000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDiuZahk4wDFQAAAAAdAAAAABAE"
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
                src="https://www.teahub.io/photos/full/190-1905414_books-library-wallpaper-hd-wallpapers-for-pc-book.jpg"
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
