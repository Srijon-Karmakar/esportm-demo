// src/components/FanSidebar.jsx
import React, {useState, useEffect} from 'react';
import './ManagerSidebar.css';
import profilePic from '../assets/images/Hazard.png'; // 
// Replace with your own image or use a placeholder
// import { useLocation } from 'react-router-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png'; 

const NmdSidebar2 = () => {
const location = useLocation();
const navigate = useNavigate();
const [showLogoutModal, setShowLogoutModal] = useState(false);
const [managerName, setManagerName] = useState('');
const [clubName, setClubName] = useState('');
const [clubId, setClubId] = useState(''); 

// useEffect(() => {
//   setManagerName(localStorage.getItem('manager_name') || '');
//   setClubName(localStorage.getItem('club_name') || '');
// }, []);

useEffect(() => {
  const storedId = localStorage.getItem('club_id');
  const storedName = localStorage.getItem('club_name');
  if (storedId) setClubId(storedId);
  if (storedName) setClubName(storedName);
}, []);

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
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h4 className="username">{managerName || 'Manager'}</h4>
        <p className="user-id">{clubName || 'Your Club'}</p>
      </div>

      {/* <div className="nav-section">
        <button className="nav-btn active"><span>⬤</span> OVERVIEW</button>
        <button className="nav-btn">👤 FANS DATA</button>
        <button className="nav-btn">💼 INCOME</button>
        <button className="nav-btn">📁 WORKS</button>
        <button className="nav-btn">💬 MESSAGES</button>
      </div> */}

<div className="nav-section">
        <NavLink to="/ManagerDash" className={`nav-btn ${location.pathname === '/ManagerDash' ? 'active' : ''}`}>
           Dashboard
        </NavLink>
        <NavLink to="/manager/MatchPlanning" className={`nav-btn ${location.pathname === '/manager/MatchPlanning' ? 'active' : ''}`}>
           Match Planning
        </NavLink>
        <NavLink to="/manager/Contracts" className={`nav-btn ${location.pathname === '/manager/Contracts' ? 'active' : ''}`}>
           Offers & contracts
        </NavLink>
        {/* <NavLink to="/NmdApplication" className={`nav-btn ${location.pathname === '/NmdApplication' ? 'active' : ''}`}>
           Match Planning
        </NavLink> */}
        <NavLink to="/manager/ManagerChat" className={`nav-btn ${location.pathname === '/manager/ManagerChat' ? 'active' : ''}`}>
           MESSAGES
        </NavLink>
        <NavLink to="/manager/Schedule" className={`nav-btn ${location.pathname === '/manager/Schedule' ? 'active' : ''}`}>
           Schedules
        </NavLink>
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
