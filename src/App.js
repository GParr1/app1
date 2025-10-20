import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from 'state/auth/selectors';
import Dashboard from './View/Dashboard';
import PrivateRoute from 'components/PrivateRoute';
import Header from 'components/Header';
import MatchesView from './View/MatchesView';

function App() {
  const user = useSelector(getUser) || null;
  return (
    <Router basename="/app1">
      <div className="container mt-5">
        {/* 👈 header sempre visibile */}
        <Routes>
          {/* Se l'utente è loggato, fai il redirect alla dashboard */}
          {!user && (
            <>
              <Route path="/" element={<AuthView />} />
              <Route path="/welcome" element={<AuthView />} />
              <Route path="*" element={<AuthView />} />
            </>
          )}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Header user={user} />
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/partite"
            element={
              <PrivateRoute>
                <Header user={user} />
                <MatchesView user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Header user={user} />
                <MyAccountView user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/confirm-profile"
            element={
              <PrivateRoute>
                <Header user={user} />
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
