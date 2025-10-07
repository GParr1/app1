import React, { useState } from 'react';
import { saveMatch } from 'utils/firestoreUtils';

const MatchCreator = ({ onCreated }) => {
  const [form, setForm] = useState({
    campo: '',
    data: '',
    tipo: '5',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newMatch = {
      ...form,
      createdAt: new Date().toISOString(),
      players: [],
      status: 'open',
    };
    const id = await saveMatch(newMatch);
    onCreated?.(id);
    setForm({ campo: '', data: '', tipo: '5' });
  };

  return (
    <div className="card shadow-sm mb-4 p-3">
      <h5 className="card-title text-center">Crea una nuova partita</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="campo" className="form-label">
            Campo
          </label>
          <input
            name="campo"
            value={form.campo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="data" className="form-label">
            Data
          </label>
          <input
            type="datetime-local"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">
            Tipo
          </label>
          <select name="tipo" value={form.tipo} onChange={handleChange} className="form-select">
            <option value="5">Calcio a 5</option>
            <option value="8">Calcio a 8</option>
          </select>
        </div>
        <button className="btn btn-success w-100" type="submit">
          Crea partita
        </button>
      </form>
    </div>
  );
};

export default MatchCreator;
