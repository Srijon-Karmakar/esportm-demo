// src/pages/NmdSettings.jsx
import React, { useState } from 'react';
import NmdSidebar2 from '../components/NmdSidebar2';
import NmdHeader from '../components/NmdHeader';
import './NmdSettings.css';

const NmdSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('player@sportbit.com');
  const [password, setPassword] = useState('');

  return (
    <div className="settings-wrapper">
      <NmdSidebar2 />
      <div className="settings-main">
        <NmdHeader title="Settings" />

        <div className="settings-content">

          {/* <div className="settings-card neumorphic">
            <h3>Theme</h3>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
            <p>{darkMode ? 'Dark Mode Enabled' : 'Light Mode Enabled'}</p>
          </div> */}

          <div className="settings-card neumorphic">
            <h3>Notifications</h3>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider"></span>
            </label>
            <p>{notifications ? 'Notifications ON' : 'Notifications OFF'}</p>
          </div>

          <div className="settings-card neumorphic">
            <h3>Update Email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <button className="save-btn neumorphic">Save Email</button>
          </div>

          <div className="settings-card neumorphic">
            <h3>Change Password</h3>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button className="save-btn neumorphic">Update Password</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NmdSettings;
