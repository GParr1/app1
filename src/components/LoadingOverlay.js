import React from 'react';

const LoadingOverlay = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
    <div className="spinner-border text-primary" role="status" aria-label="Caricamento in corso">
      <span className="visually-hidden">Caricamento...</span>
    </div>
  </div>
);

export default LoadingOverlay;
