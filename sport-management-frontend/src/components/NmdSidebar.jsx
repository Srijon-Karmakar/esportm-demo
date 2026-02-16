// src/components/Sidebar.jsx
import React from 'react';
import './NmdSidebar.css';
import Lottie from 'lottie-react';
import sportbitVideo from '../assets/sportbit_dot_black.json';
import { useNavigate } from 'react-router-dom';

const NmdSidebar = () => {
  const navigate = useNavigate();
  
  return (
    <div id='sidebar-bg' className="sidebar neumorphic">
      {/* <h2 className="logo">SportBit</h2> */}
      <div classname='logo'>
      <Lottie id='logo' animationData={sportbitVideo} loop={true} alt="SportBit Logo" />
      </div>
      <nav className="nav-links">
        <a className="active"  onClick={() => navigate('/NmdDashboard')}>Dashboard</a>
        <a  onClick={() => navigate('/NmdPlayerStats')}>Statistics</a>
        <a onClick={() => navigate('/ClubOffers')}>Club Offers</a>
        <a onClick={() => navigate('/ClubOffers')}>Applications</a>
        <a onClick={() => navigate('/ClubOffers')}>Training</a>
        <a onClick={() => navigate('/ClubOffers')}>My profile</a>
      </nav>

    </div>
  );
};

export default NmdSidebar;
