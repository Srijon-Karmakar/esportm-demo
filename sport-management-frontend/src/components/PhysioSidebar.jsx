import React, { useState, useEffect } from 'react';
import './ManagerSidebar.css'; // Reuse existing sidebar styling
import profilePic from '../assets/images/Hazard.png'; // Replace with your image if needed
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png';

const PhysioSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [physioName, setPhysioName] = useState('');

  useEffect(() => {
    const storedPhysioName = localStorage.getItem('physio_name');
    if (storedPhysioName) setPhysioName(storedPhysioName);
  }, []);

  const handleSettingsClick = () => {
    navigate('/physio/settings');
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('physio_name');
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <div className="fan-sidebar">
      <div className="avatar-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h4 className="username">{physioName || 'Physio'}</h4>
        <p className="user-id">Wellness Dept.</p>
      </div>

      <div className="nav-section">
        <NavLink to="/PhysioDashboard" className={`nav-btn ${location.pathname === '/physio/dashboard' ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/physio/TreatmentPlans" className={`nav-btn ${location.pathname === '/physio/treatment-plans' ? 'active' : ''}`}>
          Treatment Plans
        </NavLink>
        <NavLink to="/physio/Appointments" className={`nav-btn ${location.pathname === '/physio/appointments' ? 'active' : ''}`}>
          Appointments
        </NavLink>
        <NavLink to="/physio/Physiochat" className={`nav-btn ${location.pathname === '/physio/chat' ? 'active' : ''}`}>
          Messages
        </NavLink>
        {/* <NavLink to="/physio/PhysioAnalytics" className={`nav-btn ${location.pathname === '/physio/analytics' ? 'active' : ''}`}>
          Analytics
        </NavLink> */}
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

export default PhysioSidebar;
