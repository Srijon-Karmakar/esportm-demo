import React, { useState } from 'react';
import './ChatPage.css';
import { FaHome, FaSun, FaMoon, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import NmdSidebar2 from '../components/NmdSidebar2'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom'; 

const ChatPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const navigate = useNavigate(); 

  return (
    <div className={`chat-wrapper ${darkMode ? 'dark' : ''}`}>
      <NmdSidebar2 />
      {/* <div className="chat-sidebar">
        <div className="logo-section">
          <div className="logo-icon"><BiUser /></div>
        </div>
        <div className="sidebar-icons">
          <div className="icon">💬</div>
          <div className="icon">📁</div>
          <div className="icon">🔔</div>
          <div className="icon">👥</div>
          <div className="icon">⚙️</div>
        </div>
      </div> */}

      <div className="chat-left-panel neumorph">
        <div className="chat-header">
          <input type="text" placeholder="Search Name" className="search-box" />
          <button className="create-new">+ Create New</button>
        </div>
        <div className="chat-list">
          {['Karlyn', 'Junior', 'Melonie', 'Harrison', 'Tressa', 'Erick', 'Josefina'].map((name, index) => (
            <div key={index} className="chat-user">
              <img src={`https://i.pravatar.cc/40?img=${index + 1}`} alt={name} />
              <div>
                <strong>{name}</strong>
                <p>{Math.floor(Math.random() * 24)} mins ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-middle-panel neumorph">
        <div className="messages">
          <div className="msg sender">
            <p>Hello, Good Morning..! 😃<br />How is marketing going for brand?</p>
          </div>
          <div className="msg receiver">
            <p>Very Good Morning..!<br />We are growing gradually. Here is the complete growth report.</p>
          </div>
          <div className="shared-docs">
            <span><FaFilePdf /> PDF</span>
            <span><FaFileWord /> DOC</span>
            <span><FaFileWord /> DOC</span>
          </div>
          <div className="msg sender">
            <p>This looks great. Thank you!</p>
          </div>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Type a message here..." />
          <button className="send-btn">➤</button>
        </div>
      </div>

      <div className="chat-right-panel neumorph">
        <div className="profile-info">
          <img src="https://i.pravatar.cc/100?img=68" alt="User" />
          <h3>Wilburn Stoltenberg</h3>
          <p>CEO & Founder</p>
        </div>

        <div className="info-section">
          <h4>⭐ Starred Messages</h4>
        </div>

        <div className="info-section">
          <h4>📷 Media (43)</h4>
        </div>

        <div className="info-section">
          <h4>📁 Files & Docs (5)</h4>
          <ul>
            <li>Mockup_Design.zip</li>
            <li>Feedback.docx</li>
            <li>Wireframe.zip</li>
            <li>Client_Requirements.txt</li>
            <li>New_Project_Brief.pdf</li>
          </ul>
        </div>

        <div className="info-section">
          <h4>ℹ️ Information</h4>
        </div>

        <div className="header-actions">
          <button onClick={toggleDarkMode}>{darkMode ? <FaSun /> : <FaMoon />}</button>
          <button  onClick={() => navigate('/')}><FaHome /></button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
