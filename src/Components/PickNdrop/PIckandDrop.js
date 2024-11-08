import React, { useState } from 'react';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import './PIckandDrop.css';
import OrderForm from './../../Components/OrderForm/OrderForm';
import { useOrderContext } from './../../Context/ContextStore';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import CakeDeliveryalert from '../Alert/CakeDeliveryalert/CakeDeliveryalert';

const PickandDrop = () => {
  const { isScheduled, setIsScheduled } = useOrderContext();
  const [orderTypeSelected, setOrderTypeSelected] = useState(false);
  const navigate = useNavigate(); 
  const handleOrderTypeSelect = (scheduled) => {
    setIsScheduled(scheduled);
    setOrderTypeSelected(true);
  };


  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      <CakeDeliveryalert/>
      <div className="oM-PnD-container">

      <button className="back-button" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>

        <h1 className="oM-Container-header">Book Your Order For Pick And Drop</h1>
        {/* <p className='oM-WarningMess' >For Cake Delivery Call us : +91 8747858317 </p> */}

        <div className="oM-order-type">
          <div
            className={`oM-order-card ${isScheduled === false ? 'selected' : ''}`}
            onClick={() => handleOrderTypeSelect(false)}
          >
            <FaClock className="oM-order-icon" />
            <h3>Deliver Now</h3>
            <p>Will assign nearest delivery hero to you</p>
          </div>
          <div
            className={`oM-order-card ${isScheduled === true ? 'selected' : ''}`}
            onClick={() => handleOrderTypeSelect(true)}
          >
            <FaCalendarAlt className="oM-order-icon" />
            <h3>Schedule for Later</h3>
            <p>Will deliver your item on scheduled date and time safe and secure</p>
            <p>Note: Only up to 3 days</p>
          </div>
        </div>
      {isScheduled === null && ( // Show message if no order type is selected
          <p className="oM-order-prompt">Please select your order type</p>
        )}
      </div>

      {orderTypeSelected && ( // Show the order form only after a type is selected
        <div className="oM-orderForms">
          <OrderForm />
        </div>
      )}
    </>
  );
};

export default PickandDrop;
