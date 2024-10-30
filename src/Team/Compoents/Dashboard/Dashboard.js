import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./Dashboard.css";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {  useNavigate } from "react-router-dom";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Dashboard = () => {
  const navigate = useNavigate()
  const [dataType, setDataType] = useState("monthly");
  const [chartData, setChartData] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [setTotal, setTotalUsers] = useState(0);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/bar?view=${dataType}`
        );
        if (response.status === 200) {
          setChartData(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching chart data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };


    fetchChartData();
  }, [dataType]);

  useEffect(() => {
    const fetchActiveOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/admin/orders`
        );
        setActiveOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching active orders:", error);
      }
    };
    
    fetchActiveOrders();
  }, []); // Fetch active orders on component mount

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin/orderHistory`); // Make sure the URL is correct
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Handle non-200 responses
        }
        const data = await response.json(); // Parse the JSON response
        setTotalOrders(data.orderCount); // Set the order count from the response
      } catch (error) {
        console.error('Error fetching total orders:', error);
      } finally {
      }
    };

    fetchTotalOrders(); // Call the fetch function
  }, []); //

  useEffect(() => {
    const fetchTotalusers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/admin/reg/users`); // Make sure the URL is correct
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Handle non-200 responses
        }
        const data = await response.json(); // Parse the JSON response
        setTotalUsers(data.users.length); // Set the order count from the response
      } catch (error) {
        console.error('Error fetching total users:', error);
      } finally {
      }
    };

    fetchTotalusers(); // Call the fetch function
  }, []); //


  const formatDate = (tick) => {
    if (dataType === "yearly") {
      return tick; // Return the year as is
    } else {
      return new Date(tick).toLocaleDateString();
    }
  };

  const handleOrderHistory=()=>{
    navigate('/admin-dashboard/dashboard/OrderHistory')
  }

  const barChartData = {
    labels: chartData.map((data) => formatDate(data.date)),
    datasets: [
      {
        label: "Count",
        data: chartData.map((data) => data.count),
        backgroundColor: "#82ca9d",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Count: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="stats-chart-container">
        <div className="stats-container">
          <div onClick={handleOrderHistory} className="stat-box">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
          <div className="stat-box">
            <h3>Total Users</h3>
            <p>{setTotal}</p>
          </div>
        </div>
        <div className="chart-container">
          <div className="toggle-buttons">
            <button onClick={() => setDataType("weekly")}>Weekly</button>
            <button onClick={() => setDataType("monthly")}>Monthly</button>
            <button onClick={() => setDataType("yearly")}>Yearly</button>
          </div>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
      <div className="table-container">
        <h3>Active Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Pickup Address</th>
              <th>Drop Address</th>
              <th>Receiver Number</th>
              <th>Pickup Time</th>
              {/* <th>Drop Time</th> */}
              <th>Assigned Driver</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activeOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.pickupAddress}</td>
                <td>{order.dropAddress}</td>
                <td>{order.receiverPhonenumber}</td>
                <td>{order.pickupTime} {"Null"}</td>
                {/* <td>{order.dropTime}</td> */}
                <td>{order.driver_name}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
