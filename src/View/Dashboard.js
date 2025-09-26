import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Benvenuto {user.displayName}</h1>

      {Object.keys(user).map((key) => (
        <p key={key}>
          {key}: {typeof user[key] === 'object' ? JSON.stringify(user[key]) : user[key]}
        </p>
      ))}
    </div>
  );
};
export default Dashboard;
