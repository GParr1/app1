import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { teamLogo, teamPosition } from 'utils/infoTeam';

const FormUser = ({ id, onSubmit, handleChange }) => {
  const user = useSelector(getUser) || {};
  const { customerInfo } = user;
  const isNewUser = customerInfo.overall;
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
          defaultValue={customerInfo.firstName || ''}
          {...(handleChange && { onChange: e => handleChange(e) })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Cognome
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Cognome"
          name={'lastName'}
          defaultValue={customerInfo.lastName || ''}
          {...(handleChange && { onChange: e => handleChange(e) })}
        />
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
          defaultValue={customerInfo.birthDate || ''}
          {...(handleChange && { onChange: e => handleChange(e) })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="height" className="form-label">
          Altezza (cm)
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Altezza (cm)"
          name={'height'}
          defaultValue={customerInfo.height || ''}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="favoriteTeam" className="form-label">
          Team Preferito:
        </label>
        <select className="mb-3 col-12" {...(handleChange && { onChange: e => handleChange(e) })}>
          {teamLogo.map(team => (
            <option key={team.label} value={team.logo}>
              {team.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="position" className="form-label">
          Team Preferito:
        </label>
        <select className="mb-3 col-12" {...(handleChange && { onChange: e => handleChange(e) })}>
          {teamPosition.map(role => (
            <option key={role.code} value={role.code}>
              {role.label}
            </option>
          ))}
        </select>
      </div>
      <input type="hidden" name="isNewUser" value={!!isNewUser} />

      <button type="submit" className="btn btn-success w-100">
        Save
      </button>
    </form>
  );
};

export default FormUser;
