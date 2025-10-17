import React, { useState } from 'react';
import Login from 'components/Login';
import { labels } from 'properties/authView';
import { doGoogleLogin } from 'utils/authUtils';

export const AuthView = () => {
  const [email, setEamil] = useState(null);
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5 col-md-6">
      <HeaderAuthView label={email ? 'Inserisci la password' : labels.welcome} />

      {!email && (
        <>
          {/* Pulsanti Social */}
          <SocialLogin />
          {/* Divider */}
          <DividerLogin />
        </>
      )}

      {/* Login / Register Tabs */}
      <Login setEamil={setEamil} enail={email} />
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
    </div>
  );
};

const HeaderAuthView = label => (
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
      {label}
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
