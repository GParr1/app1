import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  updateDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { doSetMatches } from 'state/support/operations';
import { store } from 'state/store'; // la tua istanza Firebase

export const saveMatch = async match => {
  const ref = doc(collection(db, 'matches'));
  await setDoc(ref, match);
  return ref.id;
};
// Funzione per eliminare una partita
export const deleteMatch = async matchId => {
  try {
    const matchRef = doc(db, 'matches', matchId); // Ottieni il riferimento al documento della partita
    await deleteDoc(matchRef); // Elimina il documento corrispondente
    console.log(`Partita con ID ${matchId} eliminata con successo.`);
  } catch (error) {
    console.error("Errore durante l'eliminazione della partita:", error);
    throw new Error("Errore durante l'eliminazione della partita.");
  }
};

export const getAllMatches = async () => {
  const snapshot = await getDocs(collection(db, 'matches'));
  const listMatches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  store.dispatch(doSetMatches(listMatches));
};
export const getMatchesByPlayerId = (matches, playerId) => {
  return matches.filter(match => match.players?.some(player => player.id === playerId));
};
export const getFutureMatches = async () => {
  const today = new Date();

  const q = query(
    collection(db, 'matches'),
    where('dataTimestamp', '>', today), // campo Timestamp
    orderBy('dataTimestamp', 'asc'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
// 🔹 Partite passate
export const getPastMatches = async () => {
  const now = new Date().toISOString();

  const q = query(
    collection(db, 'matches'),
    where('data', '<', now),
    orderBy('data', 'desc'), // ordina dalla più recente alla più vecchia
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateMatch = async (matchId, data) => {
  const ref = doc(db, 'matches', matchId);
  await updateDoc(ref, data);
};
