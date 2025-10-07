import React, { useState } from 'react';
import { handleSaveFormUser } from 'utils/authUtils';
import FormUser from 'components/FormUser';
import CardBronze from 'components/FifaCard/CardBronze';

export const ConfirmProfileView = ({ user }) => {
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
    <div className="row">
      <div className="col-md-6 d-flex flex-column align-items-center ">
        <CardBronze dynamicValue={dynamicValue} />
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Completa il tuo profilo</h4>
            <FormUser
              id={'confirmProfile'}
              handleChange={handleChange}
              onSubmit={evt => handleSaveFormUser(evt, user)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
