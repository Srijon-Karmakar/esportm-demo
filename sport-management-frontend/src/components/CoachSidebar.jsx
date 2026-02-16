import React, { useState, useEffect } from 'react';
import './ManagerSidebar.css'; // Reuse shared sidebar styles
import profilePic from '../assets/images/Hazard.png'; // Replace with your coach image if needed
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/icons/SettingsIcon.png';
import LogOutIcon from '../assets/icons/LogoutIcon.png';

const CoachSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [coachName, setCoachName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('coach_name');
    if (storedName) setCoachName(storedName);
  }, []);

  const handleSettingsClick = () => {
    navigate('/coach/settings');
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('coach_name');
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <div className="fan-sidebar">
      <div className="avatar-section">
        <img src={profilePic} alt="Coach" className="profile-pic" />
        <h4 className="username">{coachName || 'Coach'}</h4>
        <p className="user-id">Team Strategist</p>
      </div>

      <div className="nav-section">
        <NavLink to="/CoachDashboard" className={`nav-btn ${location.pathname === '/coach/dashboard' ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/coach/Training" className={`nav-btn ${location.pathname === '/Training Plans' ? 'active' : ''}`}>
          Training Plans
        </NavLink>
        <NavLink to="/coach/ManagePlayers" className={`nav-btn ${location.pathname === '/Manage Players' ? 'active' : ''}`}>
          Players
        </NavLink>
        <NavLink to="/coach/messages" className={`nav-btn ${location.pathname === '/chat' ? 'active' : ''}`}>
          Messages
        </NavLink>
        <NavLink to="/coach/analytics" className={`nav-btn ${location.pathname === '/analytics' ? 'active' : ''}`}>
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

      {/* Logout Modal */}
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

export default CoachSidebar;
