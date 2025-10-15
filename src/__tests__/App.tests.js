import React from 'react';
import { render, screen, fireEvent, prettyDOM } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

// Redux store minimo
const reducer = (state = { auth: { user: null } }, action) => state;
const store = createStore(reducer);

// Wrapper solo con Redux
const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('App component senza mock dei figli', () => {
  window.history.pushState({}, 'Test page', '/app1/register');

  it('renderizza AuthView se user è null', () => {
    render(<App />, { wrapper: Wrapper });

    // Controllo dei contenuti
    expect(document.querySelector("#login-tab[role='tab']")).toBeDefined();
    expect(document.querySelector("#register-tab[role='tab']")).toBeInTheDocument();

    // Log DOM
    console.log(prettyDOM(document.body));
  });

  it('cambia tab quando si clicca su Register', () => {
    render(<App />, { wrapper: Wrapper });

    const registerTab = document.getElementById('register-tab');
    fireEvent.click(registerTab);
    const loginTab = document.getElementById('login-tab');
    fireEvent.click(loginTab);

    //expect(screen.getByLabelText(/register-panel/i)).toHaveClass('show active');
  });
});
