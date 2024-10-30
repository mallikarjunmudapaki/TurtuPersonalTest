import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the updated CSS file
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const TeamRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('caller');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const validateInputs = () => {
    const errors = {};

    // Name validation (only letters)
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!nameRegex.test(name)) {
      errors.name = 'Name must be at least 2 letters long and contain only letters.';
    }

    // Email validation (valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phonenumber)) {
      errors.phonenumber = 'Phone number must be exactly 10 digits.';
    }

    // Password validation (at least 8 characters, 1 letter, 1 special character)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters long and include at least one capital letter and one special character.';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return; // Validate inputs before proceeding

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
        phonenumber,
      });
      setIsOtpSent(true);
      setSuccess('Registration successful! OTP sent to your email.');
      setError({});
    } catch (error) {
      setError({ general: 'Registration failed' });
      setSuccess('');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-otp`, { email, otp });
      // Redirect to the login page after OTP verification
      setTimeout(() => {
        navigate('/team-login');
      }, 1000);
      setSuccess('OTP verified successfully!');
      setError({});
    } catch (error) {
      setError({ general: 'OTP verification failed' });
      setSuccess('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackClick = () => {
    navigate('/team-login');
  };
 

  return (
    <div className="oM-register-page">
       <button className="back-button" onClick={handleBackClick}>
  <FaArrowLeft /> Back
</button>
      <div className="oM-form-container">
        <div className="oM-register-form">
          <h2 className="oM-register-heading">Register</h2>
          {error.general && <p className="oM-register-message error">{error.general}</p>}
          {success && <p className="oM-register-message success">{success}</p>}
          
          {!isOtpSent ? (
            <>
              <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {error.name && <p className="oM-errorInput">{error.name}</p>}
              </div>
              <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {error.email && <p className="oM-errorInput">{error.email}</p>}
              </div>
              <div>
                <label>Phone Number:</label>
                <input type="text" value={phonenumber} onChange={(e) => setphoneNumber(e.target.value)} />
                {error.phonenumber && <p className="oM-errorInput">{error.phonenumber}</p>}
              </div>
              <div className="oM-password-container">
                <label>Password:</label>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="oM-password-toggle-button" onClick={togglePasswordVisibility}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                {error.password && <p className="oM-errorInput">{error.password}</p>}
              </div>
              <div>
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="caller">Support Executive</option>
                  <option value="delivery boy">Delivery Hero</option>
                  <option value="assigner">Fleet Manager</option>
                </select>
              </div>
              <button className="oM-register-button" onClick={handleRegister}>
                Register
              </button>
            </>
          ) : (
            <div className='otp-form'>
              <label>Enter OTP:</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button className="oM-register-button" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          )}
          
          <p className="oM-ptagtext">
            Already have an account? <span className='LoginClick' onClick={() => navigate('/team-login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};
