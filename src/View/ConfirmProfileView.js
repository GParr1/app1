import React, {useState} from "react";
import {authUpdateProfile} from "../utils/authUtils";

export const ConfirmProfileView = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const data = {firstName, lastName};
        const isUpdate = await authUpdateProfile(data);
        isUpdate && setSuccess("Profilo aggiornato!");
        !isUpdate && setError("Errore aggiornando il profilo");
    };
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Completa il tuo profilo</h4>
                <form onSubmit={handleProfileUpdate}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cognome"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">
                        Salva Profilo
                    </button>
                </form>
                {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">{success}</p>}
            </div>
        </div>
    )
}