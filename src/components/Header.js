import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { doSignOut, handleSaveFormUser } from 'utils/authUtils';
import UploadProfilePicture from 'components/UploadProfilePicture';
import FormUser from 'components/FormUser';
import { useNavigate } from 'react-router-dom';

const Header = ({ user = {} }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'image' | 'profile' | null
  const displayName = user?.userLogin?.displayName ?? 'Utente';
  /** 🔄 Apertura / chiusura modali */
  const openModal = useCallback(type => setActiveModal(type), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  /** 🚪 Logout utente */
  const handleSignOut = useCallback(async () => {
    await doSignOut();
  }, []);

  /** 💾 Salvataggio profilo (placeholder per ora) */
  const handleSave = useCallback(
    async evt => {
      try {
        window.calcetto?.toggleSpinner?.(true);
        await handleSaveFormUser(evt, user); // 👈 chiamata alla tua funzione
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
      <div className="d-flex justify-content-between align-items-center w-100">
        <h1 className="m-0">Benvenuto {displayName}</h1>

        <div className="d-flex gap-2">
          {/* 🧾 HOME profilo */}
          <button
            className="btn"
            onClick={() => navigate('dashboard')}
            aria-label="Completa il tuo profilo"
          >
            Home
          </button>
          <button
            className="btn"
            onClick={() => navigate('profile')}
            aria-label="Completa il tuo profilo"
          >
            Profilo
          </button>
          <button
            className="btn"
            onClick={() => navigate('profile')}
            aria-label="Completa il tuo profilo"
          >
            Partite
          </button>

          {/* 🖼️ Cambia immagine */}
        </div>
        <div className="d-flex gap-2">
          {/* 🧾 Modifica profilo */}
          <button
            className="btn"
            onClick={() => openModal('profile')}
            aria-label="Completa il tuo profilo"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Completa il tuo profilo</title>
              <circle cx="12" cy="8" r="4" fill="#4F46E5" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="#4F46E5" />
            </svg>
          </button>

          {/* 🖼️ Cambia immagine */}
          <button
            type="button"
            className="btn"
            onClick={() => openModal('image')}
            aria-label="Cambia immagine del profilo"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Cambia immagine del profilo</title>
              <path
                d="M5 20h14a2 2 0 0 0 2-2v-7l-3-3h-4l-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="3" stroke="#2563EB" strokeWidth="2" />
            </svg>
          </button>

          {/* 🚪 Logout */}
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
            >
              <title>Esci dal profilo</title>
              <path
                d="M16 17L21 12L16 7"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 🧩 Modale dinamica */}
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
