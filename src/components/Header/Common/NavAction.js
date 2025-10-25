import React from 'react';
import LogoutBtn from 'components/Header/Common/LogoutBtn';

const NavAction = () => {
  return (
    <>
      <div className="d-none d-md-flex gap-2 align-items-center">
        <button className="btn" onClick={() => console.log('setting')} aria-label="impostazioni">
          <i className="bi bi-gear"></i>
        </button>
        <LogoutBtn />
      </div>
    </>
  );
};

export default NavAction;
