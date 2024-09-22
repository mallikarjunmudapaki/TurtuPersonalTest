// components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if the token exists

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
