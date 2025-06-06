import React from "react";
import {getUser} from "../state/auth/selectors";
import {useSelector} from "react-redux";
import UploadProfilePicture from "../components/UploadProfilePicture";

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

    const displayName = user.displayName || "Giocatore Sconosciuto";
    const photoURL = user.photoURL || "https://via.placeholder.com/200x250?text=Panini+Card";


    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Il Mio Account</h1>
            <div className="row">
                {/* Figurina Panini */}
                <div className="col-md-4 text-center mb-4">
                    <div className="card border shadow-sm p-3 bg-light">
                        <img
                            src={photoURL}
                            alt="Profilo"
                            className="img-fluid rounded"
                            style={{ height: 250, objectFit: "cover" }}
                        />
                        <h4 className="mt-3">{displayName}</h4>
                    </div>
                    <UploadProfilePicture
                        userId={user.uid}
                        //onUploadSuccess={handleUploadSuccess}
                    />
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
                </div>
            </div>
        </div>
    );
};


