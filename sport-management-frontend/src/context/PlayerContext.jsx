// src/context/PlayerContext.js
import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [marketplacePlayers, setMarketplacePlayers] = useState([]);
  const [clubPlayers, setClubPlayers] = useState([]);

  const sellPlayer = (player) => {
    setMarketplacePlayers(prev => [...prev, player]);
  };

  return (
    <PlayerContext.Provider value={{ clubPlayers, setClubPlayers,marketplacePlayers, sellPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};



















// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// import axios from "../api/axios"; // <-- adjust path if needed

// const PlayerContext = createContext(null);

// export function PlayerProvider({ children }) {
//   const [currentPlayer, setCurrentPlayer] = useState(null);
//   const [loadingPlayer, setLoadingPlayer] = useState(true);
//   const [playerError, setPlayerError] = useState(null);

//   // LocalStorage keys (adapt if your keys differ)
//   const TOKEN_KEY = "sportbit_token";
//   const PLAYER_KEY = "sportbit_player";

//   const token = useMemo(() => {
//     try {
//       return localStorage.getItem(TOKEN_KEY) || null;
//     } catch {
//       return null;
//     }
//   }, []);

//   // ---------- Helper: set axios auth header when token exists ----------
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [token]);

//   // ---------- Boot: hydrate from LS then refresh from /me ----------
//   useEffect(() => {
//     (async () => {
//       setLoadingPlayer(true);
//       setPlayerError(null);
//       try {
//         // 1) Hydrate from LS (fast paint)
//         let pre = null;
//         try {
//           pre = JSON.parse(localStorage.getItem(PLAYER_KEY) || "null");
//         } catch {}
//         if (pre?._id) setCurrentPlayer(pre);

//         // 2) Refresh from /me when token is present
//         if (token) {
//           const { data } = await axios.get("/api/player/me");
//           const me = data?.player || data || null;
//           setCurrentPlayer(me);
//           try {
//             localStorage.setItem(PLAYER_KEY, JSON.stringify(me));
//           } catch {}
//         }
//       } catch (e) {
//         setPlayerError(e?.response?.data?.message || e.message);
//       } finally {
//         setLoadingPlayer(false);
//       }
//     })();
//   }, [token]);

//   // ---------- Public API ----------
//   const fetchById = async (id) => {
//     const { data } = await axios.get(`/api/player/${id}`);
//     return data?.player || data;
//   };

//   const fetchByUsername = async (username) => {
//     const { data } = await axios.get(`/api/player/by-username/${encodeURIComponent(username)}`);
//     return data?.player || data;
//   };

//   const refreshMe = async () => {
//     const { data } = await axios.get("/api/player/me");
//     const me = data?.player || data || null;
//     setCurrentPlayer(me);
//     try {
//       localStorage.setItem(PLAYER_KEY, JSON.stringify(me));
//     } catch {}
//     return me;
//   };

//   const value = {
//     currentPlayer,
//     setCurrentPlayer,
//     loadingPlayer,
//     playerError,
//     fetchById,
//     fetchByUsername,
//     refreshMe,
//     token,
//   };

//   return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
// }

// export function usePlayer() {
//   const ctx = useContext(PlayerContext);
//   if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
//   return ctx;
// }

