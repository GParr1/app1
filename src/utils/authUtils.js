import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { login, logout } from 'state/auth/reducer';
import { store } from 'state/store';

export const authUpdateProfile = async (currentUser) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: `${currentUser.firstName} ${currentUser.lastName}`,
      ...currentUser,
    });
    store.dispatch(login(auth.currentUser));
    return true;
  } catch (err) {
    return false;
  }
};
export const doSignOut = async () => {
  try {
    await signOut(auth).catch((error) => console.error('Logout error', error));
    store.dispatch(logout());
    return true;
  } catch (err) {
    return false;
  }
};
export const doSignInWithEmailAndPassword = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    store.dispatch(login(auth.currentUser));
    return true;
  } catch (err) {
    return false;
  }
};
export const doCreateUserWithEmailAndPassword = async ({ account }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      account.email,
      account.password
    );
    await updateProfile(userCredential.user, {
      displayName: `${account.firstName} ${account.lastName}`,
      ...account,
    });
    store.dispatch(login(auth.currentUser));
    return true;
  } catch (err) {
    return false;
  }
};
