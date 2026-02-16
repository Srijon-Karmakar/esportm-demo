import React, { useState } from 'react';
import { Sun, Moon, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AiScheduleEngine.css';
import { motion } from 'framer-motion';
import Orb from './orbAi';

// orb

// orb 

const AiScheduleEngine = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [teams, setTeams] = useState('Team A, Team B, Team C, Team D');
  const [venues, setVenues] = useState('Stadium 1, Stadium 2');
  const [startDate, setStartDate] = useState('2025-07-01');
  const [schedule, setSchedule] = useState([]);

  const generateSchedule = () => {
    const teamList = teams.split(',').map(t => t.trim());
    const venueList = venues.split(',').map(v => v.trim());
    const matches = [];

    for (let i = 0; i < teamList.length; i++) {
      for (let j = i + 1; j < teamList.length; j++) {
        matches.push([teamList[i], teamList[j]]);
      }
    }

    const start = new Date(startDate);
    const generated = matches.map((match, index) => {
      const date = new Date(start);
      date.setDate(date.getDate() + index);
      return {
        team1: match[0],
        team2: match[1],
        venue: venueList[index % venueList.length],
        date: date.toISOString().split('T')[0],
        time: '17:00',
      };
    });

    setSchedule(generated);
  };

  return (
    <div className={`schedule-engine ${theme}`}>
        



      <header className="engine-header">
        <h1 id='logo' ><span>SPORTBIT</span><br />
            AI Schedule Engine</h1>
            {/* orb */}
        {/* Orb Background Layer */}
      <div className="orb-bg-layer">
        <Orb hue={theme === 'dark' ? 260 : 0}  hoverIntensity={4} />
      </div>

        <div className="engine-controls">
          <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
          <button onClick={() => navigate('/')}><Home /></button>
        </div>
      </header>

      <main className="engine-main">
        <motion.section className="engine-form"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <h2>Generate Match Schedule</h2>
          <textarea
            value={teams}
            onChange={e => setTeams(e.target.value)}
            placeholder="Enter team names, comma separated"
          />
          <input
            type="text"
            value={venues}
            onChange={e => setVenues(e.target.value)}
            placeholder="Enter venues, comma separated"
          />
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <motion.button whileHover={{ scale: 1.05 }} onClick={generateSchedule}>
            Generate Schedule
          </motion.button>
        </motion.section>

        <motion.section className="engine-output"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>📅 Generated Schedule</h3>
          {schedule.length === 0 ? (
            <p>No schedule generated yet.</p>
          ) : (
            <div className="schedule-list">
              {schedule.map((match, idx) => (
                <motion.div
                  className="schedule-card"
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>{match.team1} vs {match.team2}</h4>
                  <p>📍 {match.venue}</p>
                  <p>📆 {match.date} — 🕔 {match.time}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default AiScheduleEngine;
