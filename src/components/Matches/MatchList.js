import React, { useEffect, useState } from 'react';
import { getFutureMatches, getMatchesByPlayerId, getPastMatches } from 'utils/firestoreUtils';
import { findInArrByUid, getObjFromForm } from 'utils/utils';
import ModalForm from 'components/Modal/ModalForm';
import OverlayBackdrop from 'components/Modal/OverlayBackdrop';
import {
  checkMaxPlayersMatch,
  handleDeleteMatchUtils,
  handleJoinGuestMatch,
  handleJoinMatch,
  handleRemoveGuestMatch,
  handleRemoveMatch,
} from 'utils/matchUtils';

const MatchList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [matchesById, setMatchesById] = useState([]);
  const [matchesPast, setMatchesPast] = useState([]);
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

  useEffect(() => {
    const fetchMatches = async () => {
      const list = await getFutureMatches();
      setMatches(list);
    };
    fetchMatches();
  }, []);
  useEffect(() => {
    const fetchMatchesById = async () => {
      const list = await getMatchesByPlayerId();
      setMatchesById(list);
    };
    fetchMatchesById();
  }, []);
  useEffect(() => {
    const fetchMatchesById = async () => {
      const list = await getPastMatches();
      setMatchesPast(list);
    };
    fetchMatchesById();
  }, []);

  const handleJoin = async matchId => {
    const updated = await handleJoinMatch({ matches, matchId, user });
    !!updated && setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
  };

  const handleRemove = async matchId => {
    const updated = await handleRemoveMatch({ matches, matchId, user });
    !!updated && setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
  };

  const handleModalAddGuest = async evt => {
    evt.preventDefault();
    const { matchId } = modalInfo;
    const formData = new FormData(evt.target);
    const formObject = getObjFromForm({ formData });
    const updated = await handleJoinGuestMatch({ matches, matchId, formObject });
    !!updated && setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
  };

  const handleModalRemoveGuest = async evt => {
    evt.preventDefault();
    const { matchId } = modalInfo;
    const formData = new FormData(evt.target);
    const formObject = getObjFromForm({ formData });
    const updated = await handleRemoveGuestMatch({ matches, matchId, formObject });
    !!updated && setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
  };

  const handleDeleteMatch = async matchId => {
    const list = await handleDeleteMatchUtils({ matches, matchId });
    setMatches(list);
  };
  const openModal = (mode, modalTitle, matchId, handleSubmit) => {
    setModalInfo({ show: true, mode, matchId, modalTitle, handleSubmit });
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
      <h5 className="text-center mb-3">Partite Disponibili</h5>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {matches.map(m => {
          const playerExists = findInArrByUid(m.players, user.userLogin.uid);
          const isMaxPlayers = checkMaxPlayersMatch({ match: m });
          return (
            <div key={m.id} className="col">
              <div className="card match-card h-100">
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{m.campo}</h6>
                  <p className="card-text small">
                    {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
                  </p>
                  <p className="card-text">
                    <strong>{m.players.length} iscritti</strong>
                  </p>
                  {playerExists && (
                    <p className="card-text">
                      <strong>Sei già iscritto</strong>
                    </p>
                  )}

                  {/* Aggiunta giocatori / ospiti */}
                  <h6 className="mt-3">Aggiungi giocatori / ospiti</h6>
                  {/* Azioni per iscrizione e cancellazione */}
                  <div className="mt-auto">
                    <div className="d-flex gap-2 flex-wrap">
                      {!playerExists && (
                        <button
                          className="btn btn-primary btn-sm flex-grow-1"
                          onClick={() => handleJoin(m.id)}
                        >
                          Iscriviti ➕
                        </button>
                      )}
                      {playerExists && (
                        <button
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={() => handleRemove(m.id)}
                        >
                          Cancellati ❌
                        </button>
                      )}
                    </div>
                    {isMaxPlayers && (
                      <button
                        className="btn btn-secondary btn-sm w-100 mb-2"
                        onClick={() =>
                          openModal('addGuest', 'Aggiungi Guest', m.id, handleModalAddGuest)
                        }
                      >
                        Aggiungi Guest
                      </button>
                    )}
                    {!isMaxPlayers && (
                      <button
                        className="btn btn-secondary btn-sm w-100 mb-2"
                        onClick={() =>
                          openModal('removeGuest', 'Rimuovi Guest', m.id, handleModalRemoveGuest)
                        }
                      >
                        Rimuovi Guest
                      </button>
                    )}
                    <button
                      className="btn btn-info btn-sm w-100 mb-2"
                      onClick={() => openDetailOverlay(m, closeDetailOverlay)}
                    >
                      Guarda Formazione
                    </button>
                    <button
                      className="btn btn-danger btn-sm mt-2 w-100"
                      onClick={() => handleDeleteMatch(m.id)}
                    >
                      Elimina Partita ❌
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h5 className="text-center mb-3">le tue partite</h5>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {matchesById.map(m => {
          const playerExists = findInArrByUid(m.players, user.userLogin.uid);
          const isMaxPlayers = checkMaxPlayersMatch({ match: m });
          return (
            <div key={m.id} className="col">
              <div className="card match-card h-100">
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{m.campo}</h6>
                  <p className="card-text small">
                    {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
                  </p>
                  <p className="card-text">
                    <strong>{m.players.length} iscritti</strong>
                  </p>
                  {playerExists && (
                    <p className="card-text">
                      <strong>Sei già iscritto</strong>
                    </p>
                  )}

                  {/* Aggiunta giocatori / ospiti */}
                  <h6 className="mt-3">Aggiungi giocatori / ospiti</h6>
                  {/* Azioni per iscrizione e cancellazione */}
                  <div className="mt-auto">
                    <div className="d-flex gap-2 flex-wrap">
                      {!playerExists && (
                        <button
                          className="btn btn-primary btn-sm flex-grow-1"
                          onClick={() => handleJoin(m.id)}
                        >
                          Iscriviti ➕
                        </button>
                      )}
                      {playerExists && (
                        <button
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={() => handleRemove(m.id)}
                        >
                          Cancellati ❌
                        </button>
                      )}
                    </div>
                    {isMaxPlayers && (
                      <button
                        className="btn btn-secondary btn-sm w-100 mb-2"
                        onClick={() =>
                          openModal('addGuest', 'Aggiungi Guest', m.id, handleModalAddGuest)
                        }
                      >
                        Aggiungi Guest
                      </button>
                    )}
                    {!isMaxPlayers && (
                      <button
                        className="btn btn-secondary btn-sm w-100 mb-2"
                        onClick={() =>
                          openModal('removeGuest', 'Rimuovi Guest', m.id, handleModalRemoveGuest)
                        }
                      >
                        Rimuovi Guest
                      </button>
                    )}
                    <button
                      className="btn btn-info btn-sm w-100 mb-2"
                      onClick={() => openDetailOverlay(m, closeDetailOverlay)}
                    >
                      Guarda Formazione
                    </button>
                    <button
                      className="btn btn-danger btn-sm mt-2 w-100"
                      onClick={() => handleDeleteMatch(m.id)}
                    >
                      Elimina Partita ❌
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h5 className="text-center mb-3">le tue partite</h5>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {matchesPast.map(m => {
          const playerExists = findInArrByUid(m.players, user.userLogin.uid);
          const isMaxPlayers = checkMaxPlayersMatch({ match: m });
          return (
            <div key={m.id} className="col">
              <div className="card match-card h-100">
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{m.campo}</h6>
                  <p className="card-text small">
                    {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
                  </p>
                  <p className="card-text">
                    <strong>{m.players.length} iscritti</strong>
                  </p>
                  {playerExists && (
                    <p className="card-text">
                      <strong>Sei già iscritto</strong>
                    </p>
                  )}

                  {/* Aggiunta giocatori / ospiti */}
                  <h6 className="mt-3">Aggiungi giocatori / ospiti</h6>
                  {/* Azioni per iscrizione e cancellazione */}
                  <div className="mt-auto">
                    <div className="d-flex gap-2 flex-wrap">
                      {!playerExists && (
                        <button
                          className="btn btn-primary btn-sm flex-grow-1"
                          onClick={() => handleJoin(m.id)}
                        >
                          Iscriviti ➕
                        </button>
                      )}
                      {playerExists && (
                        <button
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={() => handleRemove(m.id)}
                        >
                          Cancellati ❌
                        </button>
                      )}
                    </div>
                    {isMaxPlayers && (
                      <button
                        className="btn btn-secondary btn-sm w-100 mb-2"
                        onClick={() =>
                          openModal('addGuest', 'Aggiungi Guest', m.id, handleModalAddGuest)
                        }
                      >
                        Aggiungi Guest
                      </button>
                    )}
                    {!isMaxPlayers && (
                      <button
                        className="btn btn-secondary btn-sm w-100 mb-2"
                        onClick={() =>
                          openModal('removeGuest', 'Rimuovi Guest', m.id, handleModalRemoveGuest)
                        }
                      >
                        Rimuovi Guest
                      </button>
                    )}
                    <button
                      className="btn btn-info btn-sm w-100 mb-2"
                      onClick={() => openDetailOverlay(m, closeDetailOverlay)}
                    >
                      Guarda Formazione
                    </button>
                    <button
                      className="btn btn-danger btn-sm mt-2 w-100"
                      onClick={() => handleDeleteMatch(m.id)}
                    >
                      Elimina Partita ❌
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Overlay / Modal dettaglio */}
      {detailOverlay.show && (
        <OverlayBackdrop match={detailOverlay.match} closeOverlay={closeDetailOverlay} />
      )}
      {/* Modal */}
      {modalInfo.show && (
        <ModalForm
          mode={modalInfo.mode}
          closeModal={closeModal}
          handleSubmit={modalInfo.handleSubmit}
        />
      )}
    </div>
  );
};
export default MatchList;
