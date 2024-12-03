import React from 'react';
import '../css/AboutUs.css'; // Ensure you have this CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-card">
        <h1 className="about-us-title">About Us</h1>
        <p className="about-us-content">Welcome to BookAlogy!</p>
        <p className="about-us-content">At BookAlogy, we are passionate about books and dedicated to providing our customers with a wide selection of titles to suit every taste. Our goal is to create a seamless and enjoyable shopping experience for book lovers around the world.</p>
        <p className="about-us-content">Founded in [Year], BookAlogy started as a small bookstore and has grown into a thriving online platform where you can find your favorite books, explore new genres, and enjoy special offers. We pride ourselves on our customer service and strive to make every visit to our site a pleasant one.</p>
        <p className="about-us-content">Thank you for choosing BookAlogy. We look forward to serving you and helping you find your next great read!</p>
      </div>
    </div>
  );
};

export default AboutUs;
