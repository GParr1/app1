import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from 'utils/authUtils';

const RegisterTwoSteps = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFirstStep = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Compila email e password.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      setError('Nome e cognome obbligatori.');
      return;
    }
    setError('');
    const account = { email, password, firstName, lastName };
    const response = await doCreateUserWithEmailAndPassword({ account });
    if (response.result) {
      setSuccess('Registrazione completata con successo!');
      setStep(1);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } else {
      setError(response.error.message);
    }
  };

  return (
    <div className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center">Registrazione</h2>
          {step === 1 && <p className="card-title text-center">step 1</p>}
          {step === 2 && <p className="card-title text-center">step 2</p>}
          {step === 1 && (
            <FirstStepOfRegister
              handleFirstStep={handleFirstStep}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )}
          {step === 2 && (
            <SecondStepOfRegister
              handleRegister={handleRegister}
              setFirstName={setFirstName}
              setLastName={setLastName}
            />
          )}
          {error && <p className="mt-3 text-danger">{error}</p>}
          {success && <p className="mt-3 text-success">{success}</p>}
        </div>
      </div>
    </div>
  );
};
const FirstStepOfRegister = ({ handleFirstStep, setEmail, email, setPassword, password }) => (
  <form onSubmit={handleFirstStep}>
    <div className="mb-3">
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary w-100">
      Continua
    </button>
  </form>
);
const SecondStepOfRegister = ({
  handleRegister,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) => (
  <form onSubmit={handleRegister}>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Nome"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Cognome"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-success w-100">
      Registrati
    </button>
  </form>
);

export default RegisterTwoSteps;
