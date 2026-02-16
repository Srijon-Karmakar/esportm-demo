import React, { useState, useEffect } from 'react';
import './ManagerSidebar.css'; // Reuse existing sidebar styling
import profilePic from '../assets/images/Hazard.png'; // Replace with your Pitch Manager image
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png';

const PitchSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [pitchManagerName, setPitchManagerName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('pitch_manager_name');
    if (storedName) setPitchManagerName(storedName);
  }, []);

  const handleSettingsClick = () => {
    navigate('/pitch/settings');
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('pitch_manager_name');
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <div className="fan-sidebar">
      <div className="avatar-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h4 className="username">{pitchManagerName || 'Pitch Manager'}</h4>
        <p className="user-id">Ground Ops</p>
      </div>

      <div className="nav-section">
        <NavLink to="/PitchManagerdash" className={`nav-btn ${location.pathname === '/PitchManagerDash' ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/pitchManager/Maintanance" className={`nav-btn ${location.pathname === '/pitch/maintenance' ? 'active' : ''}`}>
          Maintenance
        </NavLink>
        <NavLink to="/pitchManager/bookings" className={`nav-btn ${location.pathname === '/pitch/bookings' ? 'active' : ''}`}>
          Bookings
        </NavLink>
        <NavLink to="/pitchManager/Reports" className={`nav-btn ${location.pathname === '/pitch/reports' ? 'active' : ''}`}>
          Reports
        </NavLink>
        <NavLink to="/pitchManager/Ground" className={`nav-btn ${location.pathname === '/Ground/resources' ? 'active' : ''}`}>
          Ground availability
        </NavLink>
      </div>

      <div className="footer-icons">
        <button className="icon-btn" onClick={handleSettingsClick}>
          <img src={SettingsIcon} alt="Settings" />
        </button>

        <button className="icon-btn" onClick={() => setShowLogoutModal(true)}>
          <img src={LogOutIcon} alt="Logout" />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="modal-content">
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

export default PitchSidebar;
