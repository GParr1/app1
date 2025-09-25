import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from 'state/auth/selectors';
import { RedirectOnLogin } from 'utils/RedirectOnLogin';
import './App.css';
import { getApps } from 'firebase/app';
import Dashboard from './View/Dashboard';

function App() {
  const user = useSelector(getUser) || null;
  console.log('Firebase apps:', getApps());
  return (
    <Router basename="/app1">
      <div className="container mt-5">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/welcome" element={<AuthView user={user} />} />
          <Route path="/profile" element={<MyAccountView user={user} />} />
          <Route path="/confirm-profile" element={<ConfirmProfileView user={user} />} />
          <Route path="/" element={<RedirectOnLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
