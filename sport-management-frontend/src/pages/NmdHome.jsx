import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NmdHome.css';
import Sidebar from '../components/Sidebar';
import watermarkImage from '../assets/Watermark.png';
import sportbitVideo from '../assets/sportbit_dot_white.json';
import Lottie from 'lottie-react';
import homePlayer from '../assets/HomePlayer.png';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showServices, setShowServices] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div className="home" initial="hidden" animate="visible" exit="hidden">
      
      <div className="watermark">
        <img id="homeplayer-watermark" src="/Homeplayer.png" alt="player" />
        <img id="text-watermark" src={watermarkImage} alt="Watermark" />
      </div>

      
      <motion.header className="home-header" variants={headerVariants}>
        <div className="logo" onClick={() => navigate('/AdminDashboard')}>
          <div style={{ width: 160, height: 150 }}>
            <Lottie animationData={sportbitVideo} loop={true} />
          </div>
        </div>

        <nav id="navbar">
         
          {/* <div className={`nav-item ${location.pathname === '/' ? 'active-nav-item' : ''}`}>
            <a className='neumorphic-btn'  onClick={(e) => {e.preventDefault();
                if (location.pathname !== '/') navigate('/');}}> Home </a>
          </div> */}
          <button id='activeHome' className='neumorphic-btn' onClick={(e) => {e.preventDefault();
                if (location.pathname !== '/') navigate('/');}}>Home</button>



          {/* <div className=" neumorphic-btn nav-item">
            <a onClick={() => navigate('/pricing2')}>Pricing</a>
          </div> */}
          <button className='neumorphic-btn' onClick={() => navigate('/pricing2')} >Pricing</button>

          {/* <div className="nav-item">
            <a onClick={() => navigate('/Home2')}>About</a>
          </div> */}
          <button className='neumorphic-btn' onClick={() => navigate('/Home2')}>About</button>

          
          <div className="nav-item-dropdown">
            <button className='neumorphic-btn' onClick={() => setShowServices(!showServices)}>Services</button>
            
            {showServices && (
              <div id="servicePopup" className="popup animated-popup">
                <div className="popup-content">
                  <h2>Our Services</h2>
                  <ul>
                    <li onClick={() => navigate('/NmdclubManagement')}>Club Management</li>
                    <li onClick={() => navigate('/NmdFinanceService')}>Financial Management</li>
                    <li onClick={() => navigate('/NmdTraining')}>Training Services</li>
                    <li onClick={() => navigate('/aiTalentScouting')}>AI Talent Scouting</li>
                    <li onClick={() => navigate('/PlayerMarket2')}>Player Marketplace</li>
                    <li onClick={() => navigate('/AiScheduleEngine')}>AI Scheduling Engine</li>
                    <li onClick={() => navigate('/InjuryTracking')}>Injury Tracking</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

      
          {/* <div className="nav-item">
            <button className="neumorphic-btn toggle-theme" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div> */}

          <div className=" login-dropdown">
            <button  className="neumorphic-btn login-button">Login</button>
            <div className="dropdown-menu">
              <button onClick={() => navigate('/login/player')}>Login as Player</button>
              <button onClick={() => navigate('/login/club')}>Login as Club</button>
              <button onClick={() => navigate('/login/manager')}>Login as Manager</button>
              <button onClick={() => navigate('/login/admin')}>Login as Admin</button>
            </div>
          </div>
        </nav>
      </motion.header>

      <motion.div className="home-body" variants={imageVariants}>
        <Sidebar />

        <div className="text-content">
          <motion.h1 variants={headerVariants}>
            Welcome to <br /> <span>SportBit</span>
          </motion.h1>
          <motion.p>A ERP Service for Players and Club/Managers</motion.p>

          <div id="home-cta" className="buttons">
            <button
              onClick={() => navigate('/NmdAiSkill')}
              className="neumorphic-btn-home"
            >
              AI Skill Analyser
            </button>
            <button
              onClick={() => navigate('/AiGrowthPlan')}
              className="neumorphic-btn-home"
            >
              AI Growth Plan
            </button>
          </div>

          <motion.p className="subtext">Analyse and view daily reports, dashboards and stand out from others.</motion.p>
        </div>

        <motion.div className="image-box" variants={imageVariants}>
          <img id="homeplayer" src={homePlayer} alt="player" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;







