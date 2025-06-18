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
      <div className="position-relative d-flex justify-content-center">
        <img
          src={`${playerImage}`}
          className="card-img-top player-image p-0 w-auto mb-0"
          alt="Player"
        />
      </div>

      <div className="bg-panini justify-content-center">
        <div className="card-body d-flex text-center  mb-0 p-0 mt-1">
          <img
            alt="Panini"
            height="15"
            src="https://res.cloudinary.com/dehfdnxul/image/upload/v1749844923/qwi3sobsskhfo5mj23fp.png"
            className="mb-4"
          />
          <div className=" row m-1 mb-0">
            <h5
              className="card-title mb-2 small text-center border-bottom"
              style={{ '--bs-border-color': 'black' }}
            >
              {playerName}
            </h5>
            <div className="d-flex justify-content-between ">
              <p className=" small fw-bold ">{birthDate}</p>
              <p className="small fw-bold">{height} cm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
