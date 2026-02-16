// src/pages/StatsPage.jsx
import React from 'react';
import NmdSidebar2 from '../components/NmdSidebar2';
import './NmdPlayerStats.css';
// import { FaHome, FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NmdDashCard from '../components/NmdDashCard';
import NmdHeader from '../components/NmdHeader';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const NmdPlayerStats = () => {
  const navigate = useNavigate();

    // Bar Chart Data
    const fanData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'New Fans',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(111, 43, 211, 0.5)',
          borderColor: 'rgba(111, 43, 211, 1)',
          borderWidth: 1,
        }
      ]
    };


     // Doughnut Chart Data
  const incomeData = {
    labels: ['Ads', 'Rewards', 'Base Pay'],
    datasets: [
      {
        data: [26.35, 32.58, 41.10],
        backgroundColor: [
          'rgba(255, 159, 64, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(0, 0, 0, 0.8)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  // Chart options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };



  return (
    <div className="stats-page-wrapper">
      <NmdSidebar2 />
      <div className="stats-main">
        <NmdHeader className='neumoheader' title='Statistics'/>
        

        <div className="overall-cards">
          {[
            { title: 'Fans Data', icon: '👤', value: '2387' },
            { title: 'Income', icon: '💼', value: '$673' },
            { title: 'Works', icon: '📁', value: '156' },
            { title: 'Message', icon: '💬', value: '382' },
          ].map((item, i) => (
            <div key={i} className="overall-card neumorphic">
              <span className="icon">{item.icon}</span>
              <div className="label">{item.title}</div>
              <div className="value">{item.value} ↑</div>
            </div>
          ))}
        </div>

        <div className="charts-section">
          <div className="fan-chart neumorphic">
            <div className="chart-header">
              <span> Fan Increase</span>
              <div className="filters">
                <button>Last 7 Days ⬇️</button>
              </div>
            </div>
            {/* <div className="bar-chart-placeholder">[Bar Chart Placeholder]</div> */}
            <div className="chart-container">
              <Bar data={fanData} options={barOptions} />
            </div>
          </div>
          <NmdDashCard />

          <div className="income-chart neumorphic">
            <div className="chart-header">
              <span>💰 Income</span>
              <div className="filters">
                <button>All Time ⬇️</button>
              </div>
            </div>
            {/* <div className="circle-chart">
              <div className="circle"> $12358 <br /><small>Income</small></div>
              <div className="legends">
                <p>🟠 Ads: 26.35%</p>
                <p>🟣 Rewards: 32.58%</p>
                <p>⚫ Base Pay: 41.10%</p> */}

<div className="chart-container">
              <Doughnut data={incomeData} options={doughnutOptions} />
              <div className="legends">
                <p>🟠 Ads: 26.35%</p>
                <p>🟣 Rewards: 32.58%</p>
                <p>⚫ Base Pay: 41.10%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="table-section neumorphic">
          <div className="table-header">
            <span>📋 Overview of Works</span>
            <button>Last 7 Days ⬇️</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Serial Num</th>
                <th>Name of Works</th>
                <th>Upload Time</th>
                <th>Browsing</th>
                <th>Collection</th>
                <th>Likes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Simple Music Player</td>
                <td>2020-02-12 15:26:32</td>
                <td>12,890</td>
                <td>2906</td>
                <td>2892</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NmdPlayerStats;
