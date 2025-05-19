
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Optional: for custom styles

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to FreshCart Grocery Shop</h1>
        <p>Your one-stop shop for fresh groceries delivered to your door!</p>
      </header>

      <nav className="homepage-nav">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </nav>

      <section className="homepage-features">
        <h2>Why Shop With Us?</h2>
        <ul>
          <li>Fresh produce sourced daily</li>
          <li>Fast and reliable delivery</li>
          <li>Easy and secure checkout</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
