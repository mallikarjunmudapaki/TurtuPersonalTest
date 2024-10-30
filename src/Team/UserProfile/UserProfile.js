import React from 'react'; 
import './UserProfile.css';
import axios from 'axios';
const UserProfile = ({ name, email, phonenumber, role, onClose }) => {


  const handleLogout = async () => {

    
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage

      const response = await axios.post('http://13.126.174.229:5000/api/auth/logout', null, {
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
      });

      console.log(response.data.message); // Log the success message
      // Optionally, clear the token from local storage or redirect the user
      if (response.status === 200) {
        console.log(response.data.message); // Log the success message
    
        // Clear user data from local storage
        localStorage.removeItem('userId'); // Remove user ID if stored
        localStorage.removeItem('token'); // Remove token from local storage
        localStorage.removeItem('tokenExpiry'); 
        // Redirect to login page
        window.location.href = '/team-login'; // Adjust the path to your login page
      }
  } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error.message); // Handle errors
  }


  };

 

 

  return (
    <div className="user-profile-overlay">
      <div className="user-profile">
        <button className="close-button" onClick={onClose}>×</button>
        <div className='avatar'>
          <img className='profileAvatar' src={require('./../../Images/unisexAvatar.jpg')} alt="Profile Avatar" />
        </div>
        <div className='profile-details'>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone Number:</strong> {phonenumber}</p>
          <p><strong>Role:</strong> {role}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
