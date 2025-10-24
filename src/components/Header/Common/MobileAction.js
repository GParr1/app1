import React from 'react';

const MobileAction = ({ openMenu }) => {
  return (
    <div className="d-flex d-md-none">
      <button className="btn btn-secondary" onClick={openMenu} aria-label="Apri menu">
        <i className="bi bi-list"></i>
      </button>
    </div>
  );
};
export default MobileAction;
