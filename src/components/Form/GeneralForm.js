import React from 'react';
import { getFormStructure } from 'utils/utils';

const GeneralForm = ({ handleSubmit, formId, obj }) => {
  const formData = getFormStructure(formId);
  return (
    <form id={formId} onSubmit={e => handleSubmit(e, obj)}>
      {formData.fields.map(field => {
        const { type, name, label, placeholder, defaultValue, options } = field;

        // Render dinamico dei campi
        switch (type) {
          case 'text':
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
                  className="form-control rounded-4"
                  name={name}
                  id={name}
                  placeholder={placeholder}
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
              <div key={name} className="mb-3 d-flex gap-2 align-items-center">
                <label htmlFor={name} className="form-label me-2" style={{ minWidth: '100px' }}>
                  {label}
                </label>
                <select
                  name={`${name}_day`}
                  defaultValue={defaultDay || ''}
                  className="form-select rounded-4"
                  style={{ width: '70px' }}
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
                  defaultValue={defaultMonth || ''}
                  className="form-select rounded-4"
                  style={{ width: '90px' }}
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
                  defaultValue={defaultYear || ''}
                  className="form-select rounded-4"
                  style={{ width: '100px' }}
                >
                  <option value="">Anno</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          case 'password': {
            // Funzione per toggle password
            const togglePasswordVisibility = e => {
              const toggleButton = e.currentTarget;
              const passwordInput = toggleButton.closest('.input-group').querySelector('input');
              if (passwordInput.type === 'password') {
                passwordInput.type = 'text'; // Cambia a testo (visibile)
                toggleButton.innerHTML = '<i class="bi bi-eye-slash"></i>'; // Cambia l'icona
              } else {
                passwordInput.type = 'password'; // Cambia a password (nascosta)
                toggleButton.innerHTML = '<i class="bi bi-eye"></i>'; // Cambia l'icona
              }
            };
            return (
              <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <div className="input-group">
                  <input
                    type={type} // Mostra/nascondi password
                    className="form-control rounded-4"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={e => togglePasswordVisibility(e)}
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
                        id={option.code}
                        name={name}
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
                <select className="form-control rounded-4" name={name} id={name} defaultValue={''}>
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
              <button type={type} className="btn btn-primary">
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
