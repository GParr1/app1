// index-app.js
import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App'; // Stesso componente condiviso
import { store, persistor } from 'state/store';

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// Expo registra l'app come entrypoint
registerRootComponent(Root);
