// src/pages/Profile.js

import React from 'react';
import { useAuth } from '../context/AuthContext1';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user details or options here */}
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
