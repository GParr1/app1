import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { useSession } from 'next-auth/react';

export const RedirectOnLogin = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
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
  }, [session,user, navigate]);

  return <div>Redirecting...</div>; // oppure puoi mostrare uno spinner
};
