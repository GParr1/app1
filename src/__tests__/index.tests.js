import { store } from 'state/store';

jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));
jest.mock('state/store', () => ({
  store: { dispatch: jest.fn(), getState: jest.fn(), subscribe: jest.fn() },
  persistor: { persist: jest.fn() },
}));


describe('index.js', () => {
  beforeAll(() => {
    const root = document.createElement('div');
    root.id = 'root';
    const spinner = document.createElement('div');
    spinner.id = 'global-spinner';

    document.body.appendChild(root);
    document.body.appendChild(spinner);
  });
  it('renders App without crashing', () => {
    require('../index'); // importa il file index.js
    window.calcetto.logout();
    expect(store.dispatch).toHaveBeenCalled();
    window.calcetto.toggleSpinner();
    //expect(document.getElementById).toHaveBeenCalledWith('global-spinner');
    expect(window.calcetto.store).toBeDefined();

  });
});
