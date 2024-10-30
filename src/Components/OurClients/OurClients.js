import React from 'react';
import './OurClients.css';

import logo1 from '../../Images/atulpurohit.png';
import logo2 from '../../Images/bakeaway.png';
import logo3 from '../../Images/cakelicious.png';
import logo4 from '../../Images/cakeroyale.png';
import logo5 from '../../Images/cakesroyale.png';
import logo6 from '../../Images/icecreamdelights.png';
import logo7 from '../../Images/mokarrt.png';
import logo8 from '../../Images/pouterbakes.png';
import logo9 from '../../Images/spicykarwari.png';
import logo10 from '../../Images/thecakehub.png';
import logo11 from '../../Images/AIBH.png';


const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11];

function Clients() {
  return (
    <div className="slider-container">
      <div className="slider-track">
        {logos.map((logo, index) => (
          <div key={index} className="slide">
            <img src={logo} alt={`Logo ${index + 1}`} />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={index + logos.length} className="slide">
            <img src={logo} alt={`Logo ${index + 1}`} />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={index + logos.length} className="slide">
            <img src={logo} alt={`Logo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;