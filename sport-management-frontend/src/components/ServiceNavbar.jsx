import React from 'react';
import './ServiceNavbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">SportBit</h2>
      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;
