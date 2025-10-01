import { envConfig } from '../../envConfig';
import { accountInformation } from 'state/auth/reducer';
import { store } from 'state/store';

export const fetchUserProfile = async userId => {
  try {
    const res = await fetch(`${envConfig.serverHost}/api/profile/${userId}`, {
      method: 'GET',
      credentials: 'include', // include i cookie se servono
    });
    if (!res.ok) {
      throw new Error('Errore nel recupero del profilo');
    }
    const data = await res.json();
    console.log('Profilo utente:', data);
    store.dispatch(accountInformation(data));
    return data;
  } catch (error) {
    console.error('Errore fetch profilo:', error);
    return null;
  }
};
