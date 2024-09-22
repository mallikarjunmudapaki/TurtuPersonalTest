import React, { useState } from 'react';
import axios from 'axios';
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

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validateForm()) {
        return;
      }
  
      try {
        // Send data to backend API
        const response = await axios.post(
          'http://13.235.115.160:5000/api/login', // Replace with your backend URL
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          const { token } = response.data.data; // Extract token from response
          // Store the token in localStorage
          localStorage.setItem('authToken', token);
          setSuccessMessage('Login successful!');
          // Redirect to home or dashboard
          window.location.href = '/'; // Change this URL to your home/dashboard page
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
  // // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   try {
  //     // Send data to backend API
  //     const response = await axios.post(
  //       'http://13.235.115.160:5000/api/login', // Replace with your backend URL
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const { data } = response; // Accessing data returned from the backend
  //       console.log('Response Data:', data); // Debug: Verify the structure
  //       const { token } = data.data; // Assuming the backend returns a token in the data object

  //       if (token) {
  //         // Store the token in localStorage for authentication
  //         localStorage.setItem('authToken', token);
  //         setSuccessMessage('Login successful!');
  //         // Redirect to home or dashboard
  //         window.location.href = '/'; // Change this URL to your home/dashboard page
  //       } else {
  //         setErrors({ submit: 'Failed to retrieve token. Please try again.' });
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error.response || error.message);
  //     setErrors({ submit: 'Invalid email or password. Please try again.' });
  //   }
  // };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errors.submit && <p className="error-message">{errors.submit}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
        <div className="login-links">
          <p className="forgot-password" onClick={() => alert('Forgot password clicked!')}>
            Forgot Password?
          </p>
          <p>
            Don't have an account?{' '}
            <span className="signup-link" onClick={() => (window.location.href = '/signup')}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

