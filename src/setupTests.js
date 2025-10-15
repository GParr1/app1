// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore } from 'redux';

const reducer = (state = { auth: { user: null } }, action) => state;
const store = createStore(reducer);
export const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

// Mock globale per Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({
    // puoi aggiungere eventuali proprietà se servono
  })),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    // eventuali metodi fittizi
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
  })),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({
    // metodi fittizi di Firestore
    collection: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
  })),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({
    // metodi fittizi di Storage
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
  })),
}));
