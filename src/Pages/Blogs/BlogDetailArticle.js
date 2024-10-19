// BlogDetailArticle.js
import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './Blogs.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import img from '../../Images/Courier_Delivery.png';

const BlogDetailArticle = () => {
    const { blogTitle, subBlogTitle } = useParams();
    const navigate = useNavigate();

    const blogContent = {
        CourierServices: {
            DocumentDelivery: {
                image: img,
                description: "Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents."
            },
            ParcelDelivery: {
                image: img,
                description: "Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages."
            }
        },
        FoodDelivery: {
            LocalResturant: {
                image: img,
                description: "Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents."
            },
            LocalResturant: {
                image: img,
                description: "Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages."
            }
        },
        PickAndDrop: {
            PickAndDrop: {
                image: img,
                description: "Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents."
            },
            PickAndDrop: {
                image: img,
                description: "Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages."
            }
        },
        CakeDelivery: {
            CakeDelivery: {
                image: img,
                description: "Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents.Our Document Delivery service ensures secure and timely delivery of important documents."
            },
            ParcelDelivery: {
                image: img,
                description: "Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages.Our Parcel Delivery service is fast, reliable, and efficient for all types of packages."
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
