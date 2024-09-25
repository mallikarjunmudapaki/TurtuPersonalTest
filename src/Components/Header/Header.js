import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import Login from '../../Pages/../Pages/Login/Login.js';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(decodedToken.email || 'user@example.com');
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
      setShowLoginModal(true);
    } else {
      navigate('/career');
    }
  };

  const handleLogin = () => {
    localStorage.setItem('authToken', 'dummyToken');
    setIsLoggedIn(true);
    setShowLoginModal(false);
    navigate('/career');
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
                  <Link
                    to="/career"
                    onClick={handleCareerClick}
                    smooth
                    className="navigation"
                  >
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
                    <FaUserCircle size={30} />
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
                  Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProfileModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <FaUserCircle size={80} className="mb-3" />
                <h4>{userEmail}</h4>
                <p>Welcome to your profile</p>
                <button
                  className="btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {/* Login Modal */}
{showLoginModal && (
  <div
    className="modal fade show d-block login-modal"
    tabIndex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
    style={{ background: 'rgba(0, 0, 0, 0.5)' }}
  >
    <div className="modal-dialog modal-sm modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          {/* <button
            type="button"
            className="btn-close"
            onClick={() => setShowLoginModal(false)}
            aria-label="Close"
          ></button> */}
        </div>
        <div className="modal-body">
        <button
            type="button"
            className="btn-close"
            onClick={() => setShowLoginModal(false)}
            aria-label="Close"
          ></button>
          {/* Use existing Login component inside the modal */}
          <Login handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  </div>
)}

      
    </>
  );
}



// import React, { useState, useEffect } from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
// import { useNavigate } from 'react-router-dom';
// import './Header.css';

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showMessage, setShowMessage] = useState('');
//   const [showLoginModal, setShowLoginModal] = useState(false); // State to control the modal visibility
//   const navigate = useNavigate();

//   // Check login status when the component mounts
//   useEffect(() => {
//     const token = localStorage.getItem('authToken'); // Assuming the login token is stored in localStorage
//     setIsLoggedIn(!!token); // Set isLoggedIn to true if the token exists
//   }, []);

//   // Handle click on restricted pages (Career and Contact)
//   const handleRestrictedClick = (e, page) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       setShowMessage(`Please log in to access the ${page} page.`);
//       setShowLoginModal(true); // Show login modal instead of displaying just a message
//     }
//   };

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Remove token from localStorage
//     setIsLoggedIn(false);
//     navigate('/'); // Redirect to the home page after logout
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container-fluid">
//           <div className="navbar-logo-toggle-icon">
//             <a className="navbar-brand fs-2 fw-bold" href="#home">
//               Turtu
//             </a>
//             <button
//               className="navbar-toggler"
//               id="toggler-button"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//           </div>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <div className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <div className="nav-item">
//                 <div className="nav-link active">
//                   <Link to="/#home" smooth className="navigation">
//                     Home
//                   </Link>
//                 </div>
//               </div>
//               <div className="nav-item">
//                 <div className="nav-link">
//                   <Link to="/Contact" smooth className="navigation">
//                     Contact
//                   </Link>
//                 </div>
//               </div>
//               <div className="nav-item">
//                 <div className="nav-link">
//                   <Link
//                     to="/career"
//                     smooth
//                     className="navigation"
//                     onClick={(e) => handleRestrictedClick(e, 'Career')}
//                   >
//                     Career
//                   </Link>
//                 </div>
//               </div>
//               <div className="nav-item">
//                 <div className="nav-link">
//                   <Link to="/blog" smooth className="navigation">
//                     Blogs
//                   </Link>
//                 </div>
//               </div>
//               {!isLoggedIn ? (
//                 <>
//                   <div className="nav-item">
//                     <div className="nav-link">
//                       <Link to="/signup" smooth className="navigation">
//                         SignUp
//                       </Link>
//                     </div>
//                   </div>
//                   <div className="nav-item">
//                     <div className="nav-link">
//                       <Link to="/Login" smooth className="navigation">
//                         Login
//                       </Link>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="nav-item">
//                   <button
//                     className="nav-link btn btn-link"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           aria-labelledby="loginModalLabel"
//           aria-hidden="true"
//           style={{ background: 'rgba(0, 0, 0, 0.5)' }}
//         >
//           <div className="modal-dialog modal-sm modal-dialog-centered"> {/* Reduced size of the modal */}
//             <div className="modal-content">
//               <div className="modal-header">
//                 {/*<h5 className="modal-title" id="loginModalLabel">
//                   Login
//                 </h5>*/}
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowLoginModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {/* Embed your login form here */}
//                 <iframe
//                   src="/login"
//                   style={{
//                     width: '100%',
//                     maxWidth:'700px',

//                     height: '500px',
//                     border: 'none',
//                     overflow: 'hidden',
//                   }}
//                   title="Login Form"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


