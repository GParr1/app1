import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from 'state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { logout } from 'state/auth/reducer';
import { pipeline } from '@xenova/transformers';
import ModalInfo from 'components/Modal/ModalInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
window.calcetto = {
  logout: () => store.dispatch(logout()),
  store: store,
  toggleSpinner: show => {
    const spinner = document.getElementById('global-spinner');
    if (!spinner) return;
    spinner.style.display = show ? 'flex' : 'none';
  },
  showModalMessage: (message, type = 'success', title = '') => {
    // Rimuovi eventuale modale precedente
    const existing = document.getElementById('dynamic-modal-root');
    if (existing) existing.remove();

    // Crea un container per la modale
    const container = document.createElement('div');
    container.id = 'dynamic-modal-root';
    document.body.appendChild(container);

    // Funzione per chiudere la modale e rimuovere il container
    const closeModal = () => {
      if (rootModal) {
        rootModal.unmount();
      }
      container.remove();
    };

    // Usa ReactDOM.createRoot per React 18+
    const rootModal = ReactDOM.createRoot(container);
    rootModal.render(
      <ModalInfo title={title} message={message} type={type} closeModal={closeModal} />,
    );
  },
};

// Variabile globale per il modello
window.removeBgPipeline = null;

// Funzione per inizializzare il modello
const initRemoveBgModel = async () => {
  if (!window.removeBgPipeline) {
    window.removeBgPipeline = await pipeline('image-segmentation', 'Xenova/rmbg', {
      auth: process.env.XENOVA_RMBG, // il tuo token
    });
    console.log('Modello di rimozione sfondo inizializzato');
  }
};

// Inizializza il modello subito
initRemoveBgModel();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
