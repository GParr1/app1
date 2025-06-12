import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from 'state/auth/selectors';

function App() {
  const user = useSelector(getUser);

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          {/* Welcome page */}
          <Route path="/welcome.html" element={<AuthView />} />

          {/* Profilo completo */}
          <Route path="/profile.html" element={<MyAccountView user={user} />} />

          {/* Profilo incompleto */}
          <Route path="/confirm-profile.html" element={<ConfirmProfileView />} />

          {/* Redirect logico in base all'utente */}
          <Route
            path="/"
            element={
              user ? (
                user.displayName ? (
                  <Navigate to="/profile.html" replace />
                ) : (
                  <Navigate to="/confirm-profile.html" replace />
                )
              ) : (
                <Navigate to="/welcome.html" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
