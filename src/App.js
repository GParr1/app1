import React from 'react';
import { AuthView } from './View/AuthView';
import { useSelector } from 'react-redux';
import { ConfirmProfileView } from './View/ConfirmProfileView';
import { MyAccountView } from './View/MyAccountView';
import { getUser } from './state/auth/selectors';

function App() {
  const user = useSelector(getUser);
  return (
    <div className="container mt-5">
      {user ? (
        <div>
          {user.displayName && <MyAccountView user={user} />}

          {/* Se manca displayName → mostra il form per completare il profilo */}
          {!user.displayName && <ConfirmProfileView />}
        </div>
      ) : (
        <AuthView />
      )}
    </div>
  );
}

export default App;
