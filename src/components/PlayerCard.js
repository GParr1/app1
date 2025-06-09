import React from "react";
import './css/PayerCard.css';

const PlayerCard = ({playerImage, playerName, playerNumber,
                        playerColor,
                        teamSymbol,countryCode,birthDate,height,}) => {

    return (
        <div className="card border-4" style={{
            borderColor: "#f7d500", width: "18rem", position: "relative",
            background: `repeating-linear-gradient(
              45deg,
              ${playerColor.primaryColor},
              ${playerColor.primaryColor} 20px,
              ${playerColor.secondaryColor} 20px,
              ${playerColor.secondaryColor} 50px
            )`
        }}>
            {/* HEADER */}
            <div className="card-header d-flex justify-content-between align-items-center text-white">
                <span className="fw-bold fs-4">
                    {teamSymbol}
                </span>
                <span className="badge bg-dark fs-6">{countryCode}</span>
                <span className="fw-bold fs-4">{playerNumber}</span>
            </div>
            {/* IMMAGINE */}
            {playerImage &&
                <img src={playerImage} className="card-img-top player-image p-2" alt="Player"/>}

            {/* INFORMAZIONI */}
            <div className="card-body text-center">
                <h5 className="card-title">{playerName}</h5>
                <p className="card-text small mb-1">{birthDate}</p>
                <p className="card-text small">{height}</p>
            </div>
            {/* LOGO PANINI */}
            <div className="position-absolute bottom-0 start-0 m-2">
                <img src="/panini-logo.png" alt="Panini" width="60"/>
            </div>
        </div>
    );
};


export default PlayerCard;