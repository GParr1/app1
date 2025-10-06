import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from 'state/auth/selectors';
import Dashboard from './View/Dashboard';
import PrivateRoute from 'components/PrivateRoute';

function App() {
  const user = useSelector(getUser) || null;
  return (
    <Router basename="/app1">
      <div className="container mt-5">
        <Header user={user} /> {/* 👈 header sempre visibile */}
        <Routes>
          <Route path="/" element={<AuthView />} />
          <Route path="/welcome" element={<AuthView />} />
          <Route path="*" element={<AuthView />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MyAccountView user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/confirm-profile"
            element={
              <PrivateRoute>
                <ConfirmProfileView user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
