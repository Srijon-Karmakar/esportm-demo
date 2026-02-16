import React from 'react';
import Sidebar from '../components/PitchSidebar'; // Use your actual PitchSidebar
import Header from '../components/NmdHeader';
import './PitchManagerDash.css';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const PitchManagerDashboard = () => {
  const turfCondition = [
    { zone: 'A', health: 80 },
    { zone: 'B', health: 60 },
    { zone: 'C', health: 90 },
  ];

  const bookingStats = [
    { day: 'Mon', bookings: 4 },
    { day: 'Tue', bookings: 6 },
    { day: 'Wed', bookings: 5 },
    { day: 'Thu', bookings: 3 },
    { day: 'Fri', bookings: 7 },
  ];

  const maintenancePie = [
    { name: 'Completed', value: 14 },
    { name: 'Pending', value: 6 },
  ];

  const pitchTypes = [
    { name: 'Natural', value: 3 },
    { name: 'Artificial', value: 2 },
  ];

  const rainfallTrend = [
    { day: 'Mon', rain: 4 },
    { day: 'Tue', rain: 1 },
    { day: 'Wed', rain: 2 },
    { day: 'Thu', rain: 0 },
    { day: 'Fri', rain: 5 },
  ];

  const temperatureReadings = [
    { hour: '8AM', temp: 26 },
    { hour: '10AM', temp: 28 },
    { hour: '12PM', temp: 30 },
    { hour: '2PM', temp: 31 },
    { hour: '4PM', temp: 29 },
  ];

  const damageReportStats = [
    { day: 'Mon', reports: 1 },
    { day: 'Tue', reports: 3 },
    { day: 'Wed', reports: 0 },
    { day: 'Thu', reports: 2 },
    { day: 'Fri', reports: 1 },
  ];

  const COLORS = ['#7f00ff', '#ff7b00', '#e100ff', '#22c55e'];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header title='Pitch Manager Dashboard' />
        <div className="dashboard-content neumorphic">
          <h2 className="gradient-text">Welcome, Pitch Manager</h2>

          {/* <div className="stats-section">
            <div className="neumorphic-card">
              <h3>Total Pitches</h3>
              <p>5 Registered</p>
            </div>
            <div className="neumorphic-card">
              <h3>Today’s Bookings</h3>
              <p>4 Confirmed</p>
            </div>
            <div className="neumorphic-card">
              <h3>Maintenance Tasks</h3>
              <p>6 Pending</p>
            </div>
          </div> */}

          <div className="charts-grid">
            {/* 1. Turf Condition */}
            <div className="neumorphic-card tiny-chart">
              <h4>Turf Condition (Zone-wise)</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={turfCondition}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="health" fill="#7f00ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 2. Booking Frequency */}
            <div className="neumorphic-card tiny-chart">
              <h4>Weekly Booking Stats</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={bookingStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#ff7b00" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 3. Maintenance Pie */}
            <div className="neumorphic-card tiny-chart">
              <h4>Maintenance Status</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={maintenancePie}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {maintenancePie.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 4. Pitch Type Breakdown */}
            <div className="neumorphic-card tiny-chart">
              <h4>Pitch Types</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pitchTypes}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {pitchTypes.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 5. Rainfall */}
            <div className="neumorphic-card tiny-chart">
              <h4>Rainfall Impact</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={rainfallTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rain" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 6. Temperature Sensor Readings */}
            <div className="neumorphic-card tiny-chart">
              <h4>Temperature (°C)</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={temperatureReadings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#e100ff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 7. Damage Reports */}
            <div className="neumorphic-card tiny-chart">
              <h4>Damage Reports</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={damageReportStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reports" fill="#f43f5e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 8. Extra placeholder */}
            <div className="neumorphic-card tiny-chart">
              <h4>Irrigation Sensor Logs</h4>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={temperatureReadings.map((t, i) => ({
                  hour: t.hour,
                  water: 100 - i * 15
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="water" stroke="#4f46e5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchManagerDashboard;
