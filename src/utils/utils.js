import { v4 as uuidv4 } from 'uuid';
import { BRONZE_CARD_BG, GOLD_CARD_BG, SILVER_CARD_BG } from 'utils/Constant';
import {
  FORM_ADD_GUEST,
  FORM_CREATE_MATCH,
  FORM_EMAIL_STEP,
  FORM_PASSWORD_STEP,
  FORM_REGISTER_STEP_1,
  FORM_REGISTER_STEP_2,
  FORM_REMOVE_GUEST,
  FORMUSER,
} from '../structure/formUser';
import { store } from 'state/store';
import { getUser } from 'state/auth/selectors';
import { authUpdateProfile } from 'utils/authUtils';

export const calculatePlayerOverall = attrs => {
  const { VEL, TIR, PAS, DRI, DIF, FIS } = attrs;
  return Math.round((VEL + TIR + PAS + DRI + DIF + FIS) / 6);
};

export const calculateGoalkeeperOverall = attrs => {
  const { PAR, RIF, POS, VEL, TEC, RES } = attrs;
  return Math.round(PAR * 0.3 + RIF * 0.25 + POS * 0.2 + VEL * 0.1 + TEC * 0.1 + RES * 0.05);
};
export const cleanUrlParamiter = () => {
  const url = new URL(window.location);
  window.history.replaceState({}, '', url.pathname);
};
export const maskEmail = email => {
  const [name, domain] = email.split('@');
  if (!name || !domain) return email;

  const visible = name.slice(0, 2); // prime 2 lettere
  return `${visible}${'*'.repeat(5)}@${domain}`;
};
export const manageFirstLogin = () => {
  const state = store.getState();
  const user = getUser(state);
  return user.customerInfo ? '/profile' : '/confirm-profile';
};
export const getFormStructure = formId => {
  let formStructure = {};
  switch (formId) {
    case 'formUser': {
      formStructure = FORMUSER;
      break;
    }
    case 'email-step':
    case 'resetPassword': {
      formStructure = FORM_EMAIL_STEP;
      break;
    }
    case 'password-step':
    case 'resetPassword-step-password': {
      formStructure = FORM_PASSWORD_STEP;
      break;
    }
    case 'register-step-2': {
      formStructure = FORM_REGISTER_STEP_2;
      break;
    }
    case 'register-step-1': {
      formStructure = FORM_REGISTER_STEP_1;
      break;
    }
    case 'createMatch': {
      formStructure = FORM_CREATE_MATCH;
      break;
    }
    case 'addGuest': {
      formStructure = FORM_ADD_GUEST;
      break;
    }
    case 'removeGuest': {
      formStructure = FORM_REMOVE_GUEST;
      break;
    }
    default: {
      formStructure = {};
    }
  }
  return formStructure;
};
export const getCardTier = overall => {
  if (overall < 65) return BRONZE_CARD_BG;
  if (overall < 80) return SILVER_CARD_BG;
  return GOLD_CARD_BG;
};

/**
 * Divide i giocatori in 2 squadre equilibrate in base all'overall.
 * @param {Array} players - Array di oggetti con {id, name, overall}
 * @returns {{teamA: Array, teamB: Array}}
 */
export const balanceTeams = (players = []) => {
  if (players.length === 0) return { teamA: [], teamB: [] };

  // 1️⃣ Ordina per overall discendente
  const sorted = [...players].sort((a, b) => b.overall - a.overall);

  // 2️⃣ Bilancia alternando
  const teamA = [];
  const teamB = [];

  sorted.forEach(p => {
    const sumA = teamA.reduce((s, x) => s + x.overall, 0);
    const sumB = teamB.reduce((s, x) => s + x.overall, 0);
    if (sumA <= sumB) teamA.push(p);
    else teamB.push(p);
  });

  return { teamA, teamB };
};
export const getTeamIds = (team = []) => {
  return team.map(player => player.id);
};
export const analyzeMatch = (teamA, teamB) => {
  if (!teamA.length || !teamB.length) return null;

  // 🔹 Forza media
  const avgA = teamA.reduce((s, x) => s + x.overall, 0) / teamA.length;
  const avgB = teamB.reduce((s, x) => s + x.overall, 0) / teamB.length;

  // 🔹 Possesso palla (%) proporzionale alla forza
  const totalAvg = avgA + avgB;
  const possessionA = Math.round((avgA / totalAvg) * 100);
  const possessionB = 100 - possessionA;

  // 🔹 Passaggi riusciti (calcetto amatoriale: 70%-95%)
  const passAccuracyA = Math.round(Math.random() * 25 + 70 * (avgA / 90));
  const passAccuracyB = Math.round(Math.random() * 25 + 70 * (avgB / 90));

  // 🔹 Tiri per squadra (3-10 per partita amatoriale)
  const shotsA = Math.max(1, Math.round(Math.random() * 7 + 3 * (avgA / 90)));
  const shotsB = Math.max(1, Math.round(Math.random() * 7 + 3 * (avgB / 90)));

  // 🔹 Tiri nello specchio (50%-70% dei tiri)
  const shotsOnTargetA = Math.round(shotsA * (0.5 + Math.random() * 0.2));
  const shotsOnTargetB = Math.round(shotsB * (0.5 + Math.random() * 0.2));

  // 🔹 Gol attesi proporzionali ai tiri nello specchio
  const expectedGoalsA = Math.round(
    shotsOnTargetA * (avgA / (avgA + avgB)) * (0.6 + Math.random() * 0.2),
  );
  const expectedGoalsB = Math.round(
    shotsOnTargetB * (avgB / (avgA + avgB)) * (0.6 + Math.random() * 0.2),
  );

  // 🔹 Determina vincitore
  const winner =
    expectedGoalsA > expectedGoalsB
      ? 'Squadra A'
      : expectedGoalsB > expectedGoalsA
        ? 'Squadra B'
        : 'Pareggio';

  return {
    possession: { teamA: possessionA, teamB: possessionB },
    passAccuracy: { teamA: passAccuracyA, teamB: passAccuracyB },
    shots: { teamA: shotsA, teamB: shotsB },
    shotsOnTarget: { teamA: shotsOnTargetA, teamB: shotsOnTargetB },
    goals: { teamA: expectedGoalsA, teamB: expectedGoalsB },
    winner,
  };
};

export const findInArrByUid = (arr, uid) => arr.find(p => p.id === uid);
export const findInArrByCriteria = (arr, criteria) => {
  // criteria è un oggetto tipo { name: 'Mario', isGuest: true }
  return arr.find(p => Object.keys(criteria).every(key => p[key] === criteria[key]));
};
export const filterInArrByCriteria = (arr, criteria) => {
  // criteria è un oggetto tipo { name: 'Mario', isGuest: true }
  return arr.filter(p => Object.keys(criteria).every(key => p[key] === criteria[key]));
};
export const generaSquadreBilanciate = (giocatori, tipo = 5) => {
  const shuffled = [...giocatori].sort(() => Math.random() - 0.5);
  const sorted = shuffled.sort((a, b) => b.overall - a.overall);

  const teamA = [];
  const teamB = [];

  sorted.forEach((p, i) => {
    if (teamA.length < tipo / 2 && (i % 2 === 0 || teamB.length >= tipo / 2)) teamA.push(p);
    else teamB.push(p);
  });

  return { teamA, teamB };
};
// export const removeBackground = async imgFile => {
//   if (!window.removeBgPipeline) {
//     console.error('Il modello non è stato inizializzato');
//     return null;
//   }
//
//   // Converti File in un URL
//   const imgUrl = URL.createObjectURL(imgFile);
//
//   try {
//     // Esegui la rimozione dello sfondo
//     const result = await window.removeBgPipeline(imgUrl);
//
//     // `result` contiene il canvas o immagine processata
//     // Converti in Blob/File
//     const canvas = result[0].maskCanvas; // dipende dal modello
//     return new Promise(resolve => {
//       canvas.toBlob(blob => {
//         resolve(new File([blob], `cleaned-${Date.now()}.png`, { type: 'image/png' }));
//       });
//     });
//   } catch (error) {
//     console.error('Errore nella rimozione dello sfondo:', error);
//     return null;
//   }
// };

export const removeBackground = async imgFile => {
  try {
    const imageElement = await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(imgFile);
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
    // Segmenta la persona (mask = 1 per persona, 0 per sfondo)
    const segmentation = await window.net.segmentPerson(imageElement, {
      internalResolution: 'high',
      segmentationThreshold: 0.7, // più stringente, sfondo più pulito
      maxDetections: 1,
    });

    // Crea un canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    const ctx = canvas.getContext('2d');

    // Disegna l'immagine originale nel canvas
    ctx.drawImage(imageElement, 0, 0);
    // Estrai i dati pixel
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixel = imageData.data;

    // Applica la maschera della persona
    for (let i = 0; i < segmentation.data.length; i++) {
      if (segmentation.data[i] === 0) {
        // Sfondo → trasparente
        pixel[i * 4 + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    // Crea un Blob da salvare come file PNG
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    return new File([blob], `cleaned-${Date.now()}.png`, {
      type: 'image/png',
    });
  } catch (err) {
    console.error('Errore nella rimozione sfondo locale:', err);
    return null;
  }
};

// export const removeBackground = async (imgFile) => {
//   try {
//     const response = await fetch('https://api.remove.bg/v1.0/removebg', {
//       method: 'POST',
//       headers: {
//         'X-Api-Key': 'i4L41YsoE4jvHSofw5RcWNZM', // <-- API key
//       },
//       body: formData,
//     });
//
//     if (!response.ok) {
//       console.error('Errore nella chiamata a remove.bg', response.statusText);
//       return null;
//     }
//
//     const blob = await response.blob();
//     return new File([blob], `cleaned-${Date.now()}.png`, {
//       type: 'image/png',
//     });
//   } catch (error) {
//     console.error('Errore nella rimozione dello sfondo:', error);
//     return null;
//   }
// };

export const uploadImage = async ({ user, file, isDragAndDrop }) => {
  window.calcetto.toggleSpinner(true);
  try {
    const { userLogin, customerInfo } = user;
    const cleanedFile = isDragAndDrop ? await removeBackground(file) : file;
    const uploadFile = cleanedFile || file;
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('upload_preset', 'app-calcetto');
    formData.append('folder', 'profilePictures');
    formData.append('public_id', `${userLogin.uid}-${uuidv4()}`);
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/dehfdnxul/image/upload`;
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      console.error('Errore nella chiamata upload image', response.statusText);
      return { errorMessage: "'Upload fallito" };
    }
    const data = await response.json();
    const updatedUser = {
      ...user,
      userLogin,
      customerInfo: { ...customerInfo, photoURL: data.secure_url },
    };
    const { errorMessage } = await authUpdateProfile(updatedUser);
    if (errorMessage) return { errorMessage };
    return { successMessage: 'Profilo aggiornato con successo!' };
  } catch (error) {
    console.error('Errore nella rimozione di upload imafe:', error);
    return { errorMessage: "'Upload fallito'" };
  } finally {
    window.calcetto.toggleSpinner(false);
  }
};
export function calculateAttributes({ height, birthDate, position }) {
  // 1️⃣ Calcolo età
  const birth = new Date(birthDate);
  const age = Math.max(15, Math.min(45, new Date().getFullYear() - birth.getFullYear()));

  // 2️⃣ Normalizzazione altezza (150–200 cm → 0–1)
  const heightFactor = Math.max(0, Math.min(1, (height - 150) / 50));

  // 3️⃣ Determina tipo di ruolo
  const isGoalkeeper = position === 'POR';

  // 4️⃣ Coefficienti di base
  const base = isGoalkeeper
    ? {
        VEL: 30,
        TIR: 20,
        PAS: 40,
        DRI: 35,
        DIF: 40,
        FIS: 60,
        RES: 55,
        TEC: 45,
        POS: 65,
        VIZ: 60,
        RIF: 70,
        PAR: 75,
      }
    : {
        VEL: 60,
        TIR: 55,
        PAS: 55,
        DRI: 60,
        DIF: 50,
        FIS: 55,
        RES: 60,
        TEC: 55,
        POS: 55,
        VIZ: 55,
        RIF: 50,
        PAR: 25,
      };

  // 5️⃣ Bonus/malus in base a età e altezza
  const ageFactor = age < 20 ? 1.1 : age > 35 ? 0.9 : 1;
  const physFactor = 1 + (heightFactor - 0.5) * 0.2; // ±10% in base all’altezza

  // 6️⃣ Bonus per posizione specifica
  const positionBonus =
    {
      ATT: { TIR: 10, DRI: 5, VEL: 5 },
      DC: { DIF: 10, FIS: 8, VEL: -5 },
      CC: { PAS: 10, RES: 5, TEC: 5 },
      AD: { VEL: 8, DRI: 8, TIR: 3 },
      AS: { VEL: 8, DRI: 8, TIR: 3 },
      POR: { PAR: 15, RIF: 10, POS: 5 },
    }[position] || {};

  // 7️⃣ Calcolo finale con variazione casuale
  const attributes = Object.fromEntries(
    Object.entries(base).map(([key, value]) => {
      const bonus = positionBonus[key] || 0;
      const random = Math.random() * 4 - 2; // ±2 punti casuali
      const adjusted = value * ageFactor * physFactor + bonus + random;
      return [key, Math.round(Math.max(20, Math.min(99, adjusted)))];
    }),
  );

  return attributes;
}
export const getObjFormFromEvt = evt => {
  if (evt.target instanceof HTMLFormElement) {
    const formData = new FormData(evt.target);
    return getObjFromForm({ formData });
  } else {
    return {};
  }
};
const manageBirthDateDay = ({ formObject = {} }) => {
  if (formObject.birthDate_day && formObject.birthDate_month && formObject.birthDate_year) {
    // Crea la stringa della data nel formato 'dd/mm/yyyy'
    formObject.birthDate = `${formObject.birthDate_day.padStart(2, '0')}/${formObject.birthDate_month.padStart(2, '0')}/${formObject.birthDate_year}`;
    // Rimuovi i singoli campi relativi alla data per non averli nell'oggetto finale
    delete formObject.birthDate_day;
    delete formObject.birthDate_month;
    delete formObject.birthDate_year;
  }
};
export const getObjFromForm = ({ formData }) => {
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
  manageBirthDateDay({ formObject });
  return formObject;
};
