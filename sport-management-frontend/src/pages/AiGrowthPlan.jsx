// src/pages/AiGrowthPlanInteractive.jsx
import React, { useState } from 'react';
// import NmdSidebar2 from '../components/NmdSidebar2';
import NmdHeader from '../components/NmdHeader';
import './AiGrowthPlan.css';

const AiGrowthPlanInteractive = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleGeneratePlan = () => {
    if (!userInput.trim()) {
      setAiResponse("⚠️ Please enter your goal or area of improvement.");
      return;
    }

    setAiResponse('🤖 Generating your personalized AI Growth Plan...');
    
    setTimeout(() => {
      // Simulated AI response (you can replace with OpenAI or other model later)
      setAiResponse(`✅ Growth Plan for "${userInput}":
      
1️⃣ Analyze your current performance in "${userInput}" with recent match stats or training data.

2️⃣ Schedule 4 focused sessions/week using adaptive drills.

3️⃣ AI suggests personalized videos, routines & KPIs.

4️⃣ Track progress weekly & adjust training based on feedback loop.

🧠 Tip: Stay consistent and ask AI every 2 weeks to re-optimize your plan.`);
    }, 1500);
  };

  return (
    <div className="growthai-wrapper">
      {/* <NmdSidebar2 /> */}
      <div className="growthai-main">
        <NmdHeader title="AI Growth Plan (Interactive)" />

        <div className="growthai-card neumorphic">
          <h3 className="gradient-text">Ask AI to Design Your Growth Plan</h3>
          <p className="subtext">Tell us what you want to improve — AI will guide your journey.</p>

          <textarea
            className="growthai-input"
            rows="4"
            placeholder="Example: I want to improve my shooting accuracy as a striker"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <button className="generate-btn neumorphic" onClick={handleGeneratePlan}>
            🧠 Generate Growth Plan
          </button>

          {aiResponse && (
            <div className="growthai-response neumorphic">
              <pre>{aiResponse}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiGrowthPlanInteractive;
