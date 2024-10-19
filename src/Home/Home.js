import About from "../Components/About/About";
import Carousel from "../Components/Carousel/Carousel";
import Header from "../Components/Header/Header";
import CounterDisplay from "../Components/Counter/CounterDisplay";
import HowItWorks from "../Components/HowItWorks/HowItWorks";
import ServiceDisplay from "../Components/Services/ServiceDisplay";
import TestimonialCarousel from "../Components/Testimonials/Testimonials";
import './Home.css'
import Contact from "../Components/Contact/Contact";
import Footer from "../Components/Footer/Footer";
import Login from "../Pages/Login/Login";
import RequireAuth from "../Pages/Login/RequireAuth";
import OrderProcess from "../Components/OrderProcess/OrderProcess";

export default function Home() {
    return(
        <>
        <Header/>
        <Carousel/>
        <div className="content-wrapper">
        <About/>
        <OrderProcess/>
        <CounterDisplay/>
        {/* <HowItWorks/> */}
        <ServiceDisplay/>
        <div className="testimonial-head">
        <header className="header-testimonial text-center my-5">
          <h2>What customer say</h2>
        </header>
        <TestimonialCarousel />
      </div>
      </div>
      <Footer/>

        </>
    )
}