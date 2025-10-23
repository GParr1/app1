import React, { useState } from 'react';
import { doFirebaseLogin } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { emailRegex, phoneRegex } from 'utils/regex';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import ModalInfo from 'components/Modal/ModalInfo';
import GeneralForm from 'components/Form/GeneralForm';
import { getObjFormFromEvt, maskEmail } from 'utils/utils';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(1);
  const [error, setError] = useState('');
  /*const [success, setSuccess] = useState('');*/

  const handleSetEmail = evt => {
    const credential = getObjFormFromEvt(evt);
    const emailOrPhone = credential.email;
    if (!emailOrPhone) {
      setError("Inserisci un numero di telefono o un'email.");
    } else if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Formato non valido. Inserisci un'email o un numero corretto.");
    } else {
      setError('');
      setStep(2);
      setEmail(emailOrPhone);
    }
  };
  const handleLogin = async (evt, obj) => {
    const credential = getObjFormFromEvt(evt);
    const { errorMessage, successMessage } = await doFirebaseLogin({
      action: obj.action,
      options: { email: obj.email, password: credential.password },
    });
    errorMessage && setError(errorMessage);
    successMessage && navigate('/profile', { replace: true });
  };
  const handleBack = async () => {
    setStep(1);
  };

  return (
    <>
      {step === 2 && (
        <button onClick={handleBack} className="btn btn-tag" data-testid={`back-btn`}>
          <i className="bi-chevron-left">Indietro</i>
        </button>
      )}
      <HeaderAuthView message={step === 1 ? 'Inserisci la password' : 'Accedi al tuo account'} />
      {step === 1 && (
        <>
          {/* Pulsanti Social */}
          <SocialLogin handleLogin={handleLogin} />
          {/* Divider */}
          <DividerLogin />
        </>
      )}
      <div className="w-100  bg-secondary-bg p-4">
        {step === 1 && (
          <GeneralForm
            formId={'email-step'}
            handleSubmit={handleSetEmail}
            labels={{ submitLabel: 'AVANTI' }}
            obj={{}}
          />
        )}
        {step === 2 && (
          <>
            <h4 className="text-center">Inserisci la password di {maskEmail(email)}</h4>
            <GeneralForm
              formId={'password-step'}
              handleSubmit={handleLogin}
              labels={{ submitLabel: 'ACCEDI' }}
              obj={{ action: 'email', email }}
            />
          </>
        )}
        {error && (
          <ModalInfo
            title={'Errore'}
            type={'error'}
            message={error}
            closeModal={() => setError('')}
          />
        )}
      </div>
      {step === 1 && (
        <>
          <button
            type="button"
            data-testid={`create-account-btn`}
            className="btn btn-secondary w-100 mt-3 mb-3"
            onClick={() => navigate('/create-account', { replace: true })}
          >
            CREA ACCOUNT
          </button>
          <div className="text-center mt-3 mb-3">
            <a
              href={'/app1/reset-password'}
              data-testid={`reset-password-link`}
              className="text-primary-color text-decoration-none"
            >
              Hai dimenticato la password o devi crearne una nuova?
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
