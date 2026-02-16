import React, { useState, useEffect } from 'react';
import './ManagerSidebar.css'; // Reusing the same sidebar styles
import profilePic from '../assets/images/Hazard.png'; // Replace with your own image if needed
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png';

const NutriSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [nutritionistName, setNutritionistName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('nutritionist_name');
    if (storedName) setNutritionistName(storedName);
  }, []);

  const handleSettingsClick = () => {
    navigate('/nutritionist/settings');
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nutritionist_name');
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <div className="fan-sidebar">
      <div className="avatar-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h4 className="username">{nutritionistName || 'Nutritionist'}</h4>
        <p className="user-id">Health & Diet</p>
      </div>

      <div className="nav-section">
        <NavLink to="/nutritionist/dashboard" className={`nav-btn ${location.pathname === '/nutritionist/dashboard' ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/nutritionist/dietPlans" className={`nav-btn ${location.pathname === '/diet Plans' ? 'active' : ''}`}>
          Diet Plans
        </NavLink>
        <NavLink to="/nutritionist/Consults" className={`nav-btn ${location.pathname === '/consultations' ? 'active' : ''}`}>
          Consultations
        </NavLink>
        
        <NavLink to="/nutritionist/NutriAnalytics" className={`nav-btn ${location.pathname === '/analytics' ? 'active' : ''}`}>
          Analytics
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

export default NutriSidebar;
