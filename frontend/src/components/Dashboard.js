import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        setError('Failed to load user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}</h1>
        <button onClick={onLogout} className="btn btn-logout">Logout</button>
      </header>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Profile Information</h2>
          <div className="user-info">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Account Created:</strong> {user?.created_at && new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="protected-content">
          <h2>Protected Content</h2>
          <p>This is your private dashboard. Only authenticated users can see this content.</p>
          <p>You have successfully implemented a microservices architecture with:</p>
          <ul>
            <li>Frontend (React)</li>
            <li>Backend (Node.js/Express)</li>
            <li>Database (MongoDB)</li>
            <li>Docker containerization</li>
            <li>Kubernetes orchestration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;