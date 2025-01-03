import React, { useState } from 'react';
import './navbar.css';
// import { Link } from 'react-router-dom';

const NavBar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleNotificationsDropdown = () => {
    setShowNotificationsDropdown(!showNotificationsDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="brand">CodeWiz</h1>
      </div>
      <div className="navbar-right">
        <div className="dropdown">
          <div className="profile" onClick={toggleProfileDropdown}>
            <i className="fas fa-user"></i>
            <span className="profile-text">Profile</span>
          </div>
          {showProfileDropdown && (
            <div className="dropdown-content">
              {/* <a href="#">Settings</a> */}
              {/* <a href="#">Logout</a> */}
            </div>
          )}
        </div>
        <div className="dropdown">
          <div className="notifications" onClick={toggleNotificationsDropdown}>
            <i className="fas fa-bell"></i>
            <span className="notification-text">Notifications</span>
          </div>
          {showNotificationsDropdown && (
            <div className="dropdown-content">
              {/* <a href="#">Notification 1</a> */}
              {/* <a href="#">Notification 2</a> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
