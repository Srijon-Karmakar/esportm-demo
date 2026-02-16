import React from 'react';
import ClubSidebar from '../../components/ClubSidebar';
import NmdHeader from '../../components/NmdHeader';
import './HealthReport.css';
import {
  PieChart, Pie, BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#82ca9d', '#ff8042', '#ffc658'];

const healthSummary = [
  { name: 'Fit', value: 12 },
  { name: 'Injured', value: 5 },
  { name: 'Resting', value: 3 },
];

const injuryTrend = [
  { month: 'Jan', injuries: 2 },
  { month: 'Feb', injuries: 1 },
  { month: 'Mar', injuries: 3 },
  { month: 'Apr', injuries: 4 },
  { month: 'May', injuries: 0 },
];

const healthLogs = [
  { date: '2025-07-10', player: 'John Doe', status: 'Injured', note: 'Knee strain' },
  { date: '2025-07-08', player: 'Alex Smith', status: 'Fit', note: 'Cleared for training' },
  { date: '2025-07-05', player: 'Michael Johnson', status: 'Resting', note: 'Fatigue' },
];

const playersHealth = [
  { name: 'John Doe', age: 25, status: 'Injured', injury: 'Knee', recovery: '2 weeks' },
  { name: 'Alex Smith', age: 27, status: 'Fit', injury: '-', recovery: '-' },
  { name: 'Michael Johnson', age: 24, status: 'Resting', injury: 'Fatigue', recovery: '3 days' },
  { name: 'David Lee', age: 22, status: 'Fit', injury: '-', recovery: '-' },
  { name: 'Chris Paul', age: 26, status: 'Injured', injury: 'Ankle', recovery: '1 week' },
  { name: 'Tom Hardy', age: 28, status: 'Fit', injury: '-', recovery: '-' },
  { name: 'Max Ford', age: 29, status: 'Resting', injury: 'Muscle fatigue', recovery: '1 day' },
  { name: 'Leo White', age: 23, status: 'Injured', injury: 'Hamstring', recovery: '10 days' },
];

const HealthReport = () => {
  return (
    <div className="dashboard-container">
      <ClubSidebar />
      <div className="main-content">
        <NmdHeader title='Health Report' />
        <div className="health-page">
          <h2>Health & Medical Report</h2>

          {/* Summary Pie */}
          <div className="summary-chart">
            <h3>Overall Player Health</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={healthSummary} dataKey="value" outerRadius={80} label>
                  {healthSummary.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Injury Trend Bar */}
          <div className="trend-chart">
            <h3>Injury Trend (Last 5 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={injuryTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="injuries" fill="#ff6565" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Player-wise Table */}
          <div className="player-health-table">
            <h3>Player Health Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Injury</th>
                  <th>Recovery Time</th>
                </tr>
              </thead>
              <tbody>
                {playersHealth.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.age}</td>
                    <td>{player.status}</td>
                    <td>{player.injury}</td>
                    <td>{player.recovery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Logs */}
          <div className="health-logs">
            <h3>Recent Health Logs</h3>
            <ul>
              {healthLogs.map((log, index) => (
                <li key={index}>
                  <strong>{log.date}</strong> – <em>{log.player}</em> – {log.status} – <span>{log.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
