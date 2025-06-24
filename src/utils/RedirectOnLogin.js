import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';

export const RedirectOnLogin = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const getSession = async () => {
    const session = await fetch('http://localhost:3000/api/auth/session', {
      credentials: 'include',
    });
    return await session.json();
  };
  useEffect(() => {
    const data = getSession().then();
    if (data) {
      navigate('/dashboard', { replace: true });
    } else if (user) {
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
