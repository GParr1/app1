import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root') || document.body;

const UpdateImageModal = ({ open, onClose }) => {
  const modalRef = useRef(null);

  // Chiudi con ESC
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Focus sul primo elemento del modal
  useEffect(() => {
    if (open && modalRef.current) {
      const focusable = modalRef.current.querySelector('input, button');
      focusable?.focus();
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="modal-content p-4 bg-white rounded shadow"
        onClick={e => e.stopPropagation()} // evita chiusura se clicchi dentro
        style={{ width: '400px', maxWidth: '90%' }}
      >
        <h2 className="h5 mb-3">Aggiorna immagine profilo</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="profileImage" className="form-label">
              Carica una nuova immagine
            </label>
            <input id="profileImage" type="file" accept="image/*" className="form-control" />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annulla
            </button>
            <button type="submit" className="btn btn-primary">
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot,
  );
};

UpdateImageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateImageModal;
