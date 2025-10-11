import {
  filterInArrByCriteria,
  findInArrByCriteria,
  findInArrByParams,
  findInArrByUid,
  getObjFromForm,
} from 'utils/utils';
import { deleteMatch, getAllMatches, updateMatch } from 'utils/firestoreUtils';
import { DEFAULT_PHOTO } from 'utils/Constant';

export const handleJoinMatch = async ({ matches, matchId, user }) => {
  window.calcetto.toggleSpinner(true);
  const match = findInArrByUid(matches, matchId);
  if (!match) {
    alert(`❌ Non ho trovato la partit id: ${matchId}`);
    return;
  }
  const isMaxPlayersMatch = checkMaxPlayersMatch({ match });
  if (isMaxPlayersMatch) {
    alert(`❌ Hai già raggiunto il numero massimo di giocatori per il calcio a ${match.tipo}.`);
    return;
  }
  const playerExists = findInArrByUid(match.players, user.userLogin.uid);
  if (playerExists) return alert('Sei già iscritto!');

  const updated = {
    ...match,
    players: [
      ...match.players,
      {
        id: user.userLogin.uid,
        firstName: user.customerInfo.firstName,
        lastName: user.customerInfo.lastName,
        favoriteTeam: user.customerInfo.favoriteTeam,
        position: user.customerInfo.position,
        photoURL: user.customerInfo.photoURL,
        overall: user.customerInfo?.overall || 60,
      },
    ],
  };
  await updateMatch(matchId, updated);
  window.calcetto.toggleSpinner(false);
  return updated;
};

export const handleRemoveMatch = async ({ matches, matchId, user }) => {
  const match = findInArrByUid(matches, matchId);
  if (!match) {
    alert(`❌ Non ho trovato la partit id: ${matchId}`);
    return;
  }
  const playerExists = findInArrByUid(match.players, user.userLogin.uid);
  if (!playerExists) return; // Se il giocatore non è presente, esci dalla funzione
  const updatedPlayers = match.players.filter(p => p.id !== user.userLogin.uid);
  const updated = {
    ...match,
    players: updatedPlayers,
  };
  await updateMatch(matchId, updated);
  return updated;
};

export const handleJoinGuestMatch = async ({ matches, matchId, formObject }) => {
  window.calcetto.toggleSpinner(true);

  const match = findInArrByUid(matches, matchId);
  if (!match) {
    alert(`❌ Non ho trovato la partit id: ${matchId}`);
    return;
  }
  const isMaxPlayersMatch = checkMaxPlayersMatch({ match });
  if (isMaxPlayersMatch) {
    alert(`❌ Hai già raggiunto il numero massimo di giocatori per il calcio a ${match.tipo}.`);
    return;
  }
  const guestNumbers = match.players
    .filter(p => p.isGuest)
    .map(p => parseInt(p.id.replace('guest-', ''), 10))
    .filter(n => !isNaN(n));
  const nextIdNumber = guestNumbers.length > 0 ? Math.max(...guestNumbers) + 1 : 1;
  const newGuest = {
    id: `guest-${nextIdNumber}`,
    firstName: formObject.guestName,
    photoURL: DEFAULT_PHOTO,
    overall: parseInt(formObject.guestOverall, 10),
    isGuest: true,
  };

  const updated = {
    ...match,
    players: [...match.players, newGuest],
  };
  try {
    await updateMatch(matchId, updated);
    return updated;
  } catch (err) {
    console.error('Errore aggiunta guest:', err);
    alert('❌ Errore durante l’aggiunta del guest.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};

export const handleRemoveGuestMatch = async ({ matches, matchId, formObject }) => {
  const match = findInArrByUid(matches, matchId);
  if (!match) {
    alert(`❌ Non ho trovato la partit id: ${matchId}`);
    return;
  }
  const { guestName } = formObject;
  const criteria = { name: guestName, isGuest: true };
  const guest = findInArrByCriteria(match.players, criteria);
  if (!guest) {
    alert(`❌ Nessun guest con il nome "${guestName}" trovato.`);
    return;
  }

  const updatedPlayers = filterInArrByCriteria(match.players, criteria);
  const updated = {
    ...match,
    players: updatedPlayers,
  };

  try {
    await updateMatch(matchId, updated);
    alert(`✅ Guest "${guestName}" rimosso con successo.`);
    return updated;
  } catch (err) {
    console.error('Errore rimozione guest:', err);
    alert('❌ Errore durante la rimozione del guest.');
  }
};
export const handleDeleteMatchUtils = async ({ matches, matchId }) => {
  const match = findInArrByUid(matches, matchId);
  if (!match) {
    alert(`❌ Non ho trovato la partit id: ${matchId}`);
    return;
  }
  if (window.confirm('Sei sicuro di voler eliminare questa partita?')) {
    try {
      await deleteMatch(matchId); // Aggiungi la funzione per eliminare la partita
      alert('✅ Partita eliminata con successo.');
      return await getAllMatches();
    } catch (err) {
      console.error('Errore eliminazione partita:', err);
      alert('❌ Errore durante l’eliminazione della partita.');
    }
  }
};

export const checkMaxPlayersMatch = ({ match }) => {
  const maxPlayers = match.tipo === '5' ? 10 : 16;
  return match.players.length < maxPlayers;
};
