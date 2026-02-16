// src/components/NmdHeader.jsx
import React from 'react';
import './NmdHeader.css';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/icons/HomeIcon.png'; 

const NmdHeader = ({ title = "Page Title" }) => {
  const navigate = useNavigate();

  return (
    <header className="nmd-header neumorphic">
      <h2 className="header-title">{title}</h2>
      <button className="home-btn" onClick={() => navigate('/')}>
        <img src={HomeIcon} alt="home-icon" />
      </button>
    </header>
  );
};

export default NmdHeader;
