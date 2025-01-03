import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import Alert from './util/alerts';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const triggerAlert = (type, message) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => {
      setAlert({ message: '', type: '', visible: false });
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        triggerAlert('success', 'Signup successful');
        setTimeout(() => {
          navigate('/login'); 
        }, 3000); // Redirect to login on successful signup
      } else {
        throw new Error(data.error || 'Error signing up');
      }
    } catch (error) {
      triggerAlert('danger', 'Signup failed: ' + error.message);
    }
  };

  return (
    <>
      {alert.visible && <Alert type={alert.type} message={alert.message} />}
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input type="submit" value="Sign Up" />
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
