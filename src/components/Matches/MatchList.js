import React, { useEffect, useState } from 'react';
import { getAllMatches, updateMatch } from 'utils/firestoreUtils';
import MatchDetail from './MatchDetail';
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
    // 🔹 Calcola limite massimo giocatori in base al tipo partita
    const maxPlayers = match.tipo === '5' ? 10 : 16;

    // 🔹 Controllo: se raggiunto limite, blocca iscrizione
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
    if (!playerExists) return; // Se il giocatore non è presente, esci dalla funzione (non c'è nulla da rimuovere)
    // Rimuovi il giocatore dai giocatori del match
    const updatedPlayers = match.players.filter(p => p.id !== user.userLogin.uid);
    // Crea l'oggetto aggiornato con la lista dei giocatori senza il giocatore che si vuole rimuovere
    const updated = {
      ...match,
      players: updatedPlayers,
    };
    // Aggiorna il match tramite l'API (o funzione per aggiornare i dati)
    await updateMatch(matchId, updated);
    // Aggiorna lo stato dei match nel componente
    setMatches(prev => prev.map(m => (m.id === matchId ? updated : m)));
  };
  const handleAddGuest = async (evt, matchId) => {
    evt.preventDefault(); // 🔥 Importantissimo
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    // 🔹 Calcola limite massimo giocatori in base al tipo partita
    const maxPlayers = match.tipo === '5' ? 10 : 16;

    // 🔹 Controllo: se raggiunto limite, blocca iscrizione
    if (match.players.length >= maxPlayers) {
      alert(
        `❌ Hai già raggiunto il numero massimo di ${maxPlayers} giocatori per il calcio a ${match.tipo}.`,
      );
      return;
    }
    const formData = new FormData(evt.target); // raccoglie tutti i valori del form
    const formObject = getObjFromForm({ formData });
    // Trova tutti i guest esistenti e calcola il prossimo ID
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
    const match = matches.find(m => m.id === matchId); // Trova il match
    if (!match) return; // Se il match non esiste, esci dalla funzione
    const formData = new FormData(evt.target); // raccoglie tutti i valori del form
    const formObject = getObjFromForm({ formData });
    const { guestName } = formObject;
    // Trova il guest da rimuovere in base al nome e al fatto che sia un guest
    const guest = match.players.find(p => p.name === guestName && p.isGuest);
    if (!guest) {
      alert(`❌ Nessun guest con il nome "${guestName}" trovato.`);
      return; // Se il guest non esiste, esci dalla funzione
    }

    // Filtra i giocatori per rimuovere il guest con il nome specificato
    const updatedPlayers = match.players.filter(p => p.name !== guestName || !p.isGuest);

    const updated = {
      ...match,
      players: updatedPlayers, // Aggiorna la lista dei giocatori senza il guest
    };

    try {
      await updateMatch(matchId, updated); // Aggiorna il match
      setMatches(prev => prev.map(m => (m.id === matchId ? updated : m))); // Aggiorna lo stato del match
      alert(`✅ Guest "${guestName}" rimosso con successo.`);
    } catch (err) {
      console.error('Errore rimozione guest:', err);
      alert('❌ Errore durante la rimozione del guest.');
    }
  };

  return (
    <div>
      <h5 className="text-center mb-3">Partite Disponibili</h5>
      {matches.map(m => (
        <div key={m.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h6>{m.campo}</h6>
            <p>
              {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
            </p>
            <p>{m.players.length} iscritti</p>
            {/* Aggiunta giocatori */}
            <h6>Aggiungi giocatori / ospiti</h6>
            <form onSubmit={evt => handleAddGuest(evt, m.id)} className="d-flex gap-2 mb-3">
              <input
                type="text"
                name="guestName"
                className="form-control"
                placeholder="Nome giocatore"
              />
              <input
                type="number"
                name="guestOverall"
                className="form-control"
                placeholder="Overall"
              />
              <button type="submit" className="btn btn-primary">
                ➕
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveGuest('xxx', m.id)}
              >
                ❌
              </button>
            </form>
            <form onSubmit={evt => handleRemoveGuest(evt, m.id)} className="d-flex gap-2 mb-3">
              <input
                type="text"
                name="guestName"
                className="form-control"
                placeholder="Nome giocatore"
              />
              <button type="submit" className="btn btn-danger">
                ❌
              </button>
            </form>
            <button className="btn btn-primary me-2" onClick={() => handleJoin(m.id)}>
              Iscriviti ➕
            </button>
            <button className="btn btn-primary me-2" onClick={() => handleRemove(m.id)}>
              Cancellati ❌
            </button>
            <MatchDetail match={m} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
