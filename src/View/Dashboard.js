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
