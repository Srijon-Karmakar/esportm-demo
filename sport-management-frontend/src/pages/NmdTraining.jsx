import React, { useState } from 'react';
import './NmdTraining.css';
import Lottie from 'lottie-react';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// import HomeIcon from '../assets/icons/HomeIcon.png';
// import DarkIcon from '../assets/icons/DarkMode.png';
// import StrengthIcon from '../assets/images/strength_training.jpg';
// import CardioIcon from '../assets/images/cardio.jpg';
// import DietIcon from '../assets/images/diet.jpg';
// import RehabIcon from '../assets/images/rehab.jpg';
// import physioImg from '../assets/images/physio.jpg';

// const trainingServices = [
//   { id: 1, title: 'Strength Training', img: StrengthIcon, description: 'Boost performance with expert strength conditioning routines.' },
//   { id: 2, title: 'Cardio & Endurance', img: CardioIcon, description: 'Enhance stamina with tailored cardio programs.' },
//   { id: 3, title: 'Diet Planning', img: DietIcon, description: 'Personalized nutrition plans to fuel athletic excellence.', path:'/DietPlanner' },
//   { id: 4, title: 'Injury Rehab', img: RehabIcon, description: 'Smart rehab tools and tracking for faster recovery.' },
//   { id: 5, title: 'Physio', img: physioImg, description: 'Customised physio service', path:'/physio' },
// ];

export default function TrainingService() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`fm-page ${dark ? 'dark' : ''} training-page`}>
      <div className="background-glow-container">
        <div className="glow-circle small top-left"></div>
        <div className="glow-circle medium center"></div>
        <div className="glow-circle large bottom-right"></div>
        <div className="glow-circle medium bottom-left"></div>
        <div className="glow-circle small top-right"></div>
      </div>

      <header className="fm-header">
        <div className="fm-logo">
          <Lottie animationData={sportbitVideo} loop style={{ width: 90, height: 90 }} />
        </div>
        <div className="fm-controls">
          <button onClick={() => navigate('/')} className="neumorphic-btn">
            <img src={HomeIcon} alt="home" />
          </button>
          <button onClick={() => setDark(d => !d)} className="neumorphic-btn">
            <img src={DarkIcon} alt="Toggle Theme" className="theme-icon" />
          </button>
        </div>
      </header>

      <main className="fm-main">
        <section className="hero-section neumorphic">
          <div className="glass-glow-circle"></div>
          <motion.h1 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
            className="gradient-title">
            Training & Health Services
          </motion.h1>
          <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            Empower your training with AI and expert-backed programs.
          </motion.p>
          <motion.button whileHover={{ scale: 1.05 }} className="cta-btn neumorphic" onClick={() => navigate('/HealthDashboard')}>
            Go to Training Dashboard
          </motion.button>
        </section>

        <section className="services-section">
          <h2>Key Training Services</h2>
          <div className="cards-container">
            {trainingServices.map(service => (
              <motion.div key={service.id} className="service-card neumorphic" whileHover={{ scale: 1.03 }}
              onClick={() => navigate(service.path)}
              style={{ cursor: 'pointer' }}
              >
                <img src={service.img} alt={service.title} />
                <h3>{service.title}</h3>
                <p className="card-description">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="feature-section neumorphic">
          <h2>AI-Based Personalized Plans</h2>
          <p>Generate custom training schedules based on goals, metrics, and AI insights.</p>
          <motion.button className="neumorphic-btn" whileHover={{ scale: 1.03 }}>
            
          </motion.button>
        </section>
      </main>

      <footer className="fm-footer neumorphic">
        <div className="quick-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/trainers">Trainers</a>
          <a href="/support">Support</a>
        </div>
        <p>©2025 SportBit. All rights reserved.</p>
      </footer>
    </div>
  );
}
