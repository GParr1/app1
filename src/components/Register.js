import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from 'utils/authUtils';
import GeneralForm from 'components/Form/GeneralForm';

const RegisterTwoSteps = () => {
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

  return (
    <div className="card shadow-sm border-primary">
      <div className="card-body">
        <h2 className="card-title text-center mb-3">Registrazione</h2>
        {step === 1 && <p className="text-center mb-3">Step 1</p>}
        {step === 2 && <p className="text-center mb-3">Step 2</p>}

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
