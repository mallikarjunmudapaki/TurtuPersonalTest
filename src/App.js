import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Login from './Pages/Login/Login.js';
import Signup from './Pages/Signup/Signup.js';
import Blogs from './Pages/Blogs/Blogs.js';
import { AuthProvider } from './Pages/Login/AuthContext.js';
import Career from './Pages/Career/Career.js';
import BlogDetailArticle from './Pages/Blogs/BlogDetailArticle.js';
import BlogsDetailsPage from './Pages/Blogs/BlogsDetailsPage.js';
import ContactPage from './Pages/Contact/ContactPage.js';
import ForgotPassword from './Pages/forgotPassword/ForgotPassword.js';
import ResetPassword from './Pages/forgotPassword/ResetPassword.js';
import SubBlogsPage from './Pages/Blogs/SubBlogsPage.js';

function App() {
  return (
   <>
   <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/blog' element={<Blogs/>}/> */}
        <Route path='/career' element={<Career/>}/>
        {/* <Route path="/BlogsDetailsPage" element={<BlogsDetailsPage/>} /> */}
        {/* <Route path="/Blog/:title" element={<BlogDetailArticle/>} /> */}
        <Route path='/Contact' element={<ContactPage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        {/*<Route path='/dashboard' element={<Query/>}/>*/}
        <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:blogTitle" element={<SubBlogsPage />} />
                <Route path="/blog/:blogTitle/:subBlogTitle" element={<BlogDetailArticle />} />
        </Routes>
        </BrowserRouter>
        </AuthProvider>
   </>
  );
}

export default App;
