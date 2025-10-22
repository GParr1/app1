import React, { useState } from 'react';
import { doFirebaseLogin } from 'utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { emailRegex, phoneRegex } from 'utils/regex';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import ModalError from 'components/Modal/ModalError';
import GeneralForm from 'components/Form/GeneralForm';
import { getObjFormFromEvt, maskEmail } from 'utils/utils';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSetEmail = evt => {
    const credential = getObjFormFromEvt(evt);
    const emailOrPhone = credential.email;
    if (!emailOrPhone) {
      setError("Inserisci un numero di telefono o un'email.");
    } else if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Formato non valido. Inserisci un'email o un numero corretto.");
    } else {
      setError('');
      setEmail(emailOrPhone);
    }
  };
  const handleLogin = async ({ evt, obj }) => {
    const credential = getObjFormFromEvt(evt);
    const { errorMessage, successMessage } = await doFirebaseLogin({
      action: obj.action,
      options: { email: obj.email, password: credential.password },
    });
    errorMessage && setError(errorMessage);
    successMessage && navigate('/profile', { replace: true });
  };

  return (
    <>
      <HeaderAuthView message={email ? 'Inserisci la password' : 'Accedi al tuo account'} />
      {!email && (
        <>
          {/* Pulsanti Social */}
          <SocialLogin handleLogin={handleLogin} />
          {/* Divider */}
          <DividerLogin />
        </>
      )}
      <div className="w-100  bg-secondary-bg p-4">
        {!email && (
          <GeneralForm
            formId={'email-step'}
            handleSubmit={handleSetEmail}
            labels={{ submitLabel: 'AVANTI' }}
            obj={{}}
          />
        )}
        {email && (
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
        {error && <ModalError title={'Errore'} message={error} closeModal={() => setError('')} />}
        {success && <ModalError title={''} message={success} closeModal={() => setSuccess('')} />}
      </div>
      {!email && (
        <>
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => navigate('/create-account', { replace: true })}
          >
            CREA ACCOUNT
          </button>
          <div className="text-center mb-3">
            <a href={'/app1/reset-password'} className="text-primary-color text-decoration-none">
              Hai dimenticato la password o devi crearne una nuova?
            </a>
          </div>
        </>
      )}
    </>
  );
};

const LoginStepPassword = ({ email, cta }) => {
  return (
    <>
      <h4 className="text-center">Inserisci la password di {maskEmail(email)}</h4>
      <GeneralForm
        formId={'password-step'}
        handleSubmit={cta}
        labels={{ submitLabel: 'ACCEDI' }}
        obj={{ action: 'email', email }}
      />
    </>
  );
};

export default Login;
