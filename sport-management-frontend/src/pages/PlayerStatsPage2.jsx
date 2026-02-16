import React from 'react';
import './PlayerStatsPage2.css';
// import UserSidebar from '../components/userSidebar';

const SportbitDashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      {/* <UserSidebar/> */}
      <aside className="sidebar">
        <div className="sidebar-icon" />
        <div className="sidebar-icon" />
        <div className="sidebar-icon" />
        <div className="sidebar-icon" />
        <div className="sidebar-icon" />
        <div className="sidebar-bottom">
          <div className="sidebar-avatar" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-grid">
          {/* Bar Chart */}
          <div className="neumo-card chart-card">
            <h3>Last 30 days users</h3>
            <div className="bar-chart">
              {[5, 2, 10, 14, 22, 19, 6, 25, 14, 16, 8, 20, 18, 5].map((val, i) => (
                <div key={i} className="bar" style={{ height: `${val * 2}px` }} />
              ))}
            </div>
            <span className="chart-label">Driving range</span>
          </div>

          {/* Recommended Golf Clubs */}
          <div className="neumo-card recommendation-card">
            <h4>The best rated clubs</h4>
            <p>The Sunshine Golf Club in Florida</p>
            <p className="small">Recommended by 5+ nearby players</p>
            <button className="neumo-button">Add friends +</button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="neumo-card stats-card">
          <div className="stat">
            <h4>12</h4>
            <p>Annual Rounds</p>
          </div>
          <div className="stat">
            <h4>2482.1</h4>
            <p>Annual Points</p>
          </div>
          <div className="stat">
            <h4>+18.12</h4>
            <p>Avg to par</p>
          </div>

          <div className="bar-percentages">
            <div style={{ height: '3px' }}>0% Eagle</div>
            <div style={{ height: '10px' }}>3% Par</div>
            <div style={{ height: '20px' }}>26% Birdie</div>
            <div style={{ height: '30px' }}>38% Bogey</div>
            <div style={{ height: '18px' }}>22% Double Bogey</div>
            <div style={{ height: '15px' }}>12% Worse</div>
          </div>
        </div>

        {/* Circle Stats + Image */}
        <div className="bottom-grid">
          <div className="neumo-card circle-card">
            <p>Scoring Avg</p>
            <div className="circle">48.773</div>
          </div>
          <div className="neumo-card circle-card">
            <p>Driving Distance</p>
            <div className="circle">298.6</div>
          </div>
          <div className="neumo-card image-card">
            <img src="#" alt="Golf" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportbitDashboard;
