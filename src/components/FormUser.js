import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';

const FormUser = ({ id, onSubmit }) => {
  const user = useSelector(getUser) || {};
  return (
    <form id={id} onSubmit={onSubmit || null}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nome"
          name={'firstName'}
          defaultValue={user.firstName || ''}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Cognome
        </label>
        <input type="text" className="form-control" placeholder="Cognome" name={'lastName'} />
      </div>
      <div className="mb-3">
        <label htmlFor="birthDate" className="form-label">
          Data di nascita
        </label>
        <input
          type="date"
          className="form-control"
          placeholder="Data di nascita"
          name={'birthDate'}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="height" className="form-label">
          Altezza (cm)
        </label>
        <input type="number" className="form-control" placeholder="Altezza (cm)" name={'height'} />
      </div>
      <div className="mb-3">
        <label htmlFor="jerseyNumber" className="form-label">
          Numero di maglia preferito (0-99)
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Numero di maglia preferito (0-99)"
          min="0"
          max="99"
          name={'jerseyNumber'}
        />
      </div>
      <button type="submit" className="btn btn-success w-100">
        Save
      </button>
    </form>
  );
};

export default FormUser;
