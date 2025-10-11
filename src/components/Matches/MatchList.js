import React, { useEffect, useState } from 'react';
import { getAllMatches, updateMatch, deleteMatch } from 'utils/firestoreUtils'; // Aggiungi la funzione deleteMatch
//import MatchDetail from './MatchDetail';
import { getObjFromForm } from 'utils/utils';
import { DEFAULT_PHOTO } from 'utils/Constant';

const MatchList = ({ user }) => {
  const [matches, setMatches] = useState([]);

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

  const handleAddGuest = async (evt, matchId) => {
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

  const handleRemoveGuest = async (evt, matchId) => {
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
                <form className="d-flex gap-2 mb-2" onSubmit={evt => handleAddGuest(evt, m.id)}>
                  <input
                    type="text"
                    name="guestName"
                    className="form-control form-control-sm"
                    placeholder="Nome giocatore"
                  />
                  <input
                    type="number"
                    name="guestOverall"
                    className="form-control form-control-sm"
                    placeholder="Overall"
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    ➕
                  </button>
                </form>
                <form className="d-flex gap-2 mb-2" onSubmit={evt => handleRemoveGuest(evt, m.id)}>
                  <input
                    type="text"
                    name="guestName"
                    className="form-control form-control-sm"
                    placeholder="Nome guest"
                  />
                  <button type="submit" className="btn btn-danger btn-sm">
                    ❌
                  </button>
                </form>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;
