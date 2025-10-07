import React, { useEffect, useState } from 'react';
import { getAllMatches, updateMatch } from 'utils/firestoreUtils';
import MatchDetail from './MatchDetail';

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
