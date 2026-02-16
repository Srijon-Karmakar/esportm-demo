import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import NmdHeader from '../../components/NmdHeader';
import './Payments.css';

const mockPayments = [
  { id: 1, user: 'John Doe', email: 'john@example.com', amount: 49.99, status: 'Success', date: '2025-07-09' },
  { id: 2, user: 'Jane Smith', email: 'jane@example.com', amount: 99.99, status: 'Pending', date: '2025-07-08' },
  { id: 3, user: 'Alice Brown', email: 'alice@example.com', amount: 29.99, status: 'Failed', date: '2025-07-07' },
  { id: 4, user: 'Bob Marley', email: 'bob@example.com', amount: 59.99, status: 'Success', date: '2025-07-06' },
];

const Payments = () => {
  const [payments] = useState(mockPayments);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <NmdHeader title="Payments" />
        <div className="payment-table-container neumorphic">
          <table className="payment-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Amount ($)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{index + 1}</td>
                  <td>{payment.user}</td>
                  <td>{payment.email}</td>
                  <td>{payment.amount.toFixed(2)}</td>
                  <td>
                    <span className={`status ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.date}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No payment records available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
