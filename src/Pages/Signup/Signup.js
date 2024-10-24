import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './Signup.css';



function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendOtpStatus, setResendOtpStatus] = useState(''); // New state for resend OTP status
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate individual field and clear errors if valid
    let errors = { ...formErrors };

    switch (name) {
      case 'username':
        errors.username = value.match(/^[a-zA-Z ]{3,20}$/) ? '' : 'Full Name should be 3 to 20 characters long and contain only alphabets.';
        break;
      case 'email':
        errors.email = value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ? '' : 'Invalid Email ID.';
        break;
      case 'phone_number':
        errors.phone_number = value.match(/^[0-9]{10}$/) ? '' : 'Phone Number should be exactly 10 digits.';
        break;
      case 'password':
        errors.password = value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/) ? '' : 'Password should be 6 to 20 characters long and include at least one letter, one number, and one special character.';
        break;
      case 'confirm_password':
        errors.confirm_password = value === formData.password ? '' : 'Passwords do not match.';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username.match(/^[a-zA-Z ]{2,20}$/)) {
      isValid = false;
      errors.username = 'Full Name should be 2 to 20 characters long and contain only alphabets.';
    }

    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      isValid = false;
      errors.email = 'Invalid Email ID.';
    }

    if (!formData.phone_number.match(/^[0-9]{10}$/)) {
      isValid = false;
      errors.phone_number = 'Phone Number should be exactly 10 digits.';
    }

    if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/)) {
      isValid = false;
      errors.password = 'Password should be 6 to 20 characters long and include at least one letter, one number, and one special character.';
    }

    if (formData.confirm_password !== formData.password) {
      isValid = false;
      errors.confirm_password = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return isValid;
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, 
          formData,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.status === 'success') {
          setIsOtpSent(true);
          setSubmissionStatus('OTP has been sent to your email. Please enter it to verify your account.');
          setIsError(false); 
        } else {
          setSubmissionStatus(response.data.message);
          setIsError(true);
          
        }
      } catch (error) {
        setSubmissionStatus('Failed to submit the form. Please try again.');
        setIsError(true);
      }
    }
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-otp`, 
        JSON.stringify({
          email: formData.email,
          otp: otp  
        }), 
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.data.status === 'success') {
        setSubmissionStatus('Email verified successfully! Redisuccrecting to login page...');
        setIsError(false);
        setTimeout(() => {
          navigate('/Login');
        }, 3000);
      } else {
        setSubmissionStatus(response.data.message);
      }
    } catch (error) {
      setSubmissionStatus('Failed to verify OTP. Please try again.');
      setIsError(true);
    }
  };
  
  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    setResendOtpStatus('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/resend-otp`, 
        JSON.stringify({
          email: formData.email,
        }), 
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.status === 'success') {
        setResendOtpStatus('OTP has been resent to your email.');
        setIsError(false);
      } else {
        setResendOtpStatus(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      setResendOtpStatus('Failed to resend OTP. Please try again.');
      setIsError(true);
    }
    
    setIsResendingOtp(false);
  };


  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
    <div className="signup-wrapper">
        {/* Back icon */}
  <button className="back-button" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>
  {/* <div className="signup-image">
    
  </div> */}
    <div className="signup-container">

       {!isOtpSent ? (
      <form className="signup-form" onSubmit={handleSubmit}>
      <h2 className="signup-title text-center">Signup</h2>
      {submissionStatus && (
                <p
                  className={isError ? 'error-text' : 'success-text'}
                >
                  {submissionStatus}
                </p>
              )}
        <div className="signup-form-group">
          <div className="signup-label">
            <label>Full Name</label>
          </div>
          <input
            className="signup-input"
            type="text"
            name="username"
            id='username'
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {formErrors.username && <div className="signup-error">{formErrors.username}</div>}
        </div>
        <div className="signup-form-group">
          <div className="signup-label">
            <label>Email ID</label>
          </div>
          <input
            className="signup-input"
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <div className="signup-error">{formErrors.email}</div>}
        </div>
        <div className="signup-form-group">
          <div className="signup-label">
            <label>Phone Number</label>
          </div>
          <input
            className="signup-input"
            type="tel"
            name="phone_number"
            id='phone_number'
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          {formErrors.phone_number && <div className="signup-error">{formErrors.phone_number}</div>}
        </div>
        <div className="signup-form-group">
          <div className="signup-label">
            <label>Password</label>
          </div>
          <input
            className="signup-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && <div className="signup-error">{formErrors.password}</div>}
        </div>
        <div className="signup-form-group">
          <div className="signup-label">
            <label>Confirm Password</label>
          </div>
          <input
            className="signup-input"
            type="password"
            name="confirm_password"
            id='confirm_password'
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          {formErrors.confirm_password && <div className="signup-error">{formErrors.confirm_password}</div>}
        </div>
        <button className="signup-button" type="submit">Sign Up</button>
        {/* {submissionStatus && <div className="signup-success">{submissionStatus}</div>} */}
        <div className='signup-text'>
          <p>Already have an account?</p>
          <Link to={`/Login`} className='login-text'><span>Login</span></Link>
        </div>
      </form>
       ) : (
        <div className='otp'>
        <form className='otp-form' onSubmit={handleOtpSubmit}>
        {submissionStatus && <div className="signup-success">{submissionStatus}</div>}
          <h2>Enter OTP</h2>
          <input type="text" name="otp" placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit"className='verify-button'>Verify OTP</button>
          <div className="resend-otp">
                <p>Didn't receive the OTP?</p>
                <button
                  type="button"
                  className="resend-otp-link"
                  onClick={handleResendOtp}
                  disabled={isResendingOtp}
                >
                  {isResendingOtp ? 'Resending OTP...' : 'Resend OTP'}
                </button>
              </div>
              {resendOtpStatus && <div className="resend-status">{resendOtpStatus}</div>}

        </form>
        </div>
      )}
       
    </div>
    </div>
    </>
  );
}

export default SignUp;