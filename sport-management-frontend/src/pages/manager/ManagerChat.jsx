// src/pages/ChatPage.jsx
import React, { useState } from 'react';
import './ManagerChat.css';
import ManagerSidebar from '../../components/ManagerSidebar';
// import { FaHome} from 'react-icons/fa';
import homeIcon from '../../assets/icons/HomeIcon.png';
import { useNavigate } from 'react-router-dom';
import CallIcon from '../../assets/icons/CallIcon.png';
import VideoIcon from '../../assets/icons/VideoIcon.png';

const ChatPage = () => {
  const navigate = useNavigate();
  const [selectedManager, setSelectedManager] = useState('Alex Morgan');
  const [search, setSearch] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    // { from: 'manager', text: 'Hi, are you available this week?', time: '9:00 AM' },
    // { from: 'player', text: 'Yes! Ready for action.', time: '9:01 AM' }
  ]);

  const managers = [
    'Alex Morgan', 'David Warner', 'Chris Evans', 'Emma Watson', 'Sara Ali', 'John Doe',
    'Linda Smith', 'Tom Hanks', 'Bruce Wayne', 'Tony Stark'
  ];

  const filteredManagers = managers.filter(m =>
    m.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { from: 'player', text: inputMessage, time: 'Now' }]);
    setInputMessage('');
  };

  return (
    <div className="chat-page">
      <ManagerSidebar />
      <div className="chat-wrapper">
        {/* <div className="chat-header neumorphic">
          <h2 className="gradient-text">Player Chat</h2>
          <div className="header-actions">
            <button className="neumorphic-btn">🏠 Home</button>
            <button className="neumorphic-btn">⏻ Logout</button>
          </div>
        </div> */}

        <div className="chat-body">
          {/* Manager list */}
          <div className="chat-list neumorphic">
            <input
              type="text"
              className="chat-search"
              placeholder="Search managers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="manager-items">
              {filteredManagers.map((m, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedManager(m)}
                  className={selectedManager === m ? 'active' : ''}
                >
                  👤 {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat interface */}
          <div className="chat-panel neumorphic">
            <div className="chat-top">
              <h3>{selectedManager}</h3>
              <div>

                <button className="icon-btn">
                  <img src={CallIcon} alt="call" />
                </button>

                <button className="icon-btn">
                  <img src={VideoIcon} alt="Video" />
                </button>

                <button className="icon-btn" onClick={() => navigate('/')}>
                <img src={homeIcon} alt="Home" className="icon-img" />
                </button>

              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.from === 'player' ? 'sent' : 'received'}`}
                >
                  <p>{msg.text}</p>
                  <small>{msg.time}</small>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button id='send' onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
