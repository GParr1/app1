import { useState } from 'react';
import Login from 'components/Login';
import Register from 'components/Register';
import { labels } from 'properties/authView';

export const AuthView = () => {
  const [activeTab, setActiveTab] = useState('login');
  return (
    <div className="container mt-5 col-md-8">
      <h1 className="text-center mb-4" id="welcome-heading">
        {labels.welcome}
      </h1>
      {/* Tab Navigation */}
      <ul
        role="tablist"
        className="nav nav-tabs justify-content-center mb-4"
        aria-label="Selezione autenticazione"
      >
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
            id="login-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === 'login'}
            aria-controls="login-panel"
            onClick={() => setActiveTab('login')}
          >
            {labels.loginTab}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
            id="register-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === 'register'}
            aria-controls="register-panel"
            onClick={() => setActiveTab('register')}
          >
            {labels.registerTab}
          </button>
        </li>
      </ul>

      {/* Tab Panels */}
      <div className="tab-content" id="authTabsContent">
        {activeTab === 'login' && (
          <div
            className="tab-pane fade show active d-flex justify-content-center"
            id="login-panel"
            role="tabpanel"
            aria-labelledby="login-tab"
          >
            <div className="col-md-6">
              <Login />
            </div>
          </div>
        )}
        {activeTab === 'register' && (
          <div
            className="tab-pane fade show active d-flex justify-content-center"
            id="register-panel"
            role="tabpanel"
            aria-labelledby="register-tab"
          >
            <div className="col-md-6">
              <Register />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
