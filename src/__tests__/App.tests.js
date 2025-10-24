import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';

import { renderWithProvider } from '../__mocks__/utils';

describe('App component senza mock dei figli', () => {
  window.history.pushState({}, 'Test page', '/app1');

  it('renderizza App route /app1', () => {
    renderWithProvider(<App />, '/app1');
    expect(screen.queryByTestId('logo-img')).toBeInTheDocument();
  });
  it('renderizza App route /app1/welcome', () => {
    renderWithProvider(<App />, '/app1/welcome');
    expect(screen.queryByTestId('logo-img')).toBeInTheDocument();
  });
  it('renderizza App route /app1/create-account', () => {
    renderWithProvider(<App />, '/app1/welcome');
    expect(screen.queryByTestId('logo-img')).toBeInTheDocument();
  });
  it('renderizza App route /app1/reset-password', () => {
    renderWithProvider(<App />, '/app1/reset-password');
    expect(screen.queryByTestId('logo-img')).toBeInTheDocument();
  });
});
