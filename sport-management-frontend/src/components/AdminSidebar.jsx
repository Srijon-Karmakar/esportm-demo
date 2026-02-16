// src/components/FanSidebar.jsx
import React, {useState} from 'react';
import './AdminSidebar.css';
// import profilePic from '../assets/images/Hazard.png'; 
// Replace with your own image or use a placeholder
// import { useLocation } from 'react-router-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png'; 

const NmdSidebar2 = () => {
const location = useLocation();
const navigate = useNavigate();
const [showLogoutModal, setShowLogoutModal] = useState(false);

const handleSettingsClick = () => {
  navigate('/NmdSettings');
};

const confirmLogout = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('role');        // ➜  IMPORTANT
  localStorage.removeItem('username');
  localStorage.removeItem('club_id');
  localStorage.removeItem('club_name');
  localStorage.removeItem('manager_name');

  setShowLogoutModal(false);
  window.location.href = '/';
  navigate('/'); // or /login
};

// const handleLogoutClick = () => {
//   const confirmLogout = window.confirm("Are you sure you want to logout?");
//   if (confirmLogout) {
//     navigate('/'); 
//   }};

  return (
    <div className="fan-sidebar">
      {/* <h3 className="title">FAN Analisis</h3> */}
      <div className="avatar-section">
        {/* <img src={profilePic} alt="Profile" className="profile-pic" /> */}
        <h4 className="username">Admin</h4>
        <p className="user-id">ID:7777</p>
      </div>

      {/* <div className="nav-section">
        <button className="nav-btn active"><span>⬤</span> OVERVIEW</button>
        <button className="nav-btn">👤 FANS DATA</button>
        <button className="nav-btn">💼 INCOME</button>
        <button className="nav-btn">📁 WORKS</button>
        <button className="nav-btn">💬 MESSAGES</button>
      </div> */}

<div className="nav-section">
        <NavLink to="/AdminDashboard" className={`nav-btn ${location.pathname === '/AdminDashboard' ? 'active' : ''}`}>
           Dashboard
        </NavLink>
        <NavLink to="/admin/UserMgmt" className={`nav-btn ${location.pathname === '/admin/UserMgmt' ? 'active' : ''}`}>
           User Management
        </NavLink>
        <NavLink to="/admin/Payments" className={`nav-btn ${location.pathname === '/admin/Payments' ? 'active' : ''}`}>
           Payments
        </NavLink>
        <NavLink to="/admin/ContentMgmt" className={`nav-btn ${location.pathname === '/admin/ContentMgm' ? 'active' : ''}`}>
           Content Management
        </NavLink>
        <NavLink to="/admin/Analytics" className={`nav-btn ${location.pathname === '/admin/Analytics' ? 'active' : ''}`}>
           Analytics
        </NavLink>
        {/* <NavLink to="/PlayerProfile2" className={`nav-btn ${location.pathname === '/PlayerProfile2' ? 'active' : ''}`}>
           Feedbacks
        </NavLink> */}
      </div>

      <div className="footer-icons">

        <button className="icon-btn" onClick={handleSettingsClick}>
          <img src={SettingsIcon} alt="settings" />
        </button>

        <button className="icon-btn" onClick={() => setShowLogoutModal(true)}>
          <img src={LogOutIcon} alt="Logout" />
        </button>

      </div>


        {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content ">
            <h4>Confirm Logout</h4>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="neumorphic" onClick={confirmLogout}>Yes</button>
              <button className="neumorphic" onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default NmdSidebar2;
