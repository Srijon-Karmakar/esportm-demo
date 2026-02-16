import React from 'react';
import './userSidebar.css';
// import logo from '../assets/logo.png';
import Lottie from 'lottie-react';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {
  const location = useLocation();
  const sidebarStyle = {
    height: '100vh',
    width: '240px',
    background: 'linear-gradient(to bottom,rgb(174, 139, 214),rgb(131, 36, 148))',
    color: 'white',
    padding: '0px 30px',
    position: 'fixed',
    left: 0,
    top: 0,
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  };
  const logoStyle = {
    width: '120px',
    height: '90px',
    marginBottom: '-20px',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#00ff6e',
  };
  const subheadingStyle = {
    fontSize: '12px',
    marginBottom: '30px',
    color: '#fff',
  };

  const linkStyle = {
    padding: '15px 0px',
    fontSize: '17px',
    fontWeight: 500,
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
    width: '100%',
    display: 'block',
    borderRadius: '100px',
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'rgba(0, 0, 0, 0.45)', 
    padding: '10px 50px',
    borderRadius: '100px',
  };

  return (
    <div style={sidebarStyle}>
      {/* <h2 style={{ fontSize: '24px', marginBottom: '40px' }}> */}
        {/* <span style={{ color: '#00ff6e' }}>Sport</span>Bit */}
        
        {/* <div style={{ fontSize: '12px', marginTop: '5px' }}>Players</div> */}
        <Lottie animationData={sportbitVideo} loop={true} alt="SportBit Logo" style={logoStyle} />
      <div style={subheadingStyle}>Players</div>

      {/* </h2> */}
      {/* <div style={linkStyle}>Dashboard</div>
      <div style={activeLinkStyle}>Statistics</div>
      <div style={linkStyle}>Club Offers</div>
      <div style={linkStyle}>Applications</div>
      <div style={linkStyle}>My Profile</div> */}

      <Link to="/playerStats" style={location.pathname === '/playerStats' ? activeLinkStyle : linkStyle}>
        Dashboard
      </Link>

      <Link to="/playerStatsPage" style={location.pathname === '/playerStatsPage' ? activeLinkStyle : linkStyle}>
        Statistics
      </Link>

      <Link to="/ClubOffers" style={location.pathname === '/ClubOffers' ? activeLinkStyle : linkStyle}>
        Club Offers
      </Link>

      <Link to="/applications" style={location.pathname === '/applications' ? activeLinkStyle : linkStyle}>
        Applications
      </Link>

      <Link to="/playerProfile" style={location.pathname === '/playerProfile' ? activeLinkStyle : linkStyle}>
        My Profile
      </Link>

    </div>
  );
};

export default Sidebar;

