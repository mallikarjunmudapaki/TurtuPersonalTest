import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Separate CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyToken = async () => {
    const token = localStorage.getItem('authToken'); // Fetch token from local storage
    if (!token) {
      console.error('No token found!');
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Token is valid!', response.data);
        // Proceed to navigate to the home or dashboard page
      }
    } catch (error) {
      console.error('Token verification failed:', error.response?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token } = response.data.data;
        localStorage.setItem('authToken', token);
        setSuccessMessage('Login successful!');

        // Verify the token
        await verifyToken(token);

        window.location.href = '/'; // Redirect after successful verification
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setErrors({ submit: 'Email not verified. Please check your email.' });
        } else if (error.response.status === 401) {
          setErrors({ submit: 'Invalid email or password. Please try again.' });
        } else {
          setErrors({ submit: 'An unexpected error occurred. Please try again.' });
        }
      } else {
        setErrors({ submit: 'Error connecting to the server. Please try again later.' });
      }
    }
  };

  return (
    <section className="login-wrapper">
  <div className="login-container">
    <h2 className="login-title">Login</h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          placeholder="Enter your password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <button type="submit" className="login-button">Login</button>
      {errors.submit && <p className="error-message">{errors.submit}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
    <div className="login-links">
      <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
      <p>Don't have an account? <Link to="/signup" className="signup-link">SignUp</Link></p>
    </div>
  </div>
</section>

  );
};

export default Login;

