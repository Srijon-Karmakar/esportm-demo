import React from "react";
import Sidebar from "../components/PhysioSidebar";
import Header from "../components/NmdHeader";
import "./PhysioDashboard.css";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";

const PhysioDashboard = () => {
  const sampleData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 70 },
    { name: "Apr", value: 60 },
  ];

  const pieData = [
    { name: "Recovery", value: 65 },
    { name: "Ongoing", value: 35 },
  ];

  const COLORS = ["#6c63ff", "#ff6584"];

  const cardColors = [
    "#ffe4e1", "#e6e6fa", "#f0fff0", "#fffacd", "#e0ffff",
    "#fafad2", "#f5f5f5", "#ffe4b5", "#e0ffe0", "#fdf5e6",
    "#d8bfd8", "#f0f8ff", "#faf0e6", "#f5fffa", "#f8f8ff"
  ];

  return (
    <div className="physio-dashboard">
      <Sidebar />
      <div className="physio-main">
        <Header title="Physio Dashboard" />
        {/* <h1 className="page-title">Physio Dashboard</h1> */}

        <div className="bento-grid">
          {/* Card 1 */}
          <div className="bento-card small" style={{ background: cardColors[0] }}>
            <h3>Today's Appointments</h3>
            <p>12 Patients</p>
          </div>

          {/* Card 2 */}
          <div className="bento-card medium" style={{ background: cardColors[1] }}>
            <h3>Recovery Rate</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={60} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Card 3 */}
          <div className="bento-card large" style={{ background: cardColors[2] }}>
            <h3>Monthly Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sampleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#6c63ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Card 4 */}
          <div className="bento-card small" style={{ background: cardColors[3] }}>
            <h3>Pending Reports</h3>
            <p>8 Files</p>
          </div>

          {/* Card 5 */}
          <div className="bento-card medium" style={{ background: cardColors[4] }}>
            <h3>Weekly Sessions</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={sampleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ff6584" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Card 6 */}
          <div className="bento-card small" style={{ background: cardColors[5] }}>
            <h3>Next Patient</h3>
            <p>John Doe - 3 PM</p>
          </div>

          {/* Card 7 */}
          <div className="bento-card small" style={{ background: cardColors[6] }}>
            <h3>Cancelled Sessions</h3>
            <p>2 This Week</p>
          </div>

          {/* Card 8 */}
          <div className="bento-card medium" style={{ background: cardColors[7] }}>
            <h3>Top Exercises</h3>
            <ul>
              <li>Stretching</li>
              <li>Resistance Band</li>
              <li>Balance Drills</li>
            </ul>
          </div>

          {/* Card 9 */}
          <div className="bento-card large" style={{ background: cardColors[8] }}>
            <h3>Patient Satisfaction</h3>
            <p>88% Positive Feedback</p>
          </div>

          {/* Card 10 */}
          <div className="bento-card small" style={{ background: cardColors[9] }}>
            <h3>Follow-ups</h3>
            <p>5 Scheduled</p>
          </div>

          {/* Placeholder Cards */}
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className={`bento-card ${idx % 2 === 0 ? "small" : "medium"}`}
              style={{ background: cardColors[(idx + 10) % cardColors.length] }}
            >
              <h3>Placeholder Card {idx + 11}</h3>
              <p>Data coming soon...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhysioDashboard;
