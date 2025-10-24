import React from 'react';
import { useNavigate } from 'react-router-dom';

/** Desktop buttons **/
const NavLink = ({ classContainer, classBtn }) => {
  const navigate = useNavigate();
  //classContainer = "d-none d-md-flex gap-2 align-items-center"
  //'btn' = classBtn
  return (
    <div className={classContainer}>
      <button className={classBtn} onClick={() => navigate('/dashboard')}>
        Home
      </button>
      <button className={classBtn} onClick={() => navigate('/profile')}>
        Profilo
      </button>
      <button className={classBtn} onClick={() => navigate('/partite')}>
        Partite
      </button>
    </div>
  );
};
export default NavLink;
