import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from 'state/store';
import { logout } from 'state/auth/reducer';

// Mock di App e reportWebVitals per evitare side effects reali
jest.mock('../App', () => () => <div data-testid="app">App Component</div>);
jest.mock('../reportWebVitals', () => jest.fn());

describe('index.js entrypoint', () => {
  let rootDiv;
  let createRootSpy;
  let renderSpy;

  beforeEach(() => {
    // crea il div root simulato
    rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    // mock di ReactDOM.createRoot
    renderSpy = jest.fn();
    createRootSpy = jest.spyOn(ReactDOM, 'createRoot').mockReturnValue({
      render: renderSpy,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renderizza correttamente e definisce window.calcetto', async () => {
    await import('../index.js');

    expect(createRootSpy).toHaveBeenCalledWith(rootDiv);
    expect(renderSpy).toHaveBeenCalled();

    expect(window.calcetto).toBeDefined();
    expect(typeof window.calcetto.logout).toBe('function');
    expect(typeof window.calcetto.toggleSpinner).toBe('function');
    expect(window.calcetto.store).toBe(store);
  });

  it('toggleSpinner mostra e nasconde lo spinner', async () => {
    await import('../index.js');

    const spinner = document.createElement('div');
    spinner.id = 'global-spinner';
    document.body.appendChild(spinner);

    window.calcetto.toggleSpinner(true);
    expect(spinner.style.display).toBe('flex');

    window.calcetto.toggleSpinner(false);
    expect(spinner.style.display).toBe('none');
  });
});
