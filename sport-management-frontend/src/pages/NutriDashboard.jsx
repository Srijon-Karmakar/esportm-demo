import React from 'react';
import Sidebar from '../components/NutriSidebar';
import Header from '../components/NmdHeader';
import './NutriDashboard.css';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const NutritionistDashboard = () => {
  const mealCompliance = [
    { name: 'P1', compliance: 85 },
    { name: 'P2', compliance: 70 },
    { name: 'P3', compliance: 90 },
    { name: 'P4', compliance: 65 },
  ];

  const calorieIntake = [
    { day: 'Mon', calories: 2200 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 2000 },
    { day: 'Thu', calories: 2300 },
    { day: 'Fri', calories: 2500 },
  ];

  const hydrationStatus = [
    { name: 'Hydrated', value: 12 },
    { name: 'Dehydrated', value: 3 },
  ];

  const supplementUsage = [
    { name: 'Multivitamin', value: 8 },
    { name: 'Protein', value: 5 },
    { name: 'Omega-3', value: 3 },
  ];

  const weightProgress = [
    { week: 'W1', weight: 72 },
    { week: 'W2', weight: 71.5 },
    { week: 'W3', weight: 71 },
    { week: 'W4', weight: 70.8 },
  ];

  const macroDistribution = [
    { name: 'Carbs', value: 50 },
    { name: 'Proteins', value: 30 },
    { name: 'Fats', value: 20 },
  ];

  const consultationData = [
    { day: 'Mon', sessions: 2 },
    { day: 'Tue', sessions: 4 },
    { day: 'Wed', sessions: 3 },
    { day: 'Thu', sessions: 1 },
    { day: 'Fri', sessions: 2 },
  ];

  const COLORS = ['#7f00ff', '#ff7b00', '#e100ff', '#22c55e'];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content neumorphic">
          <h2 className="gradient-text">Welcome, Nutritionist</h2>

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

          <div className="charts-grid">
            {/* 1. Meal Plan Compliance */}
            <div className="neumorphic-card tiny-chart">
              <h4>Meal Plan Compliance</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={mealCompliance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="compliance" fill="#7f00ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 2. Calorie Intake */}
            <div className="neumorphic-card tiny-chart">
              <h4>Avg. Calorie Intake</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={calorieIntake}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#ff7b00" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 3. Hydration Status */}
            <div className="neumorphic-card tiny-chart">
              <h4>Hydration Levels</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={hydrationStatus}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {hydrationStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 4. Supplement Usage */}
            <div className="neumorphic-card tiny-chart">
              <h4>Supplement Usage</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={supplementUsage}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {supplementUsage.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 5. Weight Progress */}
            <div className="neumorphic-card tiny-chart">
              <h4>Weight Trend</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={weightProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 6. Macro Distribution */}
            <div className="neumorphic-card tiny-chart">
              <h4>Macro Breakdown</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={macroDistribution}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {macroDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 7. Consultations */}
            <div className="neumorphic-card tiny-chart">
              <h4>Weekly Consultations</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={consultationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#e100ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 8. Placeholder extra */}
            <div className="neumorphic-card tiny-chart">
              <h4>Energy Level Ratings</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={calorieIntake.map(d => ({ day: d.day, energy: d.calories / 40 }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="energy" stroke="#f43f5e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistDashboard;
