import React, {  useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
// import { AuthContext } from "../../ContextStore/ContextStore";

import { useOrderContext } from './../../../Context/ContextStore';
import { FaArrowLeft } from "react-icons/fa";
  

export const TeamLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, error, success } = useOrderContext();
 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const createAccount = () => {
    navigate("/Team-Register");
  };

  const handleBackClick = () => {
    navigate('/');
  };
  

  return (
    <div className="oM-login-container">
       <button className="back-button" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>
      <div className="oM-login-form">
        <h2 className="oM-login-heading">Login</h2>
        <img
          className="oM-loginAvatar"
          src={require("./../../../Images/unisexAvatar.jpg")}
          alt="avatar"
        />
        {error && <p className="oM-login-message error">{error}</p>}
        {success && <p className="oM-login-message success">{success}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="oM-password-container">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="oM-password-toggle-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button className="oM-login-button" onClick={handleSubmit}>
          Login
        </button>
        <p className="oM-ptagtextlogin">
          create a new account?{" "}
          <span className="oM-createAccount" onClick={createAccount}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};
