import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  // Existing state and hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(decodedToken.email || 'user@example.com');
      setUserName(decodedToken.username || 'username');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowProfileModal(false);
    navigate('/');
  };

  const handleCareerClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/Login');
    } else {
      navigate('/career');
    }
  };

  // Function to handle file input change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <div className="navbar-logo-toggle-icon">
            <a className="navbar-brand fs-2 fw-bold" href="#home">
              Turtu
            </a>
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
                  <Link to="/#home" smooth className="navigation">
                    Home
                  </Link>
                </div>
              </div>
              <div className="nav-item">
                <div className="nav-link">
                  <Link to="/Contact" smooth className="navigation">
                    Contact
                  </Link>
                </div>
              </div>
              <div className="nav-item">
                <div className="nav-link">
                  <Link to="/career" onClick={handleCareerClick} smooth className="navigation">
                    Career
                  </Link>
                </div>
              </div>
              <div className="nav-item">
                <div className="nav-link">
                  <Link to="/blog" smooth className="navigation">
                    Blogs
                  </Link>
                </div>
              </div>

              {!isLoggedIn ? (
                <>
                  <div className="nav-item">
                    <div className="nav-link">
                      <Link to="/signup" smooth className="navigation">
                        SignUp
                      </Link>
                    </div>
                  </div>
                  <div className="nav-item">
                    <div className="nav-link">
                      <Link to="/Login" smooth className="navigation">
                        Login
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => setShowProfileModal(true)}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        style={{ borderRadius: '50%', width: '30px', height: '30px' }}
                      />
                    ) : (
                      <FaUserCircle size={30} />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-labelledby="profileModalLabel"
          aria-hidden="true"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="profileModalLabel">
                  Welcome to Turtu
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProfileModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                {/* Display uploaded profile image or default icon */}
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-image mb-3"
                    onClick={() => document.getElementById('profileImageInput').click()}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '50%',
                      width: '80px',
                      height: '80px',
                    }}
                  />
                ) : (
                  <FaUserCircle
                    size={80}
                    className="mb-3"
                    onClick={() => document.getElementById('profileImageInput').click()}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <input
                  type="file"
                  id="profileImageInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />

                {/* Remove Image Button */}
                {profileImage && (
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => setProfileImage(null)}
                  >
                    Remove Image
                  </button>
                )}

                <h4>{userName}</h4>
                <h6>{userEmail}</h6>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


