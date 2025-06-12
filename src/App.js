import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from 'state/auth/selectors';
import { RedirectOnLogin } from 'utils/RedirectOnLogin';

function App() {
  const user = useSelector(getUser);

  return (
    <Router basename="/app1">
      <div className="container mt-5">
        <Routes>
          <Route path="/welcome" element={<AuthView />} />
          <Route path="/profile" element={<MyAccountView user={user} />} />
          <Route path="/confirm-profile" element={<ConfirmProfileView />} />
          <Route path="/" element={<RedirectOnLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
