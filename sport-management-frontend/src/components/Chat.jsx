//updated in 8/6/25

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ chatRoomId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${chatRoomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('/api/chat/send', {
        chatRoomId,
        sender: userId,
        receiver: 'receiverId', // Replace with actual receiver ID
        message: newMessage,
      });
      setMessages([...messages, response.data.newMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.sender._id === userId ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;