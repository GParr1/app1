import { useState } from 'react';
import Login from 'components/Login';
import { labels } from 'properties/authView';
import { doGoogleLogin } from 'utils/authUtils';

export const AuthView = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5 col-md-6">
      <img
        className="header"
        aria-hidden="true"
        src="/app1/assets/logo.png"
        fetchPriority={'high'}
        alt={'logo'}
        decoding="async"
      />
      <h1 className="text-center mb-4" id="welcome-heading">
        {labels.welcome}
      </h1>

      {/* Pulsanti Social */}
      <div className="d-flex gap-2 mb-4 flex-wrap justify-content-center">
        <button
          className="btn btn-secondary btn-social"
          onClick={async () => await doGoogleLogin()}
        >
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

      {/* Divider */}
      <div className="d-flex align-items-center gap-2 w-100 mb-4">
        <hr className="flex-grow-1" />
        <span>o</span>
        <hr className="flex-grow-1" />
      </div>

      {/* Login / Register Tabs */}
      <Login />
      <button
        className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
        type="button"
        onClick={() => setActiveTab('register')}
      >
        {labels.registerTab}
      </button>
    </div>
  );
};
