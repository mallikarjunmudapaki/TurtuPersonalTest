

import React,{useState} from 'react';
import './OrderConfirm.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import PaymentStatusModal from './../../Components/Modal/PaymentConfirmModal/PaymentConfirmModal';
import { useOrderContext } from './../../Context/ContextStore';
import InfoModal from './../../Components/Modal/SummeryModal/CostSummary';
import { FaInfoCircle } from 'react-icons/fa'; 

const ConfirmOrder = () => {
 
  const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { totalAmount, baseFare, extraFarePerKm, weight,distance,weightFare } = location.state || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { orderData,updateOrderData ,isScheduled} = useOrderContext();
  const pricingInfo = {
    baseFare:baseFare,
    totalAmount:totalAmount,
    extraFarePerKm:extraFarePerKm,
    distance:distance,
    weightFare:weightFare,
  };

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const submitOrder = async () => {
    const orderDetails = {
      serviceType: isScheduled ? "Schedule for Later" : "Delivery Now",
      name: orderData.senderName,
      phoneNumber: orderData.senderPhone,
      email: orderData.senderEmail,
      weight: orderData.contentWeight,
      pickupAddress: orderData.pickupAddress,
      dropAddress: orderData.dropAddress,
      content: orderData.packageContent,
      deliveryInstructions: orderData.instructions,
      receiverPhonenumber: orderData.receiverPhone,
      receiverName: orderData.receiverName,
      pickupDate: isScheduled ? orderData.pickupDate : null, // only for 'Schedule for Later'
      pickupTime: isScheduled ? orderData.pickupTime : null  // only for 'Schedule for Later'
    };

    try {
      const amountInPaise = parseFloat(totalAmount.replace('₹', '').trim()) * 100;

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/data/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInPaise, currency: "INR" }),
      }).catch(error => {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch');
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error creating Razorpay order:', errorResponse);
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const razorpayOrder = await response.json().catch(error => {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse JSON response');
      });

      console.log("Razorpay order created:", razorpayOrder);

      const res = await loadScript();

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: 'rzp_test_8zzUM5gDGKZ1Ie',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Your Company Name",
        description: "Courier Delivery Payment",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            const paymentResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/data/usersubmit`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...orderDetails,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: razorpayOrder.amount
              }),
            });

            const textResponse = await paymentResponse.text();
            console.log('Raw server response:', textResponse);

            if (!paymentResponse.ok) {
              throw new Error("Network response was not ok: " + textResponse);
            }

            let paymentData;
            try {
              paymentData = JSON.parse(textResponse);
            } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
              throw new Error('Received response is not in JSON format.');
            }

            console.log(paymentData);
            updateOrderData({
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

            setPaymentSuccess(true);
            setModalVisible(true);
           
          } catch (err) {
            console.error('Error processing payment:', err);
            alert('There was an error processing your payment.');
          }
        },
        prefill: {
          name: orderDetails.name,
          email: orderDetails.email,
          contact: orderDetails.phoneNumber,
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    

    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      alert('There was an error creating your order.');
      setPaymentSuccess(false);
      setModalVisible(true);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRetry = () => {
    setModalVisible(false);
    navigate('/confirm');
  };

  const handleReturnHome = () => {
    setModalVisible(false);
    navigate('/', { replace: true });
  };



  return (
<div className='oM-ConfirmOrder'>
        <div className="oM-container">
          <h1 className="oM-heading">Confirm Your Order</h1>
          <div className="oM-detailBox">
            <span className="oM-label">Pickup Address:</span>
            <span className="oM-value">{ orderData.pickupAddress}</span>
          </div>
          <div className="oM-detailBox">
            <span className="oM-label">Drop Address:</span>
            <span className="oM-value">{orderData.dropAddress}</span>
          </div>
          <div className="oM-detailBox">
            <span className="oM-label">Contents:</span>
            <span className="oM-value">{orderData.packageContent}</span>
          </div>
          <div className="oM-detailBox">
            <span className="oM-label">Weight:</span>
            <span className="oM-value">{weight} kg</span>
          </div>
          <div className="oM-detailBox">
            <span className="oM-label">Distance:</span>
            <span className="oM-value">{distance}</span>
          </div>
          <div className="oM-totalBox">
            <span className="oM-totalLabel">Total Cost   
            <span className="oM-infoIcon" onClick={toggleModal}> <FaInfoCircle/></span>
            </span>
            <span className="oM-totalValue">{totalAmount}
           
            </span>
          </div>
          <button onClick={submitOrder} className="oM-payNowButton">Pay Now</button>
          < InfoModal isOpen={isModalOpen} onClose={toggleModal} pricingInfo={pricingInfo} />
          <PaymentStatusModal
            isOpen={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            paymentSuccess={paymentSuccess}
            handleRetry={handleRetry}
            handleReturnHome={handleReturnHome}
          />

        </div>
        </div>
      );

};



export default ConfirmOrder;