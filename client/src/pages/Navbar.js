import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext1'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../css/Navbar.css'; // Ensure this path is correct

export default function Navbar() {
  const { user, logout } = useAuth(); // Destructure user and logout from useAuth
  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery and setSearchQuery
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery(""); // Clear the search query after search
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close the profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src='/images/logg.png' alt="logo" className="navbar-logo-image" />
          </Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <span>Genre</span>
            <div className="dropdown-content">
              <Link to="/Genre/fiction">Fiction</Link>
              <Link to="/Genre/non-fiction">Non-Fiction</Link>
              <Link to="/Genre/romantic">Romantic</Link>
              <Link to="/Genre/sci-fi">Sci-Fi</Link>
            </div>
          </li>
          <li><Link to="/about-us">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search books..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="navbar-button">
          {user ? (
            <div className="navbar-profile-link" ref={profileRef}>
              <div className="navbar-profile-avatar" onClick={toggleProfile}>
                {user.name.charAt(0)}
              </div>
              <div className={`navbar-profile-dropdown ${isProfileOpen ? 'active' : ''}`}>
                <div className="profile-popup-content">
                  <div className="profile-name">{user.name}</div>
                  <div className="profile-email">{user.email}</div>
                  <Link to="/manage-profile" className="navbar-link">Manage Profile</Link>
                  <Link to="/orders" className="navbar-link">Your Orders</Link>
                  <Link to="/cart" className="navbar-link">Cart</Link> {/* Add this line */}
                  <Link to="/" onClick={logout} className="navbar-link">Logout</Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/signup" className="navbar-button">Sign Up</Link> | 
              <Link to="/login" className="navbar-button">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
