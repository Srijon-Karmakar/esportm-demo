import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import ClubSidebar from '../../components/ClubSidebar';
import NmdHeader from '../../components/NmdHeader';
import './MatchSchedule.css';

Modal.setAppElement('#root'); // required for accessibility

const MatchSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [matchData, setMatchData] = useState([
    { date: new Date(2025, 6, 15), opponent: 'Team Alpha', time: '5:00 PM' },
    { date: new Date(2025, 6, 22), opponent: 'Team Beta', time: '6:30 PM' },
  ]);

  const matchesOnSelectedDate = matchData.filter(
    (match) => match.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="dashboard-container">
      <ClubSidebar />
      <div className="main-content">
        <NmdHeader title='Match schedule' />

        <div className="match-schedule-header">
          <h2>Match Schedule</h2>
          <button className="schedule-button" onClick={() => setModalOpen(true)}>
            + Set Match
          </button>
        </div>

        <div className="calendar-section">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) =>
              matchData.some((match) => match.date.toDateString() === date.toDateString())
                ? 'match-day'
                : null
            }
          />
        </div>

        <div className="match-info">
          <h3>Matches on {selectedDate.toDateString()}:</h3>
          {matchesOnSelectedDate.length > 0 ? (
            <ul>
              {matchesOnSelectedDate.map((match, i) => (
                <li key={i}>
                  🏟️ <strong>{match.opponent}</strong> at <em>{match.time}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matches scheduled for this day.</p>
          )}
        </div>

        {/* Modal for adding/editing matches */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2>Set Match Schedule</h2>
          <p>This feature will allow setting matches. (Coming soon!)</p>
          <button className="close-button" onClick={() => setModalOpen(false)}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default MatchSchedule;
