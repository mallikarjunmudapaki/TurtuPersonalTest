// SubBlogsPage.js
import React from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import './Blogs.css'; // Ensure to import the CSS file for styles
import courierImage from '../../Images/BlogCourier.png';
import FoodImage from '../../Images/BlogFood.png';
import pickupImage from '../../Images/BlogPick&Drop.png';
import CakeImage from '../../Images/BlogCake.png';
import { FaArrowLeft } from 'react-icons/fa';


const SubBlogsPage = () => {
    const { blogTitle } = useParams();
    const navigate = useNavigate();

    // Define your sub-blogs and images based on the blog title
    const subBlogs = {
        CourierServices: [
            { title: "Document Delivery", path: "DocumentDelivery", image: courierImage },
            { title: "Parcel Delivery", path: "ParcelDelivery", image: courierImage }
        ],
        FoodDelivery: [
            { title: "Local Restaurants", path: "LocalResturant", image: FoodImage },
            { title: "Local Restaurant", path: "HomeMadeFood", image: FoodImage }
        ],
        PickAndDrop: [
            { title: "Pick and Drop", path: "PickAndDrop", image: pickupImage },
            { title: "Pick and Drop", path: "PickAndDrop", image: pickupImage }
        ],
        CakeDelivery: [
            { title: "Cake Delivery", path:"CakeDelivery", image: CakeImage},
            { title: "Cake Delivery", path:"CakeDelivery", image: CakeImage }
        ],
    
    };

    const currentSubBlogs = subBlogs[blogTitle] || [];

    const handleBackClick = () => {
        navigate(-1);
      };

    return (
        <>
              {/* Back icon */}
  <button className="back-button" onClick={handleBackClick}>
  <FaArrowLeft /> Back
</button>
        <div className="sub-blogs-container">
            <h1 className="sub-blogs-title">{blogTitle.replace(/([A-Z])/g, ' $1').trim()}</h1>
            <ul className="sub-blogs-list">
                {currentSubBlogs.map((subBlog, index) => (
                    <li key={index} className="sub-blog-item">
                        <Link to={`/blog/${blogTitle}/${subBlog.path}`} className="sub-blog-link">
                            <img src={subBlog.image} alt={subBlog.title} className="sub-blog-image" />
                            <span className="sub-blog-text">{subBlog.title}</span>
                            <button className='sub-blog-btn'>Explore More</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default SubBlogsPage;



// import React from 'react';
// import { useParams } from 'react-router-dom';

// export default function BlogDetailArticlePage() {
//     const { blogTitle, subBlogTitle } = useParams();

//     const blogContent = {
//         CourierServices: {
//             DocumentDelivery: {
//                 description: "Our Document Delivery service ensures secure and timely delivery of important documents."
//             },
//             ParcelDelivery: {
//                 description: "Our Parcel Delivery service is fast, reliable, and efficient for all types of packages."
//             }
//         }
//         // Add more blogs and sub-blogs here.
//     };

//     const content = blogContent[blogTitle]?.[subBlogTitle];

//     return (
//         <section className="Blog-Section">
//             <div className="container">
//                 <div className="blog-section-main">
//                     <div className="blog-section-header">
//                         <header>
//                             {/* Ensure subBlogTitle is defined before calling replace() */}
//                             {subBlogTitle ? (
//                                 <h1>{subBlogTitle.replace(/([A-Z])/g, ' $1').trim()}</h1>
//                             ) : (
//                                 <h1>Blog Article</h1>
//                             )}
//                             <hr className="HLine mx-auto mb-5" />
//                         </header>
//                     </div>
//                     {content ? (
//                         <div className="blog-articles">
//                             <p>{content.description}</p>
//                         </div>
//                     ) : (
//                         <p>Sub-blog not found</p>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }
