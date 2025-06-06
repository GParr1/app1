import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterTwoSteps = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleFirstStep = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Compila email e password.");
            return;
        }
        setError("");
        setStep(2);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            setError("Nome e cognome obbligatori.");
            return;
        }
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`,
                firstName:`${firstName}`,
                lastName:`${lastName}`
            });
            setSuccess("Registrazione completata con successo!");
            setStep(1);
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
        } catch (err) {
            setError("Errore durante la registrazione: " + err.message);
        }
    };


    return (
        <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">Registrazione</h2>
                    {step === 1 ? (
                        <FirstStepOfRegister
                            handleFirstStep={handleFirstStep}
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                    ) : (
                        <SecondStepOfRegister
                            handleRegister={handleRegister}
                            setFirstName={setFirstName}
                            setLastName={setLastName}
                        />
                    )}
                    {error && <p className="mt-3 text-danger">{error}</p>}
                    {success && <p className="mt-3 text-success">{success}</p>}
                </div>
            </div>
        </div>
    );
};
const FirstStepOfRegister = ({handleFirstStep,setEmail,setPassword}) =>(
    <form onSubmit={handleFirstStep}>
        <div className="mb-3">
            <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit" className="btn btn-primary w-100">Continua</button>
    </form>
)
const SecondStepOfRegister = ({handleRegister,setFirstName,setLastName}) =>(
    <form onSubmit={handleRegister}>
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
        <button type="submit" className="btn btn-success w-100">Registrati</button>
    </form>
)

export default RegisterTwoSteps;
