import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './chatUi.css';
// import managerPic from '../assets/images/managers.jpeg'; 
// import playerPic from '../assets/images/Hazard.png'; 

const ChatInterface = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { sender: 'manager', text: 'Hello Player, are you ready for tomorrow’s match?' },
    { sender: 'player', text: 'Yes sir! Fully prepared.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { sender: 'player', text: newMessage }]);
    setNewMessage('');
  };

  const handleGoHome = () => {
    navigate('/'); // Redirect to home page route
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
      <div className="chat-header-left">
        <img src={managerPic} alt="Manager" className="chat-header-pic" />
        <span className="chat-header-name">Manager</span>
      </div>
      <button className="go-home-button" onClick={handleGoHome}>
        <img src="../assets/images/home-icon.png" alt="" />
      </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            <img
              src={msg.sender === 'manager' ? managerPic : playerPic}
              alt="profile"
              className="profile-pic"
            />
            <div className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;