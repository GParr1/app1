import React, { useEffect, useState } from 'react';
import { getAllMatches, updateMatch, deleteMatch } from 'utils/firestoreUtils'; // Aggiungi la funzione deleteMatch
import MatchDetail from './MatchDetail';
import { getObjFromForm } from 'utils/utils';
import { DEFAULT_PHOTO } from 'utils/Constant';

const MatchList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  // Stato per gestire la modal
  const [modalInfo, setModalInfo] = useState({
    show: false,
    mode: null, // 'addGuest' | 'removeGuest'
    matchId: null,
  });
  // Stato per l’overlay / modal di dettaglio
  const [detailOverlay, setDetailOverlay] = useState({
    show: false,
    match: null,
  });

  useEffect(() => {
    const fetchMatches = async () => {
      const list = await getAllMatches();
      setMatches(list);
    };
    fetchMatches();
  }, []);

  const handleJoin = async matchId => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    const maxPlayers = match.tipo === '5' ? 10 : 16;
    if (match.players.length >= maxPlayers) {
      alert(
        `❌ Hai già raggiunto il numero massimo di ${maxPlayers} giocatori per il calcio a ${match.tipo}.`,
      );
      return;
    }
    const playerExists = match.players.find(p => p.id === user.userLogin.uid);
    if (playerExists) return alert('Sei già iscritto!');

    const updated = {
      ...match,
      players: [
        ...match.players,
        {
          id: user.userLogin.uid,
          firstName: user.customerInfo.firstName,
          lastName: user.customerInfo.lastName,
          favoriteTeam: user.customerInfo.favoriteTeam,
          position: user.customerInfo.position,
          photoURL: user.customerInfo.photoURL,
          overall: user.customerInfo?.overall || 60,
        },
      ],
    };
    await updateMatch(matchId, updated);
    setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
  };

  const handleRemove = async matchId => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    const playerExists = match.players.find(p => p.id === user.userLogin.uid);
    if (!playerExists) return; // Se il giocatore non è presente, esci dalla funzione
    const updatedPlayers = match.players.filter(p => p.id !== user.userLogin.uid);
    const updated = {
      ...match,
      players: updatedPlayers,
    };
    await updateMatch(matchId, updated);
    setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
  };

  const handleModalAddGuest = async (evt, matchId) => {
    evt.preventDefault();
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    const maxPlayers = match.tipo === '5' ? 10 : 16;
    if (match.players.length >= maxPlayers) {
      alert(
        `❌ Hai già raggiunto il numero massimo di ${maxPlayers} giocatori per il calcio a ${match.tipo}.`,
      );
      return;
    }
    const formData = new FormData(evt.target);
    const formObject = getObjFromForm({ formData });
    const guestNumbers = match.players
      .filter(p => p.isGuest)
      .map(p => parseInt(p.id.replace('guest-', ''), 10))
      .filter(n => !isNaN(n));
    const nextIdNumber = guestNumbers.length > 0 ? Math.max(...guestNumbers) + 1 : 1;
    const newGuest = {
      id: `guest-${nextIdNumber}`,
      firstName: formObject.guestName,
      photoURL: DEFAULT_PHOTO,
      overall: parseInt(formObject.guestOverall, 10),
      isGuest: true,
    };

    const updated = {
      ...match,
      players: [...match.players, newGuest],
    };
    try {
      await updateMatch(matchId, updated);
      setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
    } catch (err) {
      console.error('Errore aggiunta guest:', err);
      alert('❌ Errore durante l’aggiunta del guest.');
    }
  };

  const handleModalRemoveGuest = async (evt, matchId) => {
    evt.preventDefault();
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    const formData = new FormData(evt.target);
    const formObject = getObjFromForm({ formData });
    const { guestName } = formObject;
    const guest = match.players.find(p => p.name === guestName && p.isGuest);
    if (!guest) {
      alert(`❌ Nessun guest con il nome "${guestName}" trovato.`);
      return;
    }

    const updatedPlayers = match.players.filter(p => p.name !== guestName || !p.isGuest);
    const updated = {
      ...match,
      players: updatedPlayers,
    };

    try {
      await updateMatch(matchId, updated);
      setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
      alert(`✅ Guest "${guestName}" rimosso con successo.`);
    } catch (err) {
      console.error('Errore rimozione guest:', err);
      alert('❌ Errore durante la rimozione del guest.');
    }
  };

  const handleDeleteMatch = async matchId => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    if (window.confirm('Sei sicuro di voler eliminare questa partita?')) {
      try {
        await deleteMatch(matchId); // Aggiungi la funzione per eliminare la partita
        setMatches(prev => prev.filter(m => m.id !== matchId));
        alert('✅ Partita eliminata con successo.');
      } catch (err) {
        console.error('Errore eliminazione partita:', err);
        alert('❌ Errore durante l’eliminazione della partita.');
      }
    }
  };
  const openModal = (mode, matchId) => {
    setModalInfo({ show: true, mode, matchId });
  };
  const closeModal = () => {
    setModalInfo({ show: false, mode: null, matchId: null });
  };
  const openDetailOverlay = match => {
    setDetailOverlay({ show: true, match });
  };

  const closeDetailOverlay = () => {
    setDetailOverlay({ show: false, match: null });
  };

  return (
    <div className="container">
      <h5 className="text-center mb-3">Partite Disponibili</h5>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {matches.map(m => (
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

                {/* Aggiunta giocatori / ospiti */}
                <h6 className="mt-3">Aggiungi giocatori / ospiti</h6>
                {/* Azioni per iscrizione e cancellazione */}
                <div className="mt-auto">
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn btn-primary btn-sm flex-grow-1"
                      onClick={() => handleJoin(m.id)}
                    >
                      Iscriviti ➕
                    </button>
                    <button
                      className="btn btn-danger btn-sm flex-grow-1"
                      onClick={() => handleRemove(m.id)}
                    >
                      Cancellati ❌
                    </button>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm w-100 mb-2"
                    onClick={() => openModal('addGuest', m.id)}
                  >
                    Aggiungi Guest
                  </button>
                  <button
                    className="btn btn-secondary btn-sm w-100 mb-2"
                    onClick={() => openModal('removeGuest', m.id)}
                  >
                    Rimuovi Guest
                  </button>
                  <button
                    className="btn btn-info btn-sm w-100 mb-2"
                    onClick={() => openDetailOverlay(m)}
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
              {/*<MatchDetail match={m}/>*/}
            </div>
          </div>
        ))}
      </div>
      {/* Overlay / Modal dettaglio */}
      {detailOverlay.show && (
        <div
          className="overlay-content"
          role="button"
          tabIndex={0}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              // magari chiudi l’overlay o fai nulla
              e.stopPropagation();
            }
          }}
        >
          <button
            type="button"
            className="btn-close float-end"
            onClick={closeDetailOverlay}
            aria-label="Close"
          ></button>
          <MatchDetail match={detailOverlay.match} />
        </div>
      )}
      {/* Modal */}
      {modalInfo.show && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalInfo.mode === 'addGuest' ? 'Aggiungi Guest' : 'Rimuovi Guest'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {modalInfo.mode === 'addGuest' ? (
                  <form onSubmit={handleModalAddGuest}>
                    <div className="mb-3">
                      <label htmlFor="guestNameInput" className="form-label">
                        Nome guest
                      </label>
                      <input
                        type="text"
                        name="guestName"
                        className="form-control"
                        id="guestNameInput"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="guestOverallInput" className="form-label">
                        Overall
                      </label>
                      <input
                        type="number"
                        name="guestOverall"
                        className="form-control"
                        id="guestOverallInput"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Aggiungi
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleModalRemoveGuest}>
                    <div className="mb-3">
                      <label htmlFor="guestNameRemoveInput" className="form-label">
                        Nome guest da rimuovere
                      </label>
                      <input
                        type="text"
                        name="guestName"
                        className="form-control"
                        id="guestNameRemoveInput"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-danger">
                      Rimuovi
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchList;
