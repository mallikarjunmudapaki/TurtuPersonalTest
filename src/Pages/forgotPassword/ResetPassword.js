import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams for getting token from URL
import axios from 'axios';
import './Forgot_Reset_Password.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Extract token from URL params
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/reset_password/${token}`, { 
      password, 
      confirm_password: confirmPassword
  }, {
      headers: {
        'Content-Type': 'application/json'
      }
  })
      .then(response => {
        setMessage('Password has been successfully reset. Redirecting to login...');
        setError('');
        setTimeout(() => navigate('/login'), 3000); 
      })
      .catch(err => {
        console.error('Error during password reset:', err); // Log the error for debugging
        setError(err.response.data.message || 'Failed to reset password. Invalid or expired token.');
        setMessage('');
      });
  };
  console.log(`${process.env.REACT_APP_API_BASE_URL}/api/reset_password/${token}`);
  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2 className="reset-password-title">Reset Password</h2>
        <div className="reset-password-form-group">
          <div className="reset-password-label">
            <label htmlFor="password">New Password</label>
          </div>
          <input
            className="reset-password-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="reset-password-form-group">
          <div className="reset-password-label">
            <label htmlFor="confirmPassword">Confirm New Password</label>
          </div>
          <input
            className="reset-password-input"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="reset-password-error">{error}</div>}
        <button className="reset-password-button" type="submit">Reset Password</button>
      </form>
    </div>
  );
}

