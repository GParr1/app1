import React from 'react';
import { sendResetPasswordEmail } from 'utils/authUtils';

const PasswordReset = () => {
  const handleForgotPassword = async event => {
    event.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    await sendResetPasswordEmail(email);
  };
  return (
    <form onSubmit={async e => await handleForgotPassword(e)}>
      <label htmlFor="forgotEmail">Inserisci la tua email</label>
      <input type="email" id="forgotEmail" required />
      <button type="submit">Recupera password</button>
    </form>
  );
};
export default PasswordReset;
