import { doc, setDoc, getDocs, deleteDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // la tua istanza Firebase

export const saveMatch = async match => {
  const ref = doc(collection(db, 'matches'));
  await setDoc(ref, match);
  return ref.id;
};
// Funzione per eliminare una partita
export const deleteMatch = async matchId => {
  try {
    const matchRef = doc(db, 'matches', matchId);  // Ottieni il riferimento al documento della partita
    await deleteDoc(matchRef); // Elimina il documento corrispondente
    console.log(`Partita con ID ${matchId} eliminata con successo.`);
  } catch (error) {
    console.error("Errore durante l'eliminazione della partita:", error);
    throw new Error("Errore durante l'eliminazione della partita.");
  }
};

export const getAllMatches = async () => {
  const snapshot = await getDocs(collection(db, 'matches'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateMatch = async (matchId, data) => {
  const ref = doc(db, 'matches', matchId);
  await updateDoc(ref, data);
};
