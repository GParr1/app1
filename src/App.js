import React, { useEffect, useState } from "react";
import {onAuthStateChanged, signOut, updateProfile} from "firebase/auth";
import { auth } from "./firebaseConfig";

import Login from "./components/Login";
import Register from "./components/Register";
import {AuthView} from "./View/AuthView";
import {ConfirmProfileView} from "./View/ConfirmProfileView";
import {MyAccountView} from "./View/MyAccountView";

function App() {
    const [user, setUser] = useState(auth.currentUser || null);
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
  return (
      <div className="container mt-5">
          {user ? (
              <div>
                  {user.displayName  && <MyAccountView/>}
                  {user.displayName  && <h2 className="text-center mb-4">Benvenuto,  {user.displayName || user.email}</h2>}
                  <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                  </button>
                  {/* Se manca displayName → mostra il form per completare il profilo */}
                  {!user.displayName && (
                      <ConfirmProfileView/>
                  )}
              </div>
          ) : (
              <AuthView/>
          )}
      </div>
  );
}


export default App;