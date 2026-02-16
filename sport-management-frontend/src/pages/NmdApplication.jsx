// src/pages/ClubApplicationPage.jsx
import React, { useState } from 'react';
import NmdSidebar2 from '../components/NmdSidebar2';
import './NmdApplication.css';
import NmdHeader from '../components/NmdHeader';

const allClubs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Club ${i + 1}`,
  logo: 'https://via.placeholder.com/60x60?text=Logo',
  location: ['Kolkata', 'Delhi', 'Mumbai', 'Chennai'][i % 4],
  type: ['Football', 'Hockey', 'Cricket'][i % 3],
  description: 'An elite sports club looking for skilled players.',
}));

const recommendedClubs = allClubs.slice(0, 6);

const ClubApplicationPage = () => {
  const [filter, setFilter] = useState('');
  const [savedClubs, setSavedClubs] = useState([]);

  const filteredClubs = allClubs.filter(
    (club) =>
      club.name.toLowerCase().includes(filter.toLowerCase()) ||
      club.location.toLowerCase().includes(filter.toLowerCase()) ||
      club.type.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleSave = (id) => {
    setSavedClubs((prev) =>
      prev.includes(id) ? prev.filter((clubId) => clubId !== id) : [...prev, id]
    );
  };

  const removeClub = (id) => {
    setSavedClubs((prev) => prev.filter((clubId) => clubId !== id));
  };

  return (
    <div className="club-app-page">
      <NmdSidebar2 />
      <div className="club-app-main">
        <NmdHeader title="Club Application" />
        {/* <div className="header-bar neumorphic">
          <h2 className="gradient-text">Club Application</h2>
          <div>
            <button className="neumorphic-btn">🏠 Home</button>
            <button className="neumorphic-btn">⏻ Logout</button>
          </div>
        </div> */}

        <div className="search-filter-section ">
          <input
            type="text"
            placeholder="Search by name, location or type..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input neumorphic"
          />
        </div>

        <h3 className="section-title gradient-text">Recommended Clubs</h3>
        <div className="club-cards-container">
          {recommendedClubs.map((club) => (
            <div key={club.id} className="club-card neumorphic">
              <img src={club.logo} alt="logo" className="club-logo" />
              <h4>{club.name}</h4>
              <p>{club.location} - {club.type}</p>
              <p className="desc">{club.description}</p>
              <div className="card-buttons">
                <button className="apply-btn"> Apply</button>
                <button
                  className={`save-btn ${savedClubs.includes(club.id) ? 'saved' : ''}`}
                  onClick={() => toggleSave(club.id)}
                >
                   {savedClubs.includes(club.id) ? 'Saved' : 'Save'}
                </button>
                <button className="remove-btn" onClick={() => removeClub(club.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-title gradient-text">All Clubs</h3>
        <div className="club-cards-container">
          {filteredClubs.map((club) => (
            <div key={club.id} className="club-card neumorphic">
              <img src={club.logo} alt="logo" className="club-logo" />
              <h4>{club.name}</h4>
              <p>{club.location} - {club.type}</p>
              <p className="desc">{club.description}</p>
              <div className="card-buttons">
                <button className="apply-btn">✅ Apply</button>
                <button
                  className={`save-btn ${savedClubs.includes(club.id) ? 'saved' : ''}`}
                  onClick={() => toggleSave(club.id)}
                >
                  ⭐ {savedClubs.includes(club.id) ? 'Saved' : 'Save'}
                </button>
                <button className="remove-btn" onClick={() => removeClub(club.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubApplicationPage;
