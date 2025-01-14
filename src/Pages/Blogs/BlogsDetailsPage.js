import './Blogs.css';
import courierservicesimg from '../../Images/BlogCourier.png';
import FoodDeliveryImg from '../../Images/BlogFood.png';
import PickAndDropImg from '../../Images/BlogPick&Drop.png';
import CakeDeliveryImg from '../../Images/BlogCake.png';
import { Link } from "react-router-dom";

export default function BlogsDetailsPage() {
    const blogData = [
        {
            title: "Courier Services",
            image: courierservicesimg,
            description: "TURTU has made it easy now to get anything from anywhere in city limits.",
            path: "CourierServices",
            subBlogs: [
                {
                    title: "Document Delivery",
                    description: "Deliver important documents securely.",
                    path: "DocumentDelivery"
                },
                {
                    title: "Parcel Delivery",
                    description: "Fast and reliable parcel delivery.",
                    path: "ParcelDelivery"
                }
            ]
        },
        {
            title: "Food Delivery",
            image: FoodDeliveryImg,
            description: "Order your favorite meals and have them delivered to your doorstep.",
            path: "FoodDelivery",
            subBlogs: []
        },
        {
            title: "Pick and Drop",
            image: PickAndDropImg,
            description: "Need something picked up and dropped off? We can help!",
            path: "PickAndDrop",
            subBlogs: []
        },
        {
            title: "Cake Delivery",
            image: CakeDeliveryImg,
            description: "Get freshly baked cakes delivered right to your doorstep.",
            path: "CakeDelivery",
            subBlogs: []
        }
    ];

    return (
        <section className="blogs-section pb-5" id="blogs">
            <div className="row mb-5">
                <div className="blogs">
                    <div className="blog-container">
                        {blogData.map((blog, index) => (
                            <div className="col mt-2" key={index}>
                                <Link to={`/blog/${blog.path}`}>
                                <div className="card shadow">
                                    <img src={blog.image} alt="" className="card-img-top" />
                                    <div className="card-body">
                                        <h3 className="text-center">{blog.title}</h3>
                                        <hr className="mx-auto w-75" />
                                        <p>{blog.description}</p>
                                        <div className="blog-btn">
                                            <Link to={`/blog/${blog.path}`}>Explore More</Link>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
