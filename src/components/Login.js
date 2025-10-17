import React, { useState } from 'react';
import { doFirebaseLogin } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { emailRegex, phoneRegex } from 'utils/regex';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSetEmail = () => {
    const emailOrPhone = document.querySelector('#email')?.value;
    if (!emailOrPhone) {
      setError("Inserisci un numero di telefono o un'email.");
    } else if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Formato non valido. Inserisci un'email o un numero corretto.");
    } else {
      setError('');
      setEmail(emailOrPhone);
    }
  };
  const handleLogin = async ({ action }) => {
    setError('');
    setSuccess('');
    const { errorMessage } = await doFirebaseLogin({ action, options: { email, password } });
    errorMessage && setError(errorMessage);
    !errorMessage && navigate('/profile', { replace: true });
  };

  return (
    <>
      <HeaderAuthView message={email ? 'Inserisci la password' : 'Accedi al tuo account'} />
      {!email && (
        <>
          {/* Pulsanti Social */}
          <SocialLogin handleLogin={handleLogin} />
          {/* Divider */}
          <DividerLogin />
        </>
      )}
      <div className="w-100  bg-secondary-bg p-4">
        {email && (
          <LoginStepPassword
            email={email}
            cta={() => handleLogin({ action: 'email' })}
            setPassword={setPassword}
          />
        )}

        {!email && <LoginStepEmail error={error} handleSetEmail={handleSetEmail} />}

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

const LoginStepEmail = ({ error, handleSetEmail }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-primary-text">
          Telefono o Email
        </label>
        <input
          type="text"
          id={'email'}
          className={`form-control bg-primary-bg text-primary-text border-secondary-color ${
            error ? 'is-invalid' : ''
          }`}
          placeholder="Inserisci numero di telefono o e-mail"
          required
        />
        <div className={`invalid-feedback text-center ${error ? 'd-block' : ''}`}>{error}</div>
      </div>
      <button className="btn btn-primary w-100 mb-3" onClick={() => handleSetEmail()}>
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
        <label className="text-uppercase form-label text-primary-text" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control bg-primary-bg text-primary-text border-secondary-color"
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
const SocialLogin = ({ handleLogin }) => (
  <div className="d-flex gap-2 mb-4 flex-wrap justify-content-center">
    <button
      className="btn btn-secondary btn-social"
      onClick={async () => await handleLogin({ action: 'google' })}
    >
      <i className="bi bi-google">
        <span> Google</span>
      </i>
    </button>
    <button
      className="btn btn-secondary btn-social"
      onClick={async () => await handleLogin({ action: 'facebook' })}
    >
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
