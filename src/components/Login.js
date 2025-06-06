import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess("Accesso avvenuto con successo!");
            setEmail("");
            setPassword("");
        } catch (err) {
            setError("Errore di Accesso" + err.message);
        }
    };

    return (
        <div className="row">
            {/* Login */}
            <div className="col-md-6 mb-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-center">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                                <button className="btn btn-primary w-100" type="submit">Accedi</button>
                        </form>
                        {error && <p className="mt-2 text-danger">{error}</p>}
                        {success && <p className="mt-2 text-success">{success}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
