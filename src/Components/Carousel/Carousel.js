import React, { useState,useEffect} from 'react';
import './Carousel.css';
import DeliveryImage from '../../Images/Delivery_carousel.png';
import GiftDeliveryimg from '../../Images/Delivery_carousel2.png';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel items with content and image features
  const carouselItems = [
    {
      heading: "Send Any documents or packages anywhere in city limits",
      text: "Documents and packages delivered safely and promptly to your doorstep!",
      btn1: "Call To Order",
      btn2: "Whatsapp Now",
      image: DeliveryImage
    },
    {
      heading: "Anything Anywhere",
      text: "You can send #parcels and packages  #documents #food #cake and etc.",
      btn1: "Call To Order",
      btn2: "Whatsapp Now",
      image: GiftDeliveryimg
    },
    {
      heading: "Worried about safe cake deliveries?",
      text: "We are the best, safest cake deliverers Pan INDIA Book your cake delivery now",
      btn1: "Call To Order",
      btn2: "Whatsapp Now",
      image: GiftDeliveryimg
    },
    {
      heading: "Send Gifts and flowers to your loved ones",
      text: "Now send any gifts and flowers at affordable prices across the city.",
      btn1: "Call To Order",
      btn2: "Whatsapp Now",
      image: GiftDeliveryimg
    }
  ];

  // Function to handle next slide
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  // Function to handle previous slide
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); 

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, );

  const handleWhatsAppClick = () => {
    window.location.href = "https://wa.me/+917975443090";
  };

  const handleCallClick = () => {
    window.location.href = "tel:+917975443090";
  };
  return (
    <section className='Carousel-section'>
    <div className="carousel-container">
      <div className="carousel-content">
        <h2>{carouselItems[activeIndex].heading}</h2>
        <p>{carouselItems[activeIndex].text}</p>
        <div className="buttons">
          <button className="carousel-btn" onClick={handleCallClick}>{carouselItems[activeIndex].btn1}</button>
          <button className="carousel-btn" onClick={handleWhatsAppClick}>{carouselItems[activeIndex].btn2}</button>
        </div>
      </div>
      <div className="carousel-image">
        <img src={carouselItems[activeIndex].image} alt="Delivery Illustration" />
      </div>
      {/*<div className="carousel-controls">
        <button onClick={handlePrev} className="prev-btn">‹</button>
        <button onClick={handleNext} className="next-btn">›</button>
      </div>*/}
    </div>
    </section>
  );
};

export default Carousel;
