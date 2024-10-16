
import Header from '../../Components/Header/Header.js';
import './Blogs.css';
import BlogsDetailsPage from "./BlogsDetailsPage.js";

export default function Blogs() {
    return (
        <>
        <Header/>
            <header className="header text-center">
          <h2>Blogs</h2>
          <hr className="HLine mx-auto" />
        </header>
            <div className="container">
                <BlogsDetailsPage />
            </div>
            <div className="App">  
      </div>


        </>
    );
}