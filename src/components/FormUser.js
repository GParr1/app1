import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { FORMUSER } from '../structure/formUser';

const FormUser = ({ onSubmit, handleChange, formData = FORMUSER }) => {
  const user = useSelector(getUser) || {};
  const { customerInfo } = user;
  const isNewUser = customerInfo.overall;
  return (
    <form id={formData.id} onSubmit={onSubmit || null}>
      {formData.fields.map(field => {
        const { type, name, label, placeholder, defaultValue, options, section } = field;

        // Render dinamico dei campi
        switch (type) {
          case 'text':
          case 'number':
          case 'date':
            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <input
                  type={type}
                  className="form-control"
                  name={name}
                  placeholder={placeholder}
                  defaultValue={user[section][name] || defaultValue}
                  onChange={e => handleChange(e, section, name)}
                />
              </div>
            );
          case 'select':
            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <select
                  className="form-control"
                  name={name}
                  value={user[section][name] || ''}
                  onChange={e => handleChange(e, section, name)}
                >
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          case 'hidden':
            return <input type="hidden" name={name} value={!!isNewUser} key={name} />;
          default:
            return null;
        }
      })}

      <button type="submit" className="btn btn-success w-100">
        Save
      </button>
    </form>
  );
};

export default FormUser;
