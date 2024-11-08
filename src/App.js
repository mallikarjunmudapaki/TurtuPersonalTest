import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Login from './Pages/Login/Login.js';
import Signup from './Pages/Signup/Signup.js';
import Blogs from './Pages/Blogs/Blogs.js';
import { AuthProvider } from './Pages/Login/AuthContext.js';
import Career from './Pages/Career/Career.js';
import BlogDetailArticle from './Pages/Blogs/BlogDetailArticle.js';
import ContactPage from './Pages/Contact/ContactPage.js';
import ForgotPassword from './Pages/forgotPassword/ForgotPassword.js';
import ResetPassword from './Pages/forgotPassword/ResetPassword.js';
import SubBlogsPage from './Pages/Blogs/SubBlogsPage.js';

import { OrderProvider } from './Context/ContextStore.js';
import PickandDrop from './Components/PickNdrop/PIckandDrop.js';
import ConfirmOrder from './Components/OrderConfirm/OrderConfirm.js';
import { TeamRegister } from './Team/Pages/Register/Register.js';
import { TeamLogin } from './Team/Pages/Login/Login.js';
import AssignedDashboard from './Team/Pages/AssignerDashboard/AssignerDashboard.js';
import DeliveryBoy from './Team/Pages/DeliveryBoyDashboard/DeliveryBoyDashboard.js';
import AdminDashboard from './Team/Pages/AdminDashboard/AdminDashboard.js';
import Dashboard from './Team/Compoents/Dashboard/Dashboard.js';
import Requests from './Team/Compoents/Requests/Requests.js';
import Help from './Team/Compoents/Help/Help.js';
import AdminProfile from './Team/Compoents/AdminProfile/AdminProfile.js';
import UserQuery from './Components/AdminDashboard/Query/Query.js';
import AdminOrderHistory from './Team/Compoents/AdminOrderHistory/AdminOrderHistory.js';
import NotFoundPage from './Team/Pages/Notfound/NotFound.js';
import AboutPage from './Pages/AboutPage/AboutPage.js';
// import NotificationManager from './Components/NotificationManager/NotificationManager.js';
import CareerForm from './Components/CareerForm/CareerForm.js';
import CareerWrapper from './Components/CareerForm/careerWraper/Careerwrapper.js';

function App() {
  return (
   <>

   
   <AuthProvider>
    <BrowserRouter>
    <OrderProvider>
  {/* <NotificationManager/> */}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/career' element={<Career/>}/> */}
        <Route path="/career" element={<CareerWrapper />}>
          <Route index element={<Career />} />
          <Route path="career-form" element={<CareerForm />} />
        </Route>

        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/Contact' element={<ContactPage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:blogTitle" element={<SubBlogsPage />} />
        <Route path="/blog/:blogTitle/:subBlogTitle" element={<BlogDetailArticle />} />
        <Route path="/404" element={<NotFoundPage/>} />
        
        <Route path="/pick-and-drop" element={<PickandDrop />}/>
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="//Team-Register" element={<TeamRegister />} />
        <Route path="/team-login" element={<TeamLogin />} />
        <Route path="/assigner-dashboard" element={<AssignedDashboard />} />
        <Route path="/delivery-dashboard" element={<DeliveryBoy />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="requests" element={<Requests />} />
            <Route path="help" element={<Help />} />
            <Route path="adminprofile" element={<AdminProfile />} />
            <Route path="query" element={<UserQuery/>}/>
          </Route>

          <Route path="/admin-dashboard/dashboard/OrderHistory" element={<AdminOrderHistory />} />
        </Routes>
        

        </OrderProvider>
        </BrowserRouter>
        </AuthProvider>
   </>
  );
}

export default App;
