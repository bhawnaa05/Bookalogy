import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = "https://bookalogy.onrender.com"

export const fetchBooks = async (query = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/api/books`, { params: { query } });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (e) {
    console.error('Error fetching books:', e.message);
    throw e;
  }
};

export const fetchBooksByGenre = async (genre) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/books/genre/${genre}`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (e) {
    console.error('Error fetching books by genre:', e.message);
    throw e;
  }
};

export const fetchBooksByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/books`, { params: { category } });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchOrders = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const saveOrder = async (orderDetails, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/orders/saveOrder`, orderDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};


export const addToCart = async (token, bookId, quantity) => {
  try {
    console.log('bookId:', bookId, 'quantity:', quantity); // Log to check the values

    const response = await axios.post(
      `${BASE_URL}/api/cart/add`,
      { bookId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
    console.error('Error adding to cart:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const removeFromCart = async (token, bookId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/cart/remove`, { bookId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const fetchCart = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const fetchBookDetails = async (bookId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const clearCart = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/cart/clear`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Add rating for a book
export const submitRating = async (token, bookId, rating) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/books/rate/${bookId}`,
      { rating },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
    console.error('Error submitting rating:', errorMessage);
    throw new Error(errorMessage);
  }
};
