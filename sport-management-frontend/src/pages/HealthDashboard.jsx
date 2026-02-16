import React from 'react';
import './HealthDashboard.css';
import playerImage from '../assets/images/Hazard.png';
// import logo from '../assets/logo.png';
// import logo from '../assets/sportbit_dot_white.json';
import Lottie from 'lottie-react';
// import heartIcon from '../assets/images/heart-icon.png';
// import sleepIcon from '../assets/images/sleeptime-icon.png';
// import hydrationIcon from '../assets/images/hydration.png';
// import caloryIcon from '../assets/images/kcal-icon.png';
// import injuryIcon from '../assets/images/injury-icon.png';
// import NmdHeader from '../components/NmdHeader';
// import NmdDashCard from '../components/NmdDashCard';

import {
  Bar,
  Pie,
  Line,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

// useEffect(() => {
//   document.title = 'Dashboard | SportBit';
// }, []);


const HealthDashboard = () => {
  const metrics = [
    { label: "Heart Rate", value: "72 bpm", icon: heartIcon },
    { label: "Sleep", value: "7.5 hrs", icon: sleepIcon },
    { label: "Hydration", value: "1.8 L", icon: hydrationIcon },
    { label: "Calories Burned", value: "560 kcal", icon: caloryIcon },
    { label: "Injury Status", value: "Healthy", icon: injuryIcon },
  ];

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [500, 700, 450, 600, 550],
        backgroundColor: '#f48c06',
      },
      {
        label: 'Calories Intake',
        data: [800, 750, 900, 850, 780],
        backgroundColor: '#6a994e',
      },
    ],
  };

  const pieData = {
    labels: ['Deep Sleep', 'Light Sleep', 'REM'],
    datasets: [
      {
        data: [3, 4, 1.5],
        backgroundColor: ['#4361ee', '#4cc9f0', '#b5179e'],
        hoverOffset: 8,
      },
    ],
  };

  const lineData = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [70, 72, 75, 71, 73],
        fill: false,
        borderColor: '#ef476f',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="health-page">
      
      {/* Optional Sidebar can go here */}
      
      {/* <div className="logo">
        <div style={{ width: 160, height: 150 }}>
          <Lottie animationData={logo} loop={true} />
        </div>
      </div> */}

      <div className="health-container">
      <NmdHeader title='Sportbit Health'/>
        <header className="health-header neumorphic">
          {/* <div className="player-details">
            <img src={playerImage} alt="Player" className="player-image" />
            <div>
              <h2>Hazard Jr.</h2>
              <p>Midfielder | Age: 26</p>
            </div>
          </div> */}
          <p>Monitor Your health with AI powered Health Corner</p>
        </header>

        <h3 className="section-title">Player Health Overview</h3>

        <div className="metric-grid">
          {metrics.map((metric, index) => (
            <div className="metric-card neumorphic" key={index}>
              <div className="metric-icon">
              <img src={metric.icon} alt={metric.label} />
              </div>
              <h4>{metric.label}</h4>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>

        <h3 className="section-title">Weekly Summary</h3>

        <div className="chart-section">
          <NmdDashCard/>
          <div className="chart-card neumorphic">
            <h4>Calories Burned vs Intake</h4>
            <Bar data={barData} />
          </div>

          <div className="chart-card neumorphic">
            <h4>Sleep Breakdown</h4>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="chart-card neumorphic">
          <h4>Live Heart Rate</h4>
          <Line data={lineData} />
        </div>

        <div className="status-banner neumorphic">
          <p>✅ Player is in good health. No injuries detected.</p>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;