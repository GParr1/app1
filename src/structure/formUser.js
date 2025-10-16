import { teamLogo } from './teamLogo';
import { teamPosition } from './teamPosition';

export const FORMUSER = {
  id: 'userForm',
  fields: [
    {
      type: 'text',
      name: 'firstName',
      label: 'Nome',
      placeholder: 'Nome',
      defaultValue: 'Giovanni',
      section: 'customerInfo',
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Cognome',
      placeholder: 'Cognome',
      defaultValue: 'Parrone',
      section: 'customerInfo',
    },
    {
      type: 'date',
      name: 'birthDate',
      label: 'Data di nascita',
      placeholder: 'Data di nascita',
      defaultValue: '1989-11-25',
      section: 'customerInfo',
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza (cm)',
      placeholder: 'Altezza (cm)',
      defaultValue: '177',
      section: 'customerInfo',
    },
    {
      type: 'select',
      name: 'favoriteTeam',
      label: 'Team Preferito',
      options: teamLogo,
      section: 'customerInfo',
    },
    {
      type: 'select',
      name: 'position',
      label: 'Posizione',
      options: teamPosition,
      section: 'customerInfo',
    },
    {
      type: 'hidden',
      name: 'isNewUser',
      value: true,
    },
  ],
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
    {
      type: 'submit',
      className: 'btn btn-primary',
      label: 'Aggiungi',
    },
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
    {
      type: 'submit',
      className: 'btn btn-success w-100',
      label: 'Crea partita',
    },
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
