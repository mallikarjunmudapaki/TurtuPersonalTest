import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyToken = async () => {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
      console.error('No token found!');
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Token is valid!', response.data);
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
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token } = response.data.data;
        localStorage.setItem('authToken', token);
        setSuccessMessage('Login successful!');
        await verifyToken(token);

        window.location.href = '/';
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
 const handleBackClick = () => {
  navigate(-1);
};
  return (
    <>
    <section className="login-wrapper">
  <button className="back-button" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>
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
          required
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
          required
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
</>
  );
};

export default Login;

