import Login from "../components/Login";
import Register from "../components/Register";
import React, {useState} from "react";

export const AuthView = () => {
    const [activeTab, setActiveTab] = useState("login");
    return (
        <>
            <h1 className="text-center mb-4">Benvenuto</h1>
            {/* Tabs */}
            <ul className="nav nav-tabs justify-content-center mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}>
                        Login
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => setActiveTab("register")}>
                        Registrati
                    </button>
                </li>
            </ul>
            {/* Due colonne affiancate, ma mostra solo il componente attivo */}
            <div className="row">
                <div className="col-md-6">
                    {activeTab === "login" && <Login/>}
                </div>
                <div className="col-md-6">
                    {activeTab === "register" && <Register/>}
                </div>
            </div>
        </>
    )
}