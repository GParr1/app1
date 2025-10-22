import React from 'react';

const HeaderAuthView = ({ message }) => (
  <>
    <img
      className="header zoom05"
      aria-hidden="true"
      data-testid={'logo-img'}
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
export default HeaderAuthView;
