

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import Sidebar from '../components/Sidebar';
import watermarkImage from '../assets/Watermark.png';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
import Lottie from 'lottie-react';
import homePlayer from '../assets/HomePlayer.png';
import { motion } from 'framer-motion';
// import FluidGlass from '../components/fluidGlass';

const Home = () => {

  const [hoverStart, setHoverStart] = React.useState(false);
  const [hoverDemo, setHoverDemo] = React.useState(false);
  const [hoverPhysio, setHoverPhysio] = React.useState(false);
const [hoverAgent, setHoverAgent] = React.useState(false);



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
         {/* FluidGlass background */}
      {/* <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <FluidGlass  mode="bar" />
      </div> */}
      


      <div className="watermark">
        <img id='homeplayer-watermark' src="/Homeplayer.png" alt="player" />
        <img id='text-watermark' src={watermarkImage} alt="Watermark" />
      </div>
    <motion.header className="home-header"
    variants={headerVariants}>
        <div className="logo" onClick={() => navigate('/AdminDashboard')}>
         

          <div style={{ width: 160, height: 150 }}>
      <Lottie animationData={sportbitVideo} loop={true} />
    </div>
        </div>
        <nav id='navbar' >
          

          {/* home  */}
          {/* <motion.div className="nav-item" variants={buttonVariants}
          whileHover={{ scale: 1.1 }}>
            <a href="#" className="active">Home</a>
          </motion.div> */}

<motion.div
  className={`nav-item ${location.pathname === '/' ? 'active-nav-item' : ''}`}
  variants={buttonVariants}
  whileHover={{ scale: location.pathname === '/' ? 1 : 1.1 }}
>
  {/* <a
    href="#"
    onClick={(e) => {
      e.preventDefault(); // Prevent page reload
      if (location.pathname !== '/') navigate('/');
    }}
    style={{
      pointerEvents: location.pathname === '/' ? 'none' : 'auto',
      cursor: location.pathname === '/' ? 'default' : 'pointer',
    }}
  >
    Home
  </a> */}
</motion.div>






          {/* pricing  */}
          <motion.div className="nav-item  " variants={buttonVariants}
          whileHover={{ scale: 1.1 }}> 
            <a className="active" onClick={() => navigate('/pricing2', { state: { from: location.pathname } })}>Pricing</a>
            
          </motion.div>


          {/* About Popup */}
          <motion.div className="nav-item-dropdown" variants={buttonVariants}
          whileHover={{ scale: 1.1 }}>
            <button onClick={() => navigate('/Home2')}>About</button>
            <div className="popup animated-popup">
              <div className="popup-content">
                <h2>About Us</h2>
                <p>Learn more about our company, team, and mission.</p>
              </div>
            </div>
          </motion.div>


            



           

           {/* Services Popup */}
           <motion.div className="nav-item-dropdown"
           whileHover={{ scale: 1.1 }}>
  <button onClick={() => setShowServices(!showServices)}>Services</button>
  {showServices && (
  <div id='servicePopup' className="popup animated-popup">
    <div className="popup-content">
      <h2>Our Services</h2>
      <ul>
        <motion.li onClick={() => navigate('/NmdclubManagement')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Club Management Services
        </motion.li>
        <motion.li onClick={() => navigate('/NmdFinanceService')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Financial Management
        </motion.li>
        <motion.li onClick={() => navigate('/NmdTraining')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Training Services
        </motion.li>
        {/* <motion.li onClick={() => navigate('/aiTalentScouting')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          AI Talent Scouting
        </motion.li> */}
        <motion.li onClick={() => navigate('/PlayerMarket2')}
          whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Player Marketplace
        </motion.li>
        {/* <motion.li onClick={() => navigate('/AiScheduleEngine')} whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          AI Scheduling Engine
        </motion.li> */}
        <motion.li onClick={() => navigate('/InjuryTracking')} whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Injury Tracking System
        </motion.li>
        <motion.li onClick={() => navigate('/NmdAiSkill')} whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          AI skill Prediction
        </motion.li>
        <motion.li onClick={() => navigate('/AiGrowthPlan')} whileHover={{ scale: 1.1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M4.285 12.433a.5.5 0 0 1-.57-.82l6-5a.5.5 0 0 1 .57.82l-6 5z"/>
          </svg>
          Ai Growth Plan
        </motion.li>
      </ul>
    </div>
  </div>
  )}
</motion.div>

          



         


          



          {/* <motion.div id='HomeLoginBtn' className="nav-item-dropdown login-dropdown"
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


          <motion.div id='HomeLoginBtn' className="nav-item-dropdown login-dropdown"
          whileHover={{ scale: 1.1 }}>
            <button onClick={() => navigate('/login/admin')} className="login-button">Admin</button>
          </motion.div>




        </nav>
      </motion.header>

      <motion.div className="home-body" 
       initial="hidden"
       animate="visible"
       variants={imageVariants}>
        <Sidebar />
        <div className="text-content">
          <motion.h1  variants={headerVariants}>Welcome to <br /> <span>SportBit</span></motion.h1>
          <motion.p variants={buttonVariants}>Smarter Sports. Better Teams, One Platform</motion.p>

          {/* <motion.div className="buttons" variants={buttonVariants}>
            <motion.button onClick={() => navigate('/trySportbit')} whileHover={{ scale: 1.05 }}>AI skill analyser</motion.button>
            <motion.button onClick={() => navigate('/log')} whileHover={{ scale: 1.05 }}>Personal Growth Plan</motion.button>
          </motion.div> */}

          <motion.div id='home-cta' className="buttons" variants={buttonVariants}>
            <motion.button id='cta-btn'
              onClick={() => navigate('/login2')}
              onMouseEnter={() => setHoverStart(true)}
    onMouseLeave={() => setHoverStart(false)}


              whileHover={{ scale: 1.05 }}
              className="neumorphic-btn-home"
            >
             Get Started
             {hoverStart && (
      <div className="hover-info">
        <p>Ready to upgrade your sports organisation !</p>
        <p>Login or Signup</p>
      </div>
    )}
            </motion.button>

            <motion.button  id='cta-btn'
              onClick={() => navigate('/BookDemo')}
              onMouseEnter={() => setHoverDemo(true)}
    onMouseLeave={() => setHoverDemo(false)}



              whileHover={{ scale: 1.05 }}
              className="neumorphic-btn-home"
            >
              Book a demo
              {hoverDemo && (
      <div className="hover-info">
        <p>Have Questions before commit?</p>
        <p>Book a 15 minute demo</p>
      </div>
    )}
            </motion.button>
          </motion.div>



          <motion.p className="subtext" variants={buttonVariants}>The all-in-one sports management system built for clubs, academies, coaches and athletes who want to level up. <br />
            <span>Built with AI, trusted by champions.</span>
          </motion.p>
        </div>

        <motion.div className="image-box" variants={imageVariants}>
          <img id='homeplayer' src={homePlayer} alt="player" />
        </motion.div>
      </motion.div>

    {/* upd for physio, agen buttons */}
    {/* Bottom-right fixed buttons with hover tooltips */}
{/* <div className="floating-btn-group">
  <div className="floating-btn-wrapper">
    <button
      className="floating-neumorphic-btn"
      onClick={() => navigate('/PhysioPage')}
      onMouseEnter={() => setHoverPhysio(true)}
      onMouseLeave={() => setHoverPhysio(false)}
    >
      Physio
    </button>
    {hoverPhysio && (
      <div className="floating-hover-info">
        <p>Need physical therapy?</p>
        <p>Find your sports physio</p>
      </div>
    )}
  </div>

  <div className="floating-btn-wrapper">
    <button
      className="floating-neumorphic-btn"
      onClick={() => navigate('/AgentPage')}
      onMouseEnter={() => setHoverAgent(true)}
      onMouseLeave={() => setHoverAgent(false)}
    >
      Agent
    </button>
    {hoverAgent && (
      <div className="floating-hover-info">
        <p>Are you a sports agent?</p>
        <p>Login to your dashboard</p>
      </div>
    )}
  </div>
</div> */}


    {/* upd for physio, agen buttons */}

    </motion.div>
  );
};

export default Home;