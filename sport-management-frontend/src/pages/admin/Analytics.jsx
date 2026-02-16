import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import NmdHeader from '../../components/NmdHeader';
import './Analytics.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 30 },
  { month: 'Feb', users: 80 },
  { month: 'Mar', users: 150 },
  { month: 'Apr', users: 200 },
  { month: 'May', users: 300 },
  { month: 'Jun', users: 450 },
  { month: 'Jul', users: 600 },
];

const paymentData = [
  { month: 'Jan', revenue: 120 },
  { month: 'Feb', revenue: 240 },
  { month: 'Mar', revenue: 310 },
  { month: 'Apr', revenue: 400 },
  { month: 'May', revenue: 550 },
  { month: 'Jun', revenue: 620 },
  { month: 'Jul', revenue: 700 },
];

const userTypeData = [
  { name: 'Players', value: 400 },
  { name: 'Coaches', value: 150 },
  { name: 'Managers', value: 100 },
  { name: 'Clubs', value: 80 },
];

const COLORS = ['#5c4db1', '#8b78e6', '#a597f5', '#c6bfff'];

const Analytics = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <NmdHeader title="Analytics" />

        <div className="analytics-grid">
          {/* User Growth Line Chart */}
          <div className="chart-card neumorphic">
            <h3>User Growth Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#5c4db1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Bar Chart */}
          <div className="chart-card neumorphic">
            <h3>Monthly Revenue ($)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8b78e6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Types Pie Chart */}
          <div className="chart-card neumorphic">
            <h3>User Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
