import React from 'react';
import Header from '../../components/NmdHeader';
import Sidebar from '../../components/PitchSidebar';
import './Reports.css';

const Reports = () => {
  return (
    <div className="reports-container">
      <Sidebar />
      <div className="reports-main">
        <Header />
        <div className="reports-wrapper">

          {/* Overview Cards */}
          <div className="reports-overview">
            {['Total Bookings', 'Revenue Generated', 'Maintenance Requests', 'Active Users'].map((label, index) => (
              <div className="reports-card stat" key={index}>
                <h4>{label}</h4>
                <p>
                  {label === 'Revenue Generated' ? `₹${Math.floor(Math.random() * 90000 + 10000)}` : Math.floor(Math.random() * 200 + 50)}
                </p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="reports-card filter-section">
            <h3>Filter Reports</h3>
            <div className="filters">
              <input className="reports-input" type="date" />
              <input className="reports-input" type="date" />
              <select className="reports-select">
                <option>All Grounds</option>
                <option>Pitch A</option>
                <option>Pitch B</option>
                <option>Pitch C</option>
              </select>
              <select className="reports-select">
                <option>All Categories</option>
                <option>Bookings</option>
                <option>Maintenance</option>
                <option>Users</option>
              </select>
              <button className="reports-btn">Apply Filter</button>
            </div>
          </div>

          {/* Detailed Report Cards */}
          <div className="reports-cards-grid">
            {[...Array(6)].map((_, i) => (
              <div className="reports-card detailed" key={i}>
                <h4>Report #{i + 1}</h4>
                <p>Category: {['Bookings', 'Maintenance', 'Revenue'][i % 3]}</p>
                <p>Generated on: 2025-08-0{i + 1}</p>
                <p>Summary: Placeholder summary of the report content...</p>
                <button className="reports-btn small">View</button>
              </div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="reports-card chart-section">
            <h3>Analytics Overview</h3>
            <div className="chart-placeholder">
              [Charts will be rendered here – Pie, Bar, Line, etc.]
            </div>
          </div>

          {/* Export Options */}
          <div className="reports-export">
            <button className="reports-btn full-width">Download PDF</button>
            <button className="reports-btn full-width">Export CSV</button>
            <button className="reports-btn full-width">Email Reports</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Reports;
