import React, { useState, useEffect } from 'react';
import './ManagerSidebar.css'; // Reusing the same sidebar style
import profilePic from '../assets/images/Hazard.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png';

const AgentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [agentName, setAgentName] = useState('');

  useEffect(() => {
    const storedAgentName = localStorage.getItem('agent_name');
    if (storedAgentName) setAgentName(storedAgentName);
  }, []);

  const handleSettingsClick = () => {
    navigate('/agent/settings');
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('agent_name');
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <div className="fan-sidebar">
      <div className="avatar-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h4 className="username">{agentName || 'Agent'}</h4>
        <p className="user-id">Sports Agent</p>
      </div>

      <div className="nav-section">
        <NavLink to="/agent/dashboard" className={`nav-btn ${location.pathname === '/agent/dashboard' ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/agent/AgentPlayerStats" className={`nav-btn ${location.pathname === '/agent/Player Stats' ? 'active' : ''}`}>
          Player Stats
        </NavLink>
        <NavLink to="/agent/AgentContracts" className={`nav-btn ${location.pathname === '/agent contracts' ? 'active' : ''}`}>
          Contracts
        </NavLink>
        <NavLink to="/agent/AgentChat" className={`nav-btn ${location.pathname === '/agent/chat' ? 'active' : ''}`}>
          Messages
        </NavLink>
        <NavLink to="/agent/OfferTracker" className={`nav-btn ${location.pathname === '/agent/offers' ? 'active' : ''}`}>
          Offer Tracker
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

export default AgentSidebar;
