import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from 'components/Header/Common/LogoutBtn';

/** Desktop buttons **/
const NavLink = ({ isMobile, classContainer, classBtn }) => {
  const navigate = useNavigate();
  //classContainer = "d-none d-md-flex gap-2 align-items-center"
  //'btn' = classBtn
  return (
    <div className={classContainer}>
      {isMobile && (
        <>
          <button className="btn" onClick={() => console.log('setting')} aria-label="impostazioni">
            <i className="bi bi-gear"></i>
          </button>
          <LogoutBtn />g
        </>
      )}
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
