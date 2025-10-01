import React, { useState } from 'react';
import { authUpdateProfile } from 'utils/authUtils';
import { RedirectOnLogin } from 'utils/RedirectOnLogin';
import FormUser from 'components/FormUser';

export const ConfirmProfileView = ({ user }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  if (!user) return <RedirectOnLogin />;
  const handleProfileUpdate = async e => {
    e.preventDefault();
    const form = e.target;
    //const form = document.querySelector('#confirmProfile');
    const formData = new FormData(form);
    // Converti in oggetto semplice
    const formObject = Object.fromEntries(formData.entries());
    const isUpdate = await authUpdateProfile(formObject);
    isUpdate && setSuccess('Profilo aggiornato!');
    !isUpdate && setError('Errore aggiornando il profilo');
  };
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Completa il tuo profilo</h4>
        <FormUser id={'confirmProfile'} onSubmit={handleProfileUpdate} />
        {error && <p className="text-danger mt-2">{error}</p>}
        {success && <p className="text-success mt-2">{success}</p>}
      </div>
    </div>
  );
};
