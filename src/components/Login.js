import React, { useState } from 'react';
import { doSignInWithEmailAndPassword } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const credentials = { email, password };
    const response = await doSignInWithEmailAndPassword({ credentials });
    if (response.result) {
      if (response.currentUser.displayName) {
        navigate('/profile', { replace: true });
      } else {
        navigate('/confirm-profile', { replace: true });
      }
    } else {
      setError(response.error.message);
    }
  };
  const handleGooglePopup = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="row">
      {/* Login */}
      <div className="mb-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            <button onClick={handleGooglePopup} className="btn btn-outline-danger">
              <i className="bi bi-google me-2"></i> Accedi con Google
            </button>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
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
