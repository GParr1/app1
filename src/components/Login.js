import React, { useState } from 'react';
import { doGoogleLogin, doSignInWithEmailAndPassword } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async provider => {
    setError('');
    setSuccess('');
    const credentials = { email, password };
    let userObj;

    switch (provider) {
      case 'google':
        userObj = await doGoogleLogin();
        break;
      case 'credential':
        userObj = await doSignInWithEmailAndPassword({ credentials });
        break;
      default:
        return;
    }

    if (userObj) {
      if (userObj.customerInfo?.overall) {
        navigate('/profile', { replace: true });
      } else {
        navigate('/confirm-profile', { replace: true });
      }
    } else {
      setError('Errore durante il login');
    }
  };

  return (
    <div className="card shadow-sm border-primary">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Login</h2>

        <button
          id="google-login"
          onClick={() => handleLogin('google')}
          className="btn btn-outline-danger w-100 mb-3"
        >
          <i className="bi bi-google me-2"></i> Accedi con Google
        </button>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleLogin('credential');
          }}
        >
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Accedi
          </button>
        </form>

        {error && <p className="mt-3 text-danger text-center">{error}</p>}
        {success && <p className="mt-3 text-success text-center">{success}</p>}
      </div>
    </div>
  );
};

export default Login;
