import React from 'react';
import Login from 'components/Login';
import RegisterTwoSteps from 'components/Register';

export const AuthView = ({ register }) => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5 col-md-6">
      {register ? <RegisterTwoSteps /> : <Login />}
    </div>
  );
};
