import React from 'react';
import { useParams } from 'react-router-dom';
import './Blogs.css';
import CourierService from '../../Images/CourierServicesBlog.png';
//import FoodDeliveryImage from '../../Images/FoodDeliveryBlog.png';
//import PickAndDropImage from '../../Images/PickAndDropBlog.png';

export default function BlogDetailArticlePage() {
    const { title } = useParams();

    const blogContent = {
        CourierServices: {
            image: CourierService,
            description: "Courier service description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        FoodDelivery: {
            image: CourierService,
            description: "Food delivery description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        PickAndDrop: {
            image: CourierService,
            description: "Pick and drop description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        CakeDelivery:{
            image: CourierService,
            description: "Cake delivery description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    };

    const content = blogContent[title];

    return (
        <>
            <section className="Blog-Section">
                <div className="container">
                    <div className="blog-section-main">
                        <div className="blog-section-header">
                            <header>
                                <h1>{title.replace(/([A-Z])/g, ' $1').trim()}</h1>
                                <hr className="HLine mx-auto mb-5" />
                            </header>
                        </div>
                        {content ? (
                            <>
                                <div className="blog-image">
                                    <img src={content.image} alt={title} />
                                </div>
                                <div className="blog-articles">
                                    <p>{content.description}</p>
                                </div>
                            </>
                        ) : (
                            <p>Article not found</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
