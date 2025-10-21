import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword, doFirebaseLogin } from 'utils/authUtils';
import GeneralForm from 'components/Form/GeneralForm';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import { useNavigate } from 'react-router-dom';
import { getObjFormFromEvt } from 'utils/utils';

const RegisterTwoSteps = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formObjectStep1, setFormObjectStep1] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFirstStep = evt => {
    evt.preventDefault();
    const formObject = getObjFormFromEvt(evt);
    setFormObjectStep1(formObject);
    setError('');
    setStep(2);
  };

  const handleRegister = async (evt, obj) => {
    evt.preventDefault();
    const credential = getObjFormFromEvt(evt);
    if (!obj.firstName || !obj.lastName) {
      setError('Nome e cognome obbligatori.');
      return;
    }
    setError('');
    const { errorMessage } = await doCreateUserWithEmailAndPassword({
      account: { ...credential },
      customerInfo: { ...obj },
    });

    if (!errorMessage) {
      setSuccess('Registrazione completata con successo!');
      setStep(1);
      setEmail('');
      setPassword('');
      navigate('/confirm-profile', { replace: true });
    }
    errorMessage && setError(errorMessage);
  };
  const handleLogin = async ({ action }) => {
    setError('');
    setSuccess('');
    const { errorMessage } = await doFirebaseLogin({ action, options: { email, password } });
    errorMessage && setError(errorMessage);
    !errorMessage && navigate('/profile', { replace: true });
  };
  const handleBack = async () => {
    setStep(1);
    setError('');
    setSuccess('');
  };
  return (
    <>
      {step === 2 && (
        <div className="w-100 d-flex justify-content-start mb-3">
          <button onClick={handleBack} className="btn btm-tag p-0 me-3">
            {/* Con icona bootstrap, oppure metti solo "←" */}
            <i className="bi-chevron-left">Indietro</i>
          </button>
        </div>
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

            {error && <p className="mt-3 text-danger text-center">{error}</p>}
            {success && <p className="mt-3 text-success text-center">{success}</p>}
          </div>
        </div>
      </div>
      <div id="signin-section">
        Hai già un account?
        <a href="/welcome" className="signin">
          Accedi
        </a>
      </div>
    </>
  );
};

export default RegisterTwoSteps;
