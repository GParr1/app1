import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, updateProfile } from 'firebase/auth';
import { CloudinaryImage } from '@cloudinary/url-gen';
import PlayerCard from 'components/PlayerCard';
import { v4 as uuidv4 } from 'uuid';
import { teamInfo } from 'utils/infoTeam';

const UploadProfilePicture = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
    }
  };
  const getCloudinaryImageFromUrl = (url) => {
    const parts = url.split('/');
    const versionIndex = parts.findIndex((p) => p.startsWith('v'));
    const version = parts[versionIndex].replace('v', '');
    const publicId = parts
      .slice(versionIndex + 1)
      .join('/')
      .split('.')[0];

    const img = new CloudinaryImage(publicId, {
      cloudName: CLOUD_NAME,
    });

    img.setVersion(version); // ✅ Imposta la versione per evitare cache
    return img;
  };
  const CLOUD_NAME = 'dehfdnxul';
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'app-calcetto'); // <-- nome esatto del preset
    formData.append('folder', 'profilePictures'); // opzionale: salva in una cartella
    formData.append('public_id', `${user.displayName?.replace(/\s+/g, '_')}-${uuidv4()}`); // opzionale: sovrascrive sempre la stessa immagine
    try {
      const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const response = await axios.post(UPLOAD_URL, formData);
      const uploadedUrl = response.data.secure_url;
      // Aggiorna profilo Firebase
      if (user) {
        const img = getCloudinaryImageFromUrl(uploadedUrl)
          .effect('background_removal')
          .format('png');
        const finalUrl = img.toURL();

        await updateProfile(user, {
          photoURL: finalUrl,
        });
        setMessage('Profilo aggiornato con successo!');
      }
    } catch (error) {
      console.error(error);
      setMessage('Errore durante il caricamento.');
    } finally {
      setLoading(false);
    }
  };
  const playerColor = teamInfo['Roma'].color;
  const teamSymbol = teamInfo['Roma'].logo;
  return (
    <div>
      <h3>Carica immagine profilo</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewImg && (
        <PlayerCard
          playerImage={previewImg}
          playerName={'Giocatore'}
          playerNumber="11"
          teamSymbol={teamSymbol}
          playerColor={playerColor}
          countryCode="ITA"
          birthDate="13-5-1993"
          height="1,91 M"
        />
      )}
      <br />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? 'Caricamento...' : 'Carica'}
      </button>
      {message && <p className="mt-2 text-success">{message}</p>}
    </div>
  );
};

export default UploadProfilePicture;
