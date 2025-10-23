import React from 'react';
import { screen } from '@testing-library/react';
import CardBronze from 'components/FifaCard/CardBronze';
import { ATTRIBUTES, DEFAULT_PHOTO } from 'utils/Constant';
import { login } from 'state/auth/reducer';
import { store } from 'state/store';
import { renderWithProvider } from '../../../__mocks__/utils';

const defaultUser = {
  customerInfo: {
    firstName: 'Mario',
    lastName: 'Rossi',
    favoriteTeam: 'https://example.com/team.png',
    overall: 75,
    position: 'ATT',
    attributes: {
      VEL: 70,
      DRI: 72,
      TIR: 68,
      DIF: 50,
      PAS: 65,
      FIS: 60,
    },
  },
  userLogin: {
    photoURL: 'https://example.com/photo.png',
  },
};

describe('CardBronze component', () => {
  beforeEach(() => {
    store.dispatch(login({ ...defaultUser }));
  });

  test('renders player name, overall and position', () => {
    renderWithProvider(<CardBronze />);

    expect(screen.getByText(/Mario Rossi/i)).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('ATT')).toBeInTheDocument();
  });

  test('renders all attributes correctly', () => {
    renderWithProvider(<CardBronze />);

    ATTRIBUTES.forEach(attr => {
      const value = defaultUser.customerInfo.attributes[attr.key];
      expect(screen.getByText(value.toString())).toBeInTheDocument();
    });
  });

  test('uses dynamicValue if provided', () => {
    const dynamicValue = {
      customerInfo: {
        firstName: 'Luigi',
        lastName: 'Bianchi',
        overall: 80,
        position: 'CEN',
        attributes: { VEL: 80, DRI: 75, TIR: 70, DIF: 60, PAS: 65, FIS: 68 },
      },
      userLogin: { photoURL: 'https://example.com/luigi.png' },
    };
    renderWithProvider(<CardBronze dynamicValue={dynamicValue} />);

    expect(screen.getByText(/Luigi Bianchi/i)).toBeInTheDocument();
    //expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('CEN')).toBeInTheDocument();
  });

  test('falls back to default photo if none provided', () => {
    renderWithProvider(<CardBronze dynamicValue={{ customerInfo: {}, userLogin: {} }} />);
    const playerImg = document.querySelector('.div-face_image');
    expect(playerImg).toHaveStyle(`background-image: url('${DEFAULT_PHOTO}')`);
  });
});
