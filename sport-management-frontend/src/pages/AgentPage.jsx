import React, { useState } from 'react';
import './AgentPage.css';
import Header from '../components/NmdHeader';
import Footer from '../components/Footer';
import agentImg from '../assets/images/Agent.jpg'; // Replace with your own image
import { useNavigate } from 'react-router-dom';

const CreateAgent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`agent-page ${darkMode ? 'dark' : 'light'}`}>
      <Header title="Agent" />

      <section className="hero-section">
        <div className="cta-buttons">
          <button
            className="neumorphic-btn"
            onClick={() => navigate('/book-agent')}
          >
            Looking for Agent
          </button>
          <button
            className="neumorphic-btn"
            onClick={() => navigate('/login2')}
          >
            Are you an Agent? Log in
          </button>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            Switch to {darkMode ? 'Light' : 'Dark'} Theme
          </button>
        </div>

        <div className="hero-content" />

        <img src={agentImg} alt="Agent" className="hero-image" />
      </section>

      <section className="services-section">
        <h2>Agent Services</h2>
        <div className="services-cards">
          <div className="neumorphic-card">
            <h3>Player Management</h3>
            <p>Professional assistance in handling player contracts and negotiations.</p>
          </div>
          <div className="neumorphic-card">
            <h3>Career Planning</h3>
            <p>Strategic planning and guidance for long-term player success.</p>
          </div>
          <div className="neumorphic-card">
            <h3>Club Deals</h3>
            <p>Connecting players with clubs for optimal team placement and exposure.</p>
          </div>
        </div>
      </section>

      <section className="book-section">
        <h2>Book an Agent</h2>
        <form className="book-form neumorphic-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="What type of agent are you looking for?" required />
          <button type="submit" className="neumorphic-btn">Submit</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default CreateAgent;
