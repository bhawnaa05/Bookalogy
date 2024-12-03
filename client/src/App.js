import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Genre from './pages/Genre';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './pages/Profile'; // Import Profile component
import SearchResult from './components/SearchResult';
import ManageProfile from './components/ManageProfile';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Orders from './pages/Orders';
import "./App.css";
import AboutUs from './pages/AboutUs';
import BookDetail from './components/BookDetail'
import Admin from './components/Admin';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre/:genre" element={<Genre />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} /> {/* Add profile route */}
          <Route path="/search" element={<SearchResult />} />
          <Route path="/manage-profile" element={<ManageProfile />} /> 
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
