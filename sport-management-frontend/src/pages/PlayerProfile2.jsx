// src/pages/PlayerProfile.jsx
import React, {useEffect, useContext, useState} from 'react';
import NmdSidebar2 from '../components/NmdSidebar2';
import './PlayerProfile2.css';
// import playerImg from '../assets/images/Hazard.png'; 
// import skillVideo from '../assets/videos/skills.mp4'; 
import { FaHome, FaSignOutAlt} from 'react-icons/fa';
// import EditIcon from '../assets/icons/EditIcon.png';

import { useNavigate } from 'react-router-dom';
import NmdHeader from '../components/NmdHeader';
import { UserContext } from '../context/UserContext'; 


const PlayerProfile2 = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useContext(UserContext);

// updated 19 july,2025 
const [clubJourney, setClubJourney] = useState([
  { name: 'Kolkata FC', from: '2018', to: '2020' },
  { name: 'Bengal Warriors', from: '2020', to: '2022' },
  { name: 'SportBit United', from: '2022', to: 'Present' }
]);

// updated 19 july,2025 


  useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      console.log('Stored Username:', storedUsername); // Debugging
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);

  return (
    <div className="profile-wrapper">
      <NmdSidebar2 />

      <div className="profile-main">
        <NmdHeader title="Player Profile" />
       

        {/* Name & Details */}
        <div className="profile-details neumorphic">
        <div className="details-header">
          <h2> {username}</h2>
          <button className="edit-btn neumorphic" onClick={() => navigate('/edit-profile')}>
            <img src={ EditIcon } alt="edit" />
          </button>
          </div>
          <p><strong>Position:</strong> Forward</p>
          <p><strong>Team:</strong> SportBit United</p>
          <p><strong>Age:</strong> 24</p>
          <p><strong>Nationality:</strong> India</p>
        </div>

        {/* Stats + Video */}
        <div className="profile-stats-video">
          <div className="player-stats neumorphic profile-card">
            <h3 className="gradient-text">Performance Stats</h3>
            <ul>
              <li>Matches Played: 56</li>
              <li>Goals Scored: 34</li>
              <li>Assists: 21</li>
              <li>Speed: 33.2 km/h</li>
              <li>Fitness: Excellent</li>
            </ul>
          </div>

          {/* // updated 19 july,2025  */}
          {/* club journey  */}
          <div className="player-journey neumorphic profile-card">
  <h3 className="gradient-text">Club Journey</h3>
  <ul>
    {clubJourney.map((club, index) => (
      <li key={index}>
        <strong>{club.name}</strong> ({club.from} - {club.to})
      </li>
    ))}
  </ul>
</div>

          {/* // updated 19 july,2025  */}




          {/* upd 24 july,25 */}
          {/* Health Stats Card */}
<div className="player-health neumorphic profile-card">
  <h3 className="gradient-text">Health Stats</h3>
  <ul>
    <li>Height: 180 cm</li>
    <li>Weight: 75 kg</li>
    <li>Heart Rate: 62 bpm</li>
    <li>Recovery Rate: Fast</li>
    <li>Injury History: None</li>
  </ul>
</div>

          {/* upd 24 july,25 */}






          <div className="player-video neumorphic profile-card">
            <h3 className="gradient-text">Skill Highlights</h3>
            {/* <video controls width="100%">
              <source src="https://youtu.be/VJrbNMYSKXk?si=aJxVXMktKPPQSExa" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/VJrbNMYSKXk"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile2;
