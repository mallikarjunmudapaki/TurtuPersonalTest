
import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const navigate = useNavigate();

  // Check login status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Assuming the login token is stored in localStorage
    setIsLoggedIn(!!token); // Set isLoggedIn to true if the token exists
  }, []);

  // Handle click on restricted pages (Career and Contact)
  const handleRestrictedClick = (e, page) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowMessage(`Please log in to access the ${page} page.`);
      setTimeout(() => setShowMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <div className="navbar-logo-toggle-icon">
            <a className="navbar-brand fs-2 fw-bold" href="#home">Turtu</a>
            <button
              className="navbar-toggler"
              id="toggler-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div className="nav-item">
                <div className="nav-link active">
                  <Link to="/#home" smooth className="navigation">Home</Link>
                </div>
              </div>
              <div className="nav-item">
                <div className="nav-link">
                  <Link
                    to="/Contact"
                    smooth
                    className="navigation"
                    onClick={(e) => handleRestrictedClick(e, 'Contact')}
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div className="nav-item">
                <div className="nav-link">
                  <Link
                    to="/career"
                    smooth
                    className="navigation"
                    onClick={(e) => handleRestrictedClick(e, 'Career')}
                  >
                    Career
                  </Link>
                </div>
              </div>
              <div className="nav-item">
                <div className="nav-link">
                  <Link to="/blog" smooth className="navigation">Blogs</Link>
                </div>
              </div>
              {!isLoggedIn ? (
                <>
                  <div className="nav-item">
                    <div className="nav-link">
                      <Link to="/signup" smooth className="navigation">SignUp</Link>
                    </div>
                  </div>
                  <div className="nav-item">
                    <div className="nav-link">
                      <Link to="/Login" smooth className="navigation">Login</Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Display the login message if not logged in */}
      {showMessage && (
        <div className="alert alert-warning text-center" role="alert">
          {showMessage}
        </div>
      )}
    </>
  );
}
