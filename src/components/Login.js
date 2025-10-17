import React, { useState } from 'react';
import { doGoogleLogin, doSignInWithEmailAndPassword } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';

const Login = ({ email, setEmail }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async provider => {
    setError('');
    setSuccess('');
    let userObj;
    switch (provider) {
      case 'google':
        userObj = await doGoogleLogin();
        break;
      case 'credential':
        userObj = await doSignInWithEmailAndPassword({ credentials: { email, password } });
        break;
      default:
    }

    if (userObj) {
      if (userObj.customerInfo?.overall) navigate('/profile', { replace: true });
      else navigate('/confirm-profile', { replace: true });
    } else {
      setError('Errore durante il login');
    }
  };

  return (
    <div className="w-100  bg-secondary-bg p-4">
      {email && (
        <>
          <h4 className="text-center">Inserisci la password di ad*****@blank.com</h4>
          <div className="mb-3">
            <label className="otklabel label-uppercase" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              aria-describedby="password-form-hint"
              placeholder="Inserisci la password"
              autoCorrect="off"
              autoCapitalize="off"
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            onClick={async () => {
              await handleLogin('credential');
            }}
          >
            ACCEDI
          </button>
        </>
      )}

      {!email && (
        <form
          onSubmit={e => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-primary-text">
              Telefono o Email
            </label>
            <input
              type="text"
              id={email}
              className="form-control bg-primary-bg text-primary-text border-secondary-color"
              placeholder="Inserisci numero di telefono o e-mail"
              value={email}
              //onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label text-primary-text" htmlFor="rememberMe">
              Ricordami
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            AVANTI
          </button>
        </form>
      )}

      {error && <p className="mt-2 text-danger text-center">{error}</p>}
      {success && <p className="mt-2 text-success text-center">{success}</p>}
    </div>
  );
};

export default Login;
