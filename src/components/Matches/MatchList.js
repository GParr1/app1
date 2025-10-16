import React, { useState } from 'react';
import { getObjFromForm } from 'utils/utils';
import ModalForm from 'components/Modal/ModalForm';
import OverlayBackdrop from 'components/Modal/OverlayBackdrop';
import {
  handleCreateMatchUtils,
  handleDeleteMatchUtils,
  handleJoinGuestMatch,
  handleJoinMatch,
  handleRemoveGuestMatch,
  handleRemoveMatch,
} from 'utils/matchUtils';
import MatchSlider from 'components/Matches/MatchSlider';

const MatchList = ({ user, matches, title, showAddMatch }) => {
  // Stato per gestire la modal
  const [modalInfo, setModalInfo] = useState({
    show: false,
    mode: null, // 'addGuest' | 'removeGuest'
    matchId: null,
    modalTitle: null,
    handleSubmit: null,
  });
  // Stato per l’overlay / modal di dettaglio
  const [detailOverlay, setDetailOverlay] = useState({
    show: false,
    match: null,
    closeDetailOverlay: null,
  });
  const handleJoin = async matchId => {
    await handleJoinMatch({ matches, matchId, user });
  };

  const handleRemove = async matchId => {
    await handleRemoveMatch({ matches, matchId, user });
  };

  const handleModalAddGuest = async (evt, obj) => {
    evt.preventDefault();
    const { matchId } = obj;
    const formData = new FormData(evt.target);
    const formObject = getObjFromForm({ formData });
    await handleJoinGuestMatch({ matches, matchId, formObject });
    closeModal();
  };

  const handleModalRemoveGuest = async (evt, obj) => {
    evt.preventDefault();
    const { matchId } = obj;
    const formData = new FormData(evt.target);
    const formObject = getObjFromForm({ formData });
    await handleRemoveGuestMatch({ matches, matchId, formObject });
    closeModal();
  };
  const handleCreateMatch = async evt => {
    evt.preventDefault();
    await handleCreateMatchUtils(evt);
    closeModal();
  };

  const handleDeleteMatch = async matchId => {
    await handleDeleteMatchUtils({ matches, matchId });
  };
  const openModal = (mode, matchId) => {
    let options = {};
    switch (mode) {
      case 'createMatch': {
        options = {
          mode,
          matchId: null,
          modalTitle: 'Crea una nuova partita',
          handleSubmit: handleCreateMatch,
        };
        break;
      }
      case 'addGuest': {
        options = {
          mode,
          matchId,
          modalTitle: 'Aggiungi Guest',
          handleSubmit: handleModalAddGuest,
        };
        break;
      }
      case 'removeGuest': {
        options = {
          mode,
          matchId,
          modalTitle: 'Rimuovi Guest',
          handleSubmit: handleModalRemoveGuest,
        };
        break;
      }
      default: {
        options = {
          mode: null,
          matchId: null,
          modalTitle: null,
          handleSubmit: null,
        };
      }
    }
    setModalInfo({ show: true, ...options });
  };
  const closeModal = () => {
    setModalInfo({ show: false, mode: null, matchId: null, modalTitle: null, handleSubmit: null });
  };
  const openDetailOverlay = (match, closeDetailOverlay) => {
    setDetailOverlay({ show: true, match, closeDetailOverlay });
  };

  const closeDetailOverlay = () => {
    setDetailOverlay({ show: false, match: null, closeDetailOverlay: null });
  };

  return (
    <div className="container">
      <h5 className="text-center mb-3">{title}</h5>
      <MatchSlider
        matches={matches}
        showAddMatch={showAddMatch}
        user={user}
        handleJoin={handleJoin}
        handleRemove={handleRemove}
        openModal={openModal}
        handleModalAddGuest={handleModalAddGuest}
        handleModalRemoveGuest={handleModalRemoveGuest}
        openDetailOverlay={openDetailOverlay}
        closeDetailOverlay={closeDetailOverlay}
        handleDeleteMatch={handleDeleteMatch}
      />
      {/* Overlay / Modal dettaglio */}
      {detailOverlay.show && (
        <OverlayBackdrop match={detailOverlay.match} closeOverlay={closeDetailOverlay} />
      )}
      {/* Modal */}
      {modalInfo.show && (
        <ModalForm
          modalInfo={modalInfo}
          objSubmit={{ matchId: modalInfo.matchId }}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
/* Azioni per iscrizione e cancellazione */

export default MatchList;
