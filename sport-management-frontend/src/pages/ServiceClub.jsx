import React from 'react';
import './ServiceClub.css';
import Coach from '../assets/images/servicePageImages/club-manager.png';

const ClubServices = () => {
  return (
    <div className="club-services-page">
     <header className="club-hero">
  <nav className="club-nav">
    <div className="logo">SportBit</div>
    <div className="nav-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Login</a>
    </div>
  </nav>

  <div className="hero-content">
    <div className="hero-text">
      <h1 id='h1-1'>
        Manage your Club</h1>
      <h1 id='h1-2'>
        With AI powered tools
      </h1>
      <button className="get-started-btn">Get Started</button>
    </div>

    <img src={Coach} alt="Coach" className="coach-image" />
  </div>
</header>

      <section className="services-section">
        <h2>Explore our <br /> <span>Club Services</span></h2>
        <div className="service-buttons">
          <button>Club Services</button>
          <button>Manage Players</button>
          <button>Finacial Management</button>
          <button>Manage Club</button>
          <button>Access control</button>
        </div>
      </section>

      <section className="description-section">
        <h2>Streamline Club Operations with SportBit</h2>
        <p>
          Running a sports club shouldn’t feel overwhelming. With SportBit, you get a powerful, easy-to-use platform that helps you manage players, track performance, schedule training sessions, and streamline internal operations—all in one place.
        </p>
        <p>
          Built for clubs of all sizes, SportBit connects managers, coaches, and support staff with real-time tools that keep everyone on the same page. From roster updates to secure data handling and internal communication, everything is centralized for smooth day-to-day management.
        </p>
        <p>
          Spend less time on admin work—and more time building a winning culture.
        </p>
      </section>

      <section className="stats-section">
        <div className="stat-box">1K+ <br /> teams</div>
        <div className="stat-box">5K+ <br /> Users</div>
        <div className="stat-box">1m <br /> transactions</div>
      </section>

      <footer className="club-footer">
        <div className="footer-left">
          <h3>SportBit</h3>
          <p>AI Powered Sport ERP</p>
        </div>
        <div className="footer-center">
          <h4>Quick Links</h4>
          <a href="#">About us</a>
          <a href="#">Contact us</a>
          <a href="#">Login</a>
          <a href="#">Register</a>
        </div>
        <div className="footer-right">
          <h4>Address</h4>
          <p>Esplanade, Kolkata-700100, <br /> West Bengal, India</p>
          <p>Email: sportbit@gmail.com</p>
          <p>Phone: 987654321</p>
        </div>
      </footer>
    </div>
  );
};

export default ClubServices;
