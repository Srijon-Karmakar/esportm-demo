import React from "react";
import Header from "../../components/NmdHeader";
import Sidebar from "../../components/AgentSidebar";
import "./AgentPlayerStats.css";

const PlayerStats = () => {
  const players = [
    { name: "John Smith", position: "Forward", goals: 15, assists: 7, matches: 20, rating: 8.4 },
    { name: "Mike Johnson", position: "Midfielder", goals: 5, assists: 12, matches: 22, rating: 7.9 },
    { name: "David Lee", position: "Defender", goals: 2, assists: 4, matches: 25, rating: 7.5 },
    { name: "Chris Walker", position: "Goalkeeper", goals: 0, assists: 1, matches: 18, rating: 7.8 },
  ];

  const recentPerformances = [
    { match: "Team A vs Team B", player: "John Smith", performance: "Scored 2 goals" },
    { match: "Team C vs Team D", player: "Mike Johnson", performance: "2 assists, 90% pass accuracy" },
    { match: "Team E vs Team F", player: "David Lee", performance: "5 clearances, 2 blocks" },
  ];

  return (
    <div className="playerstats-container">
      <Sidebar />
      <div className="playerstats-main">
        <Header title="Player Stats" />

        <div className="playerstats-wrapper">
          {/* Search */}
          <div className="playerstats-search">
            <input type="text" placeholder="Search players..." />
            <button>Search</button>
          </div>

          {/* Key Stats */}
          <div className="playerstats-summary">
            <div className="playerstats-card">Total Players: 48</div>
            <div className="playerstats-card">Average Rating: 7.8</div>
            <div className="playerstats-card">Top Scorer: John Smith</div>
            <div className="playerstats-card">Top Assists: Mike Johnson</div>
          </div>

          {/* Player Table */}
          <div className="playerstats-table-container">
            <table className="playerstats-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>Matches</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.position}</td>
                    <td>{p.goals}</td>
                    <td>{p.assists}</td>
                    <td>{p.matches}</td>
                    <td>{p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Performances */}
          <div className="playerstats-section">
            <h3>Recent Performances</h3>
            <ul>
              {recentPerformances.map((perf, i) => (
                <li key={i}>
                  <strong>{perf.player}</strong> - {perf.performance} ({perf.match})
                </li>
              ))}
            </ul>
          </div>

          {/* Player Comparison */}
          <div className="playerstats-section">
            <h3>Compare Players</h3>
            <div className="playerstats-compare">
              <select>
                {players.map((p, i) => (
                  <option key={i}>{p.name}</option>
                ))}
              </select>
              <select>
                {players.map((p, i) => (
                  <option key={i}>{p.name}</option>
                ))}
              </select>
              <button>Compare</button>
            </div>
          </div>

          {/* Charts (Placeholder) */}
          <div className="playerstats-charts">
            <div className="playerstats-card">📊 Goals Over Time (Chart Placeholder)</div>
            <div className="playerstats-card">📈 Ratings Distribution (Chart Placeholder)</div>
          </div>

          {/* Actions */}
          <div className="playerstats-actions">
            <button>Export Stats</button>
            <button>Send to Agent</button>
            <button>Update Player Data</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
