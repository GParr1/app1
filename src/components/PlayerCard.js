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
  ComponentVideo,
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
        {!ComponentVideo && (
          <img src={`${playerImage}`} className="card-img-top player-image p-2" alt="Player" />
        )}
        {ComponentVideo && <ComponentVideo />}
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
            <h5 className="card-title mb-2 small text-center border-bottom">{playerName}</h5>
            <div className="d-flex justify-content-between ">
              <p className=" small fw-bold ">13-5-1993</p>
              <p className="small fw-bold">1,80 cm</p>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMAZIONI */}
      <div className="bg-panini justify-content-center">
        <div className="card-body d-flex text-center  mb-0 p-0 mt-1">
          {/* LOGO PANINI */}
          <img
            src="https://res.cloudinary.com/dehfdnxul/image/upload/v1749833864/profilePictures/O2EIQVW0ICg6c89nUCSdjJt8k6r1.png?v=1749833872753<"
            alt="Panini"
            width="60"
          />
          <div className=" row m-1 mb-0">
            <h5 className="card-title mb-2 small text-center border-bottom">Giovanni Parrone</h5>
            <div className="d-flex justify-content-between ">
              <p className=" small fw-bold ">{birthDate}</p>
              <p className="small fw-bold">{height}</p>
            </div>
          </div>
        </div>
      </div>
      {/* LOGO PANINI */}
    </div>
  );
};

export default PlayerCard;
