import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { calculatePlayerOverall } from 'utils/utils';

import React from 'react';
import { starterCard } from '../../structure/starterCard';

const CardBronze = ({ dynamicValue, previewImg }) => {
  const stateUser = useSelector(getUser) || {};
  const user = dynamicValue || stateUser;
  let customerInfo = user.customerInfo || {};
  const userLogin = user.userLogin || {};
  if (!customerInfo.overall) {
    const overall = calculatePlayerOverall(starterCard[0].attributes);
    customerInfo = { attributes: { ...starterCard[0].attributes }, overall };
  }
  return (
    <figure className="woocommerce-product-gallery__wrapper">
      <div
        id="football-card_15367"
        className="cardFootball hasChangeImage cardNewDesign"
        data-classic="/app1/assets/RARE-BRONZE-FC24style2023.png"
        data-new-design="/app1/assets/RARE-BRONZE-FC24.png"
      >
        <div
          style={{
            backgroundImage: "url('/app1/assets/RARE-BRONZE-FC24.png')",
            color: 'rgb(62, 40, 28)',
          }}
        >
          <span
            className={`div-face_image ${!(userLogin.photoURL || customerInfo.photoURL) ? 'empty' : ''}`}
            style={{
              backgroundImage: `url(${previewImg || userLogin.photoURL || customerInfo.photoURL || '/app1/assets/anonimous.png'})`,
            }}
          ></span>
          <span
            className="div-nation_image"
            style={{
              backgroundImage: "url('https://futcardsfifa.com/app/uploads/2020/10/ITALIA-1.png')",
            }}
          ></span>
          <span
            className={`div-club_image ${!customerInfo.favoriteTeam ? 'empty' : ''}`}
            style={{
              backgroundImage: `url(${customerInfo.favoriteTeam})`,
            }}
          ></span>
          <div className="div-name">
            <span className="input-name">{`${customerInfo.firstName}  ${customerInfo.lastName}`}</span>
          </div>
          <span className="input-media">{customerInfo.overall || 60}</span>
          <span className="input-position">{customerInfo.position || 'ATT'}</span>
          <span className="input-torneo-mic d-none"></span>
          <span className="input-caracteristica input-caracteristica-1 attr-columna-1 attr-fila-1">
            {customerInfo?.attributes?.VEL || 11}
          </span>
          <span className="input-caracteristica input-caracteristica-3 attr-columna-1 attr-fila-2">
            {customerInfo?.attributes?.DRI || 11}
          </span>
          <span className="input-caracteristica input-caracteristica-5 attr-columna-1 attr-fila-3">
            {customerInfo?.attributes?.TIR || 11}
          </span>
          <span className="input-caracteristica input-caracteristica-2 attr-columna-2 attr-fila-1">
            {customerInfo?.attributes?.DIF || 11}
          </span>
          <span className="input-caracteristica input-caracteristica-4 attr-columna-2 attr-fila-2">
            {customerInfo?.attributes?.PAS || 11}
          </span>
          <span className="input-caracteristica input-caracteristica-6 attr-columna-2 attr-fila-3">
            {customerInfo?.attributes?.FIS || 11}
          </span>
          <span
            className="input-caracteristica input-titulo-caracteristica-1 attr-columna-titulo-1 attr-fila-1"
            style={{ color: '#3e281c' }}
          >
            VEL
          </span>
          <span
            className="input-caracteristica input-titulo-caracteristica-3 attr-columna-titulo-1 attr-fila-2"
            style={{ color: '#3e281c' }}
          >
            TIR
          </span>
          <span
            className="input-caracteristica input-titulo-caracteristica-5 attr-columna-titulo-1 attr-fila-3"
            style={{ color: '#3e281c' }}
          >
            PAS
          </span>
          <span
            className="input-caracteristica input-titulo-caracteristica-2 attr-columna-titulo-2 attr-fila-1"
            style={{ color: '#3e281c' }}
          >
            DRI
          </span>
          <span
            className="input-caracteristica input-titulo-caracteristica-4 attr-columna-titulo-2 attr-fila-2"
            style={{ color: '#3e281c' }}
          >
            DIF
          </span>
          <span
            className="input-caracteristica input-titulo-caracteristica-6 attr-columna-titulo-2 attr-fila-3"
            style={{ color: '#3e281c' }}
          >
            FIS
          </span>
        </div>
      </div>
    </figure>
  );
};

export default CardBronze;
