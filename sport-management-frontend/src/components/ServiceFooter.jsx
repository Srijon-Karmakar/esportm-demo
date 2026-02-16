import React from 'react';
import './ServiceFooter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>SportBit</h3>
        <p>AI Powered Sport ERP</p>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <p>About us</p>
        <p>Contact us</p>
        <p>Login</p>
        <p>Register</p>
      </div>
      <div className="footer-address">
        <h4>Address</h4>
        <p>Esplanade, Kolkata-700100,<br />West Bengal, India</p>
        <p>Email: sportbit@gmail.com</p>
        <p>Phone: 987654321</p>
      </div>
    </footer>
  );
};

export default Footer;
