import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword, doFirebaseLogin } from 'utils/authUtils';
import GeneralForm from 'components/Form/GeneralForm';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import { useNavigate } from 'react-router-dom';
import { getObjFormFromEvt, manageFirstLogin } from 'utils/utils';
import ModalError from 'components/Modal/ModalInfo';

const RegisterTwoSteps = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formObjectStep1, setFormObjectStep1] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFirstStep = evt => {
    evt.preventDefault();
    const formObject = getObjFormFromEvt(evt);
    if (!formObject.firstName || !formObject.lastName) {
      setError('Nome e cognome obbligatori.');
      return;
    }
    setFormObjectStep1(formObject);
    setStep(2);
  };

  const handleRegister = async (evt, obj) => {
    evt.preventDefault();
    const credential = getObjFormFromEvt(evt);
    const { errorMessage, successMessage } = await doCreateUserWithEmailAndPassword({
      account: { ...credential },
      customerInfo: { ...obj },
    });
    errorMessage && setError(errorMessage);
    if (successMessage) {
      setSuccess('Registrazione completata con successo!');
      setTimeout(() => navigate('/confirm-profile', { replace: true }), 2000);
    }
  };
  const handleLogin = async (evt, obj) => {
    const { errorMessage, successMessage } = await doFirebaseLogin({ action: obj.action });
    errorMessage && setError(errorMessage);
    successMessage && navigate(manageFirstLogin(), { replace: true });
  };
  const handleBack = async () => {
    setStep(1);
  };
  return (
    <>
      {step === 2 && (
        <button onClick={handleBack} className="btn btn-tag p-0 me-3" data-testid={`back-btn`}>
          {/* Con icona bootstrap, oppure metti solo "←" */}
          <i className="bi-chevron-left">Indietro</i>
        </button>
      )}

      <HeaderAuthView message={'Crea un account'} />

      {step === 1 && (
        <>
          {/* Pulsanti Social */}
          <SocialLogin handleLogin={handleLogin} />
          {/* Divider */}
          <DividerLogin />
        </>
      )}
      <div className="w-100 bg-secondary-bg p-4">
        <div className="card rounded-4 shadow-sm border-primary">
          <div className="card-body">
            {step === 1 && (
              <GeneralForm formId={'register-step-1'} handleSubmit={handleFirstStep} obj={{}} />
            )}

            {step === 2 && (
              <GeneralForm
                formId={'register-step-2'}
                handleSubmit={handleRegister}
                obj={formObjectStep1}
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
                title={''}
                type={'success'}
                message={success}
                closeModal={() => setSuccess('')}
              />
            )}
          </div>
        </div>
      </div>
      <div id="signin-section" className="text-center">
        Hai già un account?
        <a href="/app1/welcome" data-testid={`login-link`} className="signin">
          Accedi
        </a>
      </div>
    </>
  );
};

export default RegisterTwoSteps;
