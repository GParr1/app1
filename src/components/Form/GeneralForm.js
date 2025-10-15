import React from 'react';
import { getFormStructure } from 'utils/utils';

const GeneralForm = ({ handleSubmit, formId, obj }) => {
  const formData = getFormStructure(formId);
  return (
    <form id={formId} onSubmit={e => handleSubmit(e, obj)}>
      {formData.fields.map(field => {
        const { type, name, label, placeholder, defaultValue, options, className } = field;

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
                  defaultValue={defaultValue}
                />
              </div>
            );
          case 'select':
            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <select className="form-control" name={name} defaultValue={''}>
                  {options.map(option => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          case 'submit': {
            return (
              <button type={type} className={className}>
                {label}
              </button>
            );
          }
          default:
            return <></>;
        }
      })}
    </form>
  );
};
export default GeneralForm;
