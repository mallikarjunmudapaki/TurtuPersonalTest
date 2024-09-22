import React from "react";
import "./About.css";
import aboutusImage from '../../Images/Aboutus.png'

const About = () => {
  return (
    <section className="about-us">
      <div className="about-heading" >
      <h2>About Us</h2>
      </div>
      
      <div className="container">
      
        <div className="about-row">
          <div className="about-image">
            <img src={aboutusImage} alt="About Us" />
          </div>
          <div className="about-content">
          <h4>
              Welcome to<span> Turtu services</span>
            </h4>
            <p>
              TURTU is a on-demand service tech company based out of
              Belagavi. Dealing with on-demand delivery, #Hyperlocal
              Delivery & last mile Delivery, Serving both B2B and B2C.
            </p>
            <h4>
              Who <span>Are We?</span>
            </h4>
            <p>
              Are you tired of hopping to different applications for
              different on-demand services? With TURTU, you can access
              many essential on demand services under one roof.
            </p>
            <h4 style={{ color: "" }}><span>Vision</span></h4>
            <p>
              To be The India’s Largest on-demand Service tech Company.{" "}
            </p>
            <h4><span>Mission</span></h4>
            <p>
              To provide quick, safe, Trustworthy, Reliable and Time
              saving essential on-demand, Hyperlocal and Last mile
              Deliveries to all tier 2&3 cities of India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;