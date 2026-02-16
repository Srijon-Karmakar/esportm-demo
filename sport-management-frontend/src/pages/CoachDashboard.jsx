import React from 'react';
import Sidebar from '../components/CoachSidebar';
import Header from '../components/NmdHeader';
import './CoachDashboard.css';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const CoachDashboard = () => {
  // Placeholder datasets
  const playerPerformance = [
    { name: 'P1', score: 75 }, { name: 'P2', score: 82 },
    { name: 'P3', score: 65 }, { name: 'P4', score: 90 },
  ];

  const trainingLoad = [
    { day: 'Mon', load: 3 }, { day: 'Tue', load: 6 },
    { day: 'Wed', load: 5 }, { day: 'Thu', load: 4 },
    { day: 'Fri', load: 7 }, { day: 'Sat', load: 2 },
  ];

  const injuryReport = [
    { name: 'Healthy', value: 10 },
    { name: 'Minor', value: 3 },
    { name: 'Critical', value: 1 },
  ];

  const attendance = [
    { day: 'Mon', present: 9 },
    { day: 'Tue', present: 10 },
    { day: 'Wed', present: 8 },
    { day: 'Thu', present: 11 },
    { day: 'Fri', present: 7 },
  ];

  const readiness = [
    { name: 'Ready', value: 8 },
    { name: 'Doubtful', value: 4 },
  ];

  const fitnessTrend = [
    { week: 'W1', level: 70 },
    { week: 'W2', level: 72 },
    { week: 'W3', level: 78 },
    { week: 'W4', level: 80 },
  ];

  const sleepData = [
    { day: 'Mon', hours: 7 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 5 },
    { day: 'Fri', hours: 6.5 },
  ];

  const fatigue = [
    { day: 'Mon', score: 3 },
    { day: 'Tue', score: 4 },
    { day: 'Wed', score: 2 },
    { day: 'Thu', score: 5 },
    { day: 'Fri', score: 3 },
  ];

  const COLORS = ['#7f00ff', '#ff7b00', '#e100ff', '#22c55e'];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header title='Coach Dashboard' />

        <div className="dashboard-content neumorphic">
          <h2 className="gradient-text">Welcome, Coach</h2>
          
          {/* <div className="stats-section">
            <div className="neumorphic-card">
              <h3>Total Meal Plans</h3>
              <p>24 Active</p>
            </div>
            <div className="neumorphic-card">
              <h3>Calories Checked Today</h3>
              <p>12 Players</p>
            </div>
            <div className="neumorphic-card">
              <h3>Water Intake Logged</h3>
              <p>9 Players</p>
            </div>
          </div> */}

          {/* Cards Section */}
          <div className="charts-grid">
            {/* 1. Player Performance */}
            <div className="neumorphic-card tiny-chart">
              <h4>Player Performance</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={playerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#7f00ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 2. Training Load */}
            <div className="neumorphic-card tiny-chart">
              <h4>Training Load</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={trainingLoad}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="load" stroke="#e100ff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 3. Injury Overview */}
            <div className="neumorphic-card tiny-chart">
              <h4>Injury Report</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={injuryReport}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {injuryReport.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 4. Attendance */}
            <div className="neumorphic-card tiny-chart">
              <h4>Attendance</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={attendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#ff7b00" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 5. Match Readiness */}
            <div className="neumorphic-card tiny-chart">
              <h4>Match Readiness</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={readiness}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {readiness.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 6. Fitness Trend */}
            <div className="neumorphic-card tiny-chart">
              <h4>Fitness Trend</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={fitnessTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="level" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 7. Sleep Tracking */}
            <div className="neumorphic-card tiny-chart">
              <h4>Sleep Hours</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 8. Fatigue Levels */}
            <div className="neumorphic-card tiny-chart">
              <h4>Fatigue Levels</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={fatigue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
