import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from 'state/auth/selectors';
import Dashboard from './View/Dashboard';
import LoadingOverlay from 'components/LoadingOverlay';
import { isLoading } from 'state/support/selectors';
import PrivateRoute from 'components/PrivateRoute';

function App() {
  const user = useSelector(getUser) || null;
  const loading = useSelector(isLoading) || false;
  return (
    <Router basename="/app1">
      <div className="container mt-5">
        <Routes>
          <Route path={['/', '/welcome', '*']} element={<AuthView />} />
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
      {loading && <LoadingOverlay />}
    </Router>
  );
}

export default App;
