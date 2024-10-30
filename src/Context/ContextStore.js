// OrderContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Create a Context
const OrderContext = createContext();

// Create a Provider component
export const OrderProvider = ({ children }) => {
    const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isScheduled, setIsScheduled] = useState(null);
  const [orderData, setOrderData] = useState({
    senderPhone: '',
    senderName: '',
    senderEmail: '',
    pickupAddress: '',
    receiverName: '',
    receiverPhone: '',
    dropAddress: '',
    contentWeight: 1,
    packageContent: '',
    pickupDate: null,
    pickupTime: null,
    instructions: '',
    distance: '',
  });

  const updateOrderData = (newData) => {
    setOrderData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };



  const handleLogin = async (email, password) => {
    // Reset error and success messages
    setError("");
    setSuccess("");

    // Simple validation for email and password
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // console.log(process.env);

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;
      // console.log(response.data);

      const role = user.role.trim();
      const userId = user.id;
      const isApproved = user.isApproved;
      console.log(isApproved);

      if (!isApproved) {
        setError("Account not approved.");
        setSuccess("");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setSuccess("Login successful!");
      setError("");

      // Redirect to different pages based on the user's role
    //   if (role === "caller") {
    //     navigate("/caller-dashboard");
    //   }
      
    //   else if (role === "delivery boy") {
      if (role === "delivery boy") {
        navigate("/delivery-dashboard");
      } else if (role === "assigner") {
        navigate("/assigner-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        setError("Unknown role");
      }

      const expiresIn = 60 * 60 * 1000; // 60 minutes in milliseconds
      const expiryTime = new Date().getTime() + expiresIn;
      localStorage.setItem('tokenExpiry', expiryTime);

    } catch (error) {
      setError("Login failed");
      setSuccess("");
    }

    

  };


  return (
    <OrderContext.Provider value={{ orderData, updateOrderData,isScheduled, setIsScheduled ,handleLogin, error, success}}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext
export const useOrderContext = () => {
  return useContext(OrderContext);
};
