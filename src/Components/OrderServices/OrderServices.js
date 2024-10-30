import React,{useState} from 'react'
import './OrderServices.css'
import Services from '../UserOrderService/UserOrderService'

 const FoodService = require('./../../Images/FoodDelivery.png')
 const pickndropService = require('./../../Images/PickNdrop.png')
 const OrganicProductService = require('./../../Images/organicProduct.png')
 const CakeDeliverService = require("./../../Images/carasoul3.webp")
const OrderServices = () => {
  const [selectedService, setSelectedService] = useState(null); 
  const handleServiceClick = (serviceIndex, path) => {
    if (path) {
      // If there is a path, navigate to that path
      window.location.href = path; // or use a router's navigation method if applicable
    } else {
      // Otherwise toggle the popup for special services
      setSelectedService(selectedService === serviceIndex ? null : serviceIndex);
    }
  };

  return (
    <div className='oM-home-conatiner'>

    <div className='oM-home-services'>

    <div className='oM-TopConatiner'>
      <div className='oM-Food-Service'>
        <Services
        heading="Food Delivery"
        img={FoodService}
        color="#ffd32c"
        phoneNumber="7022006638"
        whatsappMessage="Hello, I am interested in your Food Delivery service. Can u please share me the menu"
        // path="/your-path"
        isSpecialService={true}
        onClick={() => handleServiceClick(0)} // Pass index for food delivery
        showPopup={selectedService === 0} // Show popup if selected
      />
      </div>
      <div className='oM-PND-Service'>
      <Services
        heading="Pick And Drop"
        img={pickndropService}
        color="#6fcce3" 
        path="/pick-and-drop" // Path for navigation
              onClick={() => handleServiceClick(null, "/pick-and-drop")} // Call navigation directly
      />
      </div>
      </div>


      <div className='oM-lowerConatiner'>
      <div className='oM-Organic-Service'>
      <Services
        heading="Organic Products"
        img={OrganicProductService}
        color="#affc97"
        phoneNumber="7022006638"
        whatsappMessage="Hello , I am interested in Ordering Organic Product From your Service Please Share the item List which you are delivering"
        // path="/your-path"
        isSpecialService={true} 
        onClick={() => handleServiceClick(2)} // Pass index for organic products
        showPopup={selectedService === 2} // Show popup if selected
      />
      </div>
      <div className='oM-CakeD-Service'>
      <Services
        heading="Cake Delivery"
        img={CakeDeliverService}
        color="#f786d3" 
        // color="#f786d3" 
        phoneNumber="7022006638"
        whatsappMessage="Hello , I am interested in your cake delivery Service please let me know the procedure "
        // path="/your-path"
        isSpecialService={true} 
        onClick={() => handleServiceClick(3)} // Pass index for cake delivery
        showPopup={selectedService === 3} // Show popup if selected

      
      />
      </div>
      </div>

    </div>
    </div>
   
  )
}

export default OrderServices
