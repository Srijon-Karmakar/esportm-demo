import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import NmdHeader from '../../components/NmdHeader';
import './UserMgmt.css';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Player' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Coach' },
  { id: 3, name: 'Bob Marley', email: 'bob@example.com', role: 'Manager' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleDelete = (id) => {
    const filtered = users.filter(user => user.id !== id);
    setUsers(filtered);
  };

  const handleEditRole = (id) => {
    const newRole = prompt('Enter new role:');
    if (newRole) {
      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <NmdHeader title="User Management" />
        <div className="user-table-container neumorphic">
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="view-btn">View</button>
                    <button className="edit-btn" onClick={() => handleEditRole(user.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No users available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
