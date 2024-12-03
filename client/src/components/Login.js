import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Import the CSS file
import { useAuth } from '../context/AuthContext1'; // Import the useAuth hook

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Call the login function from AuthContext
      console.log("Login successful, redirecting to home...");
      setEmail(''); // Clear form fields
      setPassword('');
      navigate('/'); // Redirect to home or any other page
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.'); // Show error message to user
    }
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
