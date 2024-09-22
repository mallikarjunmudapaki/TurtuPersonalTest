// src/RequireAuth.js
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is not authenticated, prompt to log in or redirect to the login page
  if (!isAuthenticated) {
    return (
      <div className="auth-prompt">
        <p>You need to be logged in to submit this form.</p>
        <button onClick={() => navigate('/login')}>Log In</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    );
  }

  // Render children if authenticated
  return children;
};

export default RequireAuth;
