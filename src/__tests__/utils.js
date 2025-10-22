import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

export const renderWithRouter = (ui, route = '/') => {
  window.history.pushState({}, 'Test page', route);
  render(<BrowserRouter>{ui}</BrowserRouter>);
};
export const fillGeneralForm = ({ screen, fireEvent }) => {
  const email = screen.queryByTestId('email-input');
  email &&
    fireEvent.change(email, {
      target: { value: 'test@example.com' },
    });
  const password = screen.queryByTestId('password-input');
  password &&
    fireEvent.change(password, {
      target: { value: 'password123' },
    });
};
