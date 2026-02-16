

// import React, { useContext, useState } from 'react';
// import ClubSidebar from '../../components/ClubSidebar';
// import NmdHeader from '../../components/NmdHeader';
// import './ManagePlayers.css';
// import { PlayerContext } from '../../context/PlayerContext'; 


// const initialPlayers = [
//   {
//     id: 1,
//     name: 'cleve John',
//     position: 'Forward',
//     age: 24,
//     status: 'Active'
//   },
//   {
//     id: 2,
//     name: 'Alex Smith',
//     position: 'Defender',
//     age: 27,
//     status: 'Injured'
//   },
//   {
//     id: 3,
//     name: 'Michael Johnson',
//     position: 'Goalkeeper',
//     age: 22,
//     status: 'Active'
//   },
// ];

// const ManagePlayers = () => {
//   const [search, setSearch] = useState('');
//   const [clubPlayers, setClubPlayers] = useState(initialPlayers);
//   const { sellPlayer } = useContext(PlayerContext); 

//   const handleSell = (playerId) => {
//     const playerToSell = clubPlayers.find(p => p.id === playerId);
//     if (!playerToSell) return;

//     setClubPlayers(prev => prev.filter(p => p.id !== playerId));
//     sellPlayer(playerToSell);

    
//   };

//   const filteredPlayers = clubPlayers.filter(player =>
//     player.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="dashboard-container">
//       <ClubSidebar />
//       <div className="main-content">
//         <NmdHeader title="Manage Players" />

//         <div className="manage-player-header">
//           <h2>Manage Players</h2>
//           <input
//             type="text"
//             placeholder="Search player by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="search-input"
//           />
//         </div>

//         <div className="players-grid">
//           {filteredPlayers.map(player => (
//             <div className="player-card" key={player.id}>
//               <h3>{player.name}</h3>
//               <p><strong>Position:</strong> {player.position}</p>
//               <p><strong>Age:</strong> {player.age}</p>
//               <p><strong>Status:</strong> {player.status}</p>
//               <div className="player-actions">
//                 <button>View</button>
//                 <button>Edit</button>
//                 <button className="danger" onClick={() => handleSell(player.id)}>Sell</button>
//               </div>
//             </div>
//           ))}
//           {filteredPlayers.length === 0 && (
//             <p className="no-results">No players found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagePlayers;



import React, { useEffect, useState } from 'react';
import ClubSidebar from '../../components/ClubSidebar';
import NmdHeader from '../../components/NmdHeader';
import './ManagePlayers.css';
import axios from '../../api/axios';

const ManagePlayers = () => {
  const [search, setSearch] = useState('');
  const [clubPlayers, setClubPlayers] = useState([]);

  // upd 26.7.25
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
  name: '',
  age: '',
  position: '',
  status: 'Active'
});

const handleAddPlayer = async (e) => {
  e.preventDefault();
  try {
    await axios.post('/player/add', newPlayer, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Player added successfully!');
    setShowForm(false);
    setNewPlayer({ name: '', age: '', position: '', status: 'Active' });
    fetchClubPlayers(); // Refresh list
  } catch (err) {
    console.error('Error adding player:', err);
    alert('Failed to add player');
  }
};


  // upd 26.7.25

  const token = localStorage.getItem('clubToken'); // ⚠️ Adjust this based on your auth system

  const fetchClubPlayers = async () => {
    try {
      const res = await axios.get('/club/my-players', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Player API response:", res.data); 
      setClubPlayers(res.data.players);
    } catch (err) {
      console.error('Error fetching players', err);
      setClubPlayers([]); 
    }
  };

  const handleSell = async (playerId) => {
    try {
      await axios.put(`/player/remove-from-club/${playerId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Player moved to marketplace!");
      fetchClubPlayers(); // refresh list
    } catch (err) {
      console.error('Error selling player:', err);
      alert("Error while removing player");
    }
  };

  useEffect(() => {
    fetchClubPlayers();
  }, []);

  // const filteredPlayers = clubPlayers.filter(player =>
  //   player.name?.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredPlayers = Array.isArray(clubPlayers)
  ? clubPlayers.filter(player => player.name?.toLowerCase().includes(search.toLowerCase()))
  : [];


  return (
    <div className="dashboard-container">
      <ClubSidebar />
      <div className="main-content">
        <NmdHeader title="Manage Players" />

        <div className="manage-player-header">
          <h2>Manage Players</h2>


          {/* upd 26.7.25 */}
          <button className="add-player-btn" onClick={() => setShowForm(true)}>Add Player</button>

{showForm && (
  <form className="add-player-form neumorphic" onSubmit={handleAddPlayer}>
    <input type="text" placeholder="Name" required
      value={newPlayer.name} onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })} />
    <input type="number" placeholder="Age" required
      value={newPlayer.age} onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })} />
    <input type="text" placeholder="Position" required
      value={newPlayer.position} onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })} />
    <select value={newPlayer.status} onChange={(e) => setNewPlayer({ ...newPlayer, status: e.target.value })}>
      <option>Active</option>
      <option>Injured</option>
    </select>
    <div>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
    </div>
  </form>
)}

           {/* upd 26.7.25 */}



          <input
            type="text"
            placeholder="Search player by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="players-grid">
          {filteredPlayers.map(player => (
            <div className="player-card" key={player._id}>
              <h3>{player.name}</h3>
              <p><strong>Position:</strong> {player.position}</p>
              <p><strong>Age:</strong> {player.age}</p>
              <div className="player-actions">
                <button>View</button>
                <button>Edit</button>
                <button className="danger" onClick={() => handleSell(player._id)}>Sell</button>
              </div>
            </div>
          ))}
          {filteredPlayers.length === 0 && (
            <p className="no-results">No players found</p>
          )} 
        </div>
      </div>
    </div>
  );
};

export default ManagePlayers;
