import React,{useState} from "react";
import {getUser} from "../state/auth/selectors";
import {useSelector} from "react-redux";
import PlayerCard from "../components/PlayerCard";
import {teamInfo} from "../utils/infoTeam";
import {authUpdateProfile} from "../utils/authUtils";

// Mock dati di esempio
const mockStats = {
    "2022": { partite: 18, gol: 12, assist: 5 },
    "2023": { partite: 21, gol: 15, assist: 7 },
};

const mockCoppe = [
    { anno: 2022, nome: "Torneo Estivo" },
    { anno: 2023, nome: "Coppa Invernale" },
];

export const MyAccountView = () => {
    const user = useSelector(getUser);
    if (!user) return <p>Caricamento profilo...</p>;
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false)
    const [selectedTeam, setSelectedTeam] = useState("");

    const playerColor = teamInfo[selectedTeam].color;
    const teamSymbol = teamInfo[selectedTeam].logo;
    const displayName = user.displayName || "Giocatore Sconosciuto";
    const photoURL = user.photoURL || "https://via.placeholder.com/200x250?text=Panini+Card";

    const handleSave =async (e) =>{
        e.preventDefault();
        const target = e.target;
        const dialogContent = target.closest('.modal-content');
        const form = dialogContent.getElementById("updateProfile");
        const formData = new FormData(form);
        await authUpdateProfile(formData);
        setShowModal(false)
    }
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Il Mio Account</h1>

            <div className="row">
                {/* Figurina Panini */}
                <div className="col-md-4 text-center mb-4">
                    <PlayerCard
                        playerImage={photoURL}
                        playerName={displayName}
                        playerNumber="11"
                        teamSymbol={teamSymbol}
                        playerColor={playerColor}  // Napoli blu
                        countryCode="BEL"
                        birthDate="13-5-1993"
                        height="1,91 M"
                    />
                    <select className="form-select mb-3" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                        {Object.keys(teamInfo).map((team) => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>

                </div>

                {/* Statistiche e Coppe */}
                <div className="col-md-8">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Statistiche Personali</h5>
                            {Object.entries(mockStats).map(([anno, stats]) => (
                                <div key={anno} className="mb-3">
                                    <h6 className="text-primary">Stagione {anno}</h6>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Partite giocate: {stats.partite}</li>
                                        <li className="list-group-item">Gol: {stats.gol}</li>
                                        <li className="list-group-item">Assist: {stats.assist}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coppe */}
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Coppe Vinte</h5>
                            {mockCoppe.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {mockCoppe.map((coppa, idx) => (
                                        <li key={idx} className="list-group-item">
                                            🏆 {coppa.nome} ({coppa.anno})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nessuna coppa vinta... ancora!</p>
                            )}
                        </div>
                    </div>

                    {/* Bottone per aprire il modale */}
                    <button className="btn btn-primary mb-3" onClick={openModal}>
                        Completa il tuo profilo
                    </button>
                    {/* Modale personalizzato */}
                    {showModal && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Completa il tuo profilo</h5>
                                        <button type="button" className="btn-close" onClick={closeModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form id={'updateProfile'}>
                                            <div className="mb-3">
                                                <label className="form-label">Data di nascita</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Numero preferito</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Altezza</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Es: 1,85 M"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                            Chiudi
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={handleSave}>
                                            Salva
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};


