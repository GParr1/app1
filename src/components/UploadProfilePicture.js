import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getAuth, updateProfile } from 'firebase/auth';
import { CloudinaryImage } from '@cloudinary/url-gen';
import PlayerCard from 'components/PlayerCard';
import { v4 as uuidv4 } from 'uuid';
import { teamInfo } from 'utils/infoTeam';

const UploadProfilePicture = () => {
  const [previewImg, setPreviewImg] = useState(
    'https://res.cloudinary.com/dehfdnxul/image/upload/v1749824943/profilePictures/IvUEkZuXs7bKWpTFaB9TkgPNFc92.png'
  );
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  // Stato e ref per la camera
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const CLOUD_NAME = 'dehfdnxul';

  useEffect(() => {
    if (cameraActive) {
      let videoElement = videoRef.current; // salva il ref in variabile locale

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoElement) {
            videoElement.srcObject = stream;
            videoElement.play();
          }
        })
        .catch((err) => {
          console.error('Errore accesso webcam:', err);
          setMessage('Non è stato possibile accedere alla webcam.');
          setCameraActive(false);
        });

      return () => {
        // cleanup usa la variabile locale videoElement
        if (videoElement && videoElement.srcObject) {
          const tracks = videoElement.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
          videoElement.srcObject = null;
        }
      };
    }
  }, [cameraActive]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
      setCameraActive(false); // chiudi camera se attiva
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Imposta canvas con dimensioni video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Converte immagine in blob e crea file
    canvas.toBlob((blob) => {
      if (!blob) return;
      const imgFile = new File([blob], `camera-photo-${Date.now()}.png`, {
        type: 'image/png',
      });
      setFile(imgFile);
      setPreviewImg(URL.createObjectURL(imgFile));
      setCameraActive(false);
    }, 'image/png');
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

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'app-calcetto');
    formData.append('folder', 'profilePictures');
    formData.append('public_id', `${user.displayName?.replace(/\s+/g, '_')}-${uuidv4()}`);

    try {
      const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const response = await axios.post(UPLOAD_URL, formData);
      const uploadedUrl = response.data.secure_url;
      if (user) {
        await updateProfile(user, {
          photoURL: uploadedUrl,
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
      <button
        type="button"
        onClick={() => setCameraActive((active) => !active)}
        className="btn btn-secondary mt-2"
      >
        {cameraActive ? 'Chiudi fotocamera' : 'Scatta foto'}
      </button>

      {cameraActive && (
        <div style={{ marginTop: 10 }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video ref={videoRef} style={{ width: '100%', maxWidth: 400 }} />
          <button type="button" onClick={capturePhoto} className="btn btn-primary mt-2">
            Cattura foto
          </button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}

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
      <br />
      <button onClick={handleUpload} disabled={!file || loading} className="btn btn-success">
        {loading ? 'Caricamento...' : 'Carica'}
      </button>
      {message && <p className="mt-2 text-success">{message}</p>}
    </div>
  );
};

export default UploadProfilePicture;
