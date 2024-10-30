// import React,{useState} from 'react';
// import { HiArrowCircleRight } from "react-icons/hi";
// import './UserOrderService.css'; // Assuming you have a separate CSS file for styles
// import { Link } from 'react-router-dom';
// import { FaWhatsapp, FaPhone } from "react-icons/fa";

// const Services = (props) => {

//   const [showPopup, setShowPopup] = useState(false);

//   const handleArrowClick = () => {
//     if (props.isSpecialService) {
//       setShowPopup(!showPopup);
//     } else {
//       // Default behavior for other services (if any)
//       console.log("Navigate to:", props.path);
//     }
//   };

//   const handleChoice = (choice) => {
//     setShowPopup(false);
//     if (choice === 'whatsapp') {
//       const whatsappUrl = `https://wa.me/${props.phoneNumber}?text=${encodeURIComponent(props.whatsappMessage)}`;
//       window.open(whatsappUrl, '_blank');
//     } else if (choice === 'call') {
//       window.location.href = `tel:${props.phoneNumber}`;
//     }
//   };

//   return (
//     <div className="service-card"  onClick={handleArrowClick} style={{ backgroundColor: props.color }}>
//       <div className="service-header">
//         <h4 className='service-header-text'>{props.heading}</h4>
//       </div>
//       <div className='service-lower-container'>
//       <button className="service-navigate-btn"  >
//           <Link to={props.path} className="service-navigate-btn">
//           <div className="navigateIcon">
//           <HiArrowCircleRight />
//           </div>
//           </Link>
//         </button>
//         {showPopup && (
//           <div className="popup-menu">
//             <button className='s-popupbtn-whatsapp' onClick={() => handleChoice('whatsapp')}><FaWhatsapp size={25}/></button>
//             <button className='s-popupbtn-call' onClick={() => handleChoice('call')}><FaPhone size={25} /></button>
//           </div>
//         )}

//       <div className="service-image">
//         <img className='Service-img' src={props.img} alt="Service" />
//       </div>
//       </div>
//     </div>
//   );
// }

// export default Services;
import React from 'react';
import { HiArrowCircleRight } from "react-icons/hi";
import './UserOrderService.css'; // Assuming you have a separate CSS file for styles
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const Services = (props) => {

  const handleArrowClick = () => {
    props.onClick(); // Call the onClick passed from OrderServices
  };

  const handleChoice = (choice) => {
    if (choice === 'whatsapp') {
      const whatsappUrl = `https://wa.me/${props.phoneNumber}?text=${encodeURIComponent(props.whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    } else if (choice === 'call') {
      window.location.href = `tel:${props.phoneNumber}`;
    }
  };

  return (
    <div className="service-card" onClick={handleArrowClick} style={{ backgroundColor: props.color }}>
      <div className="service-header">
        <h4 className='service-header-text'>{props.heading}</h4>
      </div>
      <div className='service-lower-container'>
        <button className="service-navigate-btn">
          {props.path ? (
            // Render Link only if a path is provided
            <Link to={props.path} className="service-navigate-btn">
              <div className="navigateIcon">
                <HiArrowCircleRight />
              </div>
            </Link>
          ) : (
            <div className="navigateIcon">
              <HiArrowCircleRight />
            </div>
          )}
        </button>
        {props.showPopup && ( // Show popup based on the showPopup prop
          <div className="popup-menu">
            <button className='s-popupbtn-whatsapp' onClick={() => handleChoice('whatsapp')}><FaWhatsapp size={25} /></button>
            <button className='s-popupbtn-call' onClick={() => handleChoice('call')}><FaPhone size={25} /></button>
          </div>
        )}
        <div className="service-image">
          <img className='Service-img' src={props.img} alt="Service" />
        </div>
      </div>
    </div>
  );
}

export default Services;
