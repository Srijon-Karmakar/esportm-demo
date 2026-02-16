import React, { useState } from 'react';
import './NmdClubManagement.css';
import Lottie from 'lottie-react';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// import HomeIcon from '../assets/icons/HomeIcon.png';
// import DarkIcon from '../assets/icons/DarkMode.png';

// import SquadIcon from '../assets/images/SquadMgmt.jpg';
// import TrainingIcon from '../assets/images/TrainingSchedule.jpg';
// import FacilityIcon from '../assets/images/ClubFacility.jpg';
// import ScoutIcon from '../assets/images/Scouting.jpg';

// const clubServices = [
//   { id: 1, title: 'Budget Planning', img: BudgetIcon, description: 'Strategize and allocate your club’s budget effectively.' },
//   { id: 2, title: 'Player Contracts', img: ContractIcon, description: 'Manage and store player contracts & legal docs securely.' },
//   { id: 3, title: 'Expense Tracking', img: ExpenseIcon, description: 'Monitor club spending and detect inefficiencies.' },
//   { id: 4, title: 'Revenue Analysis', img: RevenueIcon, description: 'Analyze income streams & financial performance.' },
// ];

const clubServices = [
  {
    id: 1,
    title: 'Squad Management',
    // img: SquadIcon,
    description: 'Organize player rosters, formations, and team lineups effortlessly.',
  },
  {
    id: 2,
    title: 'Training Schedules',
    // img: TrainingIcon, 
    description: 'Plan and monitor training sessions with player-specific goals.',
  },
  {
    id: 3,
    title: 'Club Facilities',
    // img: FacilityIcon, 
    description: 'Manage club infrastructure, gyms, recovery zones, and grounds.',
  },
  {
    id: 4,
    title: 'Scouting & Recruitment',
    // img: ScoutIcon, 
    description: 'Track and recruit new talents based on skill, potential, and fit.',
  },
];


export default function ClubManagementService() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`club-page ${dark ? 'dark' : ''} club-page`}>

      {/* Glass Glow Circles */}
      <div className="background-glow-container">
        <div className="glow-circle small top-left"></div>
        <div className="glow-circle medium center"></div>
        <div className="glow-circle large bottom-right"></div>
        <div className="glow-circle medium bottom-left"></div>
        <div className="glow-circle small top-right"></div>
      </div>

      {/* Header */}
      <header className="club-header">
        <div className="club-logo">
          <Lottie animationData={sportbitVideo} loop style={{ width: 90, height: 90 }} />
        </div>
        <div className="club-controls">
          <button onClick={() => navigate('/')} className="neumorphic-btn">
            <img src={HomeIcon} alt="home" />
          </button>
          <button onClick={() => setDark(prev => !prev)} className="neumorphic-btn">
            <img src={DarkIcon} alt="toggle theme" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="club-main">
        <section className="hero-section neumorphic">
          <div className="glass-glow-circle"></div>

          <motion.h1 className="gradient-title" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            Club Management Services
          </motion.h1>
          <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            Tools to streamline your club’s operations, contracts, and financials.
          </motion.p>
          <motion.button id='clubDashBtn' className="cta-btn neumorphic" whileHover={{ scale: 1.05 }} onClick={() => navigate('/ManagerDash')}>
            Explore Dashboard
          </motion.button>
          {/* <motion.button id='clubDashBtn' whileHover={{ scale: 1.05 }} onClick={() => navigate('/ManagerDash')}>
            Explore Dashboard
          </motion.button> */}
        </section>

        <section className="services-section">
          <h2>Key Club Services</h2>
          <div className="cards-container">
            {clubServices.map(service => (
              <motion.div key={service.id} className="service-card neumorphic" whileHover={{ scale: 1.03 }}>
                <img src={service.img} alt={service.title} />
                <h3>{service.title}</h3>
                <p className="card-description">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="feature-section neumorphic">
          <h2>Talent & Operations Hub</h2>
          <p>Manage recruitment, assign coaches, and optimize training all from one place.</p>
          <motion.button className="neumorphic-btn" whileHover={{ scale: 1.03 }}>
            
          </motion.button>
        </section>
      </main>

      <footer className="club-footer neumorphic">
        <div className="quick-links">
          <a href="/">Home</a>
          <a href="/NmdClubManagement">Clubs</a>
          <a href="/BookDemo">Support</a>
          <a href="/Home2#s5">Contact</a>
        </div>
        <p>©2025 SportBit. All rights reserved.</p>
      </footer>
    </div>
  );
}
