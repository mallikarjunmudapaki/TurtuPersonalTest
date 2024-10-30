import React, { useState, useEffect } from 'react';
import './AdminOrderHistory.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
const AdminOrderHistory = () => {
    const navigate = useNavigate()
  const [orders, setOrders] = useState([]); // State for orders
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin/orderHistory`); // Fetch order history
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse JSONg
        console.log(data);
        
        setOrders(data.orders); // Set orders state
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders'); // Handle error
        
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchOrders(); // Fetch orders on mount
  }, []); // Run once on mount

  const onClose=()=>{
    navigate('/admin-dashboard/')
  }

  return (
    <div className="order-history-modal"> {/* Modal style wrapper */}
      <h2>Order History</h2>
      <button className="close-button-a" onClick={onClose}><MdClose size={30}/></button> {/* Close button */}
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching
      ) : error ? (
        <p>{error}</p> // Show error message if there's an error
      ) : (
        <table>
          <thead className="table-header">
            <tr className="header-row">
              <th className="header-cell">Order ID</th>
              <th className="header-cell">Name</th>
              <th className="header-cell">Pickup Address</th>
              <th className="header-cell">Drop Address</th>
              <th className="header-cell">Receiver Name</th>
              <th className="header-cell">Content</th>
              <th className="header-cell">Weight</th>
              <th className="header-cell">Driver Name</th>
              <th className="header-cell">Status</th>
              <th className="header-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="data-row" key={order.id}>
                <td className="data-cell">{order.order_id}</td>
                <td className="data-cell">{order.name}</td>
                <td className="data-cell">{order.pickupAddress}</td>
                <td className="data-cell">{order.dropAddress}</td>
                <td className="data-cell">{order.receiverName}</td>
                <td className="data-cell">{order.content}</td>
                <td className="data-cell">{order.weight}</td>
                <td className="data-cell">{order.driver_name}</td>
                <td className="data-cell">{order.status}</td>
                <td className="data-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderHistory;
