import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';

export const RedirectOnLogin = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = !!user;
    if (isLogin) {
      navigate('/dashboard', { replace: true });
    } else if (user?.displayName) {
      if (user.displayName) {
        navigate('/profile', { replace: true });
      }
    } else {
      navigate('/welcome', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '200px' }}
    >
      <div className="spinner-border text-primary" role="status" aria-label="Caricamento in corso">
        <span className="visually-hidden">Caricamento...</span>
      </div>
    </div>
  );
};
