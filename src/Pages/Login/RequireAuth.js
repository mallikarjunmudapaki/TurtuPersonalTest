
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return (
      <div className="auth-prompt">
        <p>You need to be logged in to submit this form.</p>
        <button onClick={() => navigate('/login')}>Log In</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    );
  }
  return children;
};

export default RequireAuth;
