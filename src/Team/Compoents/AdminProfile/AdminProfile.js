import React from 'react';
import './AdminProfile.css'; 

const AdminProfile = () => {

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('token'); 
    
    // Redirect to login page
    window.location.href = '/team-login'; 
  };
  
  return (
    <div className='admin-profile-container'>
      <h1>Admin Profile</h1>
      <div className='profile-info'>
        <p><strong>Name:</strong> Anil Chavan</p>
        <p><strong>Phone Number:</strong>1234567890</p>
        <p><strong>Email:</strong>turtuservices@gmail.com </p>
      </div>
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  );
}

export default AdminProfile;
