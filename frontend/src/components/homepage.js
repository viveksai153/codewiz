import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1>CodeWiz</h1>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger-icon">&#9776;</span>
        </button>
      </nav>
      <div className="homepage">
        <header className="header">
          <h1 className="title">Code Snippet Organizer</h1>
          <p className="subtitle">Organize, share, and discover code snippets effortlessly</p>
        </header>
        <section className="features">
          <div className="feature">
            <h2 className="feature-title">Effortless Organization</h2>
            <p className="feature-description">Easily categorize and tag your code snippets for quick access.</p>
          </div>
          <div className="feature">
            <h2 className="feature-title">Collaborative Sharing</h2>
            <p className="feature-description">Share your snippets with teammates and collaborate in real-time.</p>
          </div>
          <div className="feature">
            <h2 className="feature-title">Powerful Search</h2>
            <p className="feature-description">Quickly find the code you need with advanced search functionality.</p>
          </div>
        </section>
        <footer className="footer">
          <p className="footer-text">Ready to organize your code snippets?</p>
          <Link to="/signup" className="get-started-button">Get Started</Link>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
