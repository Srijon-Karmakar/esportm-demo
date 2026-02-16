// // src/pages/ChatPage.jsx
// import React, { useState } from 'react';
// import './NmdChatPage.css';
// import NmdSidebar2 from '../components/NmdSidebar2';
// // import { FaHome} from 'react-icons/fa';
// import homeIcon from '../assets/icons/HomeIcon.png';
// import { useNavigate } from 'react-router-dom';
// import CallIcon from '../assets/icons/CallIcon.png';
// import VideoIcon from '../assets/icons/VideoIcon.png';

// const ChatPage = () => {
//   const navigate = useNavigate();
//   const [selectedManager, setSelectedManager] = useState('Alex Morgan');
//   const [search, setSearch] = useState('');
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([
//     // { from: 'manager', text: 'Hi, are you available this week?', time: '9:00 AM' },
//     // { from: 'player', text: 'Yes! Ready for action.', time: '9:01 AM' }
//   ]);

//   const managers = [
//     'Alex Morgan', 'David Warner', 'Chris Evans', 'Emma Watson', 'Sara Ali', 'John Doe',
//     'Linda Smith', 'Tom Hanks', 'Bruce Wayne', 'Tony Stark'
//   ];

//   const filteredManagers = managers.filter(m =>
//     m.toLowerCase().includes(search.toLowerCase())
//   );

//   const sendMessage = () => {
//     if (!inputMessage.trim()) return;
//     setMessages([...messages, { from: 'player', text: inputMessage, time: 'Now' }]);
//     setInputMessage('');
//   };

//   return (
//     <div className="chat-page">
//       <NmdSidebar2 />
//       <div className="chat-wrapper">
//         {/* <div className="chat-header neumorphic">
//           <h2 className="gradient-text">Player Chat</h2>
//           <div className="header-actions">
//             <button className="neumorphic-btn">🏠 Home</button>
//             <button className="neumorphic-btn">⏻ Logout</button>
//           </div>
//         </div> */}

//         <div className="chat-body">
//           {/* Manager list */}
//           <div className="chat-list neumorphic">
//             <input
//               type="text"
//               className="chat-search"
//               placeholder="Search managers..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <ul className="manager-items">
//               {filteredManagers.map((m, i) => (
//                 <li
//                   key={i}
//                   onClick={() => setSelectedManager(m)}
//                   className={selectedManager === m ? 'active' : ''}
//                 >
//                   👤 {m}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Chat interface */}
//           <div className="chat-panel neumorphic">
//             <div className="chat-top">
//               <h3>{selectedManager}</h3>
//               <div>

//                 <button className="icon-btn">
//                   <img src={CallIcon} alt="call" />
//                 </button>

//                 <button className="icon-btn">
//                   <img src={VideoIcon} alt="Video" />
//                 </button>

//                 <button className="icon-btn" onClick={() => navigate('/')}>
//                 <img src={homeIcon} alt="Home" className="icon-img" />
//                 </button>

//               </div>
//             </div>

//             <div className="chat-messages">
//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`message ${msg.from === 'player' ? 'sent' : 'received'}`}
//                 >
//                   <p>{msg.text}</p>
//                   <small>{msg.time}</small>
//                 </div>
//               ))}
//             </div>

//             <div className="chat-input">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//               />
//               <button id='send' onClick={sendMessage}>Send</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;





















// src/pages/ChatPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./NmdChatPage.css";
import NmdSidebar2 from "../components/NmdSidebar2";
import homeIcon from "../assets/icons/HomeIcon.png";
import { useNavigate } from "react-router-dom";
import CallIcon from "../assets/icons/CallIcon.png";
import VideoIcon from "../assets/icons/VideoIcon.png";

import api from "../api/axios";                           // axios baseURL -> /api
import { ChatProvider, useChat } from "../context/ChatContext";

// ---------- helpers ----------
function getValidToken() {
  const keys = ["token","playerToken","managerToken","accessToken","jwt","adminToken","superadminToken"];
  for (const k of keys) {
    const raw = localStorage.getItem(k) ?? sessionStorage.getItem(k);
    if (!raw || raw === "null" || raw === "undefined") continue;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string" && parsed.length > 10) return parsed;
      if (parsed?.token && parsed.token.length > 10) return parsed.token;
    } catch {
      if (typeof raw === "string" && raw.length > 10) return raw;
    }
  }
  return null;
}

function parseJwt(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch { return {}; }
}

// Try a few likely endpoints to resolve a display name
async function fetchDisplayName(role, id) {
  const tryRoutes = role === "Manager"
    ? [
        () => api.get(`/manager/${id}`),
        () => api.get(`/manager/profile/${id}`),
        () => api.get(`/manager/get/${id}`),
      ]
    : [
        () => api.get(`/player/${id}`),
        () => api.get(`/player/profile/${id}`),
        () => api.get(`/player/get/${id}`),
      ];

  for (const fn of tryRoutes) {
    try {
      const { data } = await fn();
      const d = Array.isArray(data) ? data[0] : data;
      const name =
        d?.name ||
        d?.fullName ||
        d?.username ||
        d?.player_name ||
        d?.manager_name ||
        d?.profile?.name;
      if (name) return name;
    } catch {/* ignore and try next */}
  }
  // fallback short label
  return `${role} • ${String(id).slice(-6)}`;
}

// Who is the other participant?
function getCounterpart(me, participants) {
  if (!participants?.length) return null;
  return participants.find(
    (p) => String(p.userId) !== String(me.id) || p.role !== me.role
  ) || participants[0];
}

// ============== Inner UI ==============
function ChatUI() {
  const navigate = useNavigate();
  const token = getValidToken();
  const me = useMemo(() => {
    const p = parseJwt(token || "");
    const out = { id: p?.sub, role: p?.role, name: p?.name };
    // optional: expose my id for bubble alignment
    if (out.id && typeof window !== "undefined") window.myId = String(out.id);
    return out;
  }, [token]);

  const {
    connected,
    activeRoom,
    setActiveRoom,
    join,
    loadHistory,
    sendMessage,
    messages,
    markRead,
  } = useChat();

  const [contacts, setContacts] = useState([]); // [{roomId, counterpart: {id,role,name}}]
  const [selected, setSelected] = useState(null); // {roomId, counterpart}
  const [search, setSearch] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  // 1) Load my conversations and resolve names
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/chat/conversations");
      // data = [{ roomId, participants:[{userId,role,lastReadAt}, ...], ... }]
      const rows = await Promise.all(
        (data || []).map(async (c) => {
          const other = getCounterpart(me, c.participants);
          const name = await fetchDisplayName(other.role, other.userId);
          return {
            roomId: c.roomId,
            counterpart: { id: other.userId, role: other.role, name },
            lastMessage: c.lastMessage,
            lastMessageAt: c.lastMessageAt,
          };
        })
      );
      setContacts(rows);
      if (!selected && rows[0]) setSelected(rows[0]);
    })();
  }, []); // load once

  // 2) When a contact is selected → ensure we’re in that room
  useEffect(() => {
    (async () => {
      if (!selected?.roomId) return;
      setActiveRoom(selected.roomId);
      join(selected.roomId);
      await loadHistory(selected.roomId);
      markRead(selected.roomId);
    })();
  }, [selected?.roomId]);

  // 3) Send
  const handleSend = () => {
    if (!inputMessage.trim() || !activeRoom) return;
    sendMessage({ roomId: activeRoom, text: inputMessage.trim() });
    setInputMessage("");
  };

  const filteredContacts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) =>
      (c.counterpart?.name || "").toLowerCase().includes(q)
    );
  }, [search, contacts]);

  return (
    <div className="chat-page">
      <NmdSidebar2 />

      <div className="chat-wrapper">
        <div className="chat-body">
          {/* LEFT: real contacts */}
          <div className="chat-list neumorphic">
            <input
              type="text"
              className="chat-search"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="manager-items">
              {filteredContacts.length === 0 && (
                <li style={{ opacity: 0.6, cursor: "default" }}>
                  No conversations yet.
                </li>
              )}
              {filteredContacts.map((c) => (
                <li
                  key={c.roomId}
                  onClick={() => setSelected(c)}
                  className={selected?.roomId === c.roomId ? "active" : ""}
                  title={c.counterpart?.role}
                >
                  👤 {c.counterpart?.name}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: chat panel */}
          <div className="chat-panel neumorphic">
            <div className="chat-top">
              <h3>
                {selected?.counterpart?.name || "Select a conversation"}
                <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.6 }}>
                  {connected ? "• online" : "• offline"}
                </span>
              </h3>
              <div>
                <button className="icon-btn">
                  <img src={CallIcon} alt="call" />
                </button>
                <button className="icon-btn">
                  <img src={VideoIcon} alt="Video" />
                </button>
                <button className="icon-btn" onClick={() => navigate("/")}>
                  <img src={homeIcon} alt="Home" className="icon-img" />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((m) => {
                const mine = String(m?.sender?.userId) === String(me.id);
                return (
                  <div
                    key={m._id}
                    className={`message ${mine ? "sent" : "received"}`}
                  >
                    <p>{m.text || "[attachment]"}</p>
                    <small>{new Date(m.createdAt).toLocaleTimeString()}</small>
                  </div>
                );
              })}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button id="send" onClick={handleSend} disabled={!selected}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== Page wrapper with provider ==============
export default function ChatPage() {
  const token = getValidToken();
  return (
    <ChatProvider token={token}>
      <ChatUI />
    </ChatProvider>
  );
}
