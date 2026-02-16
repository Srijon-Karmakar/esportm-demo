import React, { useState } from 'react';
import Sidebar from '../../components/NutriSidebar';
import Header from '../../components/NmdHeader';
import './Consults.css';

const Consultation = () => {
  const [appointments] = useState([
    { id: 1, name: 'John Doe', date: '2025-08-14', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, name: 'Jane Smith', date: '2025-08-14', time: '11:30 AM', status: 'Completed' },
    { id: 3, name: 'Mike Johnson', date: '2025-08-15', time: '02:00 PM', status: 'Upcoming' },
  ]);

  return (
    <div className="consult-container">
      <Sidebar />
      <div className="consult-main">
        <Header title="Consultations" />
        
        <div className="consult-wrapper">
          {/* Search + Filters */}
          <div className="consult-filters">
            <input type="text" placeholder="Search patient..." />
            <select>
              <option>All</option>
              <option>Upcoming</option>
              <option>Completed</option>
            </select>
            <button>Filter</button>
          </div>

          {/* Stats Section */}
          <div className="consult-stats">
            <div className="consult-card">Total Consultations: 45</div>
            <div className="consult-card">Upcoming: 10</div>
            <div className="consult-card">Completed: 35</div>
          </div>

          {/* Appointment List */}
          <table className="consult-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.name}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.status}</td>
                  <td>
                    <button className="consult-btn">View</button>
                    <button className="consult-btn">Reschedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Quick Actions */}
          <div className="consult-actions">
            <h3>Quick Actions</h3>
            <button>Add New Consultation</button>
            <button>Export Report</button>
          </div>

          {/* Notes Section */}
          <div className="consult-notes">
            <h3>Consultation Notes</h3>
            <textarea placeholder="Enter notes for consultation..."></textarea>
            <button>Save Notes</button>
          </div>

          {/* Feedback Section */}
          <div className="consult-feedback">
            <h3>Patient Feedback</h3>
            <ul>
              <li>John Doe: "Very helpful session"</li>
              <li>Jane Smith: "Diet plan was perfect"</li>
            </ul>
          </div>

          {/* Availability Section */}
          <div className="consult-availability">
            <h3>Set Availability</h3>
            <input type="date" />
            <input type="time" />
            <button>Save</button>
          </div>

          {/* Reminders */}
          <div className="consult-reminders">
            <h3>Reminders</h3>
            <input type="text" placeholder="Enter reminder..." />
            <button>Add Reminder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
