import React, { useEffect, useState } from "react";
import {onAuthStateChanged, signOut, updateProfile} from "firebase/auth";
import { auth } from "./firebaseConfig";

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // currentUser è null se non loggato
        });

        return () => unsubscribe(); // pulizia listener
    }, []);
    const handleLogout = () => {
        console.log(user);
        signOut(auth)
            .then(() => {
                console.log("Logout effettuato");
            })
            .catch((error) => {
                console.error("Errore nel logout:", error);
            });
    };
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!firstName || !lastName) {
            setError("Compila nome e cognome");
            return;
        }

        try {
            await updateProfile(auth.currentUser, {
                displayName: `${firstName} ${lastName}`,
                firstName:`${firstName}`,
                lastName:`${lastName}`
            });
            setSuccess("Profilo aggiornato!");
            // forza il reload dei dati utente
            setUser({ ...auth.currentUser });
        } catch (err) {
            setError("Errore aggiornando il profilo: " + err.message);
        }
    };
  return (
      <div className="container mt-5">
          {user ? (
              <div>
                  <h2 className="text-center mb-4">Benvenuto,  {user.displayName || user.email}</h2>

                  <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                  </button>
                  {/* Se manca displayName → mostra il form per completare il profilo */}
                  {!user.displayName && (
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
                  )}
              </div>
          ) : (
              <>
                  <h1 className="text-center mb-4">Benvenuto</h1>
                  {/* Tabs */}
                  <ul className="nav nav-tabs justify-content-center mb-4">
                      <li className="nav-item">
                          <button
                              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                              onClick={() => setActiveTab("login")}
                          >
                              Login
                          </button>
                      </li>
                      <li className="nav-item">
                          <button
                              className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                              onClick={() => setActiveTab("register")}
                          >
                              Registrati
                          </button>
                      </li>
                  </ul>
                  {/* Due colonne affiancate, ma mostra solo il componente attivo */}
                  <div className="row">
                      <div className="col-md-6">
                          {activeTab === "login" && <Login />}
                      </div>
                      <div className="col-md-6">
                          {activeTab === "register" && <Register />}
                      </div>
                  </div>
              </>
          )}
      </div>
  );
}

export default App;