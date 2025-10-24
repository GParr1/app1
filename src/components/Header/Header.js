import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderLogo from 'components/Header/Common/HeaderLogo';
import NavLink from 'components/Header/Common/NavLink';
import NavAction from 'components/Header/Common/NavAction';
import MobileAction from 'components/Header/Common/MobileAction';

const Header = ({ user = {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="row mb-3">
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
        <HeaderLogo />
        {/* Desktop buttons */}
        <NavLink classBtn={'btn'} classContainer={'d-none d-md-flex gap-2 align-items-center'} />
        {/* Action buttons */}
        <NavAction user={user} />

        {/* Mobile menu toggle */}
        <MobileAction openMenu={() => setMenuOpen(!menuOpen)} />
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <>
          <NavLink
            classBtn={'btn btn-sm w-100 mb-2'}
            classContainer={'d-md-none mt-2 p-3 shadow-sm w-100'}
          />
          <NavAction user={user} />
        </>
      )}

      {/* Modale dinamica */}
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
