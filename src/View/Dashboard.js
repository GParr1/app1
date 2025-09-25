import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Benvenuto {user.name}</h1>
      <h1>Benvenuto {user.firstName}</h1>
      <p>Email: {user.email}</p>
      <p>ID utente (dal DB): {user.id}</p>
    </div>
  );
};
export default Dashboard;
