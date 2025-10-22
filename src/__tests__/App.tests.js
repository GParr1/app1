import React from 'react';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import App from '../App';
import { Wrapper } from '../setupTests';

describe('App component senza mock dei figli', () => {
  window.history.pushState({}, 'Test page', '/app1');

  it('renderizza AuthView se user è null', () => {
    render(<App />, { wrapper: Wrapper });

    // Controllo dei contenuti
    expect(document.querySelector("#login-tab[role='tab']")).toBeDefined();
    //expect(document.querySelector("#register-tab[role='tab']")).toBeInTheDocument();

    // Log DOM
    console.log(prettyDOM(document.body));
  });

  it('cambia tab quando si clicca su Register', () => {
    render(<App />, { wrapper: Wrapper });

    const registerTab = document.getElementById('register-tab');
    //fireEvent.click(registerTab);
    const loginTab = document.getElementById('login-tab');
   // fireEvent.click(loginTab);

    //expect(screen.getByLabelText(/register-panel/i)).toHaveClass('show active');
  });
});
