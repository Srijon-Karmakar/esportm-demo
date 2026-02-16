import React, { useState } from 'react';
import ClubSidebar from '../../components/ClubSidebar';
import NmdHeader from '../../components/NmdHeader';
import './ManageClub.css';

const ManageClub = () => {
  const [clubName, setClubName] = useState('SportBit FC');
  const [email, setEmail] = useState('sportbitfc@example.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [address, setAddress] = useState('Salt Lake, Kolkata, India');
  const [description, setDescription] = useState('A passionate football club nurturing young talent.');

  const [logo, setLogo] = useState(null);
  const [recruiting, setRecruiting] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [matchInvites, setMatchInvites] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="dashboard-container">
      <ClubSidebar />
      <div className="main-content">
        <NmdHeader title='Manage the Club/Team' />

        <div className="manage-club">
          <h2>Manage Club</h2>

          {/* Club Logo */}
          <div className="logo-upload">
            <h3>Club Logo</h3>
            {logo ? (
              <img src={logo} alt="Club Logo" className="club-logo" />
            ) : (
              <div className="logo-placeholder">No Logo</div>
            )}
            <input type="file" onChange={handleLogoChange} />
          </div>

          {/* Club Details */}
          <div className="club-info">
            <h3>Club Information</h3>
            <input type="text" value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Club Name" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
          </div>

          {/* About Club */}
          <div className="club-about">
            <h3>About</h3>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />
          </div>

          {/* Club Settings */}
          <div className="club-settings">
            <h3>Settings</h3>
            <label>
              <input type="checkbox" checked={recruiting} onChange={() => setRecruiting(!recruiting)} />
              Open for Recruitment
            </label>
            <label>
              <input type="checkbox" checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
              Show Club Publicly
            </label>
            <label>
              <input type="checkbox" checked={matchInvites} onChange={() => setMatchInvites(!matchInvites)} />
              Accept Match Invites
            </label>
          </div>

          {/* Staff Members (Static for now) */}
          <div className="club-staff">
            <h3>Club Staff</h3>
            <ul>
              <li>⚽ Head Coach - Rahul Banerjee</li>
              <li>💪 Physio - Dr. Nisha Roy</li>
              <li>📊 Analyst - Arjun Sen</li>
            </ul>
          </div>

          {/* Club Controls */}
          <div className="club-controls">
            <h3>Account Controls</h3>
            <button className="btn-change-password">Change Password</button>
            <button className="btn-delete">Delete Club Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClub;
