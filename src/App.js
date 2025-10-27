import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from 'state/auth/selectors';
import { ResetPasswordView } from './View/ResetPasswordView';
import Dashboard from './View/Dashboard';
import PrivateRoute from 'components/PrivateRoute';
import Header from 'components/Header/Header';
import MatchesView from './View/MatchesView';
import HeaderOnlyLogout from 'components/Header/HeaderOnlylogout';

function App() {
  const user = useSelector(getUser) || null;
  return (
    <Router
      basename="/app1"
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <div className="container ">
        {/* 👈 header sempre visibile */}
        <Routes>
          {/* Se l'utente è loggato, fai il redirect alla dashboard */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/welcome" replace />
            }
          />
          <Route path="/welcome" element={<AuthView />} />
          <Route path="/reset-password" element={<ResetPasswordView />} />
          <Route path="/create-account" element={<AuthView register={true} />} />
          <Route
            path="*"
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/welcome" replace />
            }
          />

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
                <HeaderOnlyLogout />
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
