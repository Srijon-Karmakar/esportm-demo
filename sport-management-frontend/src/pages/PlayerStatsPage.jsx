import React from 'react';
import UserSidebar from '../components/userSidebar';
import './PlayerStatsPage.css';
import { useNavigate } from 'react-router-dom';

const PlayerStatsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   localStorage.clear(); 
      navigate('/'); 
  };


  const handleGoHome = () => navigate('/');
  const handleGoChat = () => navigate('/chatUi');
    const pageStyle = {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right,rgb(247, 242, 179),rgb(237, 237, 237))',
        fontFamily: 'sans-serif',
        color:'black',
      };
    
      const contentStyle = {
        marginLeft: '240px',
        padding: '30px',
        width: '100%',
        position: 'relative'
      };
      const headerButtonsStyle = {
        position: 'absolute',
        top: '20px',
        right: '30px',
        display: 'flex',
        gap: '15px',
      };
      const buttonStyle = {
        padding: '10px 18px',
        border: 'none',
        borderRadius: '78px',
        backgroundColor: '#B5A245',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: '0.3s',
      };
    
      const titleStyle = {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '20px',
      };
    
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
      };
    
      const cardStyle = {
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };
    
      const statValue = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#111',
      };
    
      const statLabel = {
        fontSize: '14px',
        color: '#777',
      };
    
      return (
        <div style={pageStyle}>
          <UserSidebar/>
          <div style={contentStyle}>

            {/* Action Buttons */}
        <div style={headerButtonsStyle}>
          <button style={buttonStyle} onClick={handleGoHome}>Home</button>
          <button style={buttonStyle} onClick={handleGoChat}>Chat</button>
          <button style={{ ...buttonStyle, backgroundColor: '#dc3545' }} onClick={handleLogout}>Logout</button>
        </div>

            <div style={titleStyle}>Player Statistics</div>
            <div style={gridStyle}>
              {[
                { label: 'Fans', value: '33,123' },
                { label: 'Followers', value: '1,987' },
                { label: 'Likes', value: '13%' },
                { label: 'Comments', value: '4%' },
                { label: 'Total Posts', value: '1,987' },
                { label: '% Views Tweet', value: '71%' },
                { label: 'Training Posts', value: '43%' },
                { label: 'Visits vs Comments', value: '✔' },
              ].map((stat, index) => (
                <div key={index} style={cardStyle}>
                  <div style={statValue}>{stat.value}</div>
                  <div style={statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

export default PlayerStatsPage;
