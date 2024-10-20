// BlogDetailArticle.js
import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './Blogs.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import CourierImage from '../../Images/BlogCourier.png';
import img from '../../Images/BlogCourier.png';

const BlogDetailArticle = () => {
    const { blogTitle, subBlogTitle } = useParams();
    const navigate = useNavigate();

    const blogContent = {
        CourierServices: {
            DocumentDelivery: {
                image: CourierImage,
                description: "Our document delivery service ensures that your sensitive and important papers are delivered securely and on time. Whether it's legal documents, contracts, or confidential files, we guarantee fast, reliable service with full tracking and accountability from pickup to delivery."
            },
            ParcelDelivery: {
                image:CourierImage,
                description: "Need to send a parcel? Our parcel delivery service is designed to handle packages of all sizes with care and speed. Whether it's for personal or business purposes, we ensure that your items are delivered safely to their destination, offering same-day or scheduled deliveries for your convenience."
            }
        },
        FoodDelivery: {
            LocalResturant1: {
                image: img,
                description: "Experience the best of local cuisine from the comfort of your home. Our local restaurant food delivery service brings freshly prepared meals from your favorite restaurants right to your doorstep. Satisfy your cravings without leaving the house with fast and convenient delivery."
            },
            HomeMadeFood: {
                image: img,
                description: "Whether it's a quick lunch or a special dinner, we partner with top local eateries to deliver the best food right to your door. With a variety of cuisines available, our service makes it easy to enjoy the tastes of your favorite local restaurants without the hassle of dining out."
            }
        },
        PickAndDrop: {
            PickAndDrop: {
                image: img,
                description: "Our pick-and-drop service takes the stress out of running errands. From picking up documents or parcels to dropping them off at their destination, we provide a convenient and reliable solution for busy schedules. Let us handle your errands while you focus on more important things."
            },
            PickAndDrop: {
                image: img,
                description: "Whether you need to send or collect items across town, our pick-and-drop service is here to help. We offer fast, efficient pickups and deliveries, ensuring your items reach their destination safely and promptly. Perfect for everyday tasks or urgent needs."
            }
        },
        CakeDelivery: {
            CakeDelivery: {
                image: img,
                description: "Our cake delivery service makes celebrating special occasions sweeter. Whether it’s a birthday, anniversary, or just a sweet craving, we deliver freshly baked, beautifully crafted cakes right to your doorstep. Choose from a variety of flavors and designs to make your celebration extra special."
            },
            ParcelDelivery: {
                image: img,
                description: "Enjoy the convenience of having your favorite cakes delivered to you. Whether you’re planning a party or simply indulging in a sweet treat, we ensure that each cake is delivered fresh and on time, with a range of options to suit every occasion."
            }
        },
        
    };

    const content = blogContent[blogTitle]?.[subBlogTitle];
    const handleBackClick = () => {
        navigate(-1);
      };

    return (
        <>

      {/* Back icon */}
  <button className="back-button" onClick={handleBackClick}>
  <FaArrowLeft /> Back
</button>

        <section className="blog-detail-container">
            <div className="blog-detail-content">
                <div className="blog-detail-header">
                    <header>
                        {subBlogTitle ? (
                            <h1 className="blog-detail-title">{subBlogTitle.replace(/([A-Z])/g, ' $1').trim()}</h1>
                        ) : (
                            <h1 className="blog-detail-title">Blog Article</h1>
                        )}
                        <hr className="blog-detail-divider" />
                    </header>
                </div>
                {content ? (
                    <div className="blog-detail-article">
                        <img src={content.image} alt={subBlogTitle} className="blog-detail-image" />
                        <p className="blog-detail-description">{content.description}</p>
                    </div>
                ) : (
                    <p className="blog-detail-not-found">Sub-blog not found</p>
                )}
            </div>
        </section>
        </>
    );
};

export default BlogDetailArticle;




// import React from 'react';
// import { useParams } from 'react-router-dom';
// import './Blogs.css';
// import CourierService from '../../Images/CourierServicesBlog.png';
// //import FoodDeliveryImage from '../../Images/FoodDeliveryBlog.png';
// //import PickAndDropImage from '../../Images/PickAndDropBlog.png';

// export default function BlogDetailArticlePage() {
//     const { title } = useParams();

//     const blogContent = {
//         CourierServices: {
//             image: CourierService,
//             description: "Our courier services offer reliable and secure delivery solutions tailored to meet your specific needs. Whether you require scheduled deliveries, bulk shipments, or safe handling of important documents, we ensure your packages arrive at their destination with care and professionalism. With advanced tracking systems and flexible service options, we provide peace of mind and efficiency for all your local delivery needs. Trust us to handle your deliveries with precision and a focus on customer satisfaction."
//         },
//         FoodDelivery: {
//             image: CourierService,
//             description: "Our food delivery services offer a fast, reliable, and convenient solution to satisfy your cravings. Whether you’re ordering from your favorite local restaurant or trying something new, we ensure that your meals arrive fresh and on time. With flexible delivery options, easy online ordering, and real-time tracking, we make sure your food is handled with care from the kitchen to your door. Whether it’s a quick lunch, dinner for the family, or a special treat, you can trust us to deliver delicious meals right to your doorstep."
//         },
//         PickAndDrop: {
//             image: CourierService,
//             description: "Our pick and drop services offer a convenient and hassle-free way to transport your items from one location to another. Whether it’s documents, packages or any other, we provide reliable and timely pickups and deliveries, ensuring your items reach their destination safely. With flexible scheduling and real-time tracking, we make it easy to manage your pickups and drops at your convenience. Whether for personal or business needs, trust us to handle your items with care and efficiency, offering a smooth and seamless service experience."
//         },
//         CakeDelivery:{
//             image: CourierService,
//             description: "Our cake delivery services bring delicious, freshly-baked cakes straight to your door, perfect for any occasion. Whether it's a birthday, anniversary, or a special celebration, we ensure your cakes arrive in pristine condition and right on time. Choose from a variety of flavors and designs, and let us take care of the rest with prompt, reliable delivery. From elegant wedding cakes to delightful cupcakes, we make your sweet moments even more memorable with hassle-free delivery and exceptional service."
//         }
//     };

//     const content = blogContent[title];

//     return (
//         <>
//             <section className="Blog-Section">
//                 <div className="container">
//                     <div className="blog-section-main">
//                         <div className="blog-section-header">
//                             <header>
//                                 <h1>{title.replace(/([A-Z])/g, ' $1').trim()}</h1>
//                                 <hr className="HLine mx-auto mb-5" />
//                             </header>
//                         </div>
//                         {content ? (
//                             <>
//                                 <div className="blog-image">
//                                     <img src={content.image} alt={title} />
//                                 </div>
//                                 <div className="blog-articles">
//                                     <p>{content.description}</p>
//                                 </div>
//                             </>
//                         ) : (
//                             <p>Article not found</p>
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }
