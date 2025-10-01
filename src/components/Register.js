import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from 'utils/authUtils';
import FormUser from 'components/FormUser';

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
    const form = e.target;
    //const form = document.querySelector('#step2Register');
    const formData = new FormData(form);
    // Converti in oggetto semplice
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
    <div className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center">Registrazione</h2>
          {step === 1 && <p className="card-title text-center">Step 1</p>}
          {step === 2 && <p className="card-title text-center">Step 2</p>}
          {step === 1 && (
            <FirstStepOfRegister
              handleFirstStep={handleFirstStep}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )}
          {step === 2 && <FormUser id={'step2Register'} onSubmit={handleRegister} />}
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
        onChange={e => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary w-100">
      Continua
    </button>
  </form>
);

export default RegisterTwoSteps;
