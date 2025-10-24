// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import {store} from "state/store";


jest.mock('swiper/react', () => {
  return {
    __esModule: true,
    Swiper: ({ children }) => <div>{children}</div>,
    SwiperSlide: ({ children }) => <div>{children}</div>,
  };
});

// per i CSS puoi lasciare vuoto
jest.mock('swiper/css', () => {});
// Mock globale per Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({
    // puoi aggiungere eventuali proprietà se servono
  })),
}));

const mockAuth = {
  currentUser: { uid: 'mockUserId', email: 'test@example.com' },
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
};
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => mockAuth),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  FacebookAuthProvider: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
}));
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({
    // metodi fittizi di Storage
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
  })),
}));

window.calcetto = {
  toggleSpinner:jest.fn(),
  logout:jest.fn(),
  store,
}