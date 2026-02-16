import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import './ManagerDash.css';
import ManagerSidebar from '../components/ManagerSidebar';
import NmdHeader from '../components/NmdHeader';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const ManagerDashboard = () => {
  const barData = {
    labels: ['Player A', 'Player B', 'Player C', 'Player D'],
    datasets: [{
      label: 'Performance Score',
      data: [65, 59, 80, 81],
      backgroundColor: 'rgba(142, 74, 214, 0.6)',
      borderColor: 'rgba(142, 74, 214, 1)',
      borderWidth: 1,
    }],
  };

  const pieData = {
    labels: ['Wins', 'Losses'],
    datasets: [{
      label: 'Match Results',
      data: [18, 6],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="dashboard-page">
      <ManagerSidebar />
      <div className="main-dashboard">
        <NmdHeader title="Manager Dashboard" />

        <div className="dashboard-cards">
          <div className="dash-card neumorphic">Matches: <span>24</span></div>
          <div className="dash-card neumorphic">Wins: <span>18</span></div>
          <div className="dash-card neumorphic">Losses: <span>6</span></div>
          <div className="dash-card neumorphic">Next Match: <span>July 10</span></div>
        </div>

        <div className="charts">
          <div className="chart-box neumorphic">
            <h3>Performance Overview</h3>
            <Bar data={barData} />
          </div>
          <div className="chart-box neumorphic">
            <h3>Match Results</h3>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="dash-card neumorphic wide">
          <h3>Health Reports</h3>
          <p>4 players under recovery. No critical injuries reported.</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
