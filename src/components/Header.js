import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { doSignOut, handleSaveFormUser } from 'utils/authUtils';
import UploadProfilePicture from 'components/UploadProfilePicture';
import FormUser from 'components/FormUser';
import { useNavigate } from 'react-router-dom';

const Header = ({ user = {} }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'image' | 'profile' | null
  const [menuOpen, setMenuOpen] = useState(false);
  const displayName = user?.userLogin?.displayName ?? 'Utente';

  const openModal = useCallback(type => {
    setActiveModal(type);
    setMenuOpen(false); // chiude il menu mobile se aperto
  }, []);

  const closeModal = useCallback(() => setActiveModal(null), []);

  const handleSignOut = useCallback(async () => {
    await doSignOut();
  }, []);

  const handleSave = useCallback(
    async evt => {
      try {
        window.calcetto?.toggleSpinner?.(true);
        await handleSaveFormUser(evt, user);
        closeModal();
      } catch (error) {
        console.error('Errore durante il salvataggio del profilo:', error);
      } finally {
        window.calcetto?.toggleSpinner?.(false);
      }
    },
    [user, closeModal],
  );

  return (
    <header className="row mb-3">
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
        <div className="d-flex align-items-center">
          <img
            className="header zoom02"
            aria-hidden="true"
            alt="logo"
            decoding="async"
            src="/app1/assets/logo.png"
          />
          <h1 className="m-0 flex-grow-1">Benvenuto {displayName}</h1>
        </div>
        {/* Desktop buttons */}
        <div className="d-none d-md-flex gap-2 align-items-center">
          <button className="btn" onClick={() => navigate('dashboard')}>
            Home
          </button>
          <button className="btn" onClick={() => navigate('profile')}>
            Profilo
          </button>
          <button className="btn" onClick={() => navigate('partite')}>
            Partite
          </button>
        </div>
        <div className="d-none d-md-flex gap-2 align-items-center">
          <button
            className="btn"
            onClick={() => openModal('profile')}
            aria-label="Completa il tuo profilo"
          >
            <i className="bi bi-person"></i>
          </button>
          <button
            className="btn"
            onClick={() => openModal('image')}
            aria-label="Cambia immagine del profilo"
          >
            <i className="bi bi-image"></i>️
          </button>
          <button className="btn" onClick={handleSignOut} aria-label="Esci dal profilo">
            <i className="bi bi-box-arrow-right"></i>️
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="d-flex d-md-none">
          <button className="btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="d-md-none mt-2 bg-light p-3 rounded shadow-sm w-100">
          <button className="btn btn-sm w-100 mb-2" onClick={() => navigate('dashboard')}>
            Home
          </button>
          <button className="btn btn-sm w-100 mb-2" onClick={() => navigate('profile')}>
            Profilo
          </button>
          <button className="btn btn-sm w-100 mb-2" onClick={() => navigate('profile')}>
            Partite
          </button>
          <button className="btn btn-sm w-100 mb-2" onClick={() => openModal('profile')}>
            Modifica profilo
          </button>
          <button className="btn btn-sm w-100 mb-2" onClick={() => openModal('image')}>
            Cambia immagine
          </button>
          <button className="btn btn-sm btn-danger w-100" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      )}

      {/* Modale dinamica */}
      {activeModal && (
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
                <h5 className="modal-title">
                  {activeModal === 'image' ? 'Carica la tua immagine' : 'Completa il tuo profilo'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Chiudi"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                {activeModal === 'image' ? (
                  <UploadProfilePicture user={user} />
                ) : (
                  <FormUser id="updateProfile" onSubmit={handleSave} />
                )}
              </div>

              {activeModal === 'profile' && (
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Chiudi
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Salva
                  </button>
                </div>
              )}
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
