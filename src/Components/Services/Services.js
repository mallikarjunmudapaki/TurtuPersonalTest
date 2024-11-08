// import React from 'react';
// import { Link } from 'react-router-dom';
// import CourierServicesImg from '../../Images/BlogCourier.png';
// import FoodDeliveryImg from '../../Images/Food_Delivery.png';
// import CakeDeliveryImage from '../../Images/Cake_Delivery.png';
// import GiftDeliveryImage from '../../Images/Gift Delivery.png';
// import PickanddropImage from '../../Images/Pick and Drop.png';
// import MedicineDeliveryImage from '../../Images/Medicine_Delivery.png';
// import './Services.css';

// const services = [
//   {
//     id: 1,
//     image: CourierServicesImg,
//     heading: 'Courier Services',
//     text: 'Forgot something at home or office? We’ll pick it up and deliver it to your doorstep.',
//     btn:'Book Your Courier',
//     whatsappNumber: '917975443090',
//     whatsappMessage: 'Hi! I have a package ready for pickup and delivery. Could you please assist me with the courier service details?',
//   },
//   {
//     id: 2,
//     image: FoodDeliveryImg,
//     heading: 'Food Delivery',
//     text: 'Order your favorite meals and have them delivered to your doorstep.',
//     btn: 'Order Now',
//     whatsappNumber: '917975443090',
//     whatsappMessage: " Hello! I'd like to place a food delivery order. Could you guide me on the steps to proceed?",
//   },
//   {
//     id: 3,
//     image: PickanddropImage,
//     heading: 'Pick and Drop',
//     text: 'Need something picked up and dropped off? We can help!',
//     btn:'Book Your Pickup',
//     whatsappNumber: '917975443090',
//     whatsappMessage: 'Hi there! I need assistance with picking up an item from one location and delivering it to another. Could you help me with the details?',
//   },
//   {
//     id: 4,
//     image: CakeDeliveryImage,
//     heading: 'Cake Delivery',
//     text: 'Order delicious cakes for any occasion.',
//     btn:'Order Now',
//     whatsappNumber: '917975443090',
//     whatsappMessage: 'Hi! I’m interested in ordering a cake. Could you share the available options with me?',
//   },
//   {
//     id: 5,
//     image: GiftDeliveryImage,
//     heading: 'Gifts and Flowers',
//     text: 'Send beautiful gifts and flowers to your loved ones.',
//     btn:'Order Now',
//     whatsappNumber: '917975443090',
//     whatsappMessage: 'Hello! I’d like to send gifts and flowers to someone special. Can you assist me with the available choices?',
//   },
//   {
//     id: 6,
//     image: MedicineDeliveryImage,
//     heading: 'Medicine Delivery',
//     text: 'Get your medicines delivered at your convenience.',
//     btn:'Order Now',
//     whatsappNumber: '917975443090',
//     whatsappMessage: 'Hi! I need some medicines delivered. Could you guide me through the process?',
//   },
// ];

// const ServicePage = () => {
//   return (
//     <div className="wrapper">
//     <div className="container service-page" id='services'>
//       <div className="row">
//         {services.map((service) => (
//           <div key={service.id} className="col-md-6 g-5">
//             <div className="row service-box">
//               <div className="col-md-5">
//                 <img src={service.image} className="img-fluid service-img" alt={service.heading} />
//               </div>
//               <div className="col-md-7 d-flex flex-column justify-content-center">
//                 <h5 className="service-heading">{service.heading}</h5>
//                 <p className="service-text">{service.text}</p>
//                 <a
//                   href={`https://wa.me/${service.whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
//                   className="btn btn-primary service-btn"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {service.btn}
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ServicePage;


import React from 'react';
import { Link } from 'react-router-dom';
import CourierServicesImg from '../../Images/BlogCourier.png';
import FoodDeliveryImg from '../../Images/Food_Delivery.png';
import CakeDeliveryImage from '../../Images/Cake_Delivery.png';
import GiftDeliveryImage from '../../Images/Gift Delivery.png';
import PickanddropImage from '../../Images/Pick and Drop.png';
import MedicineDeliveryImage from '../../Images/Medicine_Delivery.png';
import './Services.css';

const services = [
  {
    id: 1,
    image: CourierServicesImg,
    heading: 'Courier Services',
    text: 'Forgot something at home or office? We’ll pick it up and deliver it to your doorstep.',
    btn:'Book Your Courier',
    whatsappNumber: '917975443090',
    whatsappMessage: 'Hi! I have a package ready for pickup and delivery. Could you please assist me with the courier service details?',
  },
  {
    id: 2,
    image: FoodDeliveryImg,
    heading: 'Food Delivery',
    text: 'Order your favorite meals and have them delivered to your doorstep.',
    btn: 'Order Now',
    whatsappNumber: '917975443090',
    whatsappMessage: " Hello! I'd like to place a food delivery order. Could you guide me on the steps to proceed?",
  },
  {
    id: 3,
    image: PickanddropImage,
    heading: 'Pick and Drop',
    text: 'Need something picked up and dropped off? We can help!',
    btn:'Book Your Pickup',
    whatsappNumber: '917975443090',
    whatsappMessage: 'Hi there! I need assistance with picking up an item from one location and delivering it to another. Could you help me with the details?',
  },
  {
    id: 4,
    image: CakeDeliveryImage,
    heading: 'Cake Delivery',
    text: 'Order delicious cakes for any special occasion or celebration',
    btn:'Order Now',
    whatsappNumber: '917975443090',
    whatsappMessage: 'Hi! I’m interested in ordering a cake. Could you share the available options with me?',
  },
  {
    id: 5,
    image: GiftDeliveryImage,
    heading: 'Gifts and Flowers',
    text: 'Send beautiful gifts and flowers to your loved ones.',
    btn:'Order Now',
    whatsappNumber: '917975443090',
    whatsappMessage: 'Hello! I’d like to send gifts and flowers to someone special. Can you assist me with the available choices?',
  },
  {
    id: 6,
    image: MedicineDeliveryImage,
    heading: 'Medicine Delivery',
    text: 'Get your medicines delivered at your convenience.',
    btn:'Order Now',
    whatsappNumber: '917975443090',
    whatsappMessage: 'Hi! I need some medicines delivered. Could you guide me through the process?',
  },
];

const ServicePage = () => {
  return (
    <>
    <h1>Services</h1>
    <div  className=" container service-page" id='services'>
  <div className="row">
    {services.map((service) => (
      <div key={service.id} className="col-6 col-md-6 g-3">
        <div className="row service-box">
          <div className="col-12 col-md-5">
            <img src={service.image} className="img-fluid service-img" alt={service.heading} />
          </div>
          <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
            <h5 className="service-heading">{service.heading}</h5>
            <p className="service-text">{service.text}</p>
            <a
              href={`https://wa.me/${service.whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
              className="btn btn-primary service-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {service.btn}
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</>
  );
};

export default ServicePage;

