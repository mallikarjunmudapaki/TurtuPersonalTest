import React, { useState } from 'react';
import axios from 'axios';
import './Forgot_Reset_Password.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new FormData object to handle the email submission
    const formData = new FormData();
    formData.append('email', email);
  
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/request_password_reset`, formData)
      .then(response => {
        if (response.status === 200) {
          setMessage('A reset password link has been sent to your email. Please check your inbox.');
          setError('');
        } else if (response.status === 404) {
          setError('Email not registered. Please check and try again.');
          setMessage('');
        } else {
          setError('Failed to send reset link. Please try again.');
          setMessage('');
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setError('Email not registered. Please check and try again.');
        } else {
          setError('Error sending reset link. Make sure the email is registered.');
        }
        setMessage('');
      });
  };
  
  return (
    <div className="email-container">
      <form className="email-form" onSubmit={handleSubmit}>
        <div className="email-form-group">
          <div className="email-label">
            <label>Enter Email Id:</label>
          </div>
          <input
            className="email-input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>

        {/* Display success or error messages */}
        {message && <div className="success-message">{message}</div>}
        {error && <div className="email-error">{error}</div>}

        <button className="email-submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}
