import React, { useState, useRef, useEffect } from 'react';
import { removeBackground, uploadImage } from 'utils/utils';
import { SVGPlusCircleFilled } from 'components/SVG/SVGPlus';
import { SVGCloseCircleFilled } from 'components/SVG/SVGClose';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { SVGRefreshCircleFilled } from 'components/SVG';

const CaptureImage = ({ enableEdit, playerImage }) => {
  const user = useSelector(getUser) || null;
  const [previewImg, setPreviewImg] = useState(playerImage);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ spinner locale
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  const canvasRef = useRef(null);

  // 🎥 Gestione webcam
  useEffect(() => {
    if (!enableEdit) return;
    if (!cameraActive) return;
    setLoading(true);
    const videoEl = videoRef.current;
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoEl) {
          videoEl.srcObject = stream;
          await videoEl.play();
        }
      } catch (err) {
        console.error('Errore accesso webcam:', err);
        window.calcetto.showModalMessage(
          'Non è stato possibile accedere alla webcam.',
          'error',
          'Attenzione!',
        );
        setCameraActive(false);
      } finally {
        setLoading(false);
      }
    };
    startCamera();
    // cleanup
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      if (videoEl) videoEl.srcObject = null;
    };
  }, [enableEdit, cameraActive]);
  // // 📸 Scatta foto dalla webcam
  const capturePhoto = () => {
    window.calcetto.toggleSpinner(true);
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

      window.calcetto.toggleSpinner(false);
    }, 'image/png');
  };

  const handleUpdateForto = () => {
    !file && setCameraActive(true);
    file && handleUpload();
  };
  // ☁️ Upload su Cloudinary
  const handleUpload = async () => {
    if (!file) return window.calcetto.showModalMessage('Upload fallito', 'error', 'Errore!');
    if (!user) return window.calcetto.showModalMessage('Upload fallito', 'error', 'Errore!');
    const { errorMessage, successMessage } = await uploadImage({ user, file });
    if (!errorMessage) {
      return window.calcetto.showModalMessage(errorMessage, 'error', 'Errore!');
    }
    setCameraActive(false);
    setFile(null);
    window.calcetto.showModalMessage(successMessage, 'success', 'OK');
  };

  return (
    <>
      {loading && (
        <div className="div-face_image d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      )}
      {!loading && cameraActive && (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className="div-face_image" ref={videoRef} style={{ objectFit: 'cover' }} />
          <div
            className="div-face_image  d-flex justify-content-between"
            style={{ height: 'auto' }}
          >
            <button type="button" className="bg-transparent me-2" onClick={capturePhoto}>
              <SVGPlusCircleFilled />
            </button>
            <button
              type="button"
              className="bg-transparent me-2"
              onClick={() => {
                setCameraActive(false);
                setFile(null);
              }}
            >
              <SVGCloseCircleFilled />
            </button>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}

      {!cameraActive && !file && (
        <button
          className="p-0 border-0 bg-transparent"
          {...(!enableEdit && { disabled: true })}
          {...(!enableEdit && { style: { cursor: 'default' } })}
          onClick={() => setCameraActive(true)}
        >
          <span
            className={`div-face_image ${!previewImg ? 'empty' : ''}`}
            role="button"
            style={{ backgroundImage: `url(${previewImg})` }}
          ></span>
        </button>
      )}
      {file && !cameraActive && (
        <>
          <span
            className={`div-face_image ${!previewImg ? 'empty' : ''}`}
            role="button"
            style={{ backgroundImage: `url(${previewImg})` }}
          ></span>
          <div
            className="div-face_image  d-flex justify-content-between"
            style={{ height: 'auto' }}
          >
            <button
              type="button"
              className="bg-transparent me-2"
              onClick={() => handleUpdateForto()}
            >
              <SVGPlusCircleFilled />
            </button>
            <button
              type="button"
              className="bg-transparent me-2"
              onClick={() => setCameraActive(true)}
            >
              <SVGRefreshCircleFilled />
            </button>
            <button
              type="button"
              className="bg-transparent me-2"
              onClick={() => {
                setCameraActive(false);
                setFile(null);
              }}
            >
              <SVGCloseCircleFilled />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CaptureImage;
