import React, { useState } from 'react';
import './NmdFinanceService.css';
import Lottie from 'lottie-react';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import HomeIcon from '../assets/icons/HomeIcon.png';
// import DarkIcon from '../assets/icons/DarkMode.png';
// import BudgetPlanIcon from '../assets/images/BudgetPlan.jpg';
// import ContractIcon from '../assets/images/PlayerContract.jpg';
// import ExpenseIcon from '../assets/images/ExpenseTracking.jpg';
// import RevenueIcon from '../assets/images/RevenueAnalysis.jpg';

// const services = [
//   { id: 1, title: 'Budget Planning', img: BudgetPlanIcon,  description: 'Strategic financial planning and budget allocation for optimal club growth'  },
//   { id: 2, title: 'Player Contract', img: ContractIcon, description: 'Manage player contracts, salaries, and bonuses efficiently' },
//   { id: 3, title: 'Expense Tracking', img: ExpenseIcon, description: 'Real-time monitoring and analysis of club expenditures' },
//   { id: 4, title: 'Revenue Analysis', img: RevenueIcon ,  description: 'Track and optimize multiple revenue streams for sustainability'},
// ];

export default function FinancialManagement() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`fm-page ${dark ? 'dark' : ''} finance-page`}>

<div className="background-glow-container">
  <div className="glow-circle small top-left"></div>
  <div className="glow-circle medium center"></div>
  <div className="glow-circle large bottom-right"></div>
  <div className="glow-circle medium bottom-left"></div>
  <div className="glow-circle small top-right"></div>
</div>



      <header className="fm-header ">
        <div className="fm-logo">
          <Lottie animationData={sportbitVideo} loop style={{ width: 90, height: 90 }} />
        </div>
        <div className="fm-controls">
          <button onClick={() => navigate('/')} className="neumorphic-btn">
            <img src={HomeIcon} alt="home" />
          </button>
          <button onClick={() => setDark(d => !d)} className="neumorphic-btn">
            {/* {dark ? 'Light 🌞' : 'Dark 🌙'} */}
            <img 
    src={dark ? DarkIcon : DarkIcon} 
    alt={dark ? "Switch to light mode" : "Switch to dark mode"} 
    className="theme-icon"
  />
          </button>
        </div>
      </header>

      <main className="fm-main">
        <section className="hero-section neumorphic">

          {/* Violet Glowing Circle for Glassmorphism */}
  <div className="glass-glow-circle"></div>

          <motion.h1 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
            className="gradient-title">
            Financial Management Services
          </motion.h1>
          <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            Optimize your club's finances with AI-backed tools.
          </motion.p>
          <motion.button whileHover={{ scale: 1.05 }} className="cta-btn neumorphic" onClick={() => navigate('/admin/dashboard')}>
            Go to Dashboard
          </motion.button>
        </section>

        <section className="services-section">
          <h2>Key Services</h2>
          <div className="cards-container">
            {services.map(s => (
              <motion.div key={s.id} className="service-card neumorphic" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <img src={s.img} alt={s.title} />
                <h3>{s.title}</h3>
                <p className="card-description">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="feature-section neumorphic">
          <h2>Advanced Reporting</h2>
          <p>Generate insightful financial reports and export them easily for strategic decisions and transparency.</p>
          <motion.button className="neumorphic-btn" whileHover={{ scale: 1.03 }}>
            
          </motion.button>
        </section>
      </main>

      <footer className="fm-footer neumorphic">
        <div className="quick-links">
          <a href="/">Home</a>
          <a href="/Home2">Services</a>
          <a href="/Home2#s5">Contact</a>
          <a href="/BookDemo">Support</a>
        </div>
        <p>©2025 SportBit. All rights reserved.</p>
      </footer>
    </div>
  );
}
