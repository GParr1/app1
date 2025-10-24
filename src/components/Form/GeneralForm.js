import React, { useState } from 'react';
import { getFormStructure } from 'utils/utils';

const GeneralForm = ({ handleSubmit, handleChange, formId, obj, labels }) => {
  const [showPassword, setShowPassword] = useState(false);
  const formData = getFormStructure(formId);
  return (
    <form id={formId} data-testid={`${formId}-from`} onSubmit={e => handleSubmit(e, obj)}>
      {formData.fields.map(field => {
        const {
          type,
          name,
          label,
          placeholder,
          defaultValue,
          options,
          className,
          required,
          pattern,
        } = field;
        // Render dinamico dei campi
        switch (type) {
          case 'text':
          case 'email':
          case 'number':
          case 'datetime-local':
          case 'date':
            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <input
                  type={type}
                  {...(required && { required: required })}
                  className="form-control rounded-4"
                  name={name}
                  id={name}
                  {...(handleChange ? { onChange: e => handleChange(e, name) } : {})}
                  {...(pattern && { pattern })}
                  placeholder={placeholder}
                  data-testid={`${name}-input`}
                  defaultValue={defaultValue}
                />
              </div>
            );
          case 'date-split': {
            // Creiamo array per giorni, mesi e anni
            const days = Array.from({ length: 31 }, (_, i) => i + 1);
            const months = [
              { code: '01', label: 'Gen' },
              { code: '02', label: 'Feb' },
              { code: '03', label: 'Mar' },
              { code: '04', label: 'Apr' },
              { code: '05', label: 'Mag' },
              { code: '06', label: 'Giu' },
              { code: '07', label: 'Lug' },
              { code: '08', label: 'Ago' },
              { code: '09', label: 'Set' },
              { code: '10', label: 'Ott' },
              { code: '11', label: 'Nov' },
              { code: '12', label: 'Dic' },
            ];
            const currentYear = new Date().getFullYear();
            const startYear = 1900;
            const years = Array.from(
              { length: currentYear - startYear + 1 },
              (_, i) => startYear + i,
            );

            // Se defaultValue è tipo 'YYYY-MM-DD', splitto per default value
            const [defaultYear, defaultMonth, defaultDay] = defaultValue
              ? defaultValue.split('-')
              : ['', '', ''];

            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label me-2">
                  {label}
                </label>
                <div className="d-flex gap-2">
                  <select
                    name={`${name}_day`}
                    data-testid={`${name}_day-select`}
                    defaultValue={defaultDay || ''}
                    {...(required && { required: required })}
                    className="form-select rounded-4"
                  >
                    <option value="">Giorno</option>
                    {days.map(day => (
                      <option key={day} value={String(day).padStart(2, '0')}>
                        {day}
                      </option>
                    ))}
                  </select>

                  <select
                    name={`${name}_month`}
                    data-testid={`${name}_month-select`}
                    defaultValue={defaultMonth || ''}
                    {...(required && { required: required })}
                    className="form-select rounded-4"
                  >
                    <option value="">Mese</option>
                    {months.map(month => (
                      <option key={month.code} value={month.code}>
                        {month.label}
                      </option>
                    ))}
                  </select>

                  <select
                    name={`${name}_year`}
                    data-testid={`${name}_year-select`}
                    defaultValue={defaultYear || ''}
                    {...(required && { required: required })}
                    className="form-select rounded-4"
                  >
                    <option value="">Anno</option>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          }
          case 'password': {
            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : type} // Mostra/nascondi password
                    className="form-control rounded-4"
                    {...(required && { required: required })}
                    name={name}
                    id={name}
                    data-testid={`${name}-input`}
                    {...(pattern && { pattern })}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                  />
                  <button
                    type="button"
                    className="btn btn-eye-toggle"
                    data-testid={`${name}-input-btn`}
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    <i className={`bi bi-eye`} />
                  </button>
                </div>
              </div>
            );
          }
          case 'consent': {
            return (
              <div key={name} className="mb-3">
                <div className="form-label">{label}</div>
                <div className="d-flex flex-column gap-2">
                  {options.map(option => (
                    <div key={option.code} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        {...(required && { required: required })}
                        id={option.code}
                        name={name}
                        data-testid={`${name}-checkbox`}
                        value={option.code}
                        defaultChecked={defaultValue && defaultValue.includes(option.code)}
                      />
                      <label className="form-check-label" htmlFor={option.code}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          case 'select':
            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <select
                  className="form-control rounded-4"
                  name={name}
                  id={name}
                  data-testid={`${name}-select`}
                  {...(handleChange ? { onChange: e => handleChange(e, name) } : {})}
                  {...(required && { required: required })}
                  defaultValue={''}
                >
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
              <button key={type} type={type} className={className} data-testid={`${type}-btn`}>
                {labels?.submitLabel ? labels.submitLabel : label}
              </button>
            );
          }
          default:
            return null;
        }
      })}
    </form>
  );
};
export default GeneralForm;
