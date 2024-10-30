
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeliveryBoyDashboard.css"; // Assuming you'll create this CSS file for styles
import Navbar from "./../../Compoents/Navbar/Navbar";
import { MdCall } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
// import CountdownTimer from "../../Components/Duetimer/DueTimer";

const DeliveryBoy = () => {
  const [orders, setOrders] = useState([]);
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedPickup, setIsExpandedPickup] = useState(false);
  const [isExpandedDrop, setIsExpandedDrop] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      // setIsLoading(true)
      try {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/orders/assigned-orders/${storedUserId}`
          );
          setOrders(
            response.data.map((order) => ({
              ...order,
              id: order.order_id, 
            }))
          );
          // setIsLoading(false)
        } else {
          console.error("User ID not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching assigned orders:", error);
      }
    };
    
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 30000); 
    return () => clearInterval(intervalId);
  }, []);

  const handleVerifyOtp = async () => {


    try {
      
 
 
      if (!selectedOrderId) {
        setErrorMessage("No order selected");
        return;
      }
     
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/orders/verify-delivery-otp`,
        { orderId: selectedOrderId, providedOtp: otp }
      );
      console.log("OTP Verification Response:", response.data);
      console.log(response.data.valid);
      
      
      if (response.data.valid) {
        setOtpValid((prevOtpValid) => ({
          ...prevOtpValid,
          [selectedOrderId]: true,
        }));
        
        setIsOtpVerified(true); // Set OTP as verified
        setErrorMessage("");

      }
       else {
        console.log('hello');
        
        setOtpValid((prevOtpValid) => ({
          ...prevOtpValid,
          [selectedOrderId]: false,
 
        }));
     
        setErrorMessage("Invalid OTP");
        setIsOtpVerified(false)      
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
     
      setErrorMessage("Error verifying OTP");
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setIsLoading(true)
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      if (newStatus === "delivered" && !otpValid[orderId]) {
        setErrorMessage("Please verify OTP first");
        return;
      }

      const payload = {
        orderId,
        status: newStatus,
        driverUserId: userId,
      };

      console.log("Updating order status with payload:", payload);
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/orders/update-order-status`,
        payload
      );
      console.log("Update response:", response.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (newStatus === "delivered") {
        setOtp("");
        setOtpValid((prevOtpValid) => ({ ...prevOtpValid, [orderId]: false }));
        setSelectedOrderId(null);
        setIsOtpVerified(false); // Reset OTP verification status
      }
      setIsLoading(false)
    } catch (error) {
      console.error("Error updating order status:", error);
      setErrorMessage("Error updating order status");
    }
  };

  const activeOrders = orders.filter((order) => order.status !== "delivered");
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };



  const toggleExpandPickup = () => {
    setIsExpandedPickup(!isExpandedPickup);
  };

  const toggleExpandDrop = () => {
    setIsExpandedDrop(!isExpandedDrop);
  };

  // Function to get the first 10 words
  const getFirstTenWords = (address) => {
    return address.split(' ').slice(0, 5).join(' ');
  };


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

  useEffect(() => {
    const checkTokenExpiry = () => {
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      const currentTime = new Date().getTime();
      if (tokenExpiry && currentTime >= tokenExpiry) {
        handleLogout(); // Call logout function if token is expired
      }
    };

    // Set an interval to check token expiry every minute
    const intervalId = setInterval(checkTokenExpiry, 60000); // Check every 60 seconds for testing

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array

  return (
    <>
       {isLoading && (
        <div className="loading-overlay">
         {/* <div className="spinner"></div> */}
         <video className="loading-video" autoPlay loop muted>
      <source src={require("./../../Resources/Video/loading.mp4")} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
        </div>
      )}
      <Navbar />
      <div className="d-container-caller">
        <h1 className="d-dashboard-title">New Order</h1>
        {activeOrders.length > 0 ? (
          activeOrders.map((order) => (
            <div className="d-order-card" key={order.id}>
              <div className="d-order-id">
                <p className="d-order-id-number">Order Id: #{order.order_id}</p>
                <p className="d-order-id-date">
                  {/* {new Date(order.pickupDate).toISOString().split('T')[0]}  ,  */}
                   {/* Pickup Time : {order.pickupTime.slice(0, -3)} */}
                </p>
              </div>
              <div className="d-order-details-main">
                <div className="d-order-info">
                  <div >
                    {/* <span className="d-due-time">
                    Due in: <CountdownTimer orderId={order.id} dueTimeInMinutes={order.dropTime} />
                    </span> */}
                       <h4 className="d-order-title"> <span className="orderCustomerName">Name :</span>{order.name}</h4>
                  </div>
                </div>
                <div className="d-order-address">
                  <div className="d-pickup-container">
                    <div className="d-pickup-details">
                      <div className="d-location-details">
                        <div className="d-details">
                          <div className="d-location-icon"><IoLocationSharp /></div>
                          <div className="d-details-text">
                            <span className="d-label">Pick-up From</span>
                            <h4 className="d-location-name">
                              {order.pickupAddress}
                            </h4>
                          </div>
                        </div>
                        <div className="d-call-icon">
                          <MdCall
                            onClick={() => handleCall(order.phoneNumber)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-line-connector"></div>
                  <div className="d-drop-container">
                    <div className="d-drop-details">
                      <div className="d-location-details">
                        <div className="d-details">
                          <div className="d-location-icon"><IoLocationSharp /></div>
                          <div className="d-details-text">
                            <span className="d-label">Delivery To</span>
                            <h4 className="d-location-name">
                              {order.dropAddress}
                            </h4>
                           
                          </div>
                        </div>
                        <div className="d-call-icon">
                          <MdCall
                            onClick={() =>
                              handleCall(order.receiverPhonenumber)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-other-details">
                  <p>
                    <strong>Contents:</strong> {order.content}
                  </p>
                  <p>
                    <strong>Weight (kg):</strong> {order.weight}
                  </p>
                </div>
                <div className="d-order-actions">
                {order.status === "active" && (
                  <button
                    className="d-action-button pickup"
                    onClick={() => handleStatusUpdate(order.id, "picked")}
                  >
                    Picked Up
                  </button>
                )}
                {order.status === "picked" && (
                  <button
                    className="d-action-button delivered"
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    Delivered
                  </button>
                )}
              </div>
              </div>
             
            </div>
          ))
        ) : (
          <div className="d-no-orders">No assigned orders</div>
        )}
  <div className="d-button-conatiner">

        <button
          className="d-toggle-history-button"
          onClick={() => setShowHistory((prev) => !prev)}
        >
          {showHistory ? "Hide Order History" : "Show Order History"}
        </button>
  </div>
        {showHistory && (
          <div className="d-order-history-container">
            <div className="d-order-history-section">
              <h2 className="d-order-history-title">Order History</h2>
              <div className="d-order-history-list">
                {deliveredOrders.length > 0 ? (
                  deliveredOrders.map((order) => (
                    <div className="d-order-history-item" key={order.id}>
                      <div className="d-order-history-info">
                        <div className="d-order-id">
                          Order ID: {order.order_id}
                        </div>
                        <div className="d-order-history-details">
                          <div className="d-customer-info">
                            <div>
                              <strong>Name:</strong> <span> {order.name}</span> 
                            </div>
                            <div>
                              <strong>Contents:</strong> <span>{order.content}</span>
                            </div>
                            <div>
                              <strong>Weight (kg):</strong> <span>{order.weight}</span>
                            </div>
                          </div>
                          <div className="d-location-info">
                         
                            <div>
                              <strong>Pick-up Location:</strong>{" "}
                              <span>
                                {isExpandedPickup ? order.pickupAddress : getFirstTenWords(order.pickupAddress)}
                              </span>
                              {!isExpandedPickup && order.pickupAddress.split(' ').length > 10 && (
                                <span className="more" onClick={toggleExpandPickup}>
                                  ...more
                                </span>
                              )}
                            </div>
                            <div>
                              <strong>Drop Location:</strong>{" "}
                              <span>
                                {isExpandedDrop ? order.dropAddress : getFirstTenWords(order.dropAddress)}
                              </span>
                              {!isExpandedDrop && order.dropAddress.split(' ').length > 10 && (
                                <span className="more" onClick={toggleExpandDrop}>
                                  ...more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-no-orders">No delivered orders</div>
                )}
              </div>
            </div>
          </div>
        )}
      
      {selectedOrderId && (
        
        <div className="d-otp-modal">
          <div className="d-otp-modal-content">
            <h2>Verify OTP</h2>
            { errorMessage && <p className="d-error-message">{errorMessage}</p>}
           
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOtp}>
              {isOtpVerified ? "Verified" : "Verify OTP"}
            </button>
            {/* Show error message if OTP is invalid */}
            
          {/* {!isOtpVerified && otpValid[selectedOrderId] === false && (
            
            <p className="error-message">{errorMessage}</p>
            
          )} */}
            {isOtpVerified ? (
             
              
              <button
                onClick={() => handleStatusUpdate(selectedOrderId, "delivered")}
              >
                Submit

              </button>
            ) : (
              <button onClick={() => setSelectedOrderId(null)}>Close</button>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default DeliveryBoy;
