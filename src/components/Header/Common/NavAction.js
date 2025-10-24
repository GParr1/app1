import React, { useState } from 'react';
import { doSignOut, handleSaveFormUser } from 'utils/authUtils';
import UploadProfilePicture from 'components/UploadProfilePicture';
import FormUser from 'components/FormUser';
import LogoutBtn from 'components/Header/Common/LogoutBtn';

const NavAction = ({ user }) => {
  const [activeModal, setActiveModal] = useState(null); // 'image' | 'profile' | null
  const handleSave = async evt => {
    try {
      window.calcetto?.toggleSpinner?.(true);
      await handleSaveFormUser(evt, user);
      setActiveModal(null);
    } catch (error) {
      console.error('Errore durante il salvataggio del profilo:', error);
    } finally {
      window.calcetto?.toggleSpinner?.(false);
    }
  };

  return (
    <>
      <div className="d-none d-md-flex gap-2 align-items-center">
        <button
          className="btn"
          onClick={() => setActiveModal('profile')}
          aria-label="Completa il tuo profilo"
        >
          <i className="bi bi-person"></i>
        </button>
        <button
          className="btn"
          onClick={() => setActiveModal('image')}
          aria-label="Cambia immagine del profilo"
        >
          <i className="bi bi-image"></i>️
        </button>
        <LogoutBtn />
      </div>
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
                  onClick={() => setActiveModal(null)}
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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setActiveModal(null)}
                  >
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
    </>
  );
};

export default NavAction;
