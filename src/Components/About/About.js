import React from "react";
import "./About.css";
import aboutusImage from '../../Images/aboutUs.png';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <section className="about-us" id="about">
 <button className="back-button" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>

      <div className="about-heading">
        <h2>About Us</h2>
      </div>

      <div className="about-container">
        <div className="about-row">
          <div className="about-image">
            <img src={aboutusImage} alt="About Us" />
          </div>
          <div className="about-content">
            <div className="about-card">
              <h4>Welcome to <span>Turtu Services</span></h4>
              <p>
                TURTU is an on-demand service tech company based out of Belagavi, dealing with on-demand delivery, #Hyperlocal Delivery & last mile delivery, serving both B2B and B2C.
              </p>
            </div>
            <div className="about-card">
              <h4>Who <span>Are We?</span></h4>
              <p>
                Tired of hopping between different applications for various on-demand services? With TURTU, you can access many essential on-demand services under one roof.
              </p>
            </div>
            <div className="about-card">
              <h4><span>Vision</span></h4>
              <p>
                To be India’s largest on-demand service tech company.
              </p>
            </div>
            <div className="about-card">
              <h4><span>Mission</span></h4>
              <p>
                To provide quick, safe, trustworthy, reliable, and time-saving essential on-demand, hyperlocal, and last-mile deliveries to all tier 2 and 3 cities of India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
