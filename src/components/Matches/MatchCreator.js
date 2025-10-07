import React, { useState, useCallback } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import PropTypes from 'prop-types';
import { generaSquadreBilanciate } from 'utils/utils';

const MatchCreator = ({ user }) => {
  const [form, setForm] = useState({
    campo: '',
    data: '',
    ora: '',
    tipo: '5',
  });
  const [giocatori, setGiocatori] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [guestOverall, setGuestOverall] = useState('');
  const [formazione, setFormazione] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleAddGuest = e => {
    e.preventDefault();
    if (!guestName || !guestOverall) return;

    const nuovo = {
      id: Date.now().toString(),
      nome: guestName,
      overall: parseInt(guestOverall),
      isGuest: true,
    };

    setGiocatori(prev => [...prev, nuovo]);
    setGuestName('');
    setGuestOverall('');
  };

  const handleGenerateTeams = useCallback(() => {
    const teams = generaSquadreBilanciate(giocatori, form.tipo);
    setFormazione(teams);
  }, [giocatori, form.tipo]);

  const handleSave = async () => {
    try {
      const partitaId = `${form.campo}-${form.data}-${form.ora}`;
      await setDoc(doc(db, 'partite', partitaId), {
        ...form,
        giocatori,
        formazione,
        createdBy: user?.uid || 'anonimo',
        createdAt: new Date().toISOString(),
      });
      alert('✅ Partita salvata con successo!');
    } catch (err) {
      console.error('Errore salvataggio:', err);
      alert('❌ Errore durante il salvataggio della partita.');
    }
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h5 className="card-title text-center">Crea una nuova partita</h5>

      {/* Form creazione */}
      <form>
        <div className="mb-3">
          <label htmlFor="campo" className="form-label">
            Campo
          </label>
          <input
            id="campo"
            name="campo"
            value={form.campo}
            onChange={handleChange}
            className="form-control"
            placeholder="Nome o luogo del campo"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="data" className="form-label">
            Data
          </label>
          <input
            id="data"
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ora" className="form-label">
            Ora
          </label>
          <input
            id="ora"
            type="time"
            name="ora"
            value={form.ora}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">
            Tipo di partita
          </label>
          <select
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="form-select"
          >
            <option value="5">Calcio a 5</option>
            <option value="8">Calcio a 8</option>
          </select>
        </div>
      </form>

      <hr />

      {/* Aggiunta giocatori */}
      <h6>Aggiungi giocatori / ospiti</h6>
      <form onSubmit={handleAddGuest} className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nome giocatore"
          value={guestName}
          onChange={e => setGuestName(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Overall"
          value={guestOverall}
          onChange={e => setGuestOverall(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          ➕
        </button>
      </form>

      {giocatori.length > 0 && (
        <ul className="list-group mb-3">
          {giocatori.map(g => (
            <li key={g.id} className="list-group-item d-flex justify-content-between">
              <span>{g.nome}</span>
              <span className="badge bg-secondary">{g.overall}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="d-flex gap-2">
        <button className="btn btn-warning w-50" onClick={handleGenerateTeams}>
          ⚽ Genera squadre
        </button>
        <button className="btn btn-success w-50" onClick={handleSave}>
          💾 Salva formazione
        </button>
      </div>

      {/* Campo visuale */}
      {formazione && (
        <div className="mt-4 text-center">
          <h6>⚽ Campo di Gioco</h6>
          <div className="campo-di-gioco">
            <div className="team team-a">
              {formazione.squadraA.map(p => (
                <div key={p.id} className="player player-a">
                  {p.nome} <small>({p.overall})</small>
                </div>
              ))}
            </div>
            <div className="divider"></div>
            <div className="team team-b">
              {formazione.squadraB.map(p => (
                <div key={p.id} className="player player-b">
                  {p.nome} <small>({p.overall})</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MatchCreator.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

export default MatchCreator;
