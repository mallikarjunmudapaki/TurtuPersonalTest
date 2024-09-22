import React from 'react';
import { Link } from 'react-router-dom';
import CourierServicesImg from '../../Images/Courier_Delivery.png';
import FoodDeliveryImg from '../../Images/Food_Delivery.png';
import CakeDeliveryImage from '../../Images/Cake_delivery.png';
import GiftDeliveryImage from '../../Images/Frame 4.png';
import PickanddropImage from '../../Images/Document _delivery.png';
import MedicineDeliveryImage from '../../Images/Medicine_Delivery.png';

const services = [
  {
    id: 1,
    image: CourierServicesImg,
    heading: 'Courier Services',
    text: 'Have you left or forgotten anything at home / office / anywhere? Get it picked and dropped at your doorstep.',
    whatsappNumber: '917975443090',
    whatsappMessage: 'I have a courier to be delivered.',
  },
  {
    id: 2,
    image: FoodDeliveryImg,
    heading: 'Food Delivery',
    text: 'Order your favorite meals and have them delivered to your doorstep.',
    whatsappNumber: '917975443090',
    whatsappMessage: 'I want to order food delivery.',
  },
  {
    id: 3,
    image: PickanddropImage,
    heading: 'Pick and Drop',
    text: 'Need something picked up and dropped off? We can help!',
    whatsappNumber: '917975443090',
    whatsappMessage: 'I need pick and drop service.',
  },
  {
    id: 4,
    image: CakeDeliveryImage,
    heading: 'Cake Delivery',
    text: 'Order delicious cakes for any occasion.',
    whatsappNumber: '917975443090',
    whatsappMessage: 'I want to order a cake.',
  },
  {
    id: 5,
    image: GiftDeliveryImage,
    heading: 'Gifts and Flowers',
    text: 'Send beautiful gifts and flowers to your loved ones.',
    whatsappNumber: '917975443090',
    whatsappMessage: 'I want to send gifts and flowers.',
  },
  {
    id: 6,
    image: MedicineDeliveryImage,
    heading: 'Medicine Delivery',
    text: 'Get your medicines delivered at your convenience.',
    whatsappNumber: '917975443090',
    whatsappMessage: 'I need medicine delivery.',
  },
];

const ServicePage = () => {
  return (
    <div className="container service-page">
      {/* Row to hold 2 services per row with a gap */}
      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-6 g-5">
            <div className="row service-box">
              {/* Left Column: Image */}
              <div className="col-md-5">
                <img src={service.image} className="img-fluid service-img" alt={service.heading} />
              </div>
              {/* Right Column: Content */}
              <div className="col-md-7 d-flex flex-column justify-content-center">
                <h5 className="service-heading">{service.heading}</h5>
                <p className="service-text">{service.text}</p>
                <a
                  href={`https://wa.me/${service.whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
                  className="btn btn-primary service-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import CourierServicesImg from '../../Images/Courier_Delivery.png';
// import FoodDeliveryImg from '../../Images/Food_Delivery.png';
// import CakeDeliveryImage from '../../Images/Cake_delivery.png';
// import GiftDeliveryImage from '../../Images/Frame 4.png';
// import PickanddropImage from '../../Images/Document _delivery.png';
// import MedicineDeliveryImage from '../../Images/Medicine_Delivery.png';
// const services = [
//   {
//     id: 1,
//     image:  CourierServicesImg,
//     heading: 'Courier Services',
//     text: 'Have you left or forgotten anything at home / office / anywhere? Get it picked and dropped at your doorstep.',
//     link: '/service1'
//   },
//   {
//     id: 2,
//     image:  FoodDeliveryImg,
//     heading: 'Food Delivery',
//     text: 'Have you left or forgotten anything at home / office / anywhere? Get it picked and dropped at your doorstep.',
//     link: '/service2'
//   },
//   {
//     id: 3,
//     image:  PickanddropImage,
//     heading: 'Pick and Drop',
//     text: 'Have you left or forgotten anything at home / office / anywhere? Get it picked and dropped at your doorstep.',
//     link: '/service1'
//   },
//   {
//     id: 4,
//     image:  CakeDeliveryImage,
//     heading: 'Cake Delivery',
//     text: 'Have you left or forgotten anything at home / office / anywhere? Get it picked and dropped at your doorstep.',
//     link: '/service1'
//   },
//   {
//     id: 5,
//     image:  GiftDeliveryImage,
//     heading: 'Gifts and Flower',
//     text: 'Have you left or forgotten anything at home / office / anywhere? Get it picked and dropped at your doorstep.',
//     link: '/service1'
//   },
//   {
//     id: 6,
//     image: MedicineDeliveryImage,
//     heading: 'Medicine Delivery',
//     text: 'Have you left or forgotten anything at home / office / anywhere? Get it picked and dropped at your doorstep.',
//     link: '/service1'
//   },
// ];
// const ServicePage = () => {
//     return (
//       <div className="container service-page">
//         {/* Row to hold 2 services per row with a gap */}
//         <div className="row">
//           {services.map((service, index) => (
//             <div key={service.id} className="col-md-6 g-5">
//               <div className="row service-box">
//                 {/* Left Column: Image */}
//                 <div className="col-md-5">
//                   <img src={service.image} className="img-fluid service-img" alt={service.heading} />
//                 </div>
//                 {/* Right Column: Content */}
//                 <div className="col-md-7 d-flex flex-column justify-content-center">
//                   <h5 className="service-heading">{service.heading}</h5>
//                   <p className="service-text">{service.text}</p>
//                   <Link to={service.link} className="btn btn-primary service-btn">Read More</Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default ServicePage;