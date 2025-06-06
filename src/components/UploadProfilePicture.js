import React, { useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UploadProfilePicture = ({ userId, /*onUploadSuccess*/ }) => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleUpload = () => {
        if (!image) {
            alert('Per favore, seleziona un\'immagine prima di caricare.');
            return;
        }

        const storageRef = ref(storage, `profile_pictures/${userId}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => {
                console.error('Errore nel caricamento:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //onUploadSuccess(downloadURL);
                });
            }
        );
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>Carica Immagine</button>
            {progress > 0 && <p>Caricamento: {progress}%</p>}
        </div>
    );
};

export default UploadProfilePicture;
