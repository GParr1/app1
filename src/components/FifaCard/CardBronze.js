import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { calculatePlayerOverall, getCardTier } from 'utils/utils';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { starterCard } from '../../structure/starterCard';
import { ATTRIBUTES, DEFAULT_COLOR, DEFAULT_PHOTO } from 'utils/Constant';

const CardBronze = ({ dynamicValue, previewImg }) => {
  const stateUser = useSelector(getUser) || {};
  const user = dynamicValue || stateUser;
  const userLogin = user.userLogin || {};
  const customerInfo = useMemo(() => {
    const info = user.customerInfo || {};
    // Calcolo fallback dati se mancano
    if (!info.overall) {
      const overall = calculatePlayerOverall(starterCard[0].attributes);
      return { ...info, attributes: { ...starterCard[0].attributes }, overall };
    }
    return info;
  }, [user.customerInfo]); // ✅ dipendenza stabile
  // Prepara immagine profilo
  const playerImage = previewImg || userLogin.photoURL || customerInfo.photoURL || DEFAULT_PHOTO;
  // Mappa gli attributi
  const stats = useMemo(
    () =>
      ATTRIBUTES.map((attr, idx) => ({
        ...attr,
        value: customerInfo?.attributes?.[attr.key] || 11,
        col: idx % 2 === 0 ? 1 : 2,
        row: Math.floor(idx / 2) + 1,
      })),
    [customerInfo],
  );
  // Sfondo carta in base all'overall
  const cardBackground = getCardTier(customerInfo.overall || 60);
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
            backgroundImage: `url('${cardBackground}')`,
            color: 'rgb(62, 40, 28)',
          }}
        >
          {/* Foto giocatore */}
          <span
            className={`div-face_image ${!playerImage ? 'empty' : ''}`}
            style={{ backgroundImage: `url(${playerImage})` }}
          ></span>
          {/* Nazione */}
          <span
            className="div-nation_image"
            style={{
              backgroundImage: "url('https://futcardsfifa.com/app/uploads/2020/10/ITALIA-1.png')",
            }}
          ></span>
          {/* Club */}
          <span
            className={`div-club_image ${!customerInfo.favoriteTeam ? 'empty' : ''}`}
            style={{
              backgroundImage: `url(${customerInfo.favoriteTeam || ''})`,
            }}
          ></span>
          {/* Nome */}
          <div className="div-name">
            <span className="input-name">
              {`${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`}
            </span>
          </div>

          {/* Overall + Posizione */}
          <span className="input-media">{customerInfo.overall || 60}</span>
          <span className="input-position">{customerInfo.position || 'ATT'}</span>
          <span className="input-torneo-mic d-none"></span>
          {/* Attributi */}
          {stats.map((stat, idx) => (
            <React.Fragment key={stat.key}>
              <span
                className={`input-caracteristica input-caracteristica-${idx + 1} attr-columna-${stat.col} attr-fila-${stat.row}`}
              >
                {stat.value}
              </span>
              <span
                className={`input-caracteristica input-titulo-caracteristica-${idx + 1} attr-columna-titulo-${stat.col} attr-fila-${stat.row}`}
                style={{ color: DEFAULT_COLOR }}
              >
                {stat.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </figure>
  );
};
CardBronze.propTypes = {
  dynamicValue: PropTypes.oneOfType([
    PropTypes.shape({
      customerInfo: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        favoriteTeam: PropTypes.string,
        overall: PropTypes.number,
        position: PropTypes.string,
        attributes: PropTypes.shape({
          VEL: PropTypes.number,
          DRI: PropTypes.number,
          TIR: PropTypes.number,
          DIF: PropTypes.number,
          PAS: PropTypes.number,
          FIS: PropTypes.number,
        }),
      }),
      userLogin: PropTypes.shape({
        photoURL: PropTypes.string,
      }),
    }),
    PropTypes.oneOf([null]), // permette anche null
  ]),
  previewImg: PropTypes.string,
};

export default CardBronze;
