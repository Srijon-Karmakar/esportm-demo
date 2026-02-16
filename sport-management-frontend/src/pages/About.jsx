import React from "react";
import "./About.css";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
// import watermarkImage from '../assets/Watermark.png';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
// import Lottie from 'lottie-react';
// import homePlayer from '../assets/HomePlayer.png';



const About = () => {




  const navigate = useNavigate();
  const location = useLocation();
  // update for service popup z-index issue 
  const [showServices, setShowServices] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState(false);


  // Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };


   

  return (
    <motion.div className="home"
      initial="hidden"
      animate="visible"
      exit="hidden">


      <div className="watermark">
        <img id='homeplayer-watermark' src="/Homeplayer.png" alt="player" />
        <img id='text-watermark' src={watermarkImage} alt="Watermark" />
      </div>
    <motion.header className="home-header"
    variants={headerVariants}>
        <div className="logo">
         

          <div style={{ width: 160, height: 150 }}>
      <Lottie animationData={sportbitVideo} loop={true} />
    </div>
        </div>
        <nav id='navbar' >

          {/* home  */}
          <motion.div className="nav-item" variants={buttonVariants}
          whileHover={{ scale: 1.1 }}>
            <a href="/" className="active">Home</a>
          </motion.div>



          {/* pricing  */}
          <motion.div className="nav-item" variants={buttonVariants}
          whileHover={{ scale: 1.1 }}>
            <a className="active" onClick={() => navigate('/pricing', { state: { from: location.pathname } })}>Pricing</a>
            
          </motion.div>


          {/* About Popup */}
          {/* <motion.div className="nav-item-dropdown" variants={buttonVariants}
          whileHover={{ scale: 1.1 }}>
            <button onClick={() => navigate('/about')}>About</button>
            <div className="popup animated-popup">
              <div className="popup-content">
                <h2>About Us</h2>
                <p>Learn more about our company, team, and mission.</p>
              </div>
            </div>
          </motion.div> */}

<motion.div
  className={`nav-item-dropdown ${location.pathname === '/about' ? 'active-nav-item' : ''}`}
  variants={buttonVariants}
  whileHover={{ scale: location.pathname === '/about' ? 1 : 1.1 }}
>
  <button
    onClick={() => {
      if (location.pathname !== '/about') navigate('/about');
    }}
    style={{
      pointerEvents: location.pathname === '/about' ? 'none' : 'auto',
      cursor: location.pathname === '/about' ? 'default' : 'pointer',
      color: location.pathname === '/about' ? '#888' : 'inherit',
    }}
  >
    About
  </button>
  {location.pathname !== '/about' && (
    <div className="popup animated-popup">
      <div className="popup-content">
        <h2>About Us</h2>
        <p>Learn more about our company, team, and mission.</p>
      </div>
    </div>
  )}
</motion.div>



            



           

           {/* Services Popup */}
           {/* <motion.div className="nav-item-dropdown"
           whileHover={{ scale: 1.1 }}>
  <button onClick={() => setShowServices(!showServices)}>Services</button>
  {showServices && (
  <div id='servicePopup' className="popup animated-popup">
    <div className="popup-content">
      <h2>Our Services</h2>
      <ul>
        <motion.li onClick={() => navigate('/clubManagementService')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Club Management Services
        </motion.li>
        <motion.li onClick={() => navigate('/financialManagement')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Financial Management
        </motion.li>
        <motion.li onClick={() => navigate('/training')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Training Services
        </motion.li>
        <motion.li onClick={() => navigate('/aiTalentScouting')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          AI Talent Scouting
        </motion.li>
        <motion.li onClick={() => navigate('/playerMarket')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Player Marketplace
        </motion.li>
        <motion.li onClick={() => navigate('/AiScheduleEngine')} whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          AI Scheduling Engine
        </motion.li>
        <motion.li onClick={() => navigate('/InjuryTracking')} whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Injury Tracking System
        </motion.li>
      </ul>
    </div>
  </div>
  )}
</motion.div> */}

          



         


          



          {/* <motion.div className="nav-item-dropdown login-dropdown"
          whileHover={{ scale: 1.1 }}>
            <button className="login-button">Login</button>
            <div className="dropdown-menu">
              <motion.button
                onClick={() => navigate('/login/player', { state: { from: location.pathname } })}
                whileHover={{ scale: 1.1 }}
              >
                Login as Player
              </motion.button>
              <motion.button onClick={() => navigate('/login/club', { state: { from: location.pathname } })} whileHover={{ scale: 1.1 }}>Login as Club</motion.button>
              <motion.button onClick={() => navigate('/login/manager', { state: { from: location.pathname } })} whileHover={{ scale: 1.1 }}>Login as Manager</motion.button>
              <motion.button onClick={() => navigate('/login/admin', { state: { from: location.pathname } })} whileHover={{ scale: 1.1 }}>Login as Admin</motion.button>
            </div>
          </motion.div> */}
        </nav>
      </motion.header>

      <motion.div className="home-body" 
       initial="hidden"
       animate="visible"
       variants={imageVariants}>


        {/* main about content */}
        {/* <div className="about-overlay"> */}
        <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About <span>SportBit</span></h1>
        <p>
          SportBit is an AI-powered sports analytics platform built to
          revolutionize how players, coaches, and clubs interact, train, and
          perform. From player performance tracking to injury management and
          match scheduling, our tools bring smart data and actionable insights
          right to your dashboard.
        </p>
        <h2> Key Features</h2>
        <ul>
          <li>Real-time Player Stats & KPIs</li>
          <li>AI-Generated Match Schedules</li>
          <li>Injury Monitoring & Reports</li>
          <li>Player Marketplace & Club Offers</li>
          <li>Role-based Dashboards for Users & Admins</li>
        </ul>
        <h2> Our Mission</h2>
        <p>
          We aim to bridge the gap between talent and opportunity by providing
          smart technology that empowers individuals and clubs across all
          levels of sport.
        </p>
      </motion.div>
        {/* </div> */}



        {/* <motion.div className="image-box" variants={imageVariants}>
          <img id='homeplayer' src={homePlayer} alt="player" />
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
};

export default About;