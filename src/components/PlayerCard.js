import React from 'react';

const PlayerCard = ({
  playerImage,
  playerName,
  playerNumber,
  playerColor,
  teamSymbol,
  countryCode,
  birthDate,
  height,
}) => {
  return (
    <div
      className="card border-4"
      style={{
        borderColor: '#f7d500',
        width: '18rem',
        position: 'relative',
        background: `conic-gradient(
                from 270deg at 30% 50%, /* centro spostato verso sinistra */
            ${playerColor.primaryColor}  0deg 90deg,     /* arco rosso da 0 a 90° */
            transparent 90deg 270deg,
            ${playerColor.primaryColor}  270deg 360deg   /* arco rosso da 270° a 360° */
            ),
            radial-gradient(circle at center, ${playerColor.secondaryColor} 80%,  ${playerColor.primaryColor}  100%)`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* HEADER */}
      <div className="card-header d-flex justify-content-between align-items-center text-white bg-panini">
        <span className="fw-bold fs-4" dangerouslySetInnerHTML={{ __html: teamSymbol }}></span>
        <span className="badge bg-dark fs-6">{countryCode}</span>
        <span className="fw-bold fs-4">{playerNumber}</span>
      </div>
      {/* IMMAGINE */}
      <div className="position-relative">
        <img src={`${playerImage}`} className="card-img-top player-image p-2" alt="Player" />

        <div className="position-absolute bottom-0 end-0 text-white px-2 py-1 m-2 rounded shadow d-flex align-items-center bg-panini">
          <h5 className="card-title mb-2 mt-2 small text-centred">{playerName}</h5>
        </div>
      </div>

      {/* INFORMAZIONI */}
      <div className="card-body d-flex text-white text-center justify-content-between">
        <img
          src="https://res.cloudinary.com/dehfdnxul/image/upload/v1749833864/profilePictures/O2EIQVW0ICg6c89nUCSdjJt8k6r1.png?v=1749833872753<"
          alt="Panini"
          width="60"
        />
        <p className="card-text small ">{birthDate}</p>
        <p className="card-text small ">{height}</p>
      </div>
      {/* LOGO PANINI */}
      <div className="position-absolute bottom-0 start-0 m-2">l</div>
    </div>
  );
};

export default PlayerCard;
