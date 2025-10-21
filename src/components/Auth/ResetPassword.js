import React, { useEffect, useState } from 'react';
import { doResetPassword } from 'utils/authUtils';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';

import GeneralForm from 'components/Form/GeneralForm';
import { getObjFormFromEvt } from 'utils/utils';
import { auth } from '../../firebaseConfig';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [oobCode, setOobCode] = useState('');
  const [success, setSuccess] = useState('');

  // Step 1: Verifica il codice
  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (!code) {
      return;
    }
    setOobCode(code);
    verifyPasswordResetCode(auth, code)
      .then(email => {
        console.log(email);
      })
      .catch(() => {
        setError('Il link di reset è scaduto o non valido.');
      });
  }, [searchParams]);

  const handleResetPassword = async evt => {
    const credential = getObjFormFromEvt(evt);
    setError('');
    setSuccess('');
    const { errorMessage } = await doResetPassword({ email: credential.email });
    errorMessage && setError(errorMessage);
  };
  const handleConfirmPasswordReset = async evt => {
    evt.preventDefault();
    setError('');
    setSuccess('');
    try {
      const credential = getObjFormFromEvt(evt);
      await confirmPasswordReset(auth, oobCode, credential.password);
      setSuccess('La password è stata aggiornata con successo.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Errore durante l’aggiornamento della password.');
    }
  };

  return (
    <>
      <HeaderAuthView message={'Recupero della password'} />
      <p>{`Inserisci l'indirizzo e-mail, l'ID o il numero di telefono dell'account per cui vuoi modificare o impostare una password.`}</p>
      <div className="w-100  bg-secondary-bg p-4">
        {!oobCode && (
          <GeneralForm formId={'resetPassword'} handleSubmit={handleResetPassword} obj={{}} />
        )}
        {oobCode && (
          <GeneralForm
            formId={'resetPassword-step-password'}
            handleSubmit={handleConfirmPasswordReset}
            obj={{}}
          />
        )}
        {error && <p className="mt-2 text-danger text-center">{error}</p>}
        {success && <p className="mt-2 text-success text-center">{success}</p>}
      </div>
    </>
  );
};

export default ResetPassword;
