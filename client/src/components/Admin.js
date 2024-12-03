import React, { useState } from 'react';
import axios from 'axios';
import '../css/Admin.css';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = "https://bookalogy.onrender.com"

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState(''); // State for category
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/books`, {
        title,
        author,
        description,
        price: parseFloat(price),
        imageUrl,
        category, // Include category in the POST request
      });

      if (response.status === 201) {
        alert('Book added successfully!');
        setTitle('');
        setAuthor('');
        setDescription('');
        setPrice('');
        setImageUrl('');
        setCategory(''); // Clear category state
        setError(null);
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="admin-page">
      <h2>Add New Book</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Romantic">Romantic</option>
          <option value="Sci-Fi">Sci-Fi</option>
          {/* Add more options based on your genre categories */}
        </select>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AdminPage;
