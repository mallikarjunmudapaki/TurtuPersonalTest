import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './Forgot_Reset_Password.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/request-password-reset`, 
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('A reset password link has been sent to your email. Please check your inbox.');
        setError('');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('Email not registered. Please check and try again.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to send reset link. Please try again.');
        }
        setMessage('');
      } else {
        setError('Network error. Please try again.');
        setMessage('');
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <>
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> Back
      </button>

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
          {message && <div className="success-message">{message}</div>}
          {error && <div className="email-error">{error}</div>}

          <button className="email-submit-button" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
