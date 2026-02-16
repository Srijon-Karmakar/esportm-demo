// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Sun, Moon, Home } from 'lucide-react';
// import './AITalentScouting.css'; 
// import logo from '../assets/logo.png'; 
// import { useNavigate } from 'react-router-dom';




import React, { useState } from 'react';
import { Sun, Moon, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './aiTalentScouting.css';
// import logo from '../assets/Logo.png'; 
import Lottie from 'lottie-react';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
// import bgVideo from '../assets/ai-bg.mp4'; 
// console.log("Video path: ", bgVideo);


const AiTalentScouting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    
    <div className={`ai-scouting-page ${darkMode ? 'dark' : 'light'}`}>
      {/* Background Video */}
      // <video className="bg-video" autoPlay loop muted>
      //   <source src={bgVideo} type="video/mp4" />
      // </video>

      {/* Gradient overlay & 3D glow */}
      <div className="gradient-overlay" />
      <div className="bg-3d-glow" />

      {/* Top Navigation */}
      <header className="scout-header">
        {/* <img src={logo} alt="SportBit" className="scout-logo" /> */}

        <div className="logo">
          <div style={{ width: 160, height: 150 }}>
                                       <Lottie animationData={sportbitVideo} loop={true} />
                                    </div>
                             </div>

        <div className="nav-btns">
          {/* <button onClick={() => setDarkMode(!darkMode)} className="icon-btn">
            {darkMode ? <Sun /> : <Moon />}
          </button> */}
          <button onClick={() => navigate('/')} className="icon-btn">
            <Home />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Tomorrow’s Champions Today
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          AI-driven talent scouting built for modern clubs, coaches, and sports managers.
          Analyze, predict, and recruit like never before.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="primary-btn"
        >
          Get Started
        </motion.button>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          AI Scouting Features
        </motion.h2>

        <div className="features-grid">
          {[
            {
              icon: "🔍",
              title: "Smart Talent Search",
              desc: "Filter talent by skills, roles, and performance indexes using AI."
            },
            {
              icon: "📈",
              title: "Performance Forecast",
              desc: "Predict future impact based on past games, injury history, and growth metrics."
            },
            {
              icon: "🎥",
              title: "Video Intelligence",
              desc: "AI-driven match video analysis to detect moves, passes, and strategy impact."
            },
            {
              icon: "💡",
              title: "Player Potential Index",
              desc: "Quantify potential with AI-calculated scores across roles and sports."
            },
            {
              icon: "📊",
              title: "Comparative Dashboards",
              desc: "Compare athletes across leagues, teams, or peer profiles easily."
            },
            {
              icon: "🔔",
              title: "Talent Alerts",
              desc: "Get notified when promising athletes emerge in your interest zones."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

        {/* Extended Sections */}
<section className="scouting-details">
  <motion.div className="detail-section" id="smart-search"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3>🔍 Smart Talent Search</h3>
    <p>
      Use advanced filters like age, position, skills, experience, region, and AI-calculated performance score to quickly identify the best-fit players for your team or academy.
    </p>
  </motion.div>

  <motion.div className="detail-section" id="performance-forecast"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3>📈 Performance Forecast</h3>
    <p>
      Our AI model analyzes past games, injuries, and training data to predict future player growth, helping you invest wisely in upcoming stars.
    </p>
  </motion.div>

  <motion.div className="detail-section" id="video-analysis"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3>🎥 Video Intelligence</h3>
    <p>
      Upload match videos to automatically detect key plays, pass patterns, and tactical roles — visualized with heatmaps and highlight generation.
    </p>
  </motion.div>

  <motion.div className="detail-section" id="potential-index"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3>💡 Player Potential Index</h3>
    <p>
      Evaluate each athlete's future trajectory with an AI-generated score based on 30+ growth indicators from multiple sources.
    </p>
  </motion.div>

  <motion.div className="detail-section" id="dashboards"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3>📊 Comparative Dashboards</h3>
    <p>
      Compare up to 5 players side-by-side based on stats, heatmaps, roles, and historic trends to make informed selections.
    </p>
  </motion.div>

  <motion.div className="detail-section" id="alerts"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3>🔔 Talent Alerts</h3>
    <p>
      Set smart alerts for specific skill thresholds or roles. Get notified when a new player matches your scouting criteria.
    </p>
  </motion.div>
</section>


    </div>
  );
};

export default AiTalentScouting;
