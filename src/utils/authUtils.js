import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db, provider } from '../firebaseConfig';
import { login, logout } from 'state/auth/reducer';
import { store } from 'state/store';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { starterCard } from '../structure/starterCard';

export const fetchUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userObj = { userLogin: user, customerInfo: userDocSnap.data() };
      await store.dispatch(login(userObj)); //Save on Redux
      return userObj; // ✅ Dati utente Firestore
    } else {
      console.warn('Profilo utente non trovato in Firestore.');
      return null;
    }
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error);
    return null;
  }
};
export const authUpdateProfile = async userObj => {
  window.calcetto.toggleSpinner(true);
  try {
    const userLogin = userObj.userLogin;
    const customerInfo = userObj.customerInfo;
    const user = auth.currentUser;
    await updateProfile(user, {
      displayName: `${customerInfo.firstName} ${customerInfo.lastName}`,
    });
    await setDoc(
      doc(db, 'users', userLogin.uid),
      {
        ...customerInfo,
        photoURL: userLogin.photoURL || '/app1/assets/anonimous.png',
      },
      { merge: true },
    ); // merge evita di sovrascrivere completamente il documento
    const fetchUser = await fetchUserData({ currentUser: userLogin });
    await store.dispatch(login(fetchUser));
    return true;
  } catch (err) {
    console.error('authUpdateProfile:', err);
    return false;
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const doSignOut = async () => {
  window.calcetto.toggleSpinner(true);

  try {
    await signOut(auth).catch(error => console.error('Logout error', error));
    store.dispatch(logout());
    return true;
  } catch (err) {
    console.error('doSignOut:', err);

    return false;
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const handleSaveFormUser = async (evt, user) => {
  evt.preventDefault();
  const formData = new FormData(evt.target); // raccoglie tutti i valori del form
  const formObject = {};

  // Usa entries() per iterare sui dati di FormData
  for (let [key, value] of formData.entries()) {
    // Verifica se il campo è già presente nell'oggetto, se sì, crea un array per i valori multipli
    if (formObject[key]) {
      // Se è già un array, aggiungi il nuovo valore
      if (Array.isArray(formObject[key])) {
        formObject[key].push(value);
      } else {
        // Altrimenti crea un array e aggiungi i valori
        formObject[key] = [formObject[key], value];
      }
    } else {
      formObject[key] = value;
    }
  }
  const isNewUser = formObject.isNewUser === 'true';
  const position = formObject.position || '';
  const starterAttribute = position.toLowerCase().includes('POR')
    ? starterCard.find(c => c.role === 'portiere').attributes
    : starterCard.find(c => c.role === 'player').attributes;

  // Stampa l'oggetto JSON
  console.log(JSON.stringify(formObject, null, 2));
  const userObj = {
    userLogin: { ...user.userLogin },
    customerInfo: {
      ...user.customerInfo,
      ...formObject,
      ...(isNewUser && { attributes: { ...starterAttribute } }),
    },
  };

  console.log('Dati inseriti:', userObj);
  await authUpdateProfile(userObj);
};

const fetchUserData = async ({ currentUser }) => {
  const docRef = doc(db, 'users', currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Get Data to DB');
    return { userLogin: currentUser, customerInfo: docSnap.data() };
  } else {
    console.log('Get Data to Login');
    return { userLogin: currentUser, customerInfo: {} };
  }
};
export const doGoogleLogin = async () => {
  window.calcetto.toggleSpinner(true);
  try {
    await signInWithPopup(auth, provider);
    const userData = await fetchUserProfile();
    await store.dispatch(login(userData));
    return userData;
  } catch (error) {
    console.error('Google sign-in error:', error);
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const doSignInWithEmailAndPassword = async ({ credentials }) => {
  window.calcetto.toggleSpinner(true);
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    const userData = await fetchUserProfile();
    store.dispatch(login(userData));
    console.log('Login effettuato:', userData.userLogin.email);
    return userData;
  } catch (error) {
    console.error('Errore nel login.css:', error.code, error.message);
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const doCreateUserWithEmailAndPassword = async ({ account }) => {
  window.calcetto.toggleSpinner(true);
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
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
