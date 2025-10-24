import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { doSignOut, handleSaveFormUser } from 'utils/authUtils';
import UploadProfilePicture from 'components/UploadProfilePicture';
import FormUser from 'components/FormUser';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from 'components/Header/Common/HeaderLogo';
import LogoutBtn from 'components/Header/Common/LogoutBtn';

const Header = ({ user = {} }) => {
  const handleSignOut = useCallback(async () => {
    await doSignOut();
  }, []);

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

Header.propTypes = {
  user: PropTypes.shape({
    userLogin: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }),
};

export default Header;
