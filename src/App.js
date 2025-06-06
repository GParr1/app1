import React from "react";
import {AuthView} from "./View/AuthView";
import {ConfirmProfileView} from "./View/ConfirmProfileView";
import {MyAccountView} from "./View/MyAccountView";
import {getUser} from "./state/auth/selectors";
import {doSignOut} from "./utils/authUtils";

function App() {
    const user = getUser();
    return (
        <div className="container mt-5">
            {user ? (
                <div>
                    {user.displayName && <MyAccountView/>}
                    {user.displayName && <h2 className="text-center mb-4">Benvenuto, {user.displayName || user.email}</h2>}
                    <button className="btn btn-danger" onClick={doSignOut}>
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