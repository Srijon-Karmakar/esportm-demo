// import React, { useState, useEffect, useContext } from 'react';
// import { Settings, ChevronDown } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
import UserSidebar from '../components/userSidebar';
import './playerStats2.css';
import React from 'react';
// import eastBengalLogo from '../assets/images/eblogo.png';
// import mohunBaganLogo from '../assets/images/mblogo.png';
import profilePic from '../assets/images/Hazard.png';


const PlayerStats2 = () => {
    return (
      <div className="dashboard-main">
        <UserSidebar/>
        {/* Player Card */}
        <div className="neumorphic player-card">
          <div className="profile-info">
            <img src={ profilePic } alt="Player" />
            <div>
              <h3>user.name</h3>
              <p>Lorem Ipsum Dolor</p>
            </div>
          </div>
          <div className="stats">
            <div><strong>381K</strong><p>LOREM</p></div>
            <div><strong>13K</strong><p>IPSUM</p></div>
            <div><strong>134K</strong><p>DOLOR</p></div>
          </div>
          {/* <div className="toggles">
            {['Lorem', 'Ipsum', 'Dolor', 'Lobortis', 'Suscipit'].map((item, i) => (
              <div className="toggle-row" key={i}>
                <label>{item}</label>
                <input type="checkbox" />
                <span className="value">{Math.floor(Math.random() * 500)}</span>
              </div>
            ))}
          </div> */}
          <button className="login-btn">LOG OUT</button>
        </div>


        
  
        {/* KPI Cards */}
        <div className="kpi-row">
          {[
            { title: 'Actions', value: '3,52', change: '+5%' },
            { title: 'Performance', value: '12,0', change: '+21%' },
            { title: 'Interactions', value: '0,03', change: '-12%' },
          ].map((item, i) => (
            <div className="neumorphic kpi-card" key={i}>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
              <span className={`change ${item.change.includes('-') ? 'down' : 'up'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
  
        {/* Chart Placeholder */}
        <div className="neumorphic chart">
          <h4>Year Analysis</h4>
          <p style={{ opacity: 0.6, fontStyle: 'italic' }}>[Chart.js Placeholder]</p>
        </div>
  
        {/* Comments Section */}
        <div className="neumorphic comments">
          <h4>Comments</h4>
          <ul>
            <li> Lorem ipsum dolor sit amet.</li>
            <li> INCIDENT!!!</li>
            <li> Ut enim ad minim veniam.</li>
          </ul>
        </div>
  
        {/* Match Info */}
        <div className="neumorphic match-card">
          <h3>Next Match</h3>
          <div className="teams">
            <img src={eastBengalLogo} alt="East Bengal" />
            <span>Vs</span>
            <img src={mohunBaganLogo} alt="Mohun Bagan" />
          </div>
          <p><strong>East Bengal vs Mohun Bagan</strong></p>
          <p>Venue: Yuvabharati Krirangan, Kolkata</p>
          <p>Time: 7:30 pm IST</p>
          <p>Tournament: Indian Super League</p>
        </div>
  
        {/* News Section */}
        <div className="news-strip">
          {[1, 2, 3].map((n) => (
            <div className="neumorphic news-card" key={n}>
              <img src={eastBengalLogo} alt="News" />
              <p>Bayern Munich celebrates Meistersale after one-year hiatus</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PlayerStats2;