import { findInArrByUid } from 'utils/utils';
import React from 'react';

const MatchActions = ({
  match,
  user,
  handleJoin,
  handleRemove,
  handleDeleteMatch,
  openDetailOverlay,
  closeDetailOverlay,
  openModal,
}) => {
  const { id, players } = match;
  const playerExists = findInArrByUid(players, user.userLogin.uid);
  //const isMaxPlayers = checkMaxPlayersMatch({ match });
  return (
    <div className="mt-auto">
      {/* Pulsanti iscrizione / cancellazione */}
      <div className="d-flex gap-2">
        <button
          className="btn btn-primary btn-sm flex-grow-1"
          disabled={playerExists}
          onClick={() => handleJoin(id)}
        >
          Iscriviti ➕
        </button>
        <button
          className="btn btn-danger btn-sm flex-grow-1"
          disabled={!playerExists}
          onClick={() => handleRemove(id)}
        >
          Cancellati ❌
        </button>
      </div>
      {/* Dettagli Formazione */}
      <div className="mt-2">
        <button
          className="btn btn-info btn-sm w-100 mb-2"
          onClick={() => openDetailOverlay(match, closeDetailOverlay)}
        >
          Guarda Formazione
        </button>
      </div>
      {/* Guest */}
      <div className="d-flex gap-2 mt-2">
        <button
          className="btn btn-secondary btn-sm w-100 mb-2"
          onClick={() => openModal('addGuest', id)}
        >
          Aggiungi Guest
        </button>

        <button
          className="btn btn-secondary btn-sm w-100 mb-2"
          onClick={() => openModal('removeGuest', id)}
        >
          Rimuovi Guest
        </button>
      </div>

      <div className="mt-2">
        {/* Eliminazione */}
        <button className="btn btn-danger btn-sm mt-2 w-100" onClick={() => handleDeleteMatch(id)}>
          Elimina Partita ❌
        </button>
      </div>
    </div>
  );
};
export default MatchActions;
