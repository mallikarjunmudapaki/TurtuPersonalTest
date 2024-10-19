import React, { useEffect, useState } from 'react';
import './OrderProcess.css'; 
import PlaceOrder from '../../Images/PlaceOrder.png';
import AssignDeliveryHero from '../../Images/AssignedDeliveryHero.png';
import DeliveredOrder from '../../Images/OrderDelivered.png';

const OrderProcess = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prevStep => (prevStep + 1) % 3);  
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className='order-process-header text-center'>
      <h2>How it works</h2>
    </div>
    <div className="order-process-container">
  <div className="step" style={{ '--delay': '0s' }}>
    <img src={PlaceOrder} alt="Place Your Order" />
    <h3>Place Your Order</h3>
    {/* <p>Select your items and proceed to checkout.</p> */}
  </div>

  {/* <div className="empty-space" style={{ '--delay': '0.5s' }}>
    <span className="icon">🛒</span>
    <span className="description">Next: Delivery Hero Assigned</span>
  </div> */}

  <div className="step" style={{ '--delay': '1s' }}>
    <img src={AssignDeliveryHero} alt="Delivery Hero Assigned" />
    <h3>Delivery Hero Assigned</h3>
    {/* <p>Your delivery is on its way!</p> */}
  </div>

  {/* <div className="empty-space" style={{ '--delay': '1.5s' }}>
    <span className="icon">🚚</span>
    <span className="description">Next: Order Delivered</span>
  </div> */}

  <div className="step" style={{ '--delay': '2s' }}>
    <img src={DeliveredOrder} alt="Order Delivered" />
    <h3>Order Delivered</h3>
    {/* <p>Enjoy your item delivered to your doorstep!</p> */}
  </div>
</div>
</>
  );
};

export default OrderProcess;
