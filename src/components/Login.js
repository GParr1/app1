import React, { useState } from 'react';
import { doGoogleLogin, doSignInWithEmailAndPassword } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const password = '';
  //const [password, setPassword] = useState('');
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
    <div className="card shadow-sm border-primary bg-secondary-bg">
      <div className="card-body">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleLogin('credential');
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
              onChange={e => setEmail(e.target.value)}
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

        <div className="text-center mb-3">
          <a href="#" className="text-primary-color text-decoration-none">
            Hai dimenticato la password o devi crearne una nuova?
          </a>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary w-100"
          onClick={() => navigate('/create-account', { replace: true })}
        >
          CREA ACCOUNT
        </button>

        {error && <p className="mt-2 text-danger text-center">{error}</p>}
        {success && <p className="mt-2 text-success text-center">{success}</p>}
      </div>
    </div>
  );
};

export default Login;
