import { v4 as uuidv4 } from 'uuid';

export const calculatePlayerOverall = attrs => {
  const { VEL, TIR, PAS, DRI, DIF, FIS } = attrs;
  return Math.round((VEL + TIR + PAS + DRI + DIF + FIS) / 6);
};

export const calculateGoalkeeperOverall = attrs => {
  const { PAR, RIF, POS, VEL, TEC, RES } = attrs;
  return Math.round(PAR * 0.3 + RIF * 0.25 + POS * 0.2 + VEL * 0.1 + TEC * 0.1 + RES * 0.05);
};

export const removeBackground = async imgFile => {
  const formData = new FormData();
  formData.append('image_file', imgFile);
  formData.append('size', 'auto');
  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'i4L41YsoE4jvHSofw5RcWNZM', // <-- API key
      },
      body: formData,
    });

    if (!response.ok) {
      console.error('Errore nella chiamata a remove.bg', response.statusText);
      return null;
    }

    const blob = await response.blob();
    return new File([blob], `cleaned-${Date.now()}.png`, {
      type: 'image/png',
    });
  } catch (error) {
    console.error('Errore nella rimozione dello sfondo:', error);
    return null;
  }
};
export const uploadImage = async ({ user, file }) => {
  const cleanedFile = await removeBackground(file);
  const uploadFile = cleanedFile || file; // Fallback se qualcosa va storto
  // STEP 2: Prepara FormData per Cloudinary
  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('upload_preset', 'app-calcetto');
  formData.append('folder', 'profilePictures');
  formData.append('public_id', `${user.userLogin.uid}-${uuidv4()}`);
  try {
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/clacetto/image/upload`;
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      console.error('Errore nella chiamata upload image', response.statusText);
      return null;
    }
    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    console.error('Errore nella rimozione di upload imafe:', error);
    return null;
  }
};
