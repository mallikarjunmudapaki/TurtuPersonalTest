// import React, { useState, useEffect } from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
// import { useNavigate } from 'react-router-dom';
// import './Header.css';
// import { FaUserCircle,FaBars } from 'react-icons/fa';

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState('');
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userPhoneNumber,setUserPhoneNumber]=useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsLoggedIn(true);
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setUserEmail(decodedToken.email || 'user@example.com');
//       setUserName(decodedToken.username || 'username');
//       setUserPhoneNumber(decodedToken.phonenumber || '1234567890')
//     }
//   }, []);



//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     setIsLoggedIn(false);
//     setShowProfileModal(false);
//     navigate('/');
//   };

//   const handleCareerClick = (e) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       navigate('/Login');
//     } else {
//       navigate('/career');
//     }
//   };

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container-fluid">
//           <div className="navbar-logo-toggle-icon">
//             <a className="navbar-brand fs-2 fw-bold" href="/">
//               Turtu
//             </a>
//             <button
//               className="navbar-toggler"
          
//               // id="toggler-button"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
     
//               <span className="Fabars"><FaBars size={30} color='white'/></span>
//             </button>
//           </div>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <div className="navbar-nav ms-auto mb-2 mb-lg-0">
//               {/* <div className="nav-item">
//                 <div className="nav-link">
//                   <Link to="/team-Login" smooth className="navigation">
//                     Work With Us
//                   </Link>
//                 </div>
//               </div> */}
//               <div className="nav-item">
//                 <div className="nav-link">
//                   <Link to="/#home" smooth className="navigation">
//                     Home
//                   </Link>
//                 </div>
//               </div>
//               <div className="nav-item">
//                 <div className="nav-link">
//                   <Link to="/about" smooth className="navigation">
//                     About Us
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
//                   <Link to="/career" onClick={handleCareerClick} smooth className="navigation">
//                     Career
//                   </Link>
//                 </div>
//               </div>
//               <div className="nav-item">
//                 <div className="nav-link">
//                   <Link to="/blogs" smooth className="navigation">
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
//                     className="btn btn-link nav-link"
//                     onClick={() => setShowProfileModal(true)}
//                   >
//                     {profileImage ? (
//                       <img
//                         src={profileImage}
//                         alt="Profile"
//                         style={{ borderRadius: '50%', width: '30px', height: '30px' }}
//                       />
//                     ) : (
//                       <FaUserCircle size={30} />
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {showProfileModal && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           aria-labelledby="profileModalLabel"
//           aria-hidden="true"
//           style={{ background: 'rgba(0, 0, 0, 0.5)' }}
//         >
//           <div className="modal-dialog modal-md modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="profileModalLabel">
//                   Welcome to Turtu
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowProfileModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body text-center">
               
//                 {profileImage ? (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="profile-image mb-3"
//                     onClick={() => document.getElementById('profileImageInput').click()}
//                     style={{
//                       cursor: 'pointer',
//                       borderRadius: '50%',
//                       width: '80px',
//                       height: '80px',
//                     }}
//                   />
//                 ) : (
//                   <FaUserCircle
//                     size={80}
//                     className="mb-3"
//                     onClick={() => document.getElementById('profileImageInput').click()}
//                     style={{ cursor: 'pointer' }}
//                   />
//                 )}
//                 <input
//                   type="file"
//                   id="profileImageInput"
//                   style={{ display: 'none' }}
//                   accept="image/*"
//                   onChange={handleProfileImageChange}
//                 />

//                 {profileImage && (
//                   <button
//                     className="btn btn-danger mt-2"
//                     onClick={() => setProfileImage(null)}
//                   >
//                     Remove Image
//                   </button>
//                 )}

//                 <h4>{userName}</h4>
//                 <h6><span className='login-data'>Email: </span>{userEmail}</h6>
//                 <h6><span className='login-data'>Phone Number: </span>{userPhoneNumber}</h6>
//                 <button className="logout-btn" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState ,useEffect} from "react";
// import './Header.css'
// // import Logo from "../Assets/Logo.svg";
// // import { BsCart2 } from "react-icons/bs";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// // import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
// import ArticleIcon from '@mui/icons-material/Article';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import LoginIcon from '@mui/icons-material/Login';
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';


// const Header = () => {
//   const navigate = useNavigate()
//   const [openMenu, setOpenMenu] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userPhoneNumber,setUserPhoneNumber]=useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [profileImage, setProfileImage] = useState(null);

//   const handleProfileClick = () => {
//     setShowProfileModal(true);
//     setOpenMenu(false);
//   };
  
//   const menuOptions = [
//     {
//       text: "Home",
//       icon: <HomeIcon style={{color:'white'}}/>,
//       path:'/#home'
//     },
//     {
//       text: "About",
//       icon: <InfoIcon style={{color:'white'}} />,
//       path:'/about'
//     },
//     {
//       text: "Contact",
//       icon: <CommentRoundedIcon style={{color:'white'}} />,
//       path:'/Contact'
//     },
//     {
//       text: "Carrer",
//       icon: <PhoneRoundedIcon style={{color:'white'}} />,
//       path:'/career'
//     },
//     {
//       text: "Blogs",
//       icon: <ArticleIcon style={{color:'white'}}/>,
//       path:'/blogs'
//     },
//     // {
//     //   text: "Cart",
//     //   icon: <ShoppingCartRoundedIcon />,
//     // },
//   ];
//   const authOptions = !isLoggedIn
//   ? [
//       { text: 'SignUp', path: '/signup' , icon:<PersonAddIcon style={{color:'white'}}/>},
//       { text: 'Login', path: '/Login',icon:<LoginIcon style={{color:'white'}}/> },
//     ]
//   : [
//       {
//         text: 'Profile',
//         path: '',
//         icon: profileImage ? (
//           <img
//             src={profileImage}
//             alt="Profile"
//             style={{ borderRadius: '50%', width: '30px', height: '30px' }}
//           />
//         ) : (
//           <FaUserCircle color='white' size={30} />
//         ),
//         onClick: handleProfileClick,
//       },
//     ];


//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsLoggedIn(true);
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setUserEmail(decodedToken.email || 'user@example.com');
//       setUserName(decodedToken.username || 'username');
//       setUserPhoneNumber(decodedToken.phone_number || '1234567890')
//     }
//   }, []);


//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     setIsLoggedIn(false);
//     setShowProfileModal(false);
//     navigate('/');
//   };

//   const handleCareerClick = (e) => {
//     // if (!isLoggedIn) {
//     //   e.preventDefault();
//     //   navigate('/Login');
//     // } else {
//       navigate('/career');
//     // }
//   };

//     const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   return (
//     <>
//       <nav>
//         <div className="nav-logo-container">
//           <a className="navbar-brand fs-2 fw-bold" href="/">Turtu</a>
//         </div>
//         <div className="navbar-links-container">
//           <Link to="/#home">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//           <Link to="/career" onClick={handleCareerClick}>Career</Link>
//           <Link to="/blogs">Blog</Link>
          
//           {!isLoggedIn ? (
//             <>
//               <Link to="/signup" className="navigation">SignUp</Link>
//               <Link to="/login" className="navigation">Login</Link>
//             </>
//           ) : (
//             <button className="btn" onClick={() => setShowProfileModal(true)}>
//               {profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   style={{ borderRadius: '50%', width: '30px', height: '30px' }}
//                 />
//               ) : (
//                 <FaUserCircle color="white" size={30} />
//               )}
//             </button>
//           )}
//         </div>
//         <div className="navbar-menu-container">
//           <HiOutlineBars3 color="white" style={{ marginRight: 10 }} onClick={() => setOpenMenu(true)} />
//         </div>
//         <Drawer  open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
//           <Box style={{backgroundColor:'#02101d'}} sx={{ width: 250 ,height:900}} role="presentation">
//             <List>
//               {menuOptions.map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => navigate(item.path)}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText style={{color:'white'}} primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//               <Divider />
//               {authOptions.map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}>
//                     {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
//                     <ListItemText style={{color:'white'}} primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             <Divider />
//           </Box>
//         </Drawer>
//       </nav>

//       {/* Profile Modal Logic */}
//       {showProfileModal && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           aria-labelledby="profileModalLabel"
//           aria-hidden="true"
//           style={{ background: 'rgba(0, 0, 0, 0.5)' }}
//         >
//           <div className="modal-dialog modal-md modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="profileModalLabel">Welcome to Turtu</h5>
//                 <button type="button" className="btn-close btn-close-black" onClick={() => setShowProfileModal(false)}></button>
//               </div>
//               <div className="modal-body text-center">
//                 {profileImage ? (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="profile-image mb-3"
//                     onClick={() => document.getElementById('profileImageInput').click()}
//                     style={{ cursor: 'pointer', borderRadius: '50%', width: '80px', height: '80px' }}
//                   />
//                 ) : (
//                   <FaUserCircle
//                     size={80}
//                     className="mb-3"
//                     onClick={() => document.getElementById('profileImageInput').click()}
//                     style={{ cursor: 'pointer' }}
//                   />
//                 )}
//                 <input
//                   type="file"
//                   id="profileImageInput"
//                   style={{ display: 'none' }}
//                   accept="image/*"
//                   onChange={handleProfileImageChange}
//                 />
//                 {profileImage && (
//                   <button className="btn" onClick={() => setProfileImage(null)}>Remove Image</button>
//                 )}
//                 <h4>{userName}</h4>
//                 <h6><span className='login-data'>Email: </span>{userEmail}</h6>
//                 <h6><span className='login-data'>Phone Number: </span>{userPhoneNumber}</h6>
//                 <button className="logout-btn" onClick={handleLogout}>Logout</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;



// import React, { useState, useEffect } from "react";
// import './Header.css';
// import { HiOutlineBars3 } from "react-icons/hi2";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import ArticleIcon from '@mui/icons-material/Article';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import LoginIcon from '@mui/icons-material/Login';
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';

// const Header = () => {
//   const navigate = useNavigate();
//   const [openMenu, setOpenMenu] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userPhoneNumber, setUserPhoneNumber] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [profileImage, setProfileImage] = useState(null);

//   const handleProfileClick = () => {
//     setShowProfileModal(true);
//     setOpenMenu(false);
//   };

//   const menuOptions = [
//     { text: "Home", icon: <HomeIcon style={{ color: 'white' }} />, path: '/#home' },
//     { text: "About", icon: <InfoIcon style={{ color: 'white' }} />, path: '/about' },
//     { text: "Contact", icon: <CommentRoundedIcon style={{ color: 'white' }} />, path: '/Contact' },
//     { text: "Career", icon: <PhoneRoundedIcon style={{ color: 'white' }} />, path: '/career' },
//     { text: "Blogs", icon: <ArticleIcon style={{ color: 'white' }} />, path: '/blogs' },
//   ];

//   const authOptions = !isLoggedIn
//     ? [
//         { text: 'SignUp', path: '/signup', icon: <PersonAddIcon style={{ color: 'white' }} /> },
//         { text: 'Login', path: '/Login', icon: <LoginIcon style={{ color: 'white' }} /> },
//       ]
//     : [
//         {
//           text: 'Profile',
//           path: '',
//           icon: profileImage ? (
//             <img
//               src={profileImage}
//               alt="Profile"
//               style={{ borderRadius: '50%', width: '30px', height: '30px' }}
//             />
//           ) : (
//             <FaUserCircle color='white' size={30} />
//           ),
//           onClick: handleProfileClick,
//         },
//       ];

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsLoggedIn(true);
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setUserEmail(decodedToken.email || 'user@example.com');
//       setUserName(decodedToken.username || 'username');
//       setUserPhoneNumber(decodedToken.phone_number || '1234567890');
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     setIsLoggedIn(false);
//     setShowProfileModal(false);
//     navigate('/');
//   };

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <nav>
//         <div className="nav-logo-container">
//           <a className="navbar-brand fs-2 fw-bold" href="/">Turtu</a>
//         </div>
//         <div className="navbar-links-container">
//           <Link to="/#home">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//           <Link to="/career">Career</Link>
//           <Link to="/blogs">Blog</Link>
          
//           {!isLoggedIn ? (
//             <>
//               <Link to="/signup" className="navigation">SignUp</Link>
//               <Link to="/login" className="navigation">Login</Link>
//             </>
//           ) : (
//             <IconButton onClick={() => setShowProfileModal(true)} style={{ color: 'white' }}>
//               {profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   style={{ borderRadius: '50%', width: '30px', height: '30px' }}
//                 />
//               ) : (
//                 <FaUserCircle size={30} />
//               )}
//             </IconButton>
//           )}
//         </div>
//         <div className="navbar-menu-container">
//           <HiOutlineBars3 color="white" style={{ marginRight: 10 }} onClick={() => setOpenMenu(true)} />
//         </div>
//         <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
//           <Box style={{ backgroundColor: '#02101d' }} sx={{ width: 250, height: 900 }} role="presentation">
//             <List>
//               {menuOptions.map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => navigate(item.path)}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText style={{ color: 'white' }} primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//               <Divider />
//               {authOptions.map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}>
//                     {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
//                     <ListItemText style={{ color: 'white' }} primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             <Divider />
//           </Box>
//         </Drawer>
//       </nav>

//       {/* Profile Modal Logic with Material UI Dialog */}
//       <Dialog open={showProfileModal} onClose={() => setShowProfileModal(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Welcome to Turtu</DialogTitle>
//         <DialogContent style={{ textAlign: 'center' }}>
//           {profileImage ? (
//             <IconButton onClick={() => document.getElementById('profileImageInput').click()}>
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 style={{ borderRadius: '50%', width: '80px', height: '80px' }}
//               />
//             </IconButton>
//           ) : (
//             <IconButton onClick={() => document.getElementById('profileImageInput').click()}>
//               <FaUserCircle size={80} />
//             </IconButton>
//           )}
//           <input
//             type="file"
//             id="profileImageInput"
//             style={{ display: 'none' }}
//             accept="image/*"
//             onChange={handleProfileImageChange}
//           />
//           {profileImage && (
//             <Button variant="outlined" color="secondary" onClick={() => setProfileImage(null)} style={{ marginTop: '10px' }}>
//               Remove Image
//             </Button>
//           )}
//           <h4>{userName}</h4>
//           <h6>Email: {userEmail}</h6>
//           <h6>Phone Number: {userPhoneNumber}</h6>
//           <Button variant="contained" color="error" onClick={handleLogout} style={{ marginTop: '15px' }}>
//             Logout
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default Header;

//2nd 

// import React, { useState, useEffect } from "react";
// import './Header.css';
// import { HiOutlineBars3 } from "react-icons/hi2";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
// import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import ArticleIcon from '@mui/icons-material/Article';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import LoginIcon from '@mui/icons-material/Login';
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // Get the current location
//   const [openMenu, setOpenMenu] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userPhoneNumber, setUserPhoneNumber] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [profileImage, setProfileImage] = useState(null);

//   const handleProfileClick = () => {
//     setShowProfileModal(true);
//     setOpenMenu(false);
//   };

//   const menuOptions = [
//     { text: "Home", icon: <HomeIcon style={{ color: 'white' }} />, path: '/#home' },
//     { text: "About", icon: <InfoIcon style={{ color: 'white' }} />, path: '/about' },
//     { text: "Contact", icon: <CommentRoundedIcon style={{ color: 'white' }} />, path: '/Contact' },
//     { text: "Career", icon: <PhoneRoundedIcon style={{ color: 'white' }} />, path: '/career' },
//     { text: "Blogs", icon: <ArticleIcon style={{ color: 'white' }} />, path: '/blogs' },
//   ];

//   const authOptions = !isLoggedIn
//     ? [
//         { text: 'SignUp', path: '/signup', icon: <PersonAddIcon style={{ color: 'white' }} /> },
//         { text: 'Login', path: '/Login', icon: <LoginIcon style={{ color: 'white' }} /> },
//       ]
//     : [
//         {
//           text: 'Profile',
//           path: '',
//           icon: profileImage ? (
//             <img
//               src={profileImage}
//               alt="Profile"
//               style={{ borderRadius: '50%', width: '30px', height: '30px' }}
//             />
//           ) : (
//             <FaUserCircle color='white' size={30} />
//           ),
//           onClick: handleProfileClick,
//         },
//       ];

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsLoggedIn(true);
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setUserEmail(decodedToken.email || 'user@example.com');
//       setUserName(decodedToken.username || 'username');
//       setUserPhoneNumber(decodedToken.phone_number || '1234567890');
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     setIsLoggedIn(false);
//     setShowProfileModal(false);
//     navigate('/');
//   };

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getNavLinkClass = (path) => {
//     return location.pathname === path ? 'active-tab' : '';
//   };

//   return (
//     <>
//       <nav>
//         <div className="nav-logo-container">
//           <a className="navbar-brand fs-2 fw-bold" href="/">Turtu</a>
//         </div>
//         <div className="navbar-links-container">
//           <Link to="/#home" className={getNavLinkClass('/#home')}>Home</Link>
//           <Link to="/about" className={getNavLinkClass('/about')}>About</Link>
//           <Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link>
//           <Link to="/career" className={getNavLinkClass('/career')}>Career</Link>
//           <Link to="/blogs" className={getNavLinkClass('/blogs')}>Blog</Link>
          
//           {!isLoggedIn ? (
//             <>
//               <Link to="/signup" className={`navigation ${getNavLinkClass('/signup')}`}>SignUp</Link>
//               <Link to="/login" className={`navigation ${getNavLinkClass('/login')}`}>Login</Link>
//             </>
//           ) : (
//             <IconButton onClick={() => setShowProfileModal(true)} style={{ color: 'white' }}>
//               {profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   style={{ borderRadius: '50%', width: '30px', height: '30px' }}
//                 />
//               ) : (
//                 <FaUserCircle size={30} />
//               )}
//             </IconButton>
//           )}
//         </div>
//         <div className="navbar-menu-container">
//           <HiOutlineBars3 color="white" style={{ marginRight: 10 }} onClick={() => setOpenMenu(true)} />
//         </div>
//         <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
//           <Box style={{ backgroundColor: '#02101d' }} sx={{ width: 250, height: 900 }} role="presentation">
//             <List>
//               {menuOptions.map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => navigate(item.path)}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText style={{ color: 'white' }} primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//               <Divider />
//               {authOptions.map((item) => (
//                 <ListItem key={item.text} disablePadding>
//                   <ListItemButton onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}>
//                     {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
//                     <ListItemText style={{ color: 'white' }} primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             <Divider />
//           </Box>
//         </Drawer>
//       </nav>

//       {/* Profile Modal Logic with Material UI Dialog */}
//       <Dialog open={showProfileModal} onClose={() => setShowProfileModal(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Welcome to Turtu</DialogTitle>
//         <DialogContent style={{ textAlign: 'center' }}>
//           {profileImage ? (
//             <IconButton onClick={() => document.getElementById('profileImageInput').click()}>
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 style={{ borderRadius: '50%', width: '80px', height: '80px' }}
//               />
//             </IconButton>
//           ) : (
//             <IconButton onClick={() => document.getElementById('profileImageInput').click()}>
//               <FaUserCircle size={80} />
//             </IconButton>
//           )}
//           {profileImage && (
//                   <button className="btn" onClick={() => setProfileImage(null)}>Remove Image</button>
//                 )}
//           <input
//             type="file"
//             id="profileImageInput"
//             style={{ display: 'none' }}
//             accept="image/*"
//             onChange={handleProfileImageChange}
//           />
//           <p><strong>Name:</strong> {userName}</p>
//           <p><strong>Email:</strong> {userEmail}</p>
//           <p><strong>Phone:</strong> {userPhoneNumber}</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleLogout} color="primary">
//             Logout
//           </Button>
//           <Button onClick={() => setShowProfileModal(false)} color="secondary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import './Header.css';
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';


import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [openMenu, setOpenMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileClick = () => {
    setShowProfileModal(true);
    setOpenMenu(false);
  };

  const menuOptions = [
    { text: "Home", icon: <HomeIcon style={{ color: 'white' }} />, path: '/#home' },
    { text: "About", icon: <InfoIcon style={{ color: 'white' }} />, path: '/about' },
    { text: "Contact", icon: <CommentRoundedIcon style={{ color: 'white' }} />, path: '/Contact' },
    { text: "Career", icon: <PhoneRoundedIcon style={{ color: 'white' }} />, path: '/career' },
    { text: "Blogs", icon: <ArticleIcon style={{ color: 'white' }} />, path: '/blogs' },
  ];

  const authOptions = !isLoggedIn
    ? [
        { text: 'SignUp', path: '/signup', icon: <PersonAddIcon style={{ color: 'white' }} /> },
        { text: 'Login', path: '/Login', icon: <LoginIcon style={{ color: 'white' }} /> },
      ]
    : [
        {
          text: 'Profile',
          path: '',
          icon: profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              style={{ borderRadius: '50%', width: '30px', height: '30px' }}
            />
          ) : (
            <FaUserCircle color='white' size={30} />
          ),
          onClick: handleProfileClick,
        },
      ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(decodedToken.email || 'user@example.com');
      setUserName(decodedToken.username || 'username');
      setUserPhoneNumber(decodedToken.phone_number || '1234567890');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowProfileModal(false);
    navigate('/');
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active-tab' : '';
  };

  return (
    <>
      <nav>
        <div className="nav-logo-container">
          <a className="navbar-brand fs-2 fw-bold" href="/">Turtu</a>
        </div>
        <div className="navbar-links-container">
          <Link to="/#home" className={getNavLinkClass('/#home')}>Home</Link>
          <Link to="/about" className={getNavLinkClass('/about')}>About</Link>
          <Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link>
          <Link to="/career" className={getNavLinkClass('/career')}>Career</Link>
          <Link to="/blogs" className={getNavLinkClass('/blogs')}>Blog</Link>
          
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className={`navigation ${getNavLinkClass('/signup')}`}>SignUp</Link>
              <Link to="/login" className={`navigation ${getNavLinkClass('/login')}`}>Login</Link>
            </>
          ) : (
            <IconButton onClick={() => setShowProfileModal(true)} style={{ color: 'white' }}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{ borderRadius: '50%', width: '30px', height: '30px' }}
                />
              ) : (
                <FaUserCircle size={30} />
              )}
            </IconButton>
          )}
        </div>
        <div className="navbar-menu-container">
          <HiOutlineBars3 color="white" style={{ marginRight: 10 }} onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box style={{ backgroundColor: '#02101d' }} sx={{ width: 250, height: 900 }} role="presentation">
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.path);
                      setOpenMenu(false); // Close the drawer after navigation
                    }}
                    className={getNavLinkClass(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText style={{ color: 'white' }} primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />
              {authOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        navigate(item.path);
                        setOpenMenu(false); // Close the drawer after navigation
                      }
                    }}
                    className={item.path ? getNavLinkClass(item.path) : ''}
                  >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText style={{ color: 'white' }} primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </nav>

      {/* Profile Modal Logic with Material UI Dialog */}
      <Dialog open={showProfileModal} onClose={() => setShowProfileModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Welcome to Turtu</DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
          ) : (
            <FaUserCircle size={100} />
          )}
          {profileImage ? (
            <IconButton
              color="primary"
              component="span"
              onClick={() => document.getElementById('profileImageInput').click()}
            >
              {/* <PhotoCamera /> */}
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              component="span"
              onClick={() => document.getElementById('profileImageInput').click()}
            >
              <PhotoLibraryIcon />

            </IconButton>
          )}
           {profileImage && (
                  <button className="btn" onClick={() => setProfileImage(null)}>Remove Image</button>
                )}
          <input
            type="file"
            id="profileImageInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Email:</strong> {userEmail}</p>
          <p><strong>Phone:</strong> {userPhoneNumber}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
          <Button onClick={() => setShowProfileModal(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
