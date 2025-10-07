import React, { useEffect, useState } from 'react';
import { getAllMatches, updateMatch } from 'utils/firestoreUtils';
import MatchDetail from './MatchDetail';
import { getObjFromForm } from 'utils/utils';

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
          name: user.userLogin.displayName,
          overall: user.customerInfo?.overall || 60,
        },
      ],
    };
    await updateMatch(matchId, updated);
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
      name: formObject.guestName,
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
            </form>
            <button className="btn btn-primary me-2" onClick={() => handleJoin(m.id)}>
              Iscriviti
            </button>
            <MatchDetail match={m} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
