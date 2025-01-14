import About from "../Components/About/About";
import Carousel from "../Components/Carousel/Carousel";
import Header from "../Components/Header/Header";
import CounterDisplay from "../Components/Counter/CounterDisplay";
import ServiceDisplay from "../Components/Services/ServiceDisplay";
import TestimonialCarousel from "../Components/Testimonials/Testimonials";
import './Home.css'
import Footer from "../Components/Footer/Footer";
import OrderProcess from "../Components/OrderProcess/OrderProcess";
import OrderServices from "../Components/OrderServices/OrderServices";
import Clients from "../Components/OurClients/OurClients";

export default function Home() {
    return(
        <>
        <Header/>
        <Carousel/>
        <div className="content-wrapper">
         <OrderServices/>
        {/* <About/> */}
        <OrderProcess/>
        <CounterDisplay/>
        <ServiceDisplay/>
        <div className="testimonial-head">
        <header className="header-testimonial text-center my-5">
          <h2>What customer say</h2>
        </header>
        <TestimonialCarousel />
      </div>
      </div>
      <div className="client-logo-header">
     <header className="header-clienlogo text-center my-5">
          <h2>Our partners</h2>
        </header>
      <Clients/>
    </div>
      <Footer/>

        </>
    )
}