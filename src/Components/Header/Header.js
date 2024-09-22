// // Header.js
// import { useState, useEffect } from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
// import { useNavigate } from 'react-router-dom';
// import './Header.css';
// import { FaUserCircle } from 'react-icons/fa';

// import axios from 'axios'; // Assuming axios is used to fetch user data

// export default function Header() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null); // To store user details
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is logged in by verifying the token
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsAuthenticated(true);
//       fetchUserData(token); // Fetch user data if authenticated
//     }
//   }, []);

//   // Fetch user data function
//   const fetchUserData = async (token) => {
//     try {
//       // Replace with your API endpoint to fetch user data
//       const response = await axios.get('http://13.235.115.160:5000/api/user', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     setIsAuthenticated(false);
//     setUser(null);
//     navigate('/'); // Redirect to home after logout
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
//               {/* Conditionally render links based on authentication */}
//               {!isAuthenticated && (
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
//                       <Link to="/login" smooth className="navigation">
//                         Login
//                       </Link>
//                     </div>
//                   </div>
//                 </>
//               )}
//               {isAuthenticated && user && (
//                 <div className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#profile"
//                     id="profileDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     <FaUserCircle size={25} className="profile-icon" />{' '}
//                     {user.username}
//                   </a>
//                   <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
//                     <li>
//                       <span className="dropdown-item-text">
//                         Hello, {user.username}!
//                       </span>
//                     </li>
//                     <li>
//                       <button className="dropdown-item" onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }


// import '../Header/Header.css';
// import { HashLink as Link } from 'react-router-hash-link';
// import './Header.css';

// export default function Header() {
//   return (
//  <>
    
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//       <div className="container-fluid">
//         <div className='navbar-logo-toggle-icon'>
//         <a className="navbar-brand fs-2 fw-bold " href="#home">Turtu</a>
//         <button className="navbar-toggler" id='toggler-button' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         </div>
//         <div className="collapse navbar-collapse" id='navbarSupportedContent'>
//           <div className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <div className="nav-item">
//               <div className="nav-link active">
//                 <Link to='/#home' smooth className='navigation'>Home</Link>
//               </div>
//             </div>
//             {/*
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/AboutUs' className='navigation'>About</Link>
//               </div>
//             </div>
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/ServicesPage' smooth className='navigation'>Services</Link>
//               </div>
//             </div>
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/ContactPage' smooth className='navigation'>Contact</Link>
//               </div>
//             </div>*/}
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/Contact' smooth className='navigation'>Contact</Link>
//               </div>
//             </div>
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/career' smooth className='navigation'>Career</Link>
//               </div>
//             </div>
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/blog' smooth className='navigation'>Blogs</Link>
//               </div>
//             </div>
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/signup' smooth className='navigation'>SignUp</Link>
//               </div>
//             </div>
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link to='/Login' smooth className='navigation'>Login</Link>
//               </div>
//             </div>
           
//           </div>
//         </div>
//       </div>
//     </nav>
//     {/*<Routes>
    
//       <Route path="/Login" element={<Login/>}/>
//     </Routes>*/}


//   </>
//   );
// }

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
