import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './Testimonials.css';
import img from '../../Images/profile.png';

const testimonials = [
    {
        id: 1,
        name: 'Dania Shaik',
        message: 'Excellent service! The delivery was done very quickly and the delivery agent was very kind and professional too!!',
        link: 'https://g.co/kgs/ki6otv1'
    },
    {
        id: 2,
        name: 'Madhuri Yardi',
        message: 'They are the best delivery service in belgaum i hav come across for my cakes and other stuff .. Also at very reasonable rates.. Very professional!',
        link: 'https://g.co/kgs/GRYFBSE'
    },
    {
        id: 3,
        name: 'Sphoorti S',
        message: 'Quick response and fast delivery. I  recommend this service if you want to deliver anything you want around the city!! Very polite delivery men.',
        link: 'https://g.co/kgs/Ku1pMhR'
    },
    {
        id: 4,
        name: 'namrata Pawar',
        message: 'I love this delivery services its one of the best ..I have never ever got a complain from my clients saying that it ',
        link: 'https://g.co/kgs/XsZb4HG' 
    },
    {
        id: 5,
        name: 'Pavitra Hegde',
        message: 'Cake was delivered intact across nearly 10kms despite of bad roads and heavy rainfall.Very professional and polite delivery executive.',
        link: 'https://g.co/kgs/xvD1XwN'
    },
    {
        id: 6,
        name: 'Vishal Kulkarni',
        message: 'Very professional and courteous service. Response time is also very fast and delivery from anywhere is done within minutes.I highly recommend them to everyone.Excellent service 👌🏻👌🏻👍🏻👍🏻',
        link: 'https://g.co/kgs/V8qHtSf'
    },
];

export default function TestimonialCarousel() {
    useEffect(() => {
        Aos.init({ duration: '1000' });
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevTestimonial = () => {
        const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextTestimonial = () => {
        const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="testimonial-carousel" data-aos="zoom-out">
            <button className="carousel-button prev" onClick={prevTestimonial}><i className="fa-solid fa-angle-left"></i></button>
            <div className="testimonial">
                <div className="testimonial-card">
                    <div className="quote">
                        <i className="fa fa-quote-left"></i>
                    </div>
                    <p className='text_mobile'>
                        {testimonials[currentIndex].message.length > 45
                            ? testimonials[currentIndex].message.slice(0,45) + '...'
                            : testimonials[currentIndex].message
                        }
                        {testimonials[currentIndex].message.length > 45 && (
                        <a className="review_link" style={{color:"black"}} href={testimonials[currentIndex].link} target="_blank" rel="noopener noreferrer">more</a>
                    )}
                    </p>
                    <p className='text_web'>
                        {testimonials[currentIndex].message.length > 80
                            ? testimonials[currentIndex].message.slice(0, 80) + '...'
                            : testimonials[currentIndex].message
                        }
                        {testimonials[currentIndex].message.length > 80 && (
                        <a className="review_link" style={{color:"black"}} href={testimonials[currentIndex].link} target="_blank" rel="noopener noreferrer">more</a>
                    )}
                    </p>
                    
                    
                    <div className="ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className="profile">
                        <div className="profile-image">
                            <img src={img} alt="profile" />
                        </div>
                        <div className="profile-desc">
                            <span>{testimonials[currentIndex].name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-button next" onClick={nextTestimonial}><i className="fa-solid fa-angle-right"></i></button>
        </div>
    );
}
