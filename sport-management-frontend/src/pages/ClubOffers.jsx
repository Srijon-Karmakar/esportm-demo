import React from 'react';
// import UserSidebar from '../components/userSidebar';
import NmdSidebar2 from '../components/NmdSidebar2';


const ClubOffers = () => {
  const pageStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw' ,
    background: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    
    color: 'black' ,
  };

  const contentStyle = {
    flex: 1,
    padding: '30px',
    overflowY: 'auto',
    marginLeft: '20px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const offerCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  };

  const offers = [
    {
      club: 'Mohunbagan SG',
      position: 'Forward',
      salary: '₹70,000/month',
      duration: '2 year',
      status: 'Pending',
    },
    {
      club: 'Rapid Strikers',
      position: 'Forward',
      salary: '₹85,000/month',
      duration: '2 years',
      status: 'Accepted',
    },
    {
        club: 'Elite FC',
        position: 'Midfielder',
        salary: '₹70,000/month',
        duration: '1 year',
        status: 'Pending',
      },
      {
        club: 'Eastbengal F',
        position: 'Defender',
        salary: '₹170,000/month',
        duration: '1 year',
        status: 'Pending',
      },
    
  ];

  return (
    <div style={pageStyle}>
      <NmdSidebar2 />
      <div style={contentStyle}>
        <h2 style={titleStyle}>Club Offers</h2>
        {offers.map((offer, index) => (
          <div key={index} style={offerCardStyle}>
            <h3>{offer.club}</h3>
            <p><strong>Position:</strong> {offer.position}</p>
            <p><strong>Salary:</strong> {offer.salary}</p>
            <p><strong>Duration:</strong> {offer.duration}</p>
            <p><strong>Status:</strong> {offer.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubOffers;
