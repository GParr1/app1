import React from 'react';
import {  screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterTwoSteps from 'components/Auth/Register';
import {mockUser, mockUserData, renderWithRouter} from '../../../__mocks__/utils';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {auth} from "../../../firebaseConfig";
import {doc, getDoc} from "firebase/firestore";

// mock

describe('RegisterTwoSteps component', () => {
  test('submit empty form step 1 ', async () => {
    // 1️⃣ Mock della risposta con errore
    const mockError = { code: 'auth/user-disabled' };
    createUserWithEmailAndPassword.mockRejectedValueOnce(mockError);
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
    const mockError = { code: 'auth/invalid-email' };
    createUserWithEmailAndPassword.mockRejectedValueOnce(mockError);
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
    expect(modal).toHaveTextContent('L\'indirizzo email inserito non è valido o risulta già registrato.');

    // 5️⃣ Clicca il bottone di chiusura
    fireEvent.click(screen.getByTestId('modal-btn-close'));

    // 6️⃣ Verifica che la modale sparisca
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  test('Submit register with success from doCreateUserWithEmailAndPassword', async () => {
    // 1️⃣ Mock della risposta con errore
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: mockUser });
    doc.mockImplementation((db, collectionName, uid) => ({
      id: uid,
      path: `${collectionName}/${uid}`,
    }));
    getDoc.mockResolvedValue({
      exists: () => false,
      data: () => mockUserData,
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
  {/* Test Login Social*/}
  test('renders Social Login google error', async () => {
    // 1️⃣ Mock della risposta con errore
    const mockError = { code: 'auth/popup-closed-by-user', message: 'Popup closed by user' };
    signInWithPopup.mockRejectedValueOnce(mockError);
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-google-btn'));
    // 4️⃣ Attendi che la modale appaia
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Hai chiuso la finestra di accesso.');
  });
  test('renders Social Login google success', async () => {
    // 1️⃣ Mock della risposta con errore
    const mockUser = { uid: '123', email: 'test@example.com' };
    signInWithPopup.mockResolvedValueOnce({ user: mockUser });
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-google-btn'));
    await waitFor(() => expect(window.location.pathname).toBe('/profile'));
  });
  test('renders Social Login facebook error', async () => {
    // 1️⃣ Mock della risposta con errore
    const mockError = { code: 'auth/popup-blocked', message: 'Popup blocked by user' };
    signInWithPopup.mockRejectedValueOnce(mockError);
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-facebook-btn'));
    // 4️⃣ Attendi che la modale appaia
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Il browser ha bloccato la finestra di accesso.');
  });
  test('renders Social Login facebook success', async () => {
    // 1️⃣ Mock della risposta con errore
    const mockUser = { uid: '123', email: 'test@example.com' };
    signInWithPopup.mockResolvedValueOnce({ user: mockUser });
    renderWithRouter(<RegisterTwoSteps />);
    fireEvent.click(screen.getByTestId('login-facebook-btn'));
    await waitFor(() => expect(window.location.pathname).toBe('/profile'));
  });
});
