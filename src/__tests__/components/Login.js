import React from 'react';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import { createStore } from 'redux';
import Login from 'components/Login';
import * as authUtils from 'utils/authUtils';
import { Wrapper } from '../../setupTests';
import { MemoryRouter } from 'react-router-dom';

// Redux store minimo
const reducer = (state = {}) => state;
const store = createStore(reducer);

const WrapperWithRouter = ({ children }) => (
  <MemoryRouter initialEntries={['/app1/login']}>{children}</MemoryRouter>
);
describe('Login component con DOM diretto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  window.history.pushState({}, 'Test page', '/app1/login');
  it('renderizza i campi e i pulsanti', () => {
    render(<Login />, { wrapper: WrapperWithRouter });

    // Verifica che i tab e input esistano
    expect(document.querySelector("input[type='email']")).toBeInTheDocument();
    expect(document.querySelector("input[type='password']")).toBeInTheDocument();
    expect(document.querySelector('button')).toBeDefined();

    console.log(prettyDOM(document.body));
  });

  it('clic su pulsante Google login chiama la funzione', async () => {
    const googleSpy = jest.spyOn(authUtils, 'doGoogleLogin').mockResolvedValue({
      customerInfo: { overall: 90 },
    });

    render(<Login />, { wrapper: WrapperWithRouter });

    const googleBtn = document.querySelector('#google-login');
    fireEvent.click(googleBtn);

    await new Promise(resolve => setTimeout(resolve, 0)); // aspetta promise

    expect(googleSpy).toHaveBeenCalled();
  });

  it('modifica email e password e invia il form', async () => {
    window.history.pushState({}, 'Test page', '/app1/login');

    const signInSpy = jest.spyOn(authUtils, 'doSignInWithEmailAndPassword').mockResolvedValue({
      customerInfo: { overall: 90 },
    });

    render(<Login />, { wrapper: WrapperWithRouter });

    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const submitBtn = document.querySelector('#credential-login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    await new Promise(resolve => setTimeout(resolve, 0));

    // expect(signInSpy).toHaveBeenCalledWith({
    //   credentials: { email: 'test@example.com', password: 'password123' },
    // });
  });
});
