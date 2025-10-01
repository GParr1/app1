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
import { DEFAULT_PHOT_URL } from 'utils/Constant';
import { setLoading } from 'state/support/reducer';
import { starterCard } from 'utils/infoTeam';

export const getIDFormCookie = () => {
  const cookies = document.cookie.split('; ').find(row => row.startsWith('user='));

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
export const authUpdateProfile = async userObj => {
  store.dispatch(setLoading(true));
  try {
    const userLogin = userObj.userLogin;
    const customerInfo = userObj.customerInfo;
    await updateProfile(userLogin, {
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
    await fetchUserData({currentUser:userObj});
    return true;
  } catch (err) {
    console.error('authUpdateProfile:', err);
    return false;
  } finally {
    store.dispatch(setLoading(false));
  }
};
export const doSignOut = async () => {
  store.dispatch(setLoading(true));

  try {
    await signOut(auth).catch(error => console.error('Logout error', error));
    store.dispatch(logout());
    return true;
  } catch (err) {
    console.error('doSignOut:', err);

    return false;
  } finally {
    store.dispatch(setLoading(false));
  }
};
export const handleSaveFormUser = async (evt, user) => {
  evt.preventDefault();
  const formData = new FormData(evt.target); // raccoglie tutti i valori del form
  const isNewUser = formData.get('isNewUser') === 'true';
  const position = formData.get('position') || '';
  const starterAttribute = position.toLowerCase().includes('POR')
    ? starterCard.find(c => c.role === 'portiere').attributes
    : starterCard.find(c => c.role === 'player').attributes;

  const userObj = {
    userLogin: { ...user.userLogin },
    customerInfo: {
      ...user.customerInfo,
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      birthDate: formData.get('birthDate') || '',
      height: formData.get('height') || '',
      favoriteTeam: formData.get('favoriteTeam') || '',
      position,
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
  store.dispatch(setLoading(true));
  try {
    const result = await signInWithPopup(auth, provider);
    const currentUser = result.user;
    const userData = await fetchUserData({ currentUser });
    store.dispatch(login(userData));
    return userData;
  } catch (error) {
    console.error('Google sign-in error:', error);
  } finally {
    store.dispatch(setLoading(false));
  }
};
export const doSignInWithEmailAndPassword = async ({ credentials }) => {
  store.dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );
    const currentUser = userCredential.user;
    const userData = await fetchUserData({ currentUser });
    store.dispatch(login(userData));
    console.log('Login effettuato:', currentUser.email);
    return userData;
  } catch (error) {
    console.error('Errore nel login:', error.code, error.message);
  } finally {
    store.dispatch(setLoading(false));
  }
};
export const doCreateUserWithEmailAndPassword = async ({ account }) => {
  store.dispatch(setLoading(true));

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
    store.dispatch(setLoading(false));
  }
};
