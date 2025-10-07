import { doc, setDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // la tua istanza Firebase

export const saveMatch = async match => {
  const ref = doc(collection(db, 'matches'));
  await setDoc(ref, match);
  return ref.id;
};

export const getAllMatches = async () => {
  const snapshot = await getDocs(collection(db, 'matches'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateMatch = async (matchId, data) => {
  const ref = doc(db, 'matches', matchId);
  await updateDoc(ref, data);
};
