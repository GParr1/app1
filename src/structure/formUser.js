import { teamLogo } from './teamLogo';
import { teamPosition } from './teamPosition';

const submitBtn = {
  type: 'submit',
  className: 'btn btn-primary w-100 text-uppercase fw-bold',
  label: '',
};
const emailInput = {
  type: 'email',
  name: 'email',
  label: 'Email',
  required: true,
  placeholder: 'Inserisci la tua Email',
  pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
  defaultValue: '',
  title: 'Inserisci una email valida',
};

/*Almeno 8 caratteri - Almeno una lettera maiuscola - Almeno una lettera minuscola - Almeno un numero - Almeno un simbolo speciale*/
const passwordInput = {
  type: 'password',
  name: 'password',
  label: 'Password',
  required: true,
  placeholder: 'Inserisci la tua Password',
  defaultValue: '',
  pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$',
  title:
    'La password deve avere almeno 8 caratteri, includere maiuscole, minuscole, numeri e un simbolo speciale',
};

const firstNameInput = {
  type: 'text',
  name: 'firstName',
  label: 'Nome',
  placeholder: 'Nome',
  defaultValue: '',
  required: true,
};
const lastNameInput = {
  type: 'text',
  name: 'lastName',
  label: 'Cognome',
  placeholder: 'Cognome',
  defaultValue: '',
};

export const FORMUSER = {
  id: 'userForm',
  fields: [
    { ...firstNameInput },
    { ...lastNameInput },
    {
      type: 'date',
      name: 'birthDate',
      label: 'Data di nascita',
      placeholder: 'Data di nascita',
      defaultValue: '',
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza (cm)',
      placeholder: 'Altezza (cm)',
      defaultValue: '',
    },
    {
      type: 'select',
      name: 'favoriteTeam',
      label: 'Team Preferito',
      options: teamLogo,
    },
    {
      type: 'select',
      name: 'position',
      label: 'Posizione',
      options: teamPosition,
    },
    {
      type: 'hidden',
      name: 'isNewUser',
      value: true,
    },
    { ...submitBtn, label: 'Registrati' },
  ],
};
export const FORM_REGISTER_STEP_1 = {
  id: 'register-step-1',
  fields: [
    { ...firstNameInput },
    { ...lastNameInput },
    {
      type: 'date-split',
      name: 'birthDate',
      label: 'Data di nascita',
      required: true,
      placeholder: '',
      defaultValue: '',
    },
    { ...submitBtn, label: 'Avanti' },
  ],
};

export const FORM_REGISTER_STEP_2 = {
  id: 'register-step-2',
  fields: [
    { ...emailInput },
    { ...passwordInput },
    {
      type: 'consent',
      name: 'privacy',
      label: 'Accetto i consensi',
      options: [
        { code: 'privacy', label: 'Acconsento al trattamento dei dati personali', required: true },
        { code: 'marketing', label: 'Acconsento al marketing e comunicazioni promozionali' },
      ],
      defaultValue: ['privacy'], // Se l'utente ha già dato il consenso per la privacy di default
    },
    {
      type: 'hidden',
      name: 'isNewUser',
      value: true,
    },
    { ...submitBtn, label: 'Registrati' },
  ],
};
export const FORM_EMAIL_STEP = {
  id: 'email-step',
  fields: [{ ...emailInput }, { ...submitBtn, label: 'Reset Password' }],
};
export const FORM_PASSWORD_STEP = {
  id: 'password-step',
  fields: [{ ...passwordInput }, { ...submitBtn, label: 'Reset Password' }],
};

export const FORM_ADD_GUEST = {
  id: 'addGuest',
  fields: [
    {
      type: 'text',
      name: 'guestName',
      label: 'Nome guest',
      placeholder: 'Nome guest',
      defaultValue: '',
    },
    {
      type: 'number',
      name: 'guestOverall',
      label: 'Overall',
      placeholder: 'Overall',
      defaultValue: '',
    },
    { ...submitBtn, className: 'btn btn-primary', label: 'Aggiungi' },
  ],
};
export const FORM_CREATE_MATCH = {
  id: 'createMatch',
  fields: [
    {
      type: 'text',
      name: 'campo',
      label: 'Campo',
      placeholder: 'Nome del campo',
      defaultValue: '',
      required: true,
      className: 'form-control',
    },
    {
      type: 'datetime-local',
      name: 'data',
      label: 'Data',
      placeholder: 'Seleziona data e ora',
      defaultValue: '',
      required: true,
      className: 'form-control',
    },
    {
      type: 'select',
      name: 'tipo',
      label: 'Tipo',
      options: [
        { value: '5', label: 'Calcio a 5' },
        { value: '8', label: 'Calcio a 8' },
      ],
      defaultValue: '5',
      className: 'form-select',
      required: true,
    },
    { ...submitBtn, label: 'Crea partita' },
  ],
};

export const FORM_REMOVE_GUEST = {
  id: 'addGuest',
  fields: [
    {
      type: 'text',
      name: 'guestName',
      label: 'Nome guest',
      placeholder: 'Nome guest',
      defaultValue: '',
    },
  ],
};
