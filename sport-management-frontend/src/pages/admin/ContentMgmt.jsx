import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import NmdHeader from '../../components/NmdHeader';
import './ContentMgmt.css';

const mockContent = [
  { id: 1, title: 'Training Tips for Runners', type: 'Article', status: 'Published', date: '2025-07-08' },
  { id: 2, title: 'Player of the Month – June', type: 'Highlight', status: 'Draft', date: '2025-07-07' },
  { id: 3, title: 'Healthy Diet Plan for Athletes', type: 'Blog', status: 'Published', date: '2025-07-06' },
  { id: 4, title: 'AI Talent Scouting Demo', type: 'Video', status: 'Draft', date: '2025-07-05' },
];

const ContentManagement = () => {
  const [contentList, setContentList] = useState(mockContent);

  const toggleStatus = (id) => {
    const updated = contentList.map(item =>
      item.id === id
        ? { ...item, status: item.status === 'Published' ? 'Draft' : 'Published' }
        : item
    );
    setContentList(updated);
  };

  const handleDelete = (id) => {
    const filtered = contentList.filter(item => item.id !== id);
    setContentList(filtered);
  };

  const handleEdit = (id) => {
    alert(`Edit content with ID: ${id}`);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <NmdHeader title="Content Management" />
        <div className="content-table-container neumorphic">
          <table className="content-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Published On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentList.map((content, index) => (
                <tr key={content.id}>
                  <td>{index + 1}</td>
                  <td>{content.title}</td>
                  <td>{content.type}</td>
                  <td>
                    <span
                      className={`status ${content.status.toLowerCase()}`}
                      onClick={() => toggleStatus(content.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {content.status}
                    </span>
                  </td>
                  <td>{content.date}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(content.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(content.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {contentList.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No content available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
