import React, { useEffect, useState, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import PlayerSelector from './PlayerSelector';
import { generaSquadreBilanciate } from 'utils/utils'; // funzione che abbiamo definito prima
import PropTypes from 'prop-types';

const MatchDetails = ({ matchId, allUsers }) => {
  const [match, setMatch] = useState(null);
  const [giocatori, setGiocatori] = useState([]);
  const [squadre, setSquadre] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📥 Carica dati partita da Firestore
  const fetchMatch = useCallback(async () => {
    try {
      const docRef = doc(db, 'matches', matchId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMatch(data);
        setGiocatori(data.iscritti || []);
      }
    } catch (err) {
      console.error('Errore nel caricamento della partita:', err);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    fetchMatch();
  }, [fetchMatch]);

  // 🧍‍♂️ Aggiungi giocatore
  const handleAddPlayer = async player => {
    if (giocatori.some(g => g.id === player.id)) return alert('Giocatore già iscritto!');
    const nuoviGiocatori = [...giocatori, player];
    setGiocatori(nuoviGiocatori);

    await updateDoc(doc(db, 'matches', matchId), { iscritti: nuoviGiocatori });
  };

  // ⚙️ Genera squadre bilanciate
  const handleGenerateTeams = () => {
    if (giocatori.length < 2) return alert('Servono almeno 2 giocatori!');
    const result = generaSquadreBilanciate(giocatori, Number(match.tipo));
    setSquadre(result);
  };

  // 💾 Salva formazione su Firestore
  const handleSaveFormation = async () => {
    if (!squadre) return alert('Nessuna formazione da salvare!');
    await updateDoc(doc(db, 'matches', matchId), { squadre });
    alert('✅ Formazione salvata con successo!');
  };

  if (loading) return <p>Caricamento partita...</p>;
  if (!match) return <p>Partita non trovata</p>;

  return (
    <div className="card shadow-sm mt-3 p-3">
      <h4 className="text-center">⚽ {match.campo?.indirizzo || 'Campo'} </h4>
      <p className="text-center text-muted mb-1">
        {match.data} — {match.ora} | Calcio a {match.tipo}
      </p>
      <hr />

      {/* Sezione iscritti */}
      <div className="mb-3">
        <h5 className="text-center">Giocatori iscritti</h5>
        {giocatori.length > 0 ? (
          <ul className="list-group">
            {giocatori.map(g => (
              <li key={g.id} className="list-group-item d-flex justify-content-between">
                <span>{g.name}</span>
                <span className="text-secondary">{g.overall}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">Nessun giocatore iscritto</p>
        )}
      </div>

      {/* Selettore giocatori */}
      <PlayerSelector players={allUsers} onAdd={handleAddPlayer} />

      {/* Generazione squadre */}
      <div className="mt-4 text-center">
        <button className="btn btn-outline-primary w-100" onClick={handleGenerateTeams}>
          🎲 Genera Squadre Equilibrate
        </button>
      </div>

      {squadre && (
        <>
          <div className="mt-4 row text-center">
            <div className="col-md-6 border-end">
              <h5 className="text-primary">Squadra A</h5>
              {squadre.teamA.map(p => (
                <div key={p.id}>
                  {p.name} ({p.overall})
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <h5 className="text-danger">Squadra B</h5>
              {squadre.teamB.map(p => (
                <div key={p.id}>
                  {p.name} ({p.overall})
                </div>
              ))}
            </div>
          </div>
          {squadre && (
            <>
              <TeamFormation teamA={squadre.teamA} teamB={squadre.teamB} tipo={match.tipo} />

              <div className="mt-3 text-center">
                <button className="btn btn-success" onClick={handleSaveFormation}>
                  💾 Salva Formazione
                </button>
              </div>
            </>
          )}
          <div className="mt-3 text-center">
            <button className="btn btn-success" onClick={handleSaveFormation}>
              💾 Salva Formazione
            </button>
          </div>
        </>
      )}
    </div>
  );
};

MatchDetails.propTypes = {
  matchId: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
};

export default MatchDetails;
