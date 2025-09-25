import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { login, logout } from 'state/auth/reducer';
import { store } from 'state/store';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { DEFAULT_PHOT_URL } from 'utils/Constant';

export const getIDFormCookie = () => {
  const cookies = document.cookie.split('; ').find((row) => row.startsWith('user='));

  if (!cookies) return false;

  const user = JSON.parse(decodeURIComponent(cookies.split('=')[1]));
  return user.id;
};

export const fetchUserProfile = async () => {
  const user = auth.currentUser;

  if (!user) return null;

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const displayName = user.displayName;
      const photoURL = user.photoURL || DEFAULT_PHOT_URL;
      const data = userDocSnap.data();
      const currentUser = { ...data, displayName, photoURL };
      store.dispatch(login(currentUser)); //Save on Redux
      return currentUser; // ✅ Dati utente Firestore
    } else {
      console.warn('Profilo utente non trovato in Firestore.');
      return null;
    }
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error);
    return null;
  }
};
export const authUpdateProfile = async (currentUser) => {
  try {
    const user = auth.currentUser;
    console.warn(...currentUser);
    await updateProfile(user, {
      displayName: `${currentUser.firstName} ${currentUser.lastName}`,
    });
    await setDoc(
      doc(db, 'users', user.uid),
      {
        ...currentUser,
        displayName: `${currentUser.firstName} ${currentUser.lastName}`,
        photoURL:
          currentUser.photoURL ||
          'https://res.cloudinary.com/dehfdnxul/image/upload/v1749824943/profilePictures/IvUEkZuXs7bKWpTFaB9TkgPNFc92.png',
      },
      { merge: true }
    ); // merge evita di sovrascrivere completamente il documento
    return true;
  } catch (err) {
    console.error('authUpdateProfile:', err);
    return false;
  }
};
export const doSignOut = async () => {
  try {
    await signOut(auth).catch((error) => console.error('Logout error', error));
    store.dispatch(logout());
    return true;
  } catch (err) {
    console.error('doSignOut:', err);

    return false;
  }
};
export const doSignInWithEmailAndPassword = async ({ credentials }) => {
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    const currentUser = await fetchUserProfile();
    return {
      currentUser: currentUser,
      result: true,
    };
  } catch (err) {
    console.error('doSignInWithEmailAndPassword:', err);

    return {
      error: err,
      result: false,
    };
  }
};
export const doCreateUserWithEmailAndPassword = async ({ account }) => {
  try {
    await createUserWithEmailAndPassword(auth, account.email, account.password);
    const dataAccount = account;
    delete dataAccount.email;
    delete dataAccount.password;
    await authUpdateProfile(account);
    const currentUser = await fetchUserProfile();
    return {
      currentUser,
      result: true,
    };
  } catch (err) {
    console.error('doCreateUserWithEmailAndPassword:', err);

    return {
      error: err,
      result: false,
    };
  }
};
