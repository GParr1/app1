import {
  filterInArrByCriteria,
  findInArrByCriteria,
  findInArrByUid,
  getObjFromForm,
} from 'utils/utils';
import { deleteMatch, getAllMatches, saveMatch, updateMatch } from 'utils/firestoreUtils';
import { DEFAULT_PHOTO } from 'utils/Constant';
import { Timestamp } from 'firebase/firestore';

export const handleSaveTeam = async ({ match, teams }) => {
  try {
    window.calcetto.toggleSpinner(true);
    const { id } = match;
    const updated = {
      ...match,
      ...teams,
    };
    await updateMatch(id, updated);
    await getAllMatches();
    window.calcetto.toggleSpinner(false);
  } catch (err) {
    console.error('Errore aggiunta:', err);
    alert('❌ Errore durante l’iscrizione.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};

export const handleSaveResult = async ({ match, result }) => {
  try {
    window.calcetto.toggleSpinner(true);
    const { id } = match;
    const updated = {
      ...match,
      ...result,
    };
    await updateMatch(id, updated);
    await getAllMatches();
    window.calcetto.toggleSpinner(false);
  } catch (err) {
    console.error('Errore aggiunta:', err);
    alert('❌ Errore durante l’iscrizione.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const handleJoinMatch = async ({ matches, matchId, user }) => {
  try {
    window.calcetto.toggleSpinner(true);
    const match = findInArrByUid(matches, matchId);
    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${matchId}`);
      return;
    }
    const isMaxPlayersMatch = checkMaxPlayersMatch({ match });
    if (!isMaxPlayersMatch) {
      alert(`❌ Hai già raggiunto il numero massimo di giocatori per il calcio a ${match.tipo}.`);
      return;
    }
    const playerExists = findInArrByUid(match.players, user.userLogin.uid);
    if (playerExists) return alert('Sei già iscritto!');

    const updated = {
      ...match,
      status: 'open' || 'closed',
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
    await getAllMatches();
    window.calcetto.toggleSpinner(false);
    return updated;
  } catch (err) {
    console.error('Errore aggiunta:', err);
    alert('❌ Errore durante l’iscrizione.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};

export const handleRemoveMatch = async ({ matches, matchId, user }) => {
  try {
    window.calcetto.toggleSpinner(true);
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
    await getAllMatches();
    return updated;
  } catch (err) {
    console.error('Errore aggiunta guest:', err);
    alert('❌ Errore durante la rimozione.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};

export const handleJoinGuestMatch = async ({ matches, matchId, formObject }) => {
  try {
    window.calcetto.toggleSpinner(true);

    const match = findInArrByUid(matches, matchId);
    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${matchId}`);
      return;
    }
    const isMaxPlayersMatch = checkMaxPlayersMatch({ match });
    if (!isMaxPlayersMatch) {
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
    await updateMatch(matchId, updated);
    await getAllMatches();
    return updated;
  } catch (err) {
    console.error('Errore aggiunta guest:', err);
    alert('❌ Errore durante l’aggiunta del guest.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};

export const handleRemoveGuestMatch = async ({ matches, matchId, formObject }) => {
  try {
    window.calcetto.toggleSpinner(true);
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
    await updateMatch(matchId, updated);
    alert(`✅ Guest "${guestName}" rimosso con successo.`);
    await getAllMatches();
    return updated;
  } catch (err) {
    console.error('Errore rimozione guest:', err);
    alert('❌ Errore durante la rimozione del guest.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const handleDeleteMatchUtils = async ({ matches, matchId }) => {
  try {
    window.calcetto.toggleSpinner(true);
    const match = findInArrByUid(matches, matchId);
    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${matchId}`);
      return;
    }
    if (window.confirm('Sei sicuro di voler eliminare questa partita?')) {
      try {
        await deleteMatch(matchId); // Aggiungi la funzione per eliminare la partita
        alert('✅ Partita eliminata con successo.');
        await getAllMatches();
      } catch (err) {
        console.error('Errore eliminazione partita:', err);
        alert('❌ Errore durante l’eliminazione della partita.');
      }
    }
  } catch (err) {
    console.error('Errore aggiunta guest:', err);
    alert('❌ Errore durante la rimozione della partita.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export const handleCreateMatchUtils = async evt => {
  try {
    const formData = new FormData(evt.target);
    const formObject = getObjFromForm({ formData });
    const newMatch = {
      ...formObject,
      createdAt: new Date().toISOString(),
      // converto la stringa form.data in Timestamp
      dataTimestamp: Timestamp.fromDate(new Date(formObject.data)),
      players: [],
      status: 'open',
    };
    const id = await saveMatch(newMatch);
    !!id && (await getAllMatches());
  } catch (err) {
    console.error('Errore durante la creazione della partita:', err);
    alert('❌ Errore durante la creazione della partita.');
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};

export const checkMaxPlayersMatch = ({ match }) => {
  const maxPlayers = match.tipo === '5' ? 10 : 16;
  return match.players.length < maxPlayers;
};
// 🔹 Controlla se il numero massimo è raggiunto
export const checkStatusMatch = ({ match }) => {
  const maxPlayers = match.tipo === '5' ? 10 : 16;
  return match.players.length >= maxPlayers ? 'closed' : 'open';
};
