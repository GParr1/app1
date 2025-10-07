import React, { useState } from 'react';

const PlayerSelector = ({ players, onAdd }) => {
  const [guest, setGuest] = useState({ name: '', overall: 60 });

  const handleAddGuest = e => {
    e.preventDefault();
    if (!guest.name) return;
    onAdd({ ...guest, id: `guest-${Date.now()}` });
    setGuest({ name: '', overall: 60 });
  };

  return (
    <div className="card mt-3 p-3">
      <h6>Iscrivi Giocatori</h6>

      <ul className="list-group">
        {players.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between">
            <span>{p.name}</span>
            <button className="btn btn-sm btn-primary" onClick={() => onAdd(p)}>
              ➕ Aggiungi
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddGuest} className="mt-3">
        <h6>Aggiungi Guest</h6>
        <input
          placeholder="Nome"
          className="form-control mb-2"
          value={guest.name}
          onChange={e => setGuest({ ...guest, name: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Overall"
          value={guest.overall}
          onChange={e => setGuest({ ...guest, overall: e.target.value })}
          min={40}
          max={99}
        />
        <button className="btn btn-success w-100" type="submit">
          Aggiungi Guest
        </button>
      </form>
    </div>
  );
};

export default PlayerSelector;
