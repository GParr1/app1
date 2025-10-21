import React from 'react';

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
export default SocialLogin;
