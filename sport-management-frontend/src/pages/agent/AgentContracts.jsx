import React from 'react';
import Sidebar from '../../components/AgentSidebar';
import Header from '../../components/NmdHeader';
import './AgentContracts.css';

const Contracts = () => {
  const contracts = [
    { id: 1, player: 'John Doe', club: 'Real Madrid', value: '$5M', duration: '2 Years', status: 'Active' },
    { id: 2, player: 'Alex Smith', club: 'Barcelona', value: '$3M', duration: '1 Year', status: 'Pending' },
    { id: 3, player: 'Michael Johnson', club: 'PSG', value: '$7M', duration: '3 Years', status: 'Expired' },
    { id: 4, player: 'David Brown', club: 'Manchester United', value: '$4.5M', duration: '2 Years', status: 'Active' },
  ];

  return (
    <div className="contracts-container">
      <Sidebar />
      <div className="contracts-main">
        <Header title="Player Contracts" />
        
        {/* Stats */}
        <div className="contracts-stats">
          <div className="contracts-card">
            <h3>Total Contracts</h3>
            <p>24</p>
          </div>
          <div className="contracts-card">
            <h3>Active</h3>
            <p>16</p>
          </div>
          <div className="contracts-card">
            <h3>Pending</h3>
            <p>5</p>
          </div>
          <div className="contracts-card">
            <h3>Expired</h3>
            <p>3</p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="contracts-filters">
          <input type="text" placeholder="Search by player name..." />
          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Expired</option>
          </select>
          <select>
            <option>Sort by Value</option>
            <option>High to Low</option>
            <option>Low to High</option>
          </select>
        </div>

        {/* Contracts Table */}
        <div className="contracts-table">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Club</th>
                <th>Value</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => (
                <tr key={c.id}>
                  <td>{c.player}</td>
                  <td>{c.club}</td>
                  <td>{c.value}</td>
                  <td>{c.duration}</td>
                  <td>{c.status}</td>
                  <td>
                    <button className="contracts-btn view">View</button>
                    <button className="contracts-btn edit">Edit</button>
                    <button className="contracts-btn delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* New Contract Form */}
        <div className="contracts-form">
          <h3>Add New Contract</h3>
          <form>
            <input type="text" placeholder="Player Name" />
            <input type="text" placeholder="Club Name" />
            <input type="text" placeholder="Contract Value" />
            <input type="text" placeholder="Duration" />
            <select>
              <option>Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Expired</option>
            </select>
            <button type="submit">Add Contract</button>
          </form>
        </div>

        {/* Notes & Attachments */}
        <div className="contracts-notes">
          <textarea placeholder="Add notes about the contract..."></textarea>
          <input type="file" />
        </div>
      </div>
    </div>
  );
};

export default Contracts;
