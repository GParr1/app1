import { findInArrByUid } from 'utils/utils';
import React, { useState } from 'react';
import { SVGPlus } from 'components/SVG/SVGPlus';
import { SVGClose } from 'components/SVG/SVGClose';
import { checkMaxPlayersMatch, handleSaveResult } from 'utils/matchUtils';

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
  const { id, players, status, data } = match;
  const playerExists = findInArrByUid(players, user.userLogin.uid);
  const isMaxPlayers = checkMaxPlayersMatch({ match });
  // 🔹 Stato locale per risultato
  const [goalsA, setGoalsA] = useState('');
  const [goalsB, setGoalsB] = useState('');

  // 🔹 Controlla se la partita è nel passato
  const matchDate = new Date(data); // data dal server
  const isPast = matchDate < new Date();

  const handleSubmitResult = async () => {
    if (goalsA === '' || goalsB === '') return alert('Inserisci entrambi i gol');
    await handleSaveResult({ match, result: { goalsA: Number(goalsA), goalsB: Number(goalsB) } });
  };
  return (
    <div className="mt-auto">
      {/* 🔹 Box inserimento risultato */}
      {status === 'closed' && isPast && (
        <div className="mt-3 p-3 border rounded bg-light">
          <h6>Inserisci Risultato</h6>
          <div className="d-flex gap-2 align-items-center">
            <input
              type="number"
              className="form-control"
              placeholder="Gol Squadra A"
              value={goalsA}
              onChange={e => setGoalsA(e.target.value)}
            />
            <span className="fw-bold">-</span>
            <input
              type="number"
              className="form-control"
              placeholder="Gol Squadra B"
              value={goalsB}
              onChange={e => setGoalsB(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleSubmitResult}>
              Salva
            </button>
          </div>
        </div>
      )}
      {/* Pulsanti iscrizione */}
      {status === 'open' && (
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary  flex-grow-1"
            disabled={playerExists}
            onClick={() => handleJoin(id)}
          >
            Iscriviti <SVGPlus />
          </button>
          <button
            className="btn btn-secondary w-100 mb-2"
            disabled={isMaxPlayers}
            onClick={() => openModal('addGuest', id)}
          >
            Aggiungi Guest <SVGPlus />
          </button>
        </div>
      )}
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
        <button
          className="btn btn-secondary flex-grow-1"
          disabled={!playerExists}
          onClick={() => handleRemove(id)}
        >
          Cancellati <SVGClose />
        </button>
        <button
          className="btn btn-secondary  w-100 mb-2"
          onClick={() => openModal('removeGuest', id)}
        >
          Rimuovi Guest <SVGClose />
        </button>
      </div>

      {!isPast && (
        <div className="mt-2">
          {/* Eliminazione */}
          <button className="btn btn-secondary  mt-2 w-100" onClick={() => handleDeleteMatch(id)}>
            Elimina Partita <SVGClose />
          </button>
        </div>
      )}
    </div>
  );
};
export default MatchActions;
