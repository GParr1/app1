import React, { useState, useRef, useEffect } from 'react';
import CardBronze from 'components/FifaCard/CardBronze';
import { removeBackground, uploadImage } from 'utils/utils';
import { doSetLoading } from 'state/support/operations';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { authUpdateProfile } from 'utils/authUtils';

const UploadProfilePicture = () => {
  const [previewImg, setPreviewImg] = useState('/app1/assets/anonimous.png');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const user = useSelector(getUser) || {};

  // Stato e ref per la camera
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (cameraActive) {
      let videoElement = videoRef.current; // salva il ref in variabile locale
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          if (videoElement) {
            videoElement.srcObject = stream;
            videoElement.play();
          }
        })
        .catch(err => {
          console.error('Errore accesso webcam:', err);
          setMessage('Non è stato possibile accedere alla webcam.');
          setCameraActive(false);
        });

      return () => {
        // cleanup usa la variabile locale videoElement
        if (videoElement && videoElement.srcObject) {
          const tracks = videoElement.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          videoElement.srcObject = null;
        }
      };
    }
  }, [cameraActive]);

  const handleFileChange = e => {
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
    // Imposta le dimensioni del canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Disegna il frame attuale nel canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Estrai il blob dal canvas
    canvas.toBlob(async blob => {
      if (!blob) return;
      const originalFile = new File([blob], `camera-photo-${Date.now()}.png`, {
        type: 'image/png',
      });
      // Tenta di rimuovere lo sfondo
      const cleanedFile = await removeBackground(originalFile);
      if (cleanedFile) {
        setFile(cleanedFile);
        setPreviewImg(URL.createObjectURL(cleanedFile));
      } else {
        // Fallback: usa l'immagine originale
        setFile(originalFile);
        setPreviewImg(URL.createObjectURL(originalFile));
      }
      setCameraActive(false);
    }, 'image/png');
  };

  const handleUpload = async () => {
    if (!file) return;
    await doSetLoading(true);
    setLoading(true);
    setMessage('');
    const uploadedUrl = await uploadImage({ user, file });
    if (user.userLogin.uid) {
      user.userLogin.photoURL = uploadedUrl;
      await authUpdateProfile(user);
      setMessage('Profilo aggiornato con successo!');
    }
    await doSetLoading(false);
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center col-12">
      {!cameraActive && <CardBronze previewImg={previewImg} />}
      {cameraActive && (
        <div style={{ marginTop: 10 }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video ref={videoRef} style={{ width: '100%', maxWidth: 400 }} />
          <button type="button" onClick={capturePhoto} className="btn btn-primary mt-2">
            Cattura foto
          </button>
          <button
            type="button"
            onClick={() => setCameraActive(active => !active)}
            className="btn mt-2"
          >
            {'Chiudi fotocamera'}
          </button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}
      <div className={`col-4 m-2 ${cameraActive ? 'd-none' : ''}`}>
        <input className="p-2" type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="button"
          onClick={() => setCameraActive(active => !active)}
          className="btn mt-2"
        >
          {'Scatta foto'}
        </button>
        <br />
        <button onClick={handleUpload} disabled={!file || loading} className="btn btn-success">
          {loading ? 'Caricamento...' : 'Carica'}
        </button>
      </div>

      {message && <p className="mt-2 text-success">{message}</p>}
    </div>
  );
};

export default UploadProfilePicture;
