import React, { useState } from 'react';
import { doGoogleLogin, doSignInWithEmailAndPassword } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSetEmail = () => {
    const value = document.querySelector('#email')?.value;
    setEmail(value);
  };
  const handleLogin = async () => {
    setError('');
    setSuccess('');
    const userObj = await doSignInWithEmailAndPassword({ credentials: { email, password } });

    if (userObj) {
      if (userObj.customerInfo?.overall) navigate('/profile', { replace: true });
      else navigate('/confirm-profile', { replace: true });
    } else {
      setError('Errore durante il login');
    }
  };

  return (
    <>
      <HeaderAuthView message={email ? 'Inserisci la password' : 'Accedi al tuo account'} />
      {!email && (
        <>
          {/* Pulsanti Social */}
          <SocialLogin />
          {/* Divider */}
          <DividerLogin />
        </>
      )}
      <div className="w-100  bg-secondary-bg p-4">
        {email && <LoginStepPassword email={email} cta={handleLogin} setPassword={setPassword} />}

        {!email && <LoginStepEmail error={error} cta={handleSetEmail} />}

        {error && <p className="mt-2 text-danger text-center">{error}</p>}
        {success && <p className="mt-2 text-success text-center">{success}</p>}
      </div>
      {!email && (
        <>
          <button
            type="button"
            className="btn btn-secondary w-100"
            //           onClick={() => navigate('/create-account', { replace: true })}
          >
            CREA ACCOUNT
          </button>
          <div className="text-center mb-3">
            <a href={'#password'} className="text-primary-color text-decoration-none">
              Hai dimenticato la password o devi crearne una nuova?
            </a>
          </div>
        </>
      )}
    </>
  );
};

const LoginStepEmail = ({ error, cta }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-primary-text">
          Telefono o Email
        </label>
        <input
          type="text"
          id={'email'}
          className="form-control bg-primary-bg text-primary-text border-secondary-color"
          placeholder="Inserisci numero di telefono o e-mail"
          required
        />
        {error && <p className="mt-2 text-danger text-center">{error}</p>}
      </div>
      <button className="btn btn-primary w-100 mb-3" onClick={() => cta}>
        AVANTI
      </button>
    </>
  );
};
const maskEmail = email => {
  const [name, domain] = email.split('@');
  if (!name || !domain) return email;

  const visible = name.slice(0, 2); // prime 2 lettere
  return `${visible}${'*'.repeat(5)}@${domain}`;
};
const LoginStepPassword = ({ email, cta, setPassword }) => {
  return (
    <>
      <h4 className="text-center">Inserisci la password di {maskEmail(email)}</h4>
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
          await cta();
        }}
      >
        ACCEDI
      </button>
    </>
  );
};
const HeaderAuthView = ({ message }) => (
  <>
    <img
      className="header zoom05"
      aria-hidden="true"
      src="/app1/assets/logo.png"
      fetchPriority={'high'}
      alt={'logo'}
      decoding="async"
    />
    <h1 className="text-center mb-4" id="welcome-heading">
      {message}
    </h1>
  </>
);
const SocialLogin = () => (
  <div className="d-flex gap-2 mb-4 flex-wrap justify-content-center">
    <button className="btn btn-secondary btn-social" onClick={async () => await doGoogleLogin()}>
      <i className="bi bi-google">
        <span> Google</span>
      </i>
    </button>
    <button className="btn btn-secondary btn-social">
      <i className="bi bi-facebook">
        <span> Facebook</span>
      </i>
    </button>
  </div>
);
const DividerLogin = () => (
  <div className="d-flex align-items-center gap-2 w-100 mb-4">
    <hr className="flex-grow-1" />
    <span>o</span>
    <hr className="flex-grow-1" />
  </div>
);

export default Login;
