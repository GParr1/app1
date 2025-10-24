import React, { useState } from 'react';
import { handleSaveFormUser } from 'utils/authUtils';
import FormUser from 'components/FormUser';
import CardBronze from 'components/FifaCard/CardBronze';
import { useNavigate } from 'react-router-dom';
import GeneralForm from 'components/Form/GeneralForm';

export const ConfirmProfileView = ({ user }) => {
  const [dynamicValue, setDynamicValue] = useState(user);
  const navigate = useNavigate();
  const handleChange = (evt, key, section = 'customerInfo') => {
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
  const handleSubmit = async evt => {
    const result = await handleSaveFormUser(evt, user);
    if (result) {
      navigate('/dashboard', { replace: true });
    } else {
      console.error('handle Submit Error');
    }
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
            <GeneralForm
              formId={'formUser'}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              labels={{ submitLabel: 'ACCEDI' }}
              obj={user}
            />
            <FormUser
              id={'confirmProfile'}
              handleChange={handleChange}
              onSubmit={evt => handleSubmit(evt, user)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
