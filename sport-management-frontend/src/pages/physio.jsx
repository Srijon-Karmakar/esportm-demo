import React from 'react';
import './physio.css';
import physioImg from '../assets/images/physio.jpg'; // Change path as per your project structure

const PhysioPage = () => {
  return (
    <div className="physio-page">
      {/* Hero Section */}
      <section className="physio-hero">
        <div className="hero-content">
          <h1>SportBit Physio Services</h1>
          <p>Stay injury-free and in top shape with on-demand physiotherapy and personalized rehab plans.</p>
          <div className="hero-buttons">
            <button className="btn book">Book a Physio</button>
            <button className="btn subscribe">Subscribe Plan</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={physioImg} alt="Physio treatment" />
        </div>
      </section>

      {/* Features Section */}
      <section className="physio-features">
        <h2>Why Choose SportBit Physio?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Certified Experts</h3>
            <p>Work with licensed physiotherapists with sports specialization.</p>
          </div>
          <div className="feature-card">
            <h3>Injury Recovery Plans</h3>
            <p>Custom recovery routines to get back on the field faster and stronger.</p>
          </div>
          <div className="feature-card">
            <h3>Club & Player Tracking</h3>
            <p>Track progress within your club’s dashboard and integrate with player stats.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Packages</h3>
            <p>Flexible booking and subscription options to suit your training schedule.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="physio-footer">
        <p>&copy; {new Date().getFullYear()} SportBit. Empowering Sports Professionals.</p>
      </footer>
    </div>
  );
};

export default PhysioPage;
