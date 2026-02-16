
import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import PlayerDash from '../pages/PlayerDash.jsx';

function Sidebar() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    const role = localStorage.getItem('role'); // 'player', 'manager', 'club', 'admin'

    if (!role) {
      alert('Please login to access dashboard.');
      return navigate('/');
    }

    switch (role) {
      case 'player':
        navigate('/NmdDashboard');
        break;
      case 'manager':
        navigate('/ManagerDash');
        break;
      case 'club':
        navigate('/ClubDashboard');
        break;
      case 'admin':
        navigate('/AdminDashboard');
        break;
      case 'agent':
        navigate('/AgentDashboard');
        break;
      case 'physio':
        navigate('/PhysioDashboard');
        break;
      case 'coach':
        navigate('/CoachDashboard');
        break;
      case 'nutritionist':
        navigate('/NutriDashboard');
        break;
      case 'pitch manager':
        navigate('/PitchManagerDash');
        break;

      default:
        navigate('/'); 
        break;

    }
  };

  return (
    <div className="side-options">
      
      {/* <span onClick={() => navigate('/NmdDashboard')}>Dashboard</span> */}
      <span onClick={handleDashboardClick}>Dashboard</span>
      <span onClick={() => navigate('/AiScheduleEngine')}>AI-Schedule</span>
      <span onClick={() => navigate('/Timeline')}>Timeline</span>
      {/* <PlayerDash /> */}
    </div>

    
  );
}

export default Sidebar;
