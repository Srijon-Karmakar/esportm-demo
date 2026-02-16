import React from 'react';
import Sidebar from '../../components/NutriSidebar';
import Header from '../../components/NmdHeader';
import './NutriAnalytics.css';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <Sidebar />
      <div className="analytics-main">
        <Header title="Analytics" />
        <div className="analytics-wrapper">

          {/* KPI Cards */}
          <div className="analytics-kpi-section">
            <div className="analytics-card">
              <h3>Total Matches</h3>
              <p>120</p>
            </div>
            <div className="analytics-card">
              <h3>Win Rate</h3>
              <p>68%</p>
            </div>
            <div className="analytics-card">
              <h3>Goals Scored</h3>
              <p>256</p>
            </div>
            <div className="analytics-card">
              <h3>Fouls</h3>
              <p>32</p>
            </div>
          </div>

          {/* Charts Placeholders */}
          <div className="analytics-charts">
            <div className="analytics-chart-card">[Win/Loss Chart]</div>
            <div className="analytics-chart-card">[Goals Chart]</div>
            <div className="analytics-chart-card">[Player Performance Chart]</div>
          </div>

          {/* Recent Activity */}
          <div className="analytics-activity">
            <h3>Recent Highlights</h3>
            <ul>
              <li>Player A scored a hat-trick</li>
              <li>Team X won by 4-1</li>
              <li>New training plan initiated</li>
            </ul>
          </div>

          {/* Reports Summary */}
          <div className="analytics-reports">
            <h3>Summary Reports</h3>
            <table>
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly Performance</td>
                  <td>Aug 2025</td>
                  <td>Generated</td>
                </tr>
                <tr>
                  <td>Player Attendance</td>
                  <td>Aug 2025</td>
                  <td>Generated</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Filters */}
          <div className="analytics-filters">
            <label>Filter by Month:</label>
            <select>
              <option>August 2025</option>
              <option>July 2025</option>
              <option>June 2025</option>
            </select>
            <label>Filter by Team:</label>
            <select>
              <option>All Teams</option>
              <option>Team A</option>
              <option>Team B</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
