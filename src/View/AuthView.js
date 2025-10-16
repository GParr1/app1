import { useState } from 'react';
import Login from 'components/Login';
import { labels } from 'properties/authView';
import { doGoogleLogin } from 'utils/authUtils';

export const AuthView = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5 col-md-6">
      <h1 className="text-center mb-4" id="welcome-heading">
        {labels.welcome}
      </h1>

      {/* Pulsanti Social */}
      <div className="d-flex gap-2 mb-4 flex-wrap justify-content-center">
        <button className="btn btn-light btn-social" onClick={async () => await doGoogleLogin()}>
          <i className="bi bi-google"></i>
        </button>
        <button className="btn btn-light btn-social">
          <i className="bi bi-facebook"></i>
        </button>
        <button className="btn btn-light btn-social">
          <i className="bi bi-apple"></i>
        </button>
        <button className="btn btn-light btn-social">
          <i className="bi bi-steam"></i>
        </button>
        <button className="btn btn-success btn-social">
          <i className="bi bi-xbox"></i>
        </button>
        <button className="btn btn-primary btn-social">
          <i className="bi bi-playstation"></i>
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
