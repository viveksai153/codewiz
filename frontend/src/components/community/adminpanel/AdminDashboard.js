import React from 'react';
import './AdminDashboard.css';
 
import ContentModeration from './ContentModeration';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-sections">
        <UserManagement />
        <ContentModeration />
      </div>
    </div>
  );
};

export default AdminDashboard;
