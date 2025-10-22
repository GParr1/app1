import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import { auth, db, facebookProvider, googleProvider } from '../firebaseConfig';
import { login, logout } from 'state/auth/reducer';
import { store } from 'state/store';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { starterCard } from '../structure/starterCard';
import {
  calculateAttributes,
  calculatePlayerOverall,
  getObjFromForm,
} from 'utils/utils';
import { DEFAULT_PHOTO } from 'utils/Constant';

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
      console.warn('Profilo utente non trovato in Firestore DataBase.');
      const userObj = { userLogin: user, customerInfo: {} };
      await store.dispatch(login(userObj)); //Save on Redux
      return userObj;
    }
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error);
    return null;
  }
};
export const fetchDocProfile = async userUid => {
  try {
    const userDocRef = doc(db, 'users', userUid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const doc = userDocSnap.data();
      await store.dispatch(login({ customerInfo: doc })); //Save on Redux
      return doc;
    } else {
      console.warn('Profilo utente non trovato in Firestore DataBase.');
      return {};
    }
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error);
    return {};
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
  const formObject = getObjFromForm({ formData });
  const isNewUser = formObject.isNewUser === 'true';
  const position = formObject.position || '';

  const attributes = calculateAttributes({
    height: formObject.height,
    birthDate: formObject.birthDate,
    position,
  });
  const overall = calculatePlayerOverall(starterCard[0].attributes);
  // Stampa l'oggetto JSON
  console.log(JSON.stringify(formObject, null, 2));
  const userObj = {
    userLogin: { ...user.userLogin },
    customerInfo: {
      ...user.customerInfo,
      ...formObject,
      ...(isNewUser && { attributes }),
      overall,
    },
  };
  console.log('Dati inseriti:', userObj);
  return await authUpdateProfile(userObj);
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
    await signInWithPopup(auth, googleProvider);
    const userData = await fetchUserProfile();
    await store.dispatch(login(userData));
    return userData;
  } catch (error) {
    let errorMessage = getFirebaseErrorMessage(error);
    console.error(`'Google sign-in errorCode:: ${error.code}, messagre: ${error.message}`);
    return { errorMessage };
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const doConfirmPasswordReset = async ({ oobCode, newPassword }) => {
  window.calcetto.toggleSpinner(true);
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { successMessage: 'La password è stata aggiornata con successo.' };
  } catch (error) {
    let errorMessage = getFirebaseErrorMessage(error);
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`);
    return { errorMessage };
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const doResetPassword = async ({ email }) => {
  window.calcetto.toggleSpinner(true);
  try {
    await sendPasswordResetEmail(auth, email);
    return { successMessage: 'Ti abbiamo inviato una mail per reimpostare la password.' };
  } catch (error) {
    let errorMessage = getFirebaseErrorMessage(error);
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`);
    return { errorMessage };
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const doVerifyPasswordResetCode = async ({ code }) => {
  window.calcetto.toggleSpinner(true);
  try {
    const result = await verifyPasswordResetCode(auth, code);
    return { successMessage: result };
  } catch (error) {
    let errorMessage = 'Il link di reset è scaduto o non valido.'; //getFirebaseErrorMessage(error);
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`);
    return { errorMessage };
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const doFirebaseLogin = async ({ action, options }) => {
  try {
    let result;
    // Esempi di login possibili
    if (action === 'email') {
      result = await signInWithEmailAndPassword(auth, options.email, options.password);
    } else if (action === 'google') {
      result = await signInWithPopup(auth, googleProvider);
    } else if (action === 'facebook') {
      result = await signInWithPopup(auth, facebookProvider);
    }
    const userLogin = result.user;
    await store.dispatch(login({ userLogin }));
    await fetchDocProfile(userLogin.uid);
    console.log('✅ Accesso riuscito:', result.user);
    return { successMessage: result.user };
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error);
    console.error('❌ Errore login:', error.code, errorMessage);
    return { errorMessage }; // se sei in React
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
    let errorMessage = getFirebaseErrorMessage(error);
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`);
    return { errorMessage };
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
const getFirebaseErrorMessage = error => {
  if (!error || !error.code) return 'Si è verificato un errore imprevisto.';

  switch (error.code) {
    // Errori comuni
    case 'auth/invalid-email':
      return "L'indirizzo email inserito non è valido o risulta già registrato.";
    case 'auth/user-disabled':
      return 'Questo account è stato disabilitato.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email o password non corretta.';
    case 'auth/network-request-failed':
      return 'Errore di rete. Controlla la connessione.';

    // Errori tipici dei provider (Google, Facebook, ecc.)
    case 'auth/popup-closed-by-user':
      return 'Hai chiuso la finestra di accesso.';
    case 'auth/popup-blocked':
      return 'Il browser ha bloccato la finestra di accesso.';
    case 'auth/cancelled-popup-request':
      return 'Richiesta di accesso annullata.';
    case 'auth/account-exists-with-different-credential':
      return 'L’email è già associata a un altro metodo di accesso.';
    case 'auth/operation-not-allowed':
      return 'Metodo di login disabilitato.';
    case 'auth/too-many-requests':
      return 'Troppe richieste. Riprova più tardi.';
    case 'auth/requires-recent-login':
      return 'Devi effettuare nuovamente il login per completare questa operazione.';
    case 'auth/credential-already-in-use':
      return 'Questa credenziale è già collegata a un altro account.';
    case 'auth/invalid-credential':
      return 'Credenziale non valida.';
    case 'auth/provider-already-linked':
      return 'Questo provider è già collegato al tuo account.';
    default:
      return 'Errore di autenticazione. Riprova più tardi.';
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
    return { successMessage: currentUser };
  } catch (error) {
    let errorMessage = getFirebaseErrorMessage(error);
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`);
    return { errorMessage };
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};

export const fetchAllUsers = async (limitCount = 50) => {
  window.calcetto.toggleSpinner(true);
  try {
    const usersCollection = collection(db, 'users');
    // Ordina per overall (discendente) e limita il numero
    const q = query(usersCollection, orderBy('overall', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        photoURL: data.photoURL || DEFAULT_PHOTO,
        overall: data.overall || 54,
        position: data.position || '',
      };
    });
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error);
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
