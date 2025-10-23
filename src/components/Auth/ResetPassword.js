import React, { useEffect, useState } from 'react';
import {
  doConfirmPasswordReset,
  doResetPassword,
  doVerifyPasswordResetCode,
} from 'utils/authUtils';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';

import GeneralForm from 'components/Form/GeneralForm';
import { cleanUrlParamiter, getObjFormFromEvt } from 'utils/utils';
import ModalError from 'components/Modal/ModalInfo';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [oobCode, setOobCode] = useState('');
  const [success, setSuccess] = useState('');

  // // Step 1: Verifica il codice
  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (!code) {
      return;
    }
    doVerifyPasswordResetCode({ code }).then(result => {
      const { errorMessage, successMessage } = result;
      cleanUrlParamiter();
      errorMessage && setError(errorMessage);
      successMessage && setOobCode(code);
    });
  }, [searchParams]);

  const handleResetPassword = async evt => {
    evt.preventDefault();
    const credential = getObjFormFromEvt(evt);
    if (!credential.email) {
      setError("Email vuota! Inserisci l'email");
      return;
    }
    const { errorMessage, successMessage } = await doResetPassword({ email: credential.email });
    errorMessage && setError(errorMessage);
    successMessage && setSuccess(successMessage);
  };
  const handleConfirmPasswordReset = async evt => {
    evt.preventDefault();
    const credential = getObjFormFromEvt(evt);
    const { errorMessage, successMessage } = await doConfirmPasswordReset({
      oobCode,
      newPassword: credential.password,
    });
    errorMessage && setError(errorMessage);
    successMessage && setSuccess(successMessage);
    setTimeout(() => navigate('/login'), 2000);
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
        {error && (
          <ModalError
            title={'Errore'}
            type={'error'}
            message={error}
            closeModal={() => setError('')}
          />
        )}
        {success && (
          <ModalError
            title={'Password Reset'}
            type={'success'}
            message={success}
            closeModal={() => setSuccess('')}
          />
        )}
      </div>
    </>
  );
};

export default ResetPassword;
