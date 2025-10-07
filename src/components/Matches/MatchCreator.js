import React, { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import MapPicker from './MapPicker';

const MatchCreator = ({ currentUser }) => {
  const [campo, setCampo] = useState({ lat: null, lng: null, address: '' });

  const [form, setForm] = useState({
    campo: null,
    data: '',
    ora: '',
    tipo: '5',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCampoChange = pos => {
    setCampo(pos);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newMatch = {
      ...form,
      createdBy: currentUser.uid,
      iscritti: [],
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'matches', crypto.randomUUID()), newMatch);
    alert('✅ Partita creata con successo!');
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="card-title text-center">Crea una nuova partita</h5>
      <form onSubmit={handleSubmit}>
        <MapPicker onChange={handleCampoChange} />
        <p>Selezionato: {campo.address}</p>
        <input type="date" name="data" value={form.data} onChange={handleChange} />
        <input type="time" name="ora" value={form.ora} onChange={handleChange} />
        <button type="submit" className="btn btn-success w-100">
          Crea partita
        </button>
      </form>
    </div>
  );
};

export default MatchCreator;
