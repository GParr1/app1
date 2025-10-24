import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from 'components/Auth/Login';
import { renderWithRouter } from '../../../__mocks__/utils';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

describe('Login component', () => {
  test('renders email input initially', () => {
    renderWithRouter(<Login />);
    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
  });
  test('click create account', async () => {
    renderWithRouter(<Login />);
    const btn = screen.getByTestId('create-account-btn');
    fireEvent.click(btn);
    expect(window.location.pathname).toBe('/create-account');
  });
  test('renders reset password link correctly', () => {
    renderWithRouter(<Login />);
    const link = screen.getByTestId('reset-password-link');
    expect(link).toHaveAttribute('href', '/app1/reset-password');
  });
  test('shows error on invalid email/phone input', async () => {
    renderWithRouter(<Login />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, {
      target: { value: 'invalid' },
    });
    const submit = screen.getByTestId('submit-btn');
    const form = submit.closest('form');
    fireEvent.submit(form);
    await waitFor(() =>
      expect(screen.getByTestId('modal-open')).toHaveTextContent(
        "Formato non valido. Inserisci un'email o un numero corretto.",
      ),
    );
    const closeBtn = screen.getByTestId('modal-btn-close');
    fireEvent.click(closeBtn);
    await waitFor(() => expect(screen.queryByTestId('modal-open')).not.toBeInTheDocument());
  });
  test('shows error on empty email/phone input', async () => {
    renderWithRouter(<Login />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, {
      target: { value: '' },
    });
    const submit = screen.getByTestId('submit-btn');
    const form = submit.closest('form');
    fireEvent.submit(form);
    await waitFor(() =>
      expect(screen.getByTestId('modal-open')).toHaveTextContent(
        "Inserisci un numero di telefono o un'email.",
      ),
    );
  });
  test('proceeds to password input with valid email', async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    const submit = screen.getByTestId('submit-btn');
    const form = submit.closest('form');
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByTestId('password-input')).toBeInTheDocument());
  });
  test('back btn', async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    const submit = screen.getByTestId('submit-btn');
    const form = submit.closest('form');
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByTestId('back-btn')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('back-btn'));
  });
  test('calls doFirebaseLogin on password submit', async () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: '123', email: 'test@example.com' },
    });
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    const submit = screen.getByTestId('submit-btn');
    const form = submit.closest('form');
    fireEvent.submit(form);
    await waitFor(() => screen.getByTestId('password-input'));
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    const submit2 = screen.getByTestId('submit-btn');
    const form2 = submit2.closest('form');
    fireEvent.submit(form2);
    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123',
      ),
    );
  });
});
