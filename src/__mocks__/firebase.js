// __mocks__/firebase.js
export const initializeApp = jest.fn(() => ({}));

export const getAuth = jest.fn(() => ({
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
    currentUser: null,
    onAuthStateChanged: jest.fn(),
}));

export const GoogleAuthProvider = jest.fn();

export const getFirestore = jest.fn(() => ({}));

export const getStorage = jest.fn(() => ({}));
