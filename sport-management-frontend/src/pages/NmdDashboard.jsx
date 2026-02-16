// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import NmdSidebar2 from '../components/NmdSidebar2';
import './NmdDashboard.css';
import { FaHome, FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NmdDashCard from '../components/NmdDashCard';
import NmdHeader from '../components/NmdHeader';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NmdDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Line Chart Data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Project Progress',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Bar Chart Data for Gantt
  const ganttData = {
    labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
    datasets: [
      {
        label: 'Duration (days)',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      }
    ]
  };

   // Chart options
   const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };

  return (
    <div className={`dashboard-wrapper ${darkMode ? 'dark' : ''}`}>
      
      <NmdSidebar2 />
      <div className="dashboard-main">
      <NmdHeader title="Dashboard" />
      {/* <h1 className='title'>Dashboard</h1>
      <div className="profile-actions">
        <button className="neumorphic" onClick={() => navigate('/')}>
           <FaHome color='purple' />
        </button>
        <button className="neumorphic">
           <FaSignOutAlt color='purple' />
        </button>
      </div> */}
                    
        
        <div className="topbar">
          
          
          {/* <input type="text" id='searchbar' placeholder="Search anything..." className="neumorphic search-bar" /> */}
          
          {/* <button id='header-btn' className="neumorphic" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <button id='header-btn' className="neumorphic">
          <a href="/">Home</a></button>
          <button id='header-btn' className="neumorphic">Logout</button>
          <div className="check-in">✅ Check-in<br /><small>12:03:40 pm</small></div>
          <div className="avatar">👤</div> */}
        </div>

        <div className="stats-cards">
          {[
            { title: 'Matches', value: '20', change: '-10.74%', color: 'red' },
            { title: 'Wins', value: '8', change: '+10.74%', color: 'green' },
            { title: 'Loss', value: '12', change: '-11.84%', color: 'red' },
            { title: 'Revenue', value: '₹35,633', change: '+13.67%', color: 'green' },
          ].map((item, i) => (
            <div key={i} id='dashboardcard' className="stat-card neumorphic">
              <h4 className="gradient-text">{item.title}</h4>
              <p>{item.value}</p>
              <span className={item.color}>{item.change}</span>
            </div>
          ))}
        </div>

        <div className="mid-section">
        <NmdDashCard />
          <div className="projects-chart neumorphic">
            <div className="chart-header">
              <h4 className="gradient-text">Matches</h4>
              <div>
                {/* <button>📅 23 Nov 22</button> */}
                <button id='btn' className="neumorphic">View ⬇</button>
              </div>
            </div>

            {/* <div className="chart-placeholder">📈 Line Chart Placeholder</div> */}
            <div className="chart-container">
              <Line data={lineChartData} options={options} />
            </div>

          </div>

          <div className="calendar-events neumorphic">
            <div className="chart-header">
              <h4 className="gradient-text">Calendar and Events</h4>
              <div>
                {/* <button>📅 23 Nov 22</button> */}
              </div>
            </div>
            <ul className="events">
              <li><strong>Wed:</strong> Match vs Mumbai Fc <small>8 PM – 10 PM</small></li>
              <li>Practice <small>10:30 AM – 12 PM</small></li>
              <li>Discussion <small>4 PM – 5 PM</small></li>
            </ul>
          </div>
        </div>

        <div className="gantt-chart neumorphic">
          <div className="chart-header">
            <h4 className="gradient-text">Daily Progress</h4>
            <div><button id='btn' className="neumorphic">📅 1 Nov 22 – 28 Dec 22</button></div>
          </div>
          {/* <div className="chart-placeholder">📊 Gantt Chart Placeholder</div> */}
          <div className="chart-container">
            <Bar data={ganttData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NmdDashboard;
