import React from 'react';
import Login from 'components/Auth/Login';
import RegisterTwoSteps from 'components/Auth/Register';

export const AuthView = ({ register }) => {
  return (
    <div className="ccontainer d-flex flex-column col-md-6">
      {register ? <RegisterTwoSteps /> : <Login />}
    </div>
  );
};
