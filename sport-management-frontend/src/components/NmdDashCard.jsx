// src/components/FitnessStatsCard.jsx
import React from 'react';
import './NmdDashCard.css';

const FitnessStatsCard = () => {
  return (
    <div className="fitness-card neumorphic">
      <div className="top-bar">
        <span className="menu-icon">⋮</span>
        <span className="profile-icon">👤</span>
      </div>

      <h3 className="title">Statistics</h3>

      <div className="chart-toggle">
        <div className="dice-icon">🎲</div>
        <span>Chart</span>
      </div>

      <div className="donut-chart">
        <div className="outer-ring">
          <div className="filled-ring"></div>
          <div className="center-circle">73%</div>
        </div>
      </div>

      <div className="bar-section">
        <div className="bar-item">
          <div className="bar relax"></div>
          <p>Relax<br /><strong>82%</strong></p>
        </div>
        <div className="bar-item">
          <div className="bar cardio empty"></div>
          <p>Cardio<br /><strong>0%</strong></p>
        </div>
        <div className="bar-item">
          <div className="bar strength"></div>
          <p>Strength<br /><strong>54%</strong></p>
        </div>
        <div className="bar-item">
          <div className="bar stretch"></div>
          <p>Stretch<br /><strong>91%</strong></p>
        </div>
      </div>

      <div className="bottom-icons">
        <button id='btn'>Ask AI </button>
        <button id='btn'>Game</button>
        <button id='btn'>Details</button>
      </div>
    </div>
  );
};

export default FitnessStatsCard;
