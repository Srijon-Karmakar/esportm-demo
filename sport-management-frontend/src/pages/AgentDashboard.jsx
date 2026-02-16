// src/pages/AgentDashboard.jsx

import React from 'react';
import AgentSidebar from '../components/AgentSidebar';
import NmdHeader from '../components/NmdHeader';
import './AgentDashboard.css';

const AgentDashboard = () => {
  return (
    <div className="agent-dashboard">
      <AgentSidebar />
      <div className="dashboard-main">
        <NmdHeader title='Agent Dashboard' />
        <div className="dashboard-content">
          <h2 className="dashboard-title">Agent Dashboard</h2>

          <div className="cards-grid">
            <div className="neumorphic-card">
              <h3>My Players</h3>
              <p>8 Players</p>
            </div>

            <div className="neumorphic-card">
              <h3>Offers Sent</h3>
              <p>15 Offers</p>
            </div>

            <div className="neumorphic-card">
              <h3>Clubs Contacted</h3>
              <p>10 Clubs</p>
            </div>

            <div className="neumorphic-card">
              <h3>Contracts Expiring</h3>
              <p>2 Players</p>
            </div>
          </div>

          {/* <div className="section">
            <h3 className="section-title">Recent Offers</h3>
            <div className="table-container neumorphic-card">
              <table>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Club</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Leo Martins</td>
                    <td>AC Milan</td>
                    <td>2025-07-24</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td>Ravi Kumar</td>
                    <td>Hyderabad FC</td>
                    <td>2025-07-23</td>
                    <td>Rejected</td>
                  </tr>
                  <tr>
                    <td>Akash Patel</td>
                    <td>Real Madrid</td>
                    <td>2025-07-21</td>
                    <td>Accepted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
