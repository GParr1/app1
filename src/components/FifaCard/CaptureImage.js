import React, { useState, useRef, useEffect } from 'react';
import ModalError from 'components/Modal/ModalInfo';
import { removeBackground } from 'utils/utils';
import { DEFAULT_PHOTO } from 'utils/Constant';

const CaptureImage = ({ playerImage }) => {
  const [/*previewImg, */ setPreviewImg] = useState(DEFAULT_PHOTO);
  const [/*file, */ setFile] = useState(null);
  //const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  const canvasRef = useRef(null);

  // 🎥 Gestione webcam
  useEffect(() => {
    if (!cameraActive) return;

    const videoEl = videoRef.current;
    let stream;

    const startCamera = async () => {
      window.calcetto.toggleSpinner(true);
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoEl) {
          videoEl.srcObject = stream;
          await videoEl.play();
        }
      } catch (err) {
        console.error('Errore accesso webcam:', err);
        setMessage('Non è stato possibile accedere alla webcam.');
        setCameraActive(false);
      } finally {
        window.calcetto.toggleSpinner(false);
      }
    };

    startCamera();

    // cleanup
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      if (videoEl) videoEl.srcObject = null;
    };
  }, [cameraActive]);
  //
  // // 📁 Gestione file da input
  // const handleFileChange = useCallback(e => {
  //   const selected = e.target.files?.[0];
  //   if (!selected || !selected.type.startsWith('image/')) return;
  //   setFile(selected);
  //   setPreviewImg(URL.createObjectURL(selected));
  //   setCameraActive(false);
  //   setMessage('');
  // }, []);
  //
  // // 📸 Scatta foto dalla webcam
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async blob => {
      if (!blob) return;
      const photo = new File([blob], `camera-photo-${Date.now()}.png`, { type: 'image/png' });

      const cleaned = await removeBackground(photo);
      const finalFile = cleaned || photo;

      setFile(finalFile);
      setPreviewImg(URL.createObjectURL(finalFile));
      setCameraActive(false);
      setMessage('');
    }, 'image/png');
  };

  // ☁️ Upload su Cloudinary
  // const handleUpload = useCallback(async () => {
  //   if (!file) return;
  //   setLoading(true);
  //   setMessage('');
  //
  //   window.calcetto.toggleSpinner(true);
  //
  //   try {
  //     const uploadedUrl = await uploadImage({ user, file });
  //     if (!uploadedUrl) throw new Error('Upload fallito');
  //
  //     const updatedUser = {
  //       ...user,
  //       userLogin: { ...user.userLogin, photoURL: uploadedUrl },
  //     };
  //
  //     await authUpdateProfile(updatedUser);
  //     setMessage('✅ Profilo aggiornato con successo!');
  //   } catch (err) {
  //     console.error('Errore upload:', err);
  //     setMessage('❌ Errore durante il caricamento.');
  //   } finally {
  //     setLoading(false);
  //     window.calcetto.toggleSpinner(false);
  //   }
  // }, [file, user]);

  return (
    <>
      {cameraActive && (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video ref={videoRef} style={{ width: '100%', maxWidth: 400 }} />
          <div className="mt-2">
            <button type="button" className="btn btn-primary me-2" onClick={capturePhoto}>
              📸 Cattura foto
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCameraActive(false)}
            >
              Chiudi fotocamera
            </button>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}

      {!cameraActive && (
        <button onClick={() => setCameraActive(true)}>
          <span
            className={`div-face_image ${!playerImage ? 'empty' : ''}`}
            role="button"
            style={{ backgroundImage: `url(${playerImage})` }}
          ></span>
        </button>
      )}
      {message && (
        <ModalError
          title={''}
          type={'success'}
          message={message}
          closeModal={() => setMessage('')}
        />
      )}
    </>
  );
};

export default CaptureImage;
