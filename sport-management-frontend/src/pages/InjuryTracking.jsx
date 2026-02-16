import React, { useState } from 'react';
import './InjuryTracking.css';
import { Sun, Moon, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const InjuryTracking = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [injuries, setInjuries] = useState([]);
  const [filter, setFilter] = useState('All');

  const [form, setForm] = useState({
    player: '',
    type: '',
    severity: 'Mild',
    date: '',
    description: '',
  });

  const addInjury = () => {
    if (!form.player || !form.type || !form.date) return alert('Please fill all required fields.');
    setInjuries([...injuries, form]);
    setForm({ player: '', type: '', severity: 'Mild', date: '', description: '' });
  };

  const filteredInjuries =
    filter === 'All' ? injuries : injuries.filter(i => i.severity === filter);

  return (
    <div className={`injury-tracker ${theme}`}>
      <header className="tracker-header">
      <div className="header-left">
        <h1>
          <span>SPORTBIT</span><br />Injury Tracking System
        </h1>
        </div>
        <div className="tracker-controls">
          <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
          <button onClick={() => navigate('/')}><Home /></button>
        </div>
      </header>

      <main className="tracker-main">
        <motion.section className="tracker-form"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h2>Log Player Injury</h2>
          <input
            type="text"
            placeholder="Player Name"
            value={form.player}
            onChange={e => setForm({ ...form, player: e.target.value })}
          />
          <input
            type="text"
            placeholder="Injury Type (e.g., ACL, Hamstring)"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          />
          <select
            value={form.severity}
            onChange={e => setForm({ ...form, severity: e.target.value })}
          >
            {['Mild', 'Moderate', 'Severe'].map(level => (
              <option key={level}>{level}</option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
          <textarea
            placeholder="Description / Notes"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <motion.button whileHover={{ scale: 1.05 }} onClick={addInjury}>
            Add Injury
          </motion.button>
        </motion.section>

        <motion.section className="injury-output"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>Injury Feed</h3>
          <div className="filter-row">
            <label>Filter by Severity:</label>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              {['All', 'Mild', 'Moderate', 'Severe'].map(level => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </div>
          <div className="injury-list">
            {filteredInjuries.length === 0 ? (
              <p>No injuries logged.</p>
            ) : (
              filteredInjuries.map((injury, idx) => (
                <motion.div
                  className={`injury-card ${injury.severity.toLowerCase()}`}
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>{injury.player}</h4>
                  <p><strong>🦴 Type:</strong> {injury.type}</p>
                  <p><strong>⚠️ Severity:</strong> {injury.severity}</p>
                  <p><strong>📆 Date:</strong> {injury.date}</p>
                  <p><strong>📝 Notes:</strong> {injury.description || 'None'}</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default InjuryTracking;
