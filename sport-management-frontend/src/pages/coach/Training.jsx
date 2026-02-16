import React from 'react';
import Header from '../../components/NmdHeader';
import Sidebar from '../../components/CoachSidebar';
import './Training.css';

const TrainingPlan = () => {
  return (
    <div className="training-container">
      <Sidebar />
      <div className="training-main">
        <Header />
        <div className="training-wrapper">
          <h2>Training Plans</h2>

          {/* Filters */}
          <div className="training-filters">
            <select className="training-select">
              <option value="">Select Player</option>
              <option>Player A</option>
              <option>Player B</option>
              <option>Player C</option>
            </select>
            <select className="training-select">
              <option value="">Select Category</option>
              <option>Strength</option>
              <option>Speed</option>
              <option>Endurance</option>
              <option>Flexibility</option>
            </select>
            <input type="date" className="training-input" />
            <button className="training-btn">Filter</button>
          </div>

          {/* Plan Cards */}
          <div className="training-cards">
            {[...Array(8)].map((_, idx) => (
              <div className="training-card" key={idx}>
                <h4>Plan {idx + 1}</h4>
                <p><strong>Player:</strong> Player {String.fromCharCode(65 + idx)}</p>
                <p><strong>Category:</strong> {['Strength', 'Speed', 'Endurance'][idx % 3]}</p>
                <p><strong>Time:</strong> {idx + 6}:00 AM</p>
                <p><strong>Duration:</strong> 1 hr</p>
                <p><strong>Status:</strong> {idx % 2 === 0 ? 'Scheduled' : 'Completed'}</p>
                <button className="training-btn small">View</button>
              </div>
            ))}
          </div>

          {/* Add New Plan */}
          <div className="training-form">
            <h3>Create New Training Plan</h3>
            <input type="text" placeholder="Player Name" className="training-input" />
            <select className="training-select">
              <option>Select Category</option>
              <option>Strength</option>
              <option>Speed</option>
              <option>Endurance</option>
              <option>Agility</option>
            </select>
            <input type="time" className="training-input" />
            <input type="number" placeholder="Duration (minutes)" className="training-input" />
            <textarea placeholder="Plan Description" className="training-textarea"></textarea>
            <button className="training-btn">Add Plan</button>
          </div>

          {/* Summary Table */}
          <div className="training-table-section">
            <h3>All Training Sessions</h3>
            <table className="training-table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td>Player {String.fromCharCode(65 + i)}</td>
                    <td>{['Strength', 'Speed', 'Endurance'][i % 3]}</td>
                    <td>2025-08-{i + 10}</td>
                    <td>{i + 6}:00 AM</td>
                    <td>{i % 2 === 0 ? 'Scheduled' : 'Completed'}</td>
                    <td>{i % 2 === 0 ? '-' : 'Good progress'}</td>
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

export default TrainingPlan;
