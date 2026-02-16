import React from 'react';
import ClubSidebar from '../../components/ClubSidebar';
import NmdHeader from '../../components/NmdHeader';
import './Stats.css';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip,
  XAxis, YAxis, Cell, ResponsiveContainer
} from 'recharts';

const performanceData = [
  { month: 'Jan', wins: 0, losses: 0 },
  { month: 'Feb', wins: 0, losses: 0 },
  { month: 'Mar', wins: 0, losses: 0 },
  { month: 'Apr', wins: 0, losses: 0 },
];

const attendanceData = [
  { week: 'W1', attendance: 0 },
  { week: 'W2', attendance: 0 },
  { week: 'W3', attendance: 0 },
  { week: 'W4', attendance: 0 },
];

const fitnessData = [
  { name: 'Fit', value: 0 },
  { name: 'Injured', value: 0 },
  { name: 'Resting', value: 0 },
];

const topPlayers = [
  { name: 'Player A', goals: 0, assists: 0 },
  { name: 'Player B', goals: 0, assists: 0 },
  { name: 'Player C', goals: 0, assists: 0 },
];

const COLORS = ['#82ca9d', '#ff8080', '#ffd966'];

const StatsAnalytics = () => {
  return (
    <div className="dashboard-container">
      <ClubSidebar />
      <div className="main-content">
        <NmdHeader title='Stats & Analytics'/>

        <div className="stats-section">
          <h2>Club Stats & Analytics</h2>

          {/* Performance Chart */}
          <div className="stat-card">
            <h3>Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wins" fill="#82ca9d" />
                <Bar dataKey="losses" fill="#ff6565" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Player Leaderboard */}
          <div className="stat-card">
            <h3>Top Players</h3>
            <table className="leaderboard">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Goals</th>
                  <th>Assists</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.goals}</td>
                    <td>{player.assists}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Training Attendance */}
          <div className="stat-card">
            <h3>Weekly Training Attendance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Fitness Pie Chart */}
          <div className="stat-card">
            <h3>Player Health Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fitnessData}
                  dataKey="value"
                  outerRadius={80}
                  label
                >
                  {fitnessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsAnalytics;
