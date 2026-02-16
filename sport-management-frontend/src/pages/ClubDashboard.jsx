import React from 'react';
import ClubSidebar from '../components/ClubSidebar';
import NmdHeader from '../components/NmdHeader';
import './ClubDashboard.css';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const ClubDashboard = () => {
  // Placeholder data
  const performanceData = [
    { name: 'Jan', wins: 0, losses: 0 },
    { name: 'Feb', wins: 0, losses: 0 },
    { name: 'Mar', wins: 0, losses: 0 },
    { name: 'Apr', wins: 0, losses: 0 },
  ];

  const playerDistribution = [
    { name: 'Forwards', value: 0 },
    { name: 'Midfielders', value: 0 },
    { name: 'Defenders', value: 0 },
    { name: 'Goalkeepers', value: 0 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  const upcomingMatches = [
    { date: '2025-07-15', opponent: 'Team Alpha', status: 'Scheduled' },
    { date: '2025-07-22', opponent: 'Team Beta', status: 'Scheduled' },
  ];

  return (
    <div className="dashboard-container">
      <ClubSidebar />
      <div className="main-content">
        <NmdHeader title='Club Dashboard'/>

        {/* Club Summary */}
        <div className="summary-section">
          <div className="summary-card">Total Players<br /><strong>0</strong></div>
          <div className="summary-card">Matches Played<br /><strong>0</strong></div>
          <div className="summary-card">Wins<br /><strong>0</strong></div>
          <div className="summary-card">Offers Sent<br /><strong>0</strong></div>
        </div>

        {/* Charts Row */}
        <div className="charts-section">
          <div className="chart-card">
            <h3>Performance (Wins/Losses)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wins" fill="#82ca9d" />
                <Bar dataKey="losses" fill="#ff6565" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Player Role Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={playerDistribution} dataKey="value" outerRadius={80} label>
                  {playerDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Match Status */}
        <div className="match-status-section">
          <h3>Upcoming Matches</h3>
          <ul className="match-list">
            {upcomingMatches.map((match, index) => (
              <li key={index}>
                <strong>{match.opponent}</strong> - {match.date} - <span>{match.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Application Summary */}
        <div className="application-summary">
          <h3>Applications</h3>
          <div className="summary-card">Pending<br /><strong>0</strong></div>
          <div className="summary-card">Accepted<br /><strong>0</strong></div>
          <div className="summary-card">Rejected<br /><strong>0</strong></div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;
