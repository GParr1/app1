import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword, doFirebaseLogin } from 'utils/authUtils';
import GeneralForm from 'components/Form/GeneralForm';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import { useNavigate } from 'react-router-dom';

const RegisterTwoSteps = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFirstStep = e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Compila email e password.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleRegister = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAccount = Object.fromEntries(formData.entries());
    newAccount.email = email;
    newAccount.password = password;

    if (!newAccount.firstName || !newAccount.lastName) {
      setError('Nome e cognome obbligatori.');
      return;
    }

    setError('');
    const response = await doCreateUserWithEmailAndPassword({ account: newAccount });
    if (response.result) {
      setSuccess('Registrazione completata con successo!');
      setStep(1);
      setEmail('');
      setPassword('');
    } else {
      setError(response.error.message);
    }
  };
  const handleLogin = async ({ action }) => {
    setError('');
    setSuccess('');
    const { errorMessage } = await doFirebaseLogin({ action, options: { email, password } });
    errorMessage && setError(errorMessage);
    !errorMessage && navigate('/profile', { replace: true });
  };
  return (
    <>
      <HeaderAuthView message={'Crea un account'} />
      {step === 1 && (
        <>
          {/* Pulsanti Social */}
          <SocialLogin handleLogin={handleLogin} />
          {/* Divider */}
          <DividerLogin />
        </>
      )}
      <div className="w-100  bg-secondary-bg p-4">
        <div className="card shadow-sm border-primary">
          <div className="card-body">
            {step === 1 && (
              <FirstStepOfRegister
                handleFirstStep={handleFirstStep}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            )}

            {step === 2 && (
              <GeneralForm
                id="step2Register"
                formId={'formUser'}
                handleSubmit={handleRegister}
                obj={{}}
              />
            )}

            {error && <p className="mt-3 text-danger text-center">{error}</p>}
            {success && <p className="mt-3 text-success text-center">{success}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

const FirstStepOfRegister = ({ handleFirstStep, email, setEmail, password, setPassword }) => (
  <form onSubmit={handleFirstStep}>
    <div className="mb-3">
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="mb-3">
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit" className="btn btn-primary w-100">
      Continua
    </button>
  </form>
);

export default RegisterTwoSteps;
