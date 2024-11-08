import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <h3 className="footer-title">Turtu</h3>
            <div className="footer-container">
            
                <div className="footer-column">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#services" className="text-black">Courier services</a></li>
                        <li><a href="#services" className="text-black">Pick and Drop</a></li>
                        <li><a href="#services" className="text-black">Food Delivery</a></li>
                        <li><a href="#services" className="text-black">Cake Delivery</a></li>
                        <li><a href="#services" className="text-black">Gift and flower</a></li>
                        <li><a href="#services" className="text-black">Medicine Delivery</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#home" className="text-black">Home</a></li>
                        <li><a href="about" className="text-black">About us</a></li>
                        <li><a href="#services" className="text-black">Services</a></li>
                        <li><a href="/career" className="text-black">Career</a></li>
                        <li><a href="/blogs" className="text-black">Blogs</a></li>
                        <li><a href="/Contact" className="text-black">Contact</a></li>
                        <li><a href="/team-Login" className="text-black">Work With Us</a></li>
                   
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>City</h4>
                    <ul>
                        <li><a href="#city" className="text-black">Belagavi</a></li>
                        <li><a href="#city" className="text-black">Hubli (coming soon)</a></li>
                        <li><a href="#city" className="text-black">Dharwad (coming soon)</a></li>
                    </ul>
                </div>
                
                <div className="footer-column">
                    <h4>Learn More</h4>
                    <ul>
                        <li><a href="#privacy" className="text-black">Privacy Policy</a></li>
                        <li><a href="#termsandcondition" className="text-black">Terms and Conditions</a></li>
                    </ul>
                </div>

                <div className="footer-column footer-contact">
                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>2nd floor, Shivabasava Nagar,<br /> Nehru Nagar,Belagavi,<br /> Karnataka 590010</p>
                    <p><a href="mailto:turtuservices@gmail.com" className="text-black">turtuservices@gmail.com</a></p>
                    <p>
                                <a href="tel:+917975443090" className="text-black">+91 7975443090</a>, <br />
                                <a href="tel:+918747858317" className="text-black"> +91 8747858317</a>
                            </p>
                </div>
                </div>
            </div>

            <div className="footer-bottom">
            <p className='copywright-text'>Copyright © 2024 All Rights Reserved by:
                             <a href="#home">
                               <strong className="text-black">Turtu</strong>
                            </a>
                       </p>
                {/* <p>Copyright © 2024 All Rights Reserved by: <strong>Turtu</strong></p> */}
                {/* <div className="footer-links">
                    <a href="#">Privacy policy</a> | <a href="#">Terms and conditions</a>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;