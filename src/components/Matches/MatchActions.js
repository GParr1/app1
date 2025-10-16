import { findInArrByUid } from 'utils/utils';
import React from 'react';
import { SVGPlus, SVGPlusCircleFilled } from 'components/SVG/SVGPlus';
import { SVGClose, SVGCloseCircleFilled } from 'components/SVG/SVGClose';

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
          className="btn btn-primary  flex-grow-1"
          disabled={playerExists}
          onClick={() => handleJoin(id)}
        >
          Iscriviti <SVGPlusCircleFilled />
        </button>
        <button
          className="btn btn-danger  flex-grow-1"
          disabled={!playerExists}
          onClick={() => handleRemove(id)}
        >
          Cancellati <SVGCloseCircleFilled />
        </button>
      </div>
      {/* Dettagli Formazione */}
      <div className="mt-2">
        <button
          className="btn btn-info  w-100 mb-2"
          onClick={() => openDetailOverlay(match, closeDetailOverlay)}
        >
          Guarda Formazione
        </button>
      </div>
      {/* Guest */}
      <div className="d-flex gap-2 mt-2">
        <button className="btn btn-secondary  w-100 mb-2" onClick={() => openModal('addGuest', id)}>
          Aggiungi Guest <SVGPlus />
        </button>

        <button
          className="btn btn-secondary  w-100 mb-2"
          onClick={() => openModal('removeGuest', id)}
        >
          Rimuovi Guest <SVGClose />
        </button>
      </div>

      <div className="mt-2">
        {/* Eliminazione */}
        <button className="btn btn-danger  mt-2 w-100" onClick={() => handleDeleteMatch(id)}>
          Elimina Partita <SVGClose />
        </button>
      </div>
    </div>
  );
};
export default MatchActions;
