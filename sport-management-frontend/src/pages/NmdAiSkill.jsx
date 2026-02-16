// src/pages/AiSkillAnalyser.jsx
import React, { useState } from 'react';
// import NmdSidebar2 from '../components/NmdSidebar2';
import NmdHeader from '../components/NmdHeader';
import './NmdAiSkill.css';
import AiIcon from '../assets/icons/AiIcon.png'; // Ensure you have an AI icon image in your assets folder

const AiSkillAnalyser = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleAnalyze = () => {
    if (!selectedSkill || !uploadedFile) {
      setAnalysisResult('⚠️ Please select a skill and upload a file.');
      return;
    }

    // Simulate AI processing delay
    setAnalysisResult('🧠 Analyzing skill...');
    setTimeout(() => {
      setAnalysisResult(
        `✅ Analysis of ${selectedSkill} completed!\nPerformance: Excellent\nRecommendation: Keep training to refine your technique.`
      );
    }, 2000);
  };

  return (
    <div id='AiSkill1' className="ai-wrapper">
      {/* <NmdSidebar2 /> */}
      <div id='AiSkill2' className="ai-main">
        <NmdHeader title="AI Skill Analyser" />

        <div className="ai-form neumorphic">
          <h3>Upload and Analyze Player Skill</h3>
          <select
            className="skill-dropdown"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Select Skill</option>
            <option value="Dribbling">Dribbling</option>
            <option value="Passing">Passing</option>
            <option value="Shooting">Shooting</option>
            <option value="Speed">Speed</option>
            <option value="Positioning">Positioning</option>
          </select>

          <input type="file" className="upload-input" onChange={handleFileChange} />

          <button className="analyze-btn neumorphic" onClick={handleAnalyze}>
            <img src={AiIcon} alt="Ai"  />
          </button>

          {analysisResult && (
            <div className="analysis-result neumorphic">
              <pre>{analysisResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiSkillAnalyser;
