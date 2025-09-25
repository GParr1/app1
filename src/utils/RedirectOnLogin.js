import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { fetchUserProfile } from 'state/auth/operations';
import { getIDFormCookie } from 'utils/authUtils';

export const RedirectOnLogin = () => {
  const user = useSelector(getUser);

  const navigate = useNavigate();

  useEffect(() => {
    const idUser = getIDFormCookie();
    fetchUserProfile(idUser).then();
    const isLogin = !!idUser;
    if (isLogin) {
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

  return <div>Redirecting...</div>;
};
