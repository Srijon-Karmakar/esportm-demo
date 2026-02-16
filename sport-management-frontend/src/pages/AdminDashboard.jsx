// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import NmdHeader from '../components/NmdHeader';
import './AdminDashboard.css';

const stats = [
  { label: 'Total Users', value: 1254 },
  { label: 'Active Users', value: 940 },
  { label: 'New This Month', value: 120 },
  { label: 'Storage Used', value: '312 GB' },
  { label: 'Blocked Users', value: 14 },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats([
          { label: 'Total Users', value: data.totalUsers },
          { label: 'Active Users', value: data.activeUsers },
          { label: 'New This Month', value: data.newThisMonth },
          { label: 'Storage Used', value: data.storageUsed },
          { label: 'Blocked Users', value: data.blockedUsers }
        ]);
      });
  }, []);
  return (
    <div className="admin-wrapper">
      <AdminSidebar />
      <main className="admin-main">
        <NmdHeader title="Admin Dashboard" />

        <section className="stats-grid">
          {stats.map(({ label, value }) => (
            <div key={label} className="stat-card neumorphic">
              <h4>{label}</h4>
              <p>{value}</p>
            </div>
          ))}
        </section>

        <section className="admin-features neumorphic">
          <h3 className="gradient-text">Admin Tools</h3>
          <div className="features-grid">
            <button className="feature-btn neumorphic">Block / Unblock Users</button>
            <button className="feature-btn neumorphic">View Activity Logs</button>
            <button className="feature-btn neumorphic">Storage Management</button>
            <button className="feature-btn neumorphic">Manage Roles & Permissions</button>
            <button className="feature-btn neumorphic">System Settings</button>

            <button className="feature-btn neumorphic" onClick={() => navigate('/admin/demo-requests')}>
  View Demo Bookings
</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
