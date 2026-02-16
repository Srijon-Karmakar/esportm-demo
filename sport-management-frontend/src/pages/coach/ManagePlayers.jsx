import React from 'react';
import Header from '../../components/NmdHeader';
import Sidebar from '../../components/CoachSidebar';
import './ManagePlayers.css';

const ManagePlayers = () => {
  return (
    <div className="players-container">
      <Sidebar />
      <div className="players-main">
        <Header />
        <div className="players-wrapper">
          <h2>Manage Players</h2>

          {/* Filters */}
          <div className="players-filters">
            <input type="text" placeholder="Search Player..." className="players-input" />
            <select className="players-select">
              <option value="">Select Position</option>
              <option>Forward</option>
              <option>Midfielder</option>
              <option>Defender</option>
              <option>Goalkeeper</option>
            </select>
            <select className="players-select">
              <option value="">Status</option>
              <option>Active</option>
              <option>Injured</option>
              <option>Suspended</option>
            </select>
            <button className="players-btn">Search</button>
          </div>

          {/* Players Grid */}
          <div className="players-grid">
            {[...Array(8)].map((_, idx) => (
              <div className="player-card" key={idx}>
                <img src={`https://via.placeholder.com/150?text=Player+${idx+1}`} alt="player" />
                <h4>Player {String.fromCharCode(65 + idx)}</h4>
                <p><strong>Position:</strong> {['Forward', 'Midfielder', 'Defender', 'Goalkeeper'][idx % 4]}</p>
                <p><strong>Status:</strong> {idx % 2 === 0 ? 'Active' : 'Injured'}</p>
                <div className="player-actions">
                  <button className="players-btn small">View</button>
                  <button className="players-btn small">Edit</button>
                  <button className="players-btn small danger">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Player */}
          <div className="players-form">
            <h3>Add New Player</h3>
            <input type="text" placeholder="Full Name" className="players-input" />
            <input type="number" placeholder="Age" className="players-input" />
            <select className="players-select">
              <option>Select Position</option>
              <option>Forward</option>
              <option>Midfielder</option>
              <option>Defender</option>
              <option>Goalkeeper</option>
            </select>
            <input type="text" placeholder="Nationality" className="players-input" />
            <select className="players-select">
              <option>Status</option>
              <option>Active</option>
              <option>Injured</option>
              <option>Suspended</option>
            </select>
            <textarea placeholder="Additional Notes" className="players-textarea"></textarea>
            <button className="players-btn">Add Player</button>
          </div>

          {/* Players Table */}
          <div className="players-table-section">
            <h3>Players List</h3>
            <table className="players-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Nationality</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td>Player {String.fromCharCode(65 + i)}</td>
                    <td>{18 + i}</td>
                    <td>{['Forward', 'Midfielder', 'Defender', 'Goalkeeper'][i % 4]}</td>
                    <td>{i % 2 === 0 ? 'Active' : 'Injured'}</td>
                    <td>Country {i+1}</td>
                    <td>
                      <button className="players-btn small">Edit</button>
                      <button className="players-btn small danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManagePlayers;
