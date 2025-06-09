import React from "react";
import './css/PayerCard.css';
import UploadProfilePicture from "./UploadProfilePicture"; // Piccolo CSS per layout e immagine

const PlayerCard = ({playerImage, playerName, playerNumber,
                        playerColor = "#f7d500", // Giallo Panini di default
                        teamSymbol,countryCode,birthDate,height,}) => {
    return (
        <div className="card border-4" style={{borderColor: playerColor, width: "18rem", position: "relative"}}>
            {/* HEADER */}
            <div className="card-header d-flex justify-content-between align-items-center text-white"
                 style={{backgroundColor: playerColor}}>
                <span className="fw-bold fs-4">
                     <img src={`/logos/${teamSymbol}_logo.svg`} alt={`${teamSymbol} logo`} width="60" />
                </span>
                <span className="badge bg-dark fs-6">{countryCode}</span>
                <span className="fw-bold fs-4">{playerNumber}</span>
            </div>
            {/* IMMAGINE */}
            {playerImage && <img src={playerImage} className="card-img-top player-image" alt="Player"/>}
            {playerImage && <UploadProfilePicture/>}
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