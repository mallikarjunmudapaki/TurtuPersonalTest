// NotFoundPage.js
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './Notfound.css';

const NotFoundPage = () => {
    const navigate = useNavigate()
  

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="error-container">
      <h1>Oops! Something went wrong.</h1>
      <p>It looks like we're experiencing some technical issues. Please try again later.</p>
      <button onClick={handleGoHome} className="go-home-button">
        Go Home
      </button>
      <p>If the issue persists, please contact our support team at support@example.com.</p>
    </div>
  );
};

export default NotFoundPage;
