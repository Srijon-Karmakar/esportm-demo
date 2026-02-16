import React from 'react';
import Header from '../../components/NmdHeader';
import Sidebar from '../../components/PitchSidebar';
import './Ground.css';

const GroundAvailability = () => {
  return (
    <div className="ground-container">
      <Sidebar />
      <div className="ground-main">
        <Header />
        <div className="ground-wrapper">
          <h2>Ground Availability</h2>

          {/* Filters */}
          <div className="ground-filters">
            <select className="ground-select">
              <option value="">Select Ground</option>
              <option value="Ground 1">Ground 1</option>
              <option value="Ground 2">Ground 2</option>
              <option value="Ground 3">Ground 3</option>
            </select>
            <input type="date" className="ground-input" />
            <button className="ground-btn">Check Availability</button>
          </div>

          {/* Availability Cards */}
          <div className="ground-availability-cards">
            {[...Array(12)].map((_, index) => (
              <div className="ground-card" key={index}>
                <h4>Ground {index + 1}</h4>
                <p>Status: {index % 3 === 0 ? 'Maintenance' : index % 2 === 0 ? 'Available' : 'Booked'}</p>
                <p>Time Slot: {index % 2 === 0 ? '6am - 10am' : '2pm - 6pm'}</p>
                <button className="ground-btn small">Book Now</button>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="ground-legend">
            <span className="legend available">Available</span>
            <span className="legend booked">Booked</span>
            <span className="legend maintenance">Maintenance</span>
          </div>

          {/* Schedule Table */}
          <div className="ground-table-section">
            <h3>Full Ground Schedule</h3>
            <table className="ground-table">
              <thead>
                <tr>
                  <th>Ground</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th>Status</th>
                  <th>Booked By</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td>Ground {i + 1}</td>
                    <td>2025-08-{10 + i}</td>
                    <td>{i % 2 === 0 ? 'Morning' : 'Evening'}</td>
                    <td>{i % 3 === 0 ? 'Maintenance' : i % 2 === 0 ? 'Available' : 'Booked'}</td>
                    <td>{i % 2 === 0 ? '-' : 'User A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="ground-actions">
            <button className="ground-btn">Export Availability</button>
            <button className="ground-btn">Add Block Slot</button>
            <button className="ground-btn">Download as PDF</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GroundAvailability;
