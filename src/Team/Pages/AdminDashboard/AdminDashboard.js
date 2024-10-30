import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Requests from './../../Compoents/Requests/Requests';
import Help from './../../Compoents/Help/Help';
import './AdminDashboard.css';
import AdminProfile from './../../Compoents/AdminProfile/AdminProfile';
import Dashboard from './../../Compoents/Dashboard/Dashboard';
import { MdDashboard, MdQueryBuilder, MdHelp, MdAssignment, MdPerson } from 'react-icons/md';
import UserQuery from '../../../Components/AdminDashboard/Query/Query';

const AdminDashboard = () => {
  const [selected, setSelected] = useState('');

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setSelected(path);
    navigate(path);
  };

  return (
    <div className='admin-dashboard'>
      <div className='sidebar'>
        <div className='logo-container'>
          Turtu
        </div>
        <div className='sidebar-icons-container'>
          <div
            onClick={() => handleNavigation('/admin-dashboard/dashboard')}
            className={`sidebar-icon-wrapper ${selected === '/admin-dashboard/dashboard' ? 'selected' : ''}`}
          >
            <MdDashboard size={20} className='icon' />
            <span className='icon-label'>Dashboard</span>
          </div>
          <div
            onClick={() => handleNavigation('/admin-dashboard/query')}
            className={`sidebar-icon-wrapper ${selected === '/admin-dashboard/query' ? 'selected' : ''}`}
          >
            <MdQueryBuilder size={20} className='icon' />
            <span className='icon-label'>Query</span>
          </div>
          <div
            onClick={() => handleNavigation('/admin-dashboard/requests')}
            className={`sidebar-icon-wrapper ${selected === '/admin-dashboard/requests' ? 'selected' : ''}`}
          >
            <MdAssignment size={20} className='icon' />
            <span className='icon-label'>Requests</span>
          </div>
        </div>
        <div className='sidebar-bottom'>
          <div
            onClick={() => handleNavigation('/admin-dashboard/help')}
            className={`sidebar-icon-wrapper ${selected === '/admin-dashboard/help' ? 'selected' : ''}`}
          >
            <MdHelp size={20} className='icon' />
            <span className='icon-label'>Help</span>
          </div>
          <div
            onClick={() => handleNavigation('/admin-dashboard/adminprofile')}
            className={`sidebar-icon-wrapper ${selected === '/admin-dashboard/adminprofile' ? 'selected' : ''}`}
          >
            <MdPerson size={20} className='icon' />
            <span className='icon-label'>Profile</span>
          </div>
        </div>
      </div>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Default route */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="help" element={<Help />} />
          <Route path="adminprofile" element={<AdminProfile />} />
          <Route path="query" element={<UserQuery />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
