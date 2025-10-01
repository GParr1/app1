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
