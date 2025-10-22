import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetPassword from 'components/Auth/ResetPassword';
import * as authUtils from 'utils/authUtils';
import { fillGeneralForm, renderWithRouter } from '../../../__mocks__/utils';

// Mock delle funzioni usate
jest.mock('utils/authUtils', () => ({
  doConfirmPasswordReset: jest.fn(),
  doResetPassword: jest.fn(),
  doVerifyPasswordResetCode: jest.fn(),
}));

describe('ResetPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 🧪 1️⃣ Test: mostra e chiude modale di errore (senza oobCode)
  test('mostra e chiude modale errore se il campo email è vuoto', async () => {
    renderWithRouter(<ResetPassword />);
    // Simula submit form reset password
    const submit = screen.getByTestId('submit-btn');
    fireEvent.click(submit);

    // Attendi che appaia la modale di errore
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent("Email vuota! Inserisci l'email");

    // Chiudi la modale
    fireEvent.click(screen.getByTestId('modal-btn-close'));
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  // 🧪 1️⃣ Test: mostra e chiude modale di errore (senza oobCode)
  test('mostra e chiude modale errore se doResetPassword fallisce', async () => {
    authUtils.doResetPassword.mockResolvedValue({
      errorMessage: 'Email non trovata',
    });

    renderWithRouter(<ResetPassword />);

    // Simula submit form reset password
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, {
      target: { value: 'test@example.com' },
    });
    const submit = screen.getByTestId('submit-btn');
    fireEvent.click(submit);

    // Attendi che appaia la modale di errore
    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Email non trovata');

    // Chiudi la modale
    fireEvent.click(screen.getByTestId('modal-btn-close'));
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  // 🧪 2️⃣ Test: mostra e chiude modale di successo (senza oobCode)
  test('mostra e chiude modale successo se doResetPassword va a buon fine', async () => {
    authUtils.doResetPassword.mockResolvedValue({
      successMessage: 'Email di reset inviata',
    });

    renderWithRouter(<ResetPassword />);
    fillGeneralForm({ screen, fireEvent });
    const submit = screen.getByTestId('submit-btn');
    fireEvent.click(submit);

    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Email di reset inviata');

    fireEvent.click(screen.getByTestId('modal-btn-close'));
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  // 🧪 3️⃣ Test: verifica codice reset e mostra errore
  test('mostra errore se il codice reset non è valido', async () => {
    authUtils.doVerifyPasswordResetCode.mockResolvedValue({
      errorMessage: 'Codice non valido',
    });

    renderWithRouter(<ResetPassword />, '/reset-password?oobCode=ABC123');

    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Codice non valido');

    fireEvent.click(screen.getByTestId('modal-btn-close'));
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });

  // 🧪 4️⃣ Test: conferma reset password (con oobCode valido e successo)
  test('mostra successo quando doConfirmPasswordReset riesce', async () => {
    authUtils.doVerifyPasswordResetCode.mockResolvedValue({
      successMessage: 'Codice valido',
    });
    authUtils.doConfirmPasswordReset.mockResolvedValue({
      successMessage: 'Password aggiornata con successo!',
    });

    renderWithRouter(<ResetPassword />, '/reset-password?oobCode=VALIDO');

    // Attendi che venga verificato il codice
    await waitFor(() => screen.getByTestId('resetPassword-step-password-from'));
    fillGeneralForm({ screen, fireEvent });
    // Esegui submit del form di nuova password
    const submit = screen.getByTestId('submit-btn');
    fireEvent.click(submit);

    const modal = await screen.findByTestId('modal-open');
    expect(modal).toHaveTextContent('Password aggiornata con successo!');

    fireEvent.click(screen.getByTestId('modal-btn-close'));
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });
});
