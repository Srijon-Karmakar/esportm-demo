import React from 'react';
import Header from '../../components/NmdHeader';
import Sidebar from '../../components/PitchSidebar';
import './Bookings.css';

const Bookings = () => {
  return (
    <div className="bookings-container">
      <Sidebar />
      <div className="bookings-main">
        <Header />
        <div className="bookings-wrapper">

          {/* Stats */}
          <div className="bookings-card bookings-stats">
            {['Today', 'This Week', 'This Month', 'Total'].map((label, index) => (
              <div className="bookings-stat-box" key={index}>
                <h3>{label} Bookings</h3>
                <p>{Math.floor(Math.random() * 50 + 10)}</p>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="bookings-card">
            <h2>Create New Booking</h2>
            <form className="bookings-form-grid">
              <input className="bookings-input" placeholder="Customer Name" />
              <input className="bookings-input" placeholder="Contact Number" />
              <input className="bookings-input" type="date" />
              <input className="bookings-input" type="time" />
              <select className="bookings-select">
                <option>Pitch A</option>
                <option>Pitch B</option>
                <option>Pitch C</option>
              </select>
              <select className="bookings-select">
                <option>60 Minutes</option>
                <option>90 Minutes</option>
                <option>120 Minutes</option>
              </select>
              <select className="bookings-select">
                <option>Paid</option>
                <option>Unpaid</option>
              </select>
              <input className="bookings-input" type="number" placeholder="Amount Paid" />
              <textarea className="bookings-textarea" placeholder="Notes / Special Requests"></textarea>
              <button type="submit" className="bookings-btn full-width">Submit Booking</button>
            </form>
          </div>

          {/* Bookings Table */}
          <div className="bookings-card">
            <div className="bookings-table-header">
              <h3>All Bookings</h3>
              <div className="bookings-controls">
                <input className="bookings-input small" placeholder="Search..." />
                <select className="bookings-select small">
                  <option>All Pitches</option>
                  <option>Pitch A</option>
                  <option>Pitch B</option>
                </select>
                <button className="bookings-btn small">Filter</button>
              </div>
            </div>
            <div className="bookings-table-wrapper">
              <table className="bookings-data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Pitch</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td>User {i + 1}</td>
                      <td>Pitch {String.fromCharCode(65 + i)}</td>
                      <td>2025-08-0{i + 1}</td>
                      <td>{9 + i}:00</td>
                      <td>{i % 2 === 0 ? 'Paid' : 'Unpaid'}</td>
                      <td>₹{1000 + i * 100}</td>
                      <td>
                        <button className="bookings-btn extra-small">Edit</button>
                        <button className="bookings-btn extra-small">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Schedule Preview */}
          <div className="bookings-card">
            <h3>Booking Schedule Overview</h3>
            <div className="bookings-schedule-placeholder">
              [Calendar or Schedule Chart Placeholder]
            </div>
          </div>

          {/* Export & Actions */}
          <div className="bookings-card bookings-export-row">
            <button className="bookings-btn full-width">Export Bookings</button>
            <button className="bookings-btn full-width">Print Schedule</button>
            <button className="bookings-btn full-width">+ Quick Booking</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Bookings;
