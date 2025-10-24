import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'state/store'; // il tuo store Redux

export const renderWithRouter = (ui, route = '/app1') => {
  window.history.pushState({}, 'Test page', route);
  render(
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      {ui}
    </BrowserRouter>,
  );
};
export const renderWithProvider = (ui, route = '/app1') => {
  window.history.pushState({}, 'Test page', route);
  render(<Provider store={store}>{ui}</Provider>);
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

export const mockUser = { uid: '123', email: 'test@example.com' };
export const mockUserData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
};
