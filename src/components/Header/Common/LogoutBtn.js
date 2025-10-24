import { doSignOut } from 'utils/authUtils';
import React from 'react';

const LogoutBtn = () => (
  <button className="btn" onClick={async () => await doSignOut()} aria-label="Esci dal profilo">
    <i className="bi bi-box-arrow-right"></i>️
  </button>
);
export default LogoutBtn;
