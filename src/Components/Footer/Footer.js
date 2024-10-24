import '../Footer/Footer.css';

export default function Footer() {
    return (
        <>
            <footer className="footer text-white pt-5 pd-4">
                <div className="container text-md-left">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <div className='footer-about'>
                                <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Turtu</h5>
                                <p>TURTU is an on-demand service tech company specializing in hyperlocal delivery. Our mission is to make on-demand services easily accessible to customers, acting as a reliable partner for all their delivery needs. We deliver food, vegetables, cakes, medicines, and packages within city limits, ensuring prompt and efficient service.</p>
                            </div>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Services</h5>
                            <p><a href="#services" className="text-white">Pick and Drop</a></p>
                            <p><a href="#services" className="text-white">Courier services</a></p>
                            <p><a href="#services" className="text-white">Food delivery</a></p>
                            <p><a href="#services" className="text-white">Cake delivery</a></p>
                            <p><a href="#services" className="text-white">Gift and Flower delivery</a></p>
                            <p><a href="#services" className="text-white">Medicine delivery</a></p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Company</h5>
                            <p><a href="#home" className="text-white">Home</a></p>
                            <p><a href="#about" className="text-white">About</a></p>
                            <p><a href="#services" className="text-white">Services</a></p>
                            <p><a href="/Contact" className="text-white">Contact</a></p>
                            <p><a href="/career" className="text-white">Career</a></p>
                            <p><a href="/blog" className="text-white">Blogs</a></p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
                            <p>2nd floor, Shivabasava Nagar, Nehru Nagar, Belagavi, Karnataka 590010</p>
                            <p><a href="mailto:turtuservices@gmail.com" className="text-white">turtuservices@gmail.com</a></p>
                            <p><a href="tel:+917975443090" className="text-white">+91 7975443090</a>, <a href="tel:+918747858317" className="text-white">+91 8747858317</a></p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">City</h5>
                            <p><a href="#city" className="text-white">Belagavi</a></p>
                            <p><a href="#city" className="text-white">Hubli</a></p>
                            <p><a href="#city" className="text-white">Dharwad</a></p>
                        </div>
                    </div>
                </div>
                <hr className="mb-4" />
                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p className='copywright-text'>Copyright © 2024 All Rights Reserved by:
                            <a href="#home">
                                <strong className="text-warning">Turtu</strong>
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

// import '../Footer/Footer.css';

// export default function Footer() {
//     return (
//         <>
//             <footer className="footer text-white pt-5 pd-4">
//                 <div className="container text-md-left">
//                     <div className="row">
//                         <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
//                             <div className='footer-about'>
//                                 <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Turtu</h5>
//                                 <p>TURTU is an on-demand service tech company specializing in hyperlocal delivery. Our mission is to make on-demand services easily accessible to customers, acting as a reliable partner for all their delivery needs. We deliver food, vegetables, cakes, medicines, and packages within city limits, ensuring prompt and efficient service.</p>
//                             </div>
//                         </div>
                        
//                         <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
//                             <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Services</h5>
//                             <p>
//                                 <a href="#services" className="text-white">Pick and Drop</a>
//                             </p>
//                             <p>
//                                 <a href="#services" className="text-white">Courier services</a>
//                             </p>
//                             <p>
//                                 <a href="#services" className="text-white">Food delivery</a>
//                             </p>
//                             <p>
//                                 <a href="#services" className="text-white">Cake delivery</a>
//                             </p>
//                             <p>
//                                 <a href="#services" className="text-white">Gift and Flower delivery</a>
//                             </p>
//                             <p>
//                                 <a href="#services" className="text-white">Medicine delivery</a>
//                             </p>
//                         </div>
//                         <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
//                             <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Company</h5>
//                             <p>
//                                 <a href="#home" className="text-white">Home</a>
//                             </p>
//                             <p>
//                                 <a href="#about" className="text-white">About</a>
//                             </p>
//                             <p>
//                                 <a href="#services" className="text-white">Services</a>
//                             </p>
//                             <p>
//                                 <a href="/Contact" className="text-white">Contact</a>
//                             </p>
//                             <p>
//                                 <a href="/career" className="text-white">Career</a>
//                             </p>
//                             <p>
//                                 <a href="/blog" className="text-white">Blogs</a>
//                             </p>
//                         </div>
//                         <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
//                             <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
//                             <p>
//                                 {/*<i className="fas fa-home mr-3 px-2"></i>*/} 2nd floor, Shivabasava Nagar, Nehru Nagar, Belagavi, Karnataka 590010
//                             </p>
//                             <p>
//                                 {/*<i className="fas fa-envelope mr-3 px-2"></i>*/} <a href="mailto:turtuservices@gmail.com" className="text-white">turtuservices@gmail.com</a>
//                             </p>
//                             <p>
//                                 {/*<i className="fas fa-phone mr-3 px-2"></i>*/}<a href="tel:+917975443090" className="text-white">+91 7975443090</a>, <a href="tel:+918747858317" className="text-white">+91 8747858317</a>
//                             </p>
//                         </div>
                    
                        
//                     </div>
//                 </div>
//                 <hr className="mb-4"/>
//                 <div className="row align-items-center">
//                     <div className="col-md-7 col-lg-8">
//                         <p className='copywright-text'>Copyright © 2024 All Rights Reserved by:
//                             <a href="#home">
//                                 <strong className="text-warning">Turtu</strong>
//                             </a>
//                         </p>
//                     </div>
//                     {/*<div className="col-md-5 col-lg-4">
//                         <div className="text-center text-d-right">
//                             <ul className="list-unstyled list-inline">
//                                 <li className="list-inline-item">
//                                     <a href="https://www.facebook.com/TURTUSERVICES" className="btn-floating btn-sm text-white" style={{fontSize: 23}}><i className="fab fa-facebook"></i></a>
//                                 </li>
//                                 <li className="list-inline-item">
//                                     <a href="#twitter" className="btn-floating btn-sm text-white" style={{fontSize: 23}}><i className="fab fa-twitter"></i></a>
//                                 </li>
//                                 <li className="list-inline-item">
//                                     <a href="https://www.linkedin.com/company/turtu/?viewAsMember=true" className="btn-floating btn-sm text-white" style={{fontSize: 23}}><i className="fab fa-linkedin-in"></i></a>
//                                 </li>
//                                 <li className="list-inline-item">
//                                     <a href="https://www.instagram.com/turtubgm/" className="btn-floating btn-sm text-white" style={{fontSize: 23}}><i className="fab fa-instagram"></i></a>
//                                 </li>
//                                 <li className="list-inline-item">
//                                     <a href="https://www.youtube.com/channel/UCCM4ACzrirC0o7ZE--QwVig" className="btn-floating btn-sm text-white" style={{fontSize: 23}}><i className="fab fa-youtube"></i></a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>*/}
//                 </div>
//             </footer>
//         </>
//     );
// }
