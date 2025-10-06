import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { doSignOut } from 'utils/authUtils';
import UpdateImageModal from './UpdateImageModal'; // componente modal che implementi altrove

const Header = ({ user = {} }) => {
  const [showModalUpdateImage, setShowModalUpdateImage] = useState(false);

  const displayName = user?.userLogin?.displayName ?? 'Utente';

  const handleToggleModal = useCallback(() => {
    setShowModalUpdateImage(prev => !prev);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModalUpdateImage(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    await doSignOut();
  }, []);

  return (
    <header className="row mb-3">
      <div className="d-flex justify-content-between align-items-center w-100">
        <h1 className="h4 m-0">Benvenuto {displayName}</h1>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn"
            onClick={handleToggleModal}
            aria-label="Cambia immagine del profilo"
            aria-expanded={showModalUpdateImage}
          >
            {/* SVG */}
          </button>

          <button
            type="button"
            className="btn"
            onClick={handleSignOut}
            aria-label="Esci dal profilo"
          >
            {/* SVG */}
          </button>
        </div>
      </div>

      {/* Condizionale: solo se showModalUpdateImage è true */}
      {showModalUpdateImage && (
        <UpdateImageModal open={showModalUpdateImage} onClose={handleCloseModal} />
      )}
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
