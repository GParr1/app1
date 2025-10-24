import React from 'react';
import HeaderLogo from 'components/Header/Common/HeaderLogo';
import LogoutBtn from 'components/Header/Common/LogoutBtn';

const HeaderOnlyLogout = () => {
  return (
    <header className="row mb-3">
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
        <HeaderLogo />
        <div className=" d-md-flex gap-2 align-items-center">
          <LogoutBtn />
        </div>
      </div>
    </header>
  );
};

export default HeaderOnlyLogout;
