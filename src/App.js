import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    const [user, setUser] = useState(null);
    //const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // currentUser è null se non loggato
        });

        return () => unsubscribe(); // pulizia listener
    }, [auth]);
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
                  <h2>Benvenuto, {user.email}</h2>
                  <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                  </button>
              </div>
          ) : (
              <>
                  <h1>Benvenuto</h1>
                  <Login />
                  <Register />
              </>
          )}
      </div>
  );
}

export default App;
/*
git init
git add .
git commit -m "Inizializzazione progetto React con Login"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/login-app.git
git push -u origin main

 */