import React, { useState } from 'react';
import UserProfile from './../../UserProfile/UserProfile';
import './Navbar.css';

const Navbar = () => {
  const [isProfileDetailVisible, setProfileDetailVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleAvatarClick = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/testusers/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
      setProfileDetailVisible(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleCloseProfileDetail = () => {
    setProfileDetailVisible(false);
    setUserData(null);
  };

  return (
    <div className="oM-navbar">
      
      <div className='oM-logo'>
        Turtu
      </div>
      <img
        src={require('./../../../Images/unisexAvatar.jpg')}
        alt="Profile Avatar"
        className="oM-avatar"
        onClick={handleAvatarClick}
      />
      {isProfileDetailVisible && userData && (
        <UserProfile
          name={userData.name}
          email={userData.email}
          phonenumber={userData.phonenumber}
          role={userData.role}
          onClose={handleCloseProfileDetail}
        />
      )}
    </div>
  );
};

export default Navbar;
