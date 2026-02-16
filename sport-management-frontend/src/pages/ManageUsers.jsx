import React from 'react';

const ManageUsers = () => {
  return (
    <div style={{ marginLeft: '240px', padding: '40px' }}>
      <h2>Manage Users</h2>
      <table border="1" cellPadding="10" style={{ background: '#fff' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Srijon Karmakar</td>
            <td>Player</td>
            <td>Active</td>
            <td><button>Ban</button></td>
          </tr>
          <tr>
            <td>John Club</td>
            <td>Club</td>
            <td>Active</td>
            <td><button>Ban</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
