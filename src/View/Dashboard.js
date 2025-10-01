import React, { useState } from 'react';
import CardBronze from 'components/FifaCard/CardBronze';
import FormUser from 'components/FormUser';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { doSignOut, handleSaveFormUser } from 'utils/authUtils';
import UploadProfilePicture from 'components/UploadProfilePicture';

const Dashboard = () => {
  const [showModalUpdateImage, setShowModalUpdateImage] = useState(false);
  const user = useSelector(getUser) || null;
  const [dynamicValue, setDynamicValue] = useState(user);
  const handleChange = (evt, section, key) => {
    const value = evt.target.value;
    console.log(evt.target.value);
    setDynamicValue(prevValue => ({
      ...prevValue, // Copia l'intero oggetto user
      [section]: {
        ...prevValue[section], // Copia la sezione specifica (customerInfo o userLogin)
        [key]: value, // Aggiorna solo il campo specificato
      },
    }));
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="d-flex justify-content-between  align-items-center ">
            <h1>Benvenuto {user.userLogin.displayName}</h1>
            <div className="d-flex justify-content-end">
              <button
                className="btn"
                onClick={() => setShowModalUpdateImage(!showModalUpdateImage)}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="false"
                >
                  <title>Cambia immagine del profilo</title>
                  <path
                    d="M5 20h14a2 2 0 0 0 2-2v-7l-3-3h-4l-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <circle cx="12" cy="13" r="3" stroke="#2563EB" strokeWidth="2"></circle>
                </svg>
              </button>
              <button className="btn" onClick={doSignOut}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="false"
                >
                  <title>Esci dal profilo</title>
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M21 12H9"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex flex-column align-items-center ">
            <CardBronze dynamicValue={dynamicValue} />
          </div>
          <div className="col-md-6">
            <FormUser
              id={'confirmProfile'}
              handleChange={handleChange}
              onSubmit={evt => handleSaveFormUser(evt, user)}
            />
          </div>
        </div>
      </div>
      {showModalUpdateImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Carica la tua immagine</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModalUpdateImage(!showModalUpdateImage)}
                ></button>
              </div>
              <div className="modal-body">
                <UploadProfilePicture />
              </div>
            </div>
          </div>
        </div>
      )}
      {Object.keys(user).map(key => (
        <p key={key}>
          {key}: {typeof user[key] === 'object' ? JSON.stringify(user[key]) : user[key]}
        </p>
      ))}
    </>
  );
};
export default Dashboard;
