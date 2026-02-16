import React from 'react';
import './Home.css'; // Reuse the same styles as the Home page

const Services = () => {
  return (
    <div className="home">
      <header className="home-header">
        <div className="logo">
          <h1>Services</h1>
        </div>
      </header>
      <div className="home-body">
        <div className="text-content">
          <h1>Our Services</h1>
          <p>Explore the services we offer, including web development, mobile development, and consulting.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;