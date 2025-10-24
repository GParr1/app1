import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RegisterTwoSteps from 'components/Auth/Register';
import * as authUtils from 'utils/authUtils';
import { doFirebaseLogin } from 'utils/authUtils';
import { renderWithRouter } from '../../../__mocks__/utils';

// mock
jest.mock('utils/authUtils', () => ({
  doCreateUserWithEmailAndPassword: jest.fn(),
  doFirebaseLogin: jest.fn(),
}));

describe('RegisterTwoSteps component', () => {
  test('submit empty form step 1 ', async () => {
    // 1️⃣ Mock della risposta con errore
    authUtils.doCreateUserWithEmailAndPassword.mockResolvedValue({
      errorMessage: 'Errore durante la registrazione',
    });

    renderWithRouter(<RegisterTwoSteps />);

    // 2️⃣ Simula il completamento del primo step (per andare allo step 2)
    const form1 = screen.getByTestId('submit-btn');
    fireEvent.click(form1);

    // 4️⃣ Attendi che la modale appaia
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Nome e cognome obbligatori.');

    // 5️⃣ Clicca il bottone di chiusura
    fireEvent.click(screen.getByTestId('modal-btn-close'));

    // 6️⃣ Verifica che la modale sparisca
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  test('Submit register with error from doCreateUserWithEmailAndPassword', async () => {
    // 1️⃣ Mock della risposta con errore
    authUtils.doCreateUserWithEmailAndPassword.mockResolvedValue({
      errorMessage: 'Errore durante la registrazione',
    });

    renderWithRouter(<RegisterTwoSteps />);

    const firstName = screen.getByTestId('firstName-input');
    fireEvent.change(firstName, {
      target: { value: 'firstName' },
    });
    const lastName = screen.getByTestId('lastName-input');
    fireEvent.change(lastName, {
      target: { value: 'lastName' },
    });
    const dateSplitDay = screen.getByTestId('birthDate_day-select');
    fireEvent.change(dateSplitDay, {
      target: { value: '11' },
    });
    const dateSplitMonth = screen.getByTestId('birthDate_month-select');
    fireEvent.change(dateSplitMonth, {
      target: { value: '11' },
    });
    const dateSplitYear = screen.getByTestId('birthDate_year-select');
    fireEvent.change(dateSplitYear, {
      target: { value: '2000' },
    });
    // 2️⃣ Simula il completamento del primo step (per andare allo step 2)
    const form1 = screen.getByTestId('submit-btn');
    fireEvent.click(form1);

    // Ora siamo allo step 2
    await waitFor(() => screen.getByTestId('register-step-2-from'));

    const email = screen.getByTestId('email-input');
    fireEvent.change(email, {
      target: { value: 'test@example.com' },
    });
    const password = screen.getByTestId('password-input');
    fireEvent.change(password, {
      target: { value: 'password123' },
    });
    // 3️⃣ Simula la registrazione con errore
    const form2 = screen.getByTestId('submit-btn');
    fireEvent.click(form2);

    // 4️⃣ Attendi che la modale appaia
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Errore durante la registrazione');

    // 5️⃣ Clicca il bottone di chiusura
    fireEvent.click(screen.getByTestId('modal-btn-close'));

    // 6️⃣ Verifica che la modale sparisca
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  test('Submit register with success from doCreateUserWithEmailAndPassword', async () => {
    // 1️⃣ Mock della risposta con errore
    authUtils.doCreateUserWithEmailAndPassword.mockResolvedValue({
      successMessage: { currentUser: 'Current User' },
    });

    renderWithRouter(<RegisterTwoSteps />);

    const firstName = screen.getByTestId('firstName-input');
    fireEvent.change(firstName, {
      target: { value: 'firstName' },
    });
    const lastName = screen.getByTestId('lastName-input');
    fireEvent.change(lastName, {
      target: { value: 'lastName' },
    });
    const dateSplitDay = screen.getByTestId('birthDate_day-select');
    fireEvent.change(dateSplitDay, {
      target: { value: '11' },
    });
    const dateSplitMonth = screen.getByTestId('birthDate_month-select');
    fireEvent.change(dateSplitMonth, {
      target: { value: '11' },
    });
    const dateSplitYear = screen.getByTestId('birthDate_year-select');
    fireEvent.change(dateSplitYear, {
      target: { value: '2000' },
    });
    // 2️⃣ Simula il completamento del primo step (per andare allo step 2)
    const form1 = screen.getByTestId('submit-btn');
    fireEvent.click(form1);

    // Ora siamo allo step 2
    await waitFor(() => screen.getByTestId('register-step-2-from'));

    // 3️⃣ Simula la registrazione con errore
    const form2 = screen.getByTestId('register-step-2-from');
    fireEvent.submit(form2);

    // 4️⃣ Attendi che la modale appaia
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Registrazione completata con successo!');

    // 5️⃣ Clicca il bottone di chiusura
    fireEvent.click(screen.getByTestId('modal-btn-close'));

    // 6️⃣ Verifica che la modale sparisca
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  test('renders back btn', async () => {
    renderWithRouter(<RegisterTwoSteps />);
    const firstName = screen.getByTestId('firstName-input');
    fireEvent.change(firstName, {
      target: { value: 'firstName' },
    });
    const lastName = screen.getByTestId('lastName-input');
    fireEvent.change(lastName, {
      target: { value: 'lastName' },
    });
    const dateSplitDay = screen.getByTestId('birthDate_day-select');
    fireEvent.change(dateSplitDay, {
      target: { value: '11' },
    });
    const dateSplitMonth = screen.getByTestId('birthDate_month-select');
    fireEvent.change(dateSplitMonth, {
      target: { value: '11' },
    });
    const dateSplitYear = screen.getByTestId('birthDate_year-select');
    fireEvent.change(dateSplitYear, {
      target: { value: '2000' },
    });
    const form1 = screen.getByTestId('submit-btn');
    fireEvent.click(form1);
    const submit = screen.getByTestId('back-btn');
    fireEvent.click(submit);
    expect(screen.getByTestId('lastName-input')).toBeInTheDocument();
  });
  test('renders Login link correctly', async () => {
    renderWithRouter(<RegisterTwoSteps />);
    const link = screen.getByTestId('login-link');
    expect(link).toHaveAttribute('href', '/app1/welcome');
  });
  test('renders Social Login google error', async () => {
    // 1️⃣ Mock della risposta con errore
    authUtils.doFirebaseLogin.mockResolvedValue({
      errorMessage: 'Errore durante la registrazione con Google',
    });
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-google-btn'));
    // 4️⃣ Attendi che la modale appaia
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Errore durante la registrazione con Google');
  });
  test('renders Social Login google success', async () => {
    // 1️⃣ Mock della risposta con errore
    authUtils.doFirebaseLogin.mockResolvedValue({
      successMessage: { user: 'User' },
    });
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-google-btn'));
    await waitFor(() => expect(window.location.pathname).toBe('/confirm-profile'));
  });
  test('renders Social Login facebook error', async () => {
    // 1️⃣ Mock della risposta con errore
    authUtils.doFirebaseLogin.mockResolvedValue({
      errorMessage: 'Errore durante la registrazione con Facebook',
    });
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-facebook-btn'));
    // 4️⃣ Attendi che la modale appaia
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Errore durante la registrazione con Facebook');
  });
  test('renders Social Login facebook success', async () => {
    // 1️⃣ Mock della risposta con errore
    authUtils.doFirebaseLogin.mockResolvedValue({
      successMessage: { user: 'User' },
    });
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-facebook-btn'));
    await waitFor(() => expect(window.location.pathname).toBe('/confirm-profile'));
  });
});
