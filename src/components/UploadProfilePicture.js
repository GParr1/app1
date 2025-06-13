import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, updateProfile } from 'firebase/auth';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const UploadProfilePicture = () => {
  const [imageUrl, setImageUrl] = useState('');
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

  const CLOUD_NAME = 'dehfdnxul';
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'app-calcetto'); // <-- nome esatto del preset
    formData.append('folder', 'profilePictures'); // opzionale: salva in una cartella
    formData.append('public_id', user.uid); // opzionale: sovrascrive sempre la stessa immagine
    try {
      const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const response = await axios.post(UPLOAD_URL, formData);
      const uploadedUrl = response.data.secure_url;
      // Aggiorna profilo Firebase
      if (user) {
        await updateProfile(user, {
          photoURL: uploadedUrl,
        });
        setImageUrl(uploadedUrl);
        setMessage('Profilo aggiornato con successo!');
      }
    } catch (error) {
      console.error(error);
      setMessage('Errore durante il caricamento.');
    } finally {
      setLoading(false);
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
  // Visualizzazione immagine con SDK Cloudinary
  //const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });
  const cldImg = imageUrl
    ? getCloudinaryImageFromUrl(imageUrl)
        .effect('background_removal')
        .format('png')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500))
    : null;

  return (
    <div>
      <h3>Carica immagine profilo</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewImg && (
        <img className="card-img-top player-image" src={previewImg} alt="Anteprima Player" />
      )}
      <br />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? 'Caricamento...' : 'Carica'}
      </button>
      {message && <p>{message}</p>}

      {cldImg && <AdvancedImage cldImg={cldImg} />}
    </div>
  );
};

export default UploadProfilePicture;
