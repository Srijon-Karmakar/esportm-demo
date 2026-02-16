import React, { useState } from 'react';
import ManagerSidebar from '../../components/ManagerSidebar';
// import NmdHeader from '../components/NmdHeader';
import NmdHeader from '../../components/NmdHeader'
import './MatchPlanning.css';
import { motion } from 'framer-motion';

const MatchPlanning = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      opponent: 'Blue Hawks FC',
      date: '2025-07-15',
      strategy: 'High press in first half, counter-attack in second.',
    },
    {
      id: 2,
      opponent: 'Red Lions United',
      date: '2025-07-22',
      strategy: 'Possession control with 3-4-3 formation.',
    },
  ]);

  const [formData, setFormData] = useState({
    opponent: '',
    date: '',
    strategy: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddPlan = () => {
    if (!formData.opponent || !formData.date || !formData.strategy) return;
    setPlans([
      ...plans,
      {
        ...formData,
        id: plans.length + 1,
      },
    ]);
    setFormData({ opponent: '', date: '', strategy: '' });
  };

  return (
    <div className="match-planning-page">
      <ManagerSidebar />
      <div className="planning-content">
        <NmdHeader title="Match Planning" />

        <motion.div
          className="neumorphic-form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Plan a New Match</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Opponent Name"
              name="opponent"
              value={formData.opponent}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <textarea
              placeholder="Strategy Details"
              name="strategy"
              value={formData.strategy}
              onChange={handleChange}
            />
            <button onClick={handleAddPlan}>Add Plan</button>
          </div>
        </motion.div>

        <div className="existing-plans">
          <h2>Previous Match Plans</h2>
          <div className="plan-list">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className="plan-card neumorphic"
                whileHover={{ scale: 1.02 }}
              >
                <h3>{plan.opponent}</h3>
                <p><strong>Date:</strong> {plan.date}</p>
                <p><strong>Strategy:</strong> {plan.strategy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPlanning;
