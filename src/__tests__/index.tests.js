import { logout } from 'state/auth/reducer';


describe('start app index.js', () => {
  let rootDiv;

  beforeEach(() => {
    // crea il div root simulato
    rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renderizza correttamente e definisce window.calcetto', async () => {
    await import('../index.js');

    expect(window.calcetto).toBeDefined();
    expect(typeof window.calcetto.logout).toBe('function');
    expect(typeof window.calcetto.toggleSpinner).toBe('function');
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
  it('logout', async () => {
    await import('../index.js');
    window.calcetto.logout();
   // expect(store.dispatch).toHaveBeenCalled();

  });
  it('render', async () => {
    await import('../index.js');
    await import('../index.js');
    console.log(document.getElementById('root').innerHTML);

  });
});
