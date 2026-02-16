import React from 'react';
import Header from '../../components/NmdHeader';
import Sidebar from '../../components/CoachSidebar';
import './analytics.css';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <Sidebar />
      <div className="analytics-main">
        <Header title='Coach Aalytics' />
        <div className="analytics-wrapper">
          <h2>Analytics Dashboard</h2>

          {/* Filters */}
          <div className="analytics-filters">
            <input type="date" className="analytics-input" />
            <input type="date" className="analytics-input" />
            <select className="analytics-select">
              <option>All Teams</option>
              <option>Team A</option>
              <option>Team B</option>
              <option>Team C</option>
            </select>
            <select className="analytics-select">
              <option>Metric Type</option>
              <option>Performance</option>
              <option>Attendance</option>
              <option>Revenue</option>
            </select>
            <button className="analytics-btn">Apply Filters</button>
          </div>

          {/* KPI Cards */}
          <div className="analytics-kpis">
            <div className="kpi-card">
              <h3>Total Matches</h3>
              <p>56</p>
            </div>
            <div className="kpi-card">
              <h3>Avg. Attendance</h3>
              <p>12,350</p>
            </div>
            <div className="kpi-card">
              <h3>Total Revenue</h3>
              <p>$124,500</p>
            </div>
            <div className="kpi-card">
              <h3>Win Rate</h3>
              <p>68%</p>
            </div>
          </div>

          {/* Charts */}
          <div className="analytics-charts">
            <div className="chart-card">
              <h4>Performance Trend</h4>
              <img src="https://via.placeholder.com/400x200?text=Line+Chart" alt="chart" />
            </div>
            <div className="chart-card">
              <h4>Attendance Breakdown</h4>
              <img src="https://via.placeholder.com/400x200?text=Pie+Chart" alt="chart" />
            </div>
            <div className="chart-card">
              <h4>Revenue by Month</h4>
              <img src="https://via.placeholder.com/400x200?text=Bar+Chart" alt="chart" />
            </div>
          </div>

          {/* Analytics Table */}
          <div className="analytics-table-section">
            <h3>Top Performing Players</h3>
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Matches</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td>Player {String.fromCharCode(65 + i)}</td>
                    <td>{15 + i}</td>
                    <td>{5 + i}</td>
                    <td>{2 + i}</td>
                    <td>{(7 + i * 0.1).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes Section */}
          <div className="analytics-notes">
            <h3>Analyst Notes</h3>
            <textarea placeholder="Write your observations here..." />
            <button className="analytics-btn">Save Notes</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
