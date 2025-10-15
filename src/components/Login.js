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
    //e.preventDefault();
    setError('');
    setSuccess('');
    const credentials = { email, password };
    let userObj;
    switch (provider) {
      case 'google': {
        userObj = await doGoogleLogin();
        break;
      }
      case 'credential': {
        userObj = await doSignInWithEmailAndPassword({ credentials });
        break;
      }
      default:
    }

    if (userObj) {
      if (userObj.customerInfo?.overall) {
        navigate('/profile', { replace: true });
      } else {
        navigate('/confirm-profile', { replace: true });
      }
    } else {
      setError('Errore durante la login');
    }
  };

  return (
    <div className="row">
      {/* Login */}
      <div className="mb-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            <button
              id="google-login"
              onClick={() => handleLogin('google')}
              className="btn btn-outline-danger"
            >
              <i className="bi bi-google me-2"></i> Accedi con Google
            </button>
            <form onSubmit={() => handleLogin('credential')}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button id="credential-login" className="btn btn-primary w-100" type="submit">
                Accedi
              </button>
            </form>
            {error && <p className="mt-2 text-danger">{error}</p>}
            {success && <p className="mt-2 text-success">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
