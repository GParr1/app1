import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from 'state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { logout } from 'state/auth/reducer';

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
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
