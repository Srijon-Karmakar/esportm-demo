import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="neumorphic-footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="gradient-text">SportBit Physio</h3>
          <p>Helping athletes heal, recover, and perform better.</p>
        </div>

        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/physio">Home</a></li>
            <li><a href="/book-physio">Book a Physio</a></li>
            <li><a href="/login2">Physio Login</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h4>Contact</h4>
          <p>Email: contact@sportbit.io</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Kolkata, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SportBit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
