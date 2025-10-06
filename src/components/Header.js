import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { doSignOut } from 'utils/authUtils';
import UploadProfilePicture from 'components/UploadProfilePicture';

const Header = ({ user = {} }) => {
  const [showModalUpdateImage, setShowModalUpdateImage] = useState(false);

  const displayName = user?.userLogin?.displayName ?? 'Utente';

  const handleToggleModal = useCallback(() => {
    setShowModalUpdateImage(prev => !prev);
  }, []);

  const handleSignOut = useCallback(async () => {
    await doSignOut();
  }, []);

  return (
    <header className="row mb-3">
      <div className="d-flex justify-content-between align-items-center w-100">
        <h1 className="m-0">Benvenuto {displayName}</h1>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn"
            onClick={handleToggleModal}
            aria-label="Cambia immagine del profilo"
            aria-expanded={showModalUpdateImage}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="false"
            >
              <title>Cambia immagine del profilo</title>
              <path
                d="M5 20h14a2 2 0 0 0 2-2v-7l-3-3h-4l-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <circle cx="12" cy="13" r="3" stroke="#2563EB" strokeWidth="2"></circle>
            </svg>
          </button>

          <button
            type="button"
            className="btn"
            onClick={handleSignOut}
            aria-label="Esci dal profilo"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="false"
            >
              <title>Esci dal profilo</title>
              <path
                d="M16 17L21 12L16 7"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M21 12H9"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Condizionale: solo se showModalUpdateImage è true */}
      {/* Bootstrap Modal */}
      {showModalUpdateImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Carica la tua immagine</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Chiudi"
                  onClick={handleToggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <UploadProfilePicture />
              </div>
            </div>
          </div>
        </div>
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
