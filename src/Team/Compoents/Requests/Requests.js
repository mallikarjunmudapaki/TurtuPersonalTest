import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Requests.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch data from the endpoint
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/nonapproval`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/admin/accept/${id}`);
      // Update local state after acceptance
      setRequests(requests.filter(request => request.id !== id));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/admin/reject/${id}`);
      // Update local state after rejection
      setRequests(requests.filter(request => request.id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className='requests'>
      <h3>Incoming Onboarding Requests</h3>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role Applied For</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.phonenumber}</td>
              <td>{request.role}</td>
              <td>
                <button className='Accptbtn' onClick={() => handleAccept(request.id)}>Accept</button>
                <button className='Rejectbtn' onClick={() => handleReject(request.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
