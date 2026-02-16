import React, { useState } from 'react';
import Sidebar from '../../components/PitchSidebar';
import Header from '../../components/NmdHeader';
import './Maintanance.css';

const Maintenance = () => {
  const [requests, setRequests] = useState([
    { id: 1, ground: 'Pitch A', date: '2025-08-05', status: 'Pending', staff: 'John' },
    { id: 2, ground: 'Pitch B', date: '2025-08-06', status: 'In Progress', staff: 'Mike' },
    { id: 3, ground: 'Pitch C', date: '2025-08-07', status: 'Completed', staff: 'Anna' },
  ]);

  return (
    <div className="maint-container">
      <Sidebar />
      <div className="maint-main">
        <Header />
        <div className="maint-wrapper">

          {/* Quick Stats */}
          <div className="maint-stats-row">
            {['Pending', 'In Progress', 'Completed'].map((status, idx) => (
              <div key={idx} className="maint-card stat-card">
                <h3>{status}</h3>
                <p>{Math.floor(Math.random() * 10 + 1)}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="maint-card maint-form-section">
            <h2>Create Maintenance Request</h2>
            <form className="maint-form-grid">
              <input type="text" className="maint-input" placeholder="Ground Name" />
              <input type="date" className="maint-input" />
              <select className="maint-input">
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              <select className="maint-input">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <select className="maint-input">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select className="maint-input">
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Ground</option>
              </select>
              <input type="file" className="maint-input" />
              <select className="maint-input">
                <option>John</option>
                <option>Mike</option>
                <option>Anna</option>
              </select>
              <textarea className="maint-input textarea" placeholder="Issue Description"></textarea>
              <button type="submit" className="maint-btn full-width">Submit</button>
            </form>
          </div>

          {/* Maintenance Logs */}
          <div className="maint-card maint-logs">
            <div className="maint-logs-header">
              <h3>Maintenance Logs</h3>
              <div className="maint-log-filters">
                <input type="text" className="maint-input small" placeholder="Search..." />
                <select className="maint-input small">
                  <option>All Grounds</option>
                  <option>Pitch A</option>
                  <option>Pitch B</option>
                </select>
                <button className="maint-btn small">Filter</button>
              </div>
            </div>
            <table className="maint-table">
              <thead>
                <tr>
                  <th>Ground</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Staff</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.ground}</td>
                    <td>{req.date}</td>
                    <td>{req.status}</td>
                    <td>{req.staff}</td>
                    <td>
                      <button className="maint-btn extra-small">Complete</button>
                      <button className="maint-btn extra-small">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calendar Section */}
          <div className="maint-card maint-calendar">
            <h3>Maintenance Calendar</h3>
            <div className="calendar-placeholder">[ Calendar Component Placeholder ]</div>
          </div>

          {/* Timeline */}
          <div className="maint-card maint-timeline">
            <h3>Upcoming Tasks</h3>
            <ul>
              <li>Pitch A - 2025-08-08 - Plumbing</li>
              <li>Pitch B - 2025-08-09 - Electrical</li>
              <li>Pitch C - 2025-08-10 - Turf Repair</li>
            </ul>
          </div>

          {/* Notifications */}
          <div className="maint-card maint-notifications">
            <h3>Recent Notifications</h3>
            <p>No major alerts</p>
          </div>

          {/* Charts (Placeholder) */}
          <div className="maint-card maint-charts">
            <h3>Maintenance Stats</h3>
            <div className="chart-placeholder">[ Chart Placeholder ]</div>
          </div>

          {/* Export Options */}
          <div className="maint-export-row">
            <button className="maint-btn full-width">Export PDF</button>
            <button className="maint-btn full-width">Download Excel</button>
            <button className="maint-btn full-width">+ Add New</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Maintenance;
