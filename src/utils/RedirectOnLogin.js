import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';

export const RedirectOnLogin = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        navigate('/profile', { replace: true });
      } else {
        navigate('/confirm-profile', { replace: true });
      }
    } else {
      navigate('/welcome', { replace: true });
    }
  }, [user, navigate]);

  return <div>Redirecting...</div>; // oppure puoi mostrare uno spinner
};
