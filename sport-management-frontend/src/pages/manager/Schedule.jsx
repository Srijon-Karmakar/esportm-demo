import React, { useState } from 'react';
import NmdHeader from '../../components/NmdHeader';
import ManagerSidebar from '../../components/ManagerSidebar';
import './Schedule.css';

const dummySchedules = [
  {
    id: 1,
    opponent: 'Lions FC',
    date: '2025-07-18',
    time: '17:00',
    location: 'Main Stadium',
  },
  {
    id: 2,
    opponent: 'Tigers FC',
    date: '2025-07-20',
    time: '19:00',
    location: 'Main Stadium',
  },
];

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState(dummySchedules);
  const [filterDate, setFilterDate] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleFilter = (e) => setFilterDate(e.target.value);

  const handleEdit = (id) => setEditingId(id);

  const handleSave = (id, updatedMatch) => {
    setSchedules((prev) =>
      prev.map((match) => (match.id === id ? updatedMatch : match))
    );
    setEditingId(null);
  };

  return (
    <div className="schedule-page">
      <ManagerSidebar />
      <div className="schedule-main">
        <NmdHeader />
        <h1 className="gradient-title">Schedule Management</h1>

        {/* Filter Section */}
        <div className="filter-bar neumorphic">
          <label>Date Filter:</label>
          <input type="date" onChange={handleFilter} value={filterDate} />
        </div>

        {/* Schedule Cards */}
        <div className="schedule-list">
          {schedules
            .filter((s) => !filterDate || s.date === filterDate)
            .map((match) =>
              editingId === match.id ? (
                <EditableCard
                  key={match.id}
                  match={match}
                  onSave={handleSave}
                />
              ) : (
                <ScheduleCard key={match.id} match={match} onEdit={handleEdit} />
              )
            )}
        </div>

        {/* Placeholder Calendar View */}
        <div className="calendar-placeholder neumorphic">
          <h3>📅 Calendar View (Coming Soon)</h3>
        </div>

        {/* Placeholder Notifications */}
        <div className="notification-placeholder neumorphic">
          <h3>🔔 Reminders/Notifications (Coming Soon)</h3>
        </div>
      </div>
    </div>
  );
};

const ScheduleCard = ({ match, onEdit }) => (
  <div className="match-card neumorphic">
    <h3>Match vs. {match.opponent}</h3>
    <p>
      <strong>Date:</strong> {match.date}
    </p>
    <p>
      <strong>Time:</strong> {match.time}
    </p>
    <p>
      <strong>Location:</strong> {match.location}
    </p>
    <button className="edit-btn" onClick={() => onEdit(match.id)}>
      ✏️ Edit
    </button>
  </div>
);

const EditableCard = ({ match, onSave }) => {
  const [temp, setTemp] = useState({ ...match });

  return (
    <div className="match-card neumorphic editing">
      <input
        type="text"
        value={temp.opponent}
        onChange={(e) => setTemp({ ...temp, opponent: e.target.value })}
      />
      <input
        type="date"
        value={temp.date}
        onChange={(e) => setTemp({ ...temp, date: e.target.value })}
      />
      <input
        type="time"
        value={temp.time}
        onChange={(e) => setTemp({ ...temp, time: e.target.value })}
      />
      <input
        type="text"
        value={temp.location}
        onChange={(e) => setTemp({ ...temp, location: e.target.value })}
      />
      <button onClick={() => onSave(match.id, temp)}>💾 Save</button>
    </div>
  );
};

export default ScheduleManagement;
