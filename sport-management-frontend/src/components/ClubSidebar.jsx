// src/components/FanSidebar.jsx
import React, {useState, useEffect, useContext} from 'react';
import './NmdSidebar2.css';
import profilePic from '../assets/images/Hazard.png'; 
// import { useLocation } from 'react-router-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png';
import { UserContext } from '../context/UserContext'; 
// import defaultAvatar from '../assets/images/Hazard.png';




const NmdSidebar2 = () => {
const [ clubId, setClubId ] = useState('');
const [clubName, setClubName] = useState('');
const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
  const storedId = localStorage.getItem('club_id');
  const storedName = localStorage.getItem('club_name');
  console.log('Loaded club ID:', storedId);
  if (storedId) setClubId(storedId);
  if (storedName) setClubName(storedName);
}, []);

// useEffect(() => {
//   if (!username) {
//     alert('Please login to continue');
//     navigate('/login/player');
//   }
// }, [username]);

const [showLogoutModal, setShowLogoutModal] = useState(false);


// username update 
// useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     console.log('Stored Username:', storedUsername); 
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);



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
  // setUsername('');
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
        <h4 className="username">Welcome <br />
        <span className="club-name">{clubName}</span>
        <br />
        <span className="user-id">Club ID: {clubId}</span>
        </h4>
        {/* <p className="user-id">ID:308591433</p> */}

        {/* <img src={user?.avatar || defaultAvatar} alt="Profile" />
        <h4 className="username">{user?.username || 'Guest'}</h4>
        <p className="user-id">ID: {user?.userId || 'N/A'}</p> */}

      </div>

      {/* <div className="nav-section">
        <button className="nav-btn active"><span>⬤</span> OVERVIEW</button>
        <button className="nav-btn">👤 FANS DATA</button>
        <button className="nav-btn">💼 INCOME</button>
        <button className="nav-btn">📁 WORKS</button>
        <button className="nav-btn">💬 MESSAGES</button>
      </div> */}

<div className="nav-section">
        <NavLink to="/ClubDashboard" className={`nav-btn ${location.pathname === '/ClubDashboard' ? 'active' : ''}`}>
           Dashboard
        </NavLink>
        <NavLink to="/club/ManagePlayers" className={`nav-btn ${location.pathname === '/ManagePlayers' ? 'active' : ''}`}>
           Manage Players
        </NavLink>
        <NavLink to="/club/MatchSchedule" className={`nav-btn ${location.pathname === '/club/MatchSchedule' ? 'active' : ''}`}>
           Match Schedule
        </NavLink>
        <NavLink to="/club/Stats" className={`nav-btn ${location.pathname === '/club/Stats' ? 'active' : ''}`}>
           Stats & analytics
        </NavLink>
        {/* <NavLink to="/club/HealthReport" className={`nav-btn ${location.pathname === '/Club/HealthReport' ? 'active' : ''}`}>
           Health Reports
        </NavLink> */}
        <NavLink to="/club/ManageClub" className={`nav-btn ${location.pathname === '/club/ManageClub' ? 'active' : ''}`}>
           Manage Club
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
              <button className="neumorphic" onClick={() => setShowLogoutModal(false)}> Cancel </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default NmdSidebar2;
