import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Alert from './util/alerts';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const navigate = useNavigate();

  const triggerAlert = (type, message) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => {
      setAlert({ message: '', type: '', visible: false });
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      triggerAlert('danger', 'Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { authtoken } = response.data;
      if (authtoken) {
        localStorage.setItem('token', authtoken);
        triggerAlert('success', 'Login successful!');
       setTimeout(() => {
        navigate('/userwelcome');
       }, 3000);
      } else {
        triggerAlert('danger', 'Authentication failed!');
      }
    } catch (error) {
      triggerAlert('danger', `Login failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <>
     {alert.visible && <Alert type={alert.type} message={alert.message} />}
    <div className="login-container">
      
      <h2>Welcome to Codewiz</h2>
     
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
      
    </div>
</>
  );
};

export default LoginForm;
