import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AssignerDashboard.css';
import Navbar from '../../../Team/Compoents/Navbar/Navbar';
import FilterComponent from '../../../Team/Compoents/FilterOrders/SearchOrder';
const AssignedDashboard = () => {

  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredAssignedOrders, setFilteredAssignedOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [view, setView] = useState('deliverNow');
  const [showAssignedOrders, setShowAssignedOrders] = useState(false);
  

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/pending-orders`);
      const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      setError('Error fetching orders');
      console.error('Error fetching orders:', error);
      setDrivers([]);
    }
  };

  // Fetch Assigned Orders
  const fetchAssignedOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/assigned-orders`);
      const sortedAssignedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFilteredAssignedOrders(sortedAssignedOrders);
    } catch (error) {
      setError('Error fetching assigned orders');
      console.error('Error fetching assigned orders:', error);
    }
  };

    // Fetch Scheduled Orders
    const fetchScheduledOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/scheduled-orders`);
        const sortedScheduledOrders = response.data.sort((a, b) => new Date(b.pickupDate) - new Date(a.pickupDate));
        setScheduledOrders(sortedScheduledOrders);
      } catch (error) {
        setError('Error fetching scheduled orders');
        console.error('Error fetching scheduled orders:', error);
      }
    };

  // Fetch Drivers
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/drivers/available`);
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      // Handle the case where no drivers are available by setting drivers to an empty array
      setDrivers([]);
    }
  };

  // Fetch Data on Component Mount and Poll Every 60 Seconds
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchOrders(), fetchAssignedOrders(), fetchDrivers(),fetchScheduledOrders()]);
      setIsLoading(false);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  
  // Assign Driver to Order
  const handleAssignDriver = async (orderId, driverName) => {
    if (!driverName) {
      alert('Please select a driver.');
      return;
    }
    setIsLoading(true);

    try {
      const driver = drivers.find(d => d.name === driverName);
      if (!driver) {
        alert('Driver not found.');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/orders/assign-order`, {
        orderId,
        driverId: driver.id,
        userId: driver.user_id,
        driverPhoneNumber: driver.phonenumber,
        driverEmail: driver.email,
        driverName: driver.name
      });

      console.log(response.data.message);
      // Show success message
      await Promise.all([fetchAssignedOrders(), fetchOrders(),fetchScheduledOrders()]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert('Error assigning driver');
    }
  };

  // Search Orders
 
  const handleSearch = async (orderId) => {
    try {
      const url = orderId 
        ? `${process.env.REACT_APP_API_BASE_URL}/api/orders/assigned-order/${orderId}` 
        : `${process.env.REACT_APP_API_BASE_URL}/api/orders`;
      
      const response = await axios.get(url);
      
      // Log the response to understand its structure
      // console.log('API response:', response.data);
      
      let sortedFilteredOrders = [];
      
      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        sortedFilteredOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (typeof response.data === 'object' && response.data !== null) {
        // If it's a single object, you may want to handle it accordingly
        sortedFilteredOrders = [response.data]; // Wrap the single order in an array if needed
      }
  
      setFilteredAssignedOrders(sortedFilteredOrders);
    } catch (error) {
      console.error('Error fetching filtered assigned orders:', error);
      setFilteredAssignedOrders([]);
    }
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


  // if (isLoading) return ;
  if (error) return <p>{error}</p>;

  return (
    <div>
       {isLoading && (
        <div className="loading-overlay">
         {/* <div className="spinner"></div> */}
              <video className="loading-video" autoPlay loop muted>
            <source src={require("./../../../Team/Resources/Video/loading.mp4")} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <Navbar />


     
      <div className="A-switchbtn">
        <button 
          className={`orderswitchbtn1 ${view === 'deliverNow' ? 'active' : ''}`} 
          onClick={() => setView('deliverNow')}
        >
          Deliver Now Orders
        </button>
        <button 
          className={`orderswitchbtn2 ${view === 'scheduledOrders' ? 'active' : ''}`} 
          onClick={() => setView('scheduledOrders')}
        >
          Scheduled Orders
        </button>
      </div>

      <div className="table-container">
        {view === 'deliverNow' && (
          <>
            <h1>Deliver Now</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  {/* <th>Phone Number</th> */}
                  <th>Name</th>
                  {/* <th>Email</th> */}
                  <th>Pickup Address</th>
                  <th>Drop Address</th>
                  {/* <th>Receiver Phonenumber</th> */}
                  <th>Content</th>
                  <th>Weight</th>
                  {/* <th>Status</th> */}
                  <th>Assign Driver</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="15">No unassigned orders</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      {/* <td>{order.phoneNumber}</td> */}
                      <td>{order.name}</td>
                      {/* <td>{order.email}</td> */}
                      <td>{order.pickupAddress}</td>
                      <td>{order.dropAddress}</td>
                      {/* <td>{order.receiverPhonenumber}</td> */}
                      <td>{order.content}</td>
                      <td>{order.weight} {"Kg"}</td>
                      {/* <td>{order.status}</td> */}
                      <td>
                        <select id={`driver-select-${order.id}`}>
                          {drivers.length === 0 ? (
                            <option value="">No drivers available</option>
                          ) : (
                            <>
                              <option value="">Select Driver</option>
                              {drivers.map(driver => (
                                <option key={driver.phonenumber} value={driver.name}>{driver.name}</option>
                              ))}
                            </>
                          )}
                        </select>

                        <button className='assignbtn' onClick={() => {
                          const selectElement = document.getElementById(`driver-select-${order.id}`);
                          handleAssignDriver(order.id, selectElement.value);
                        }}>
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}

        {view === 'scheduledOrders' && (
          <>
            <h1>Scheduled Orders</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  {/* <th>Phone Number</th> */}
                  <th>Name</th>
                  {/* <th>Email</th> */}
                  <th>Pickup Address</th>
                  <th>Drop Address</th>
                  {/* <th>Receiver Phonenumber</th> */}
                  <th>Content</th>
                  <th>Weight</th>
                  <th>Pickup Date</th>
                  <th>Pickup Time</th>
                  {/* <th>Status</th> */}
                  <th>Assign Driver</th>
                </tr>
              </thead>
              <tbody>
                {scheduledOrders.length === 0 ? (
                  <tr>
                    <td colSpan="15">No scheduled orders</td>
                  </tr>
                ) : (
                  scheduledOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      {/* <td>{order.phoneNumber}</td> */}
                      <td>{order.name}</td>
                      {/* <td>{order.email}</td> */}
                      <td>{order.pickupAddress}</td>
                      <td>{order.dropAddress}</td>
                      {/* <td>{order.receiverPhonenumber}</td> */}
                      <td>{order.content}</td>
                      <td>{order.weight} {"Kg"}</td>
                      <td>{new Date(order.pickupDate).toISOString().split('T')[0]}</td>
                      <td>{order.pickupTime}</td>
                      {/* <td>{order.status}</td> */}
                      <td>
                        <select id={`driver-select-${order.id}`}>
                          {drivers.length === 0 ? (
                            <option value="">No drivers available</option>
                          ) : (
                            <>
                              <option value="">Select Driver</option>
                              {drivers.map(driver => (
                                <option key={driver.phonenumber} value={driver.name}>{driver.name}</option>
                              ))}
                            </>
                          )}
                        </select>

                        <button className='assignbtn' onClick={() => {
                          const selectElement = document.getElementById(`driver-select-${order.id}`);
                          handleAssignDriver(order.id, selectElement.value);
                        }}>
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </div>


      
       {/* Button to toggle visibility of assigned orders */}
       <div className='OrderHistorybtn-container'>

       <button className='OrderHistorybtn' onClick={() => setShowAssignedOrders(!showAssignedOrders)}>
        {showAssignedOrders ? 'Close Assigned Orders' : 'Show Assigned Orders'}
      </button>
       </div>

      {/* Assigned Orders Section */}
      {showAssignedOrders && (


        <div>
        <div className='filtercomponent-assigner'>
          <FilterComponent onSearch={handleSearch} />
        </div>

          <h1>Order History</h1>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Phone Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Pickup Address</th>
                  <th>Drop Address</th>
                  <th>Receiver Phonenumber</th>
                  <th>Content</th>
                  <th>Weight</th>
                  <th>Pickup Date</th>
                  <th>Pickup Time</th>
                  {/* <th>Drop Time </th> */}
                  {/* <th>Created At</th> */}
                  <th>Status</th>
                  <th>Assigned Driver</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignedOrders.length === 0 ? (
                  <tr>
                    <td colSpan="15">No assigned orders</td>
                  </tr>
                ) : (
                  filteredAssignedOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.order_id}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.pickupAddress}</td>
                      <td>{order.dropAddress}</td>
                      <td>{order.receiverPhonenumber}</td>
                      <td>{order.content}</td>
                      <td>{order.weight} {"Kg"}</td>
                      <td>{ order.pickupDate?new Date(order.pickupDate).toISOString().split('T')[0]:"NULL"}</td>
                      <td>{order.pickupTime? order.pickupTime:"NULL"}</td>
                      {/* <td>{order.dropTime}min</td> */}
                      {/* <td>{new Date(order.createdAt).toLocaleString()}</td> */}
                      <td>{order.status}</td>
                      <td>{order.assignedDriver || order.driver_name || 'Not Assigned'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AssignedDashboard;
